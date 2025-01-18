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
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-semibold text-black">
                  Ajouter une playlist à votre calendrier
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                      placeholder="URL de la playlist Spotify"
                      value={playlistUrl}
                      onChange={(e) => setPlaylistUrl(e.target.value)}
                      disabled={isLoading}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      URL de la playlist Spotify
                    </label>
                  </div>
                  <div className="relative">
                    <button 
                      className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Chargement...' : 'Ajouter la playlist'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="mt-8 text-center text-red-500">{error}</div>}
    </div>
  );
}
