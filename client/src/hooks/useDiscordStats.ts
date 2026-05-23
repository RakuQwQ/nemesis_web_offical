// ============================================================
// useDiscordStats
// Fetches NEMESIS Discord member / online counts via the public
// invite endpoint (no token, no backend, CORS-friendly).
//
//   GET https://discord.com/api/v10/invites/<code>?with_counts=true
//   → { approximate_member_count, approximate_presence_count, ... }
//
// Results are cached in sessionStorage for TTL_MS to avoid hammering
// the endpoint on every navigation. If the request fails or the cache
// is empty, the consumer should fall back to a hardcoded value.
// ============================================================

import { useEffect, useState } from 'react';

/** Invite code from https://discord.com/invite/<code> */
const INVITE_CODE = 'VdvBegG6ax';
const ENDPOINT = `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`;
const CACHE_KEY = 'nemesis:discord-stats';
const TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface DiscordStats {
  /** Total members (Discord's `approximate_member_count`). */
  memberCount: number;
  /** Members currently online (`approximate_presence_count`). */
  onlineCount: number;
  /** When the snapshot was taken (epoch ms). */
  fetchedAt: number;
}

interface State {
  data: DiscordStats | null;
  loading: boolean;
  error: Error | null;
}

function readCache(): DiscordStats | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DiscordStats;
    if (
      typeof parsed?.memberCount !== 'number' ||
      typeof parsed?.fetchedAt !== 'number' ||
      Date.now() - parsed.fetchedAt > TTL_MS
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(stats: DiscordStats) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(stats));
  } catch {
    /* sessionStorage may be disabled — ignore */
  }
}

export function useDiscordStats(): State {
  const [state, setState] = useState<State>(() => {
    const cached = readCache();
    return { data: cached, loading: !cached, error: null };
  });

  useEffect(() => {
    // Skip fetching if we already have a fresh cached snapshot.
    if (readCache()) return;

    let cancelled = false;
    const controller = new AbortController();

    fetch(ENDPOINT, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Discord API ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        const memberCount = Number(json?.approximate_member_count);
        const onlineCount = Number(json?.approximate_presence_count);
        if (!Number.isFinite(memberCount)) {
          throw new Error('Discord API: missing approximate_member_count');
        }
        const stats: DiscordStats = {
          memberCount,
          onlineCount: Number.isFinite(onlineCount) ? onlineCount : 0,
          fetchedAt: Date.now(),
        };
        writeCache(stats);
        setState({ data: stats, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled || (err as Error)?.name === 'AbortError') return;
        setState((s) => ({ ...s, loading: false, error: err as Error }));
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}
