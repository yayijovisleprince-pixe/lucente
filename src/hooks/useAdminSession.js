import { useState, useEffect, useCallback, useRef } from 'react';

const SESSION_START_KEY = 'lucente_admin_session_start';
const DEFAULT_INACTIVITY_MS = 15 * 60 * 1000; // 15 minutes
const DEFAULT_WARNING_MS = 2 * 60 * 1000;     // 2 minutes before timeout
const DEFAULT_MAX_LIFETIME_MS = 8 * 60 * 60 * 1000; // 8 hours (full service)

/**
 * Custom hook managing Admin Session lifecycle:
 * - Idle / Inactivity detection (debounced activity listeners)
 * - Warning grace window with real-time countdown
 * - Maximum absolute shift lifetime
 * - Auto-lock & sign-out triggering
 */
export function useAdminSession({
  isActive = false,
  onExpire,
  inactivityTimeoutMs = DEFAULT_INACTIVITY_MS,
  warningThresholdMs = DEFAULT_WARNING_MS,
  maxLifetimeMs = DEFAULT_MAX_LIFETIME_MS
}) {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [secondsRemaining, setSecondsRemaining] = useState(Math.floor(inactivityTimeoutMs / 1000));
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [expiryReason, setExpiryReason] = useState(null);

  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const throttleRef = useRef(0);

  // Initialize or retrieve absolute session start time
  useEffect(() => {
    if (!isActive) {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(SESSION_START_KEY);
      }
      return;
    }

    if (typeof window !== 'undefined') {
      const existingStart = sessionStorage.getItem(SESSION_START_KEY);
      if (!existingStart) {
        sessionStorage.setItem(SESSION_START_KEY, String(Date.now()));
      }
    }
  }, [isActive]);

  // Activity handler (throttled to at most once per second to avoid re-render overhead)
  const recordActivity = useCallback(() => {
    const now = Date.now();
    if (now - throttleRef.current > 1000) {
      throttleRef.current = now;
      setLastActivity(now);
      setIsWarningOpen(false);
    }
  }, []);

  // Listen to user interactions when session is active
  useEffect(() => {
    if (!isActive) return;

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    const handleEvent = () => recordActivity();

    events.forEach((ev) => window.addEventListener(ev, handleEvent, { passive: true }));

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleEvent));
    };
  }, [isActive, recordActivity]);

  // Main countdown & timeout ticker
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const now = Date.now();

      // 1. Check absolute max session lifetime
      const sessionStartStr = typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_START_KEY) : null;
      if (sessionStartStr) {
        const sessionStart = Number(sessionStartStr);
        if (now - sessionStart >= maxLifetimeMs) {
          clearInterval(interval);
          setExpiryReason('max_lifetime');
          if (typeof window !== 'undefined') sessionStorage.removeItem(SESSION_START_KEY);
          if (onExpireRef.current) onExpireRef.current('max_lifetime');
          return;
        }
      }

      // 2. Check inactivity timeout
      const idleTime = now - lastActivity;
      const remainingMs = Math.max(0, inactivityTimeoutMs - idleTime);
      const remainingSec = Math.ceil(remainingMs / 1000);
      setSecondsRemaining(remainingSec);

      if (remainingMs <= 0) {
        clearInterval(interval);
        setExpiryReason('inactivity');
        setIsWarningOpen(false);
        if (typeof window !== 'undefined') sessionStorage.removeItem(SESSION_START_KEY);
        if (onExpireRef.current) onExpireRef.current('inactivity');
      } else if (remainingMs <= warningThresholdMs) {
        setIsWarningOpen(true);
      } else {
        setIsWarningOpen(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, lastActivity, inactivityTimeoutMs, warningThresholdMs, maxLifetimeMs]);

  // User manually extends session
  const extendSession = useCallback(() => {
    const now = Date.now();
    setLastActivity(now);
    setIsWarningOpen(false);
    setSecondsRemaining(Math.floor(inactivityTimeoutMs / 1000));
  }, [inactivityTimeoutMs]);

  // Format mm:ss
  const formatTimeRemaining = () => {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    secondsRemaining,
    timeRemainingFormatted: formatTimeRemaining(),
    isWarningOpen,
    expiryReason,
    extendSession,
    recordActivity
  };
}
