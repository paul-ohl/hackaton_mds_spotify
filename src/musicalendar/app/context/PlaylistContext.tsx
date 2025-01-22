'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { PlaylistContextType } from '../types/spotify';
import { usePlaylistStorage } from '../hooks/usePlaylistStorage';

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined,
);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const {
    savedPlaylists: playlists,
    isLoading,
    addPlaylist,
    removePlaylist,
    fetchAllPlaylists,
    selectedPlaylists,
    setSelectedPlaylists,
  } = usePlaylistStorage();

  // Fetch all playlists when not loading
  useEffect(() => {
    if (!isLoading) {
      refreshPlaylists();
    }
  }, [isLoading]);

  const refreshPlaylists = async () => {
    await fetchAllPlaylists();
  };

  const value: PlaylistContextType = {
    playlists,
    isLoading,
    addPlaylist,
    removePlaylist,
    refreshPlaylists,
    selectedPlaylists,
    setSelectedPlaylists,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
}
