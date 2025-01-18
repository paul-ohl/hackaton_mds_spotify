'use client';

import { useState, useEffect } from 'react';
import { SavedPlaylist, SpotifyPlaylistResponse } from '../types/spotify';

const STORAGE_KEY = 'saved_playlists';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export function usePlaylistStorage() {
  const [savedPlaylists, setSavedPlaylists] = useState<SavedPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les playlists sauvegardées au démarrage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedPlaylists(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder les changements dans le localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaylists));
    }
  }, [savedPlaylists, isLoading]);

  // Ajouter une nouvelle playlist
  const addPlaylist = async (playlistId: string): Promise<boolean> => {
    try {
      // Vérifier si la playlist existe déjà
      if (savedPlaylists.some(p => p.id === playlistId)) {
        return false;
      }

      // Récupérer les informations de la playlist
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la playlist');
      }

      const playlistInfo = await response.json();
      
      const newPlaylist: SavedPlaylist = {
        id: playlistId,
        name: playlistInfo.name,
        lastFetched: new Date().toISOString()
      };

      setSavedPlaylists(prev => [...prev, newPlaylist]);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la playlist:', error);
      return false;
    }
  };

  // Supprimer une playlist
  const removePlaylist = (playlistId: string) => {
    setSavedPlaylists(prev => prev.filter(p => p.id !== playlistId));
  };

  // Charger les données de toutes les playlists
  const fetchAllPlaylists = async (): Promise<SpotifyPlaylistResponse[]> => {
    const results: SpotifyPlaylistResponse[] = [];

    for (const playlist of savedPlaylists) {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });

        if (!response.ok) {
          console.error(`Erreur lors du chargement de la playlist ${playlist.id}`);
          continue;
        }

        const data = await response.json();
        results.push(data);

        // Mettre à jour la date de dernière récupération
        setSavedPlaylists(prev =>
          prev.map(p =>
            p.id === playlist.id
              ? { ...p, lastFetched: new Date().toISOString() }
              : p
          )
        );
      } catch (error) {
        console.error(`Erreur lors du chargement de la playlist ${playlist.id}:`, error);
      }
    }

    return results;
  };

  return {
    savedPlaylists,
    isLoading,
    addPlaylist,
    removePlaylist,
    fetchAllPlaylists
  };
}
