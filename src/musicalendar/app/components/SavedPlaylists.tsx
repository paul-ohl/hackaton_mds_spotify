'use client';

import { usePlaylist } from '../context/PlaylistContext';
import { useEffect } from 'react';

export default function SavedPlaylists() {
  const { playlists, removePlaylist, refreshPlaylists, isLoading } = usePlaylist();

  useEffect(() => {
    refreshPlaylists();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Playlists Sauvegardées</h2>
        <button
          onClick={() => refreshPlaylists()}
          className="btn-accent px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Rafraîchir'}
        </button>
      </div>

      {playlists.length === 0 ? (
        <p className="text-secondary text-center py-8">Aucune playlist sauvegardée</p>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="card rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{playlist.name}</h3>
                  <p className="text-secondary text-sm">ID: {playlist.id}</p>
                  <p className="text-secondary text-sm">
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
                    {playlist.tracks.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center py-2 border-b last:border-b-0"
                      >
                        <img
                          src={item.track.album.images[0].url}
                          alt={item.track.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="ml-3">
                          <p className="font-medium">{item.track.name}</p>
                          <p className="text-secondary text-sm">
                            Ajouté le: {new Date(item.added_at).toLocaleDateString('fr-FR')}
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
