'use client';

import { useState, useEffect } from 'react';
import { SavedPlaylist, SpotifyPlaylistResponse } from '../types/spotify';

const STORAGE_KEY = 'saved_playlists';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

export function usePlaylistStorage() {
  const [savedPlaylists, setSavedPlaylists] = useState<SavedPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load playlists from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedPlaylists(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Erreur lors du chargement des playlists:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaylists));
    }
  }, [savedPlaylists, isLoading]);

  // Fetch playlist data
  const fetchPlaylistData = async (playlistId: string): Promise<SpotifyPlaylistResponse | null> => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token expiré - veuillez vous reconnecter');
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors du chargement de la playlist ${playlistId}:`, error);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
      return null;
    }
  };

  // Add a new playlist
  const addPlaylist = async (playlistId: string): Promise<boolean> => {
    try {
      setError(null);

      // Check if playlist already exists
      if (savedPlaylists.some(p => p.id === playlistId)) {
        return false;
      }

      // Fetch playlist information
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la playlist');
      }

      const playlistInfo = await response.json();
      const tracks = await fetchPlaylistData(playlistId);

      const newPlaylist: SavedPlaylist = {
        id: playlistId,
        name: playlistInfo.name,
        lastFetched: new Date().toISOString(),
        tracks: tracks || undefined
      };

      setSavedPlaylists(prev => [...prev, newPlaylist]);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la playlist:', error);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
      return false;
    }
  };

  // Remove a playlist
  const removePlaylist = (playlistId: string) => {
    setSavedPlaylists(prev => prev.filter(p => p.id !== playlistId));
  };

  // Refresh a single playlist
  const refreshPlaylist = async (playlistId: string): Promise<boolean> => {
    try {
      setError(null);
      const tracks = await fetchPlaylistData(playlistId);

      if (!tracks) {
        return false;
      }

      setSavedPlaylists(prev =>
        prev.map(p =>
          p.id === playlistId
            ? { ...p, tracks, lastFetched: new Date().toISOString() }
            : p
        )
      );
      return true;
    } catch (error) {
      console.error(`Erreur lors du rafraîchissement de la playlist ${playlistId}:`, error);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
      return false;
    }
  };

  // Refresh all playlists
  const fetchAllPlaylists = async (): Promise<void> => {
    setError(null);
    const refreshPromises = savedPlaylists.map(playlist => refreshPlaylist(playlist.id));
    await Promise.all(refreshPromises);
  };

  // Auto-refresh playlists periodically
  useEffect(() => {
    if (savedPlaylists.length > 0) {
      const interval = setInterval(fetchAllPlaylists, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [savedPlaylists.length]);

  return {
    savedPlaylists,
    isLoading,
    error,
    addPlaylist,
    removePlaylist,
    refreshPlaylist,
    fetchAllPlaylists
  };
}
