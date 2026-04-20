import { useState, useEffect, useRef } from "react";
import { getPlayerPhoto } from "../utils/player-photo.js";

/**
 * React hook that fetches a player's photo from Wikipedia.
 * Returns the photo URL (or null while loading/if unavailable).
 *
 * Uses a shared in-memory cache across all hook instances
 * to prevent duplicate fetches for the same player.
 *
 * @param {string} playerName - The player's full name
 * @returns {{ photoUrl: string|null, isLoading: boolean }}
 */

// Shared in-memory cache to prevent duplicate requests across components
const inFlightRequests = new Map();

export default function usePlayerPhoto(playerName) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    if (!playerName) {
      setIsLoading(false);
      return;
    }

    async function loadPhoto() {
      // Check if there's already a request in flight for this player
      if (!inFlightRequests.has(playerName)) {
        inFlightRequests.set(playerName, getPlayerPhoto(playerName));
      }

      try {
        const url = await inFlightRequests.get(playerName);
        if (isMounted.current) {
          setPhotoUrl(url);
          setIsLoading(false);
        }
      } catch {
        if (isMounted.current) {
          setPhotoUrl(null);
          setIsLoading(false);
        }
      }
    }

    loadPhoto();

    return () => {
      isMounted.current = false;
    };
  }, [playerName]);

  return { photoUrl, isLoading };
}
