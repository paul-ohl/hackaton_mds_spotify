'use client';

import { useState } from 'react';
import { usePlaylist } from '../context/PlaylistContext';

export default function PlaylistForm() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [error, setError] = useState('');
  const { addPlaylist, isLoading } = usePlaylist();

  const extractPlaylistId = (url: string) => {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      setError('URL de playlist invalide');
      return;
    }

    try {
      const success = await addPlaylist(playlistId);
      if (success) {
        setPlaylistUrl('');
        setError('');
      } else {
        setError('Cette playlist existe déjà dans votre collection');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="card rounded-lg p-6">
        <h2 className="text-2xl text-primary dark:text-primary-dark font-semibold mb-6">Ajouter une playlist à votre calendrier</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className="w-full text-secondary dark:text-secondary-dark p-3 border rounded-lg bg-transparent focus:outline-none focus:border-accent"
              placeholder="URL de la playlist Spotify"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="text-primary dark:text-primary-dark bg-accent dark:bg-accent-dark w-full p-3 rounded-lg font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Chargement...' : 'Ajouter la playlist'}
          </button>
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
