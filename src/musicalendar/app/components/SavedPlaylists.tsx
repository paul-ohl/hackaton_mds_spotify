'use client';

import Link from 'next/link';
import { usePlaylist } from '../context/PlaylistContext';
import { useEffect } from 'react';

export default function SavedPlaylists() {
  const { playlists, removePlaylist, refreshPlaylists, isLoading, setSelectedPlaylists } = usePlaylist();

  useEffect(() => {
    refreshPlaylists();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-primary dark:text-primary-dark text-2xl font-semibold">Playlists Sauvegardées</h2>
        <button
          onClick={() => refreshPlaylists()}
          className="text-primary dark:text-primary-dark px-4 py-2 rounded-lg disabled:opacity-50 bg-white dark:bg-gray-800 border border-border dark:border-border-dark"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Rafraîchir'}
        </button>
      </div>

      {playlists.length === 0 ? (
        <p className="text-secondary dark:text-secondary-dark text-center py-8">Aucune playlist sauvegardée</p>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="text-primary dark:text-primary-dark rounded-lg p-4 border border-border dark:border-border-dark">
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    href="/calendar"
                    onClick={() => {
                      setSelectedPlaylists([playlist]);
                    }}
                  >
                    <h3 className="font-medium hover:text-accent hover:dark:text-accent-dark text-lg">{playlist.name}</h3>
                  </Link>
                  <p className="text-secondary dark:text-secondary-dark text-sm">ID: {playlist.id}</p>
                  <p className="text-secondary dark:text-secondary-dark text-sm">
                    Dernière mise à jour: {new Date(playlist.lastFetched).toLocaleString('fr-FR')}
                  </p>
                </div>
                <button
                  onClick={() => removePlaylist(playlist.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  aria-label="Supprimer la playlist"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {playlist.tracks && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-3">Pistes ({playlist.tracks.items.length})</h4>
                  <div className="max-h-60 overflow-y-auto">
                    {playlist.tracks.items.map((track) => (
                      <div
                        key={track.track.id + track.added_at}//.toISOString()}
                        className="flex items-center py-2 border-b last:border-b-0"
                      >
                        <img
                          src={track.track.album.images[0].url}
                          alt={track.track.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="ml-3">
                          <p className="font-medium">{track.track.name} - {track.track.artists.map((artist) => artist.name).join(", ")}</p>
                          <p className="text-secondary dark:text-secondary-dark text-sm">
                            Ajouté le: {new Date(track.added_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
