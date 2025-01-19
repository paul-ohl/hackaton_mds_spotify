'use client';

import { usePlaylist } from '../context/PlaylistContext';
import { useEffect } from 'react';

export default function SavedPlaylists() {
  const { playlists, removePlaylist, refreshPlaylists, isLoading } =
    usePlaylist();

  // Fetch playlists on component mount
  useEffect(() => {
    refreshPlaylists();
  }, []);

  return (
    <div className="mt-8 max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Playlists Sauvegardées</h2>
        <button
          onClick={() => refreshPlaylists()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Rafraîchir'}
        </button>
      </div>

      {false && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          error
        </div>
      )}

      {playlists.length === 0 ? (
        <p className="text-gray-500">Aucune playlist sauvegardée</p>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{playlist.name}</h3>
                  <p className="text-sm text-gray-500">ID: {playlist.id}</p>
                  <p className="text-sm text-gray-500">
                    Dernière mise à jour:{' '}
                    {new Date(playlist.lastFetched).toLocaleString('fr-FR')}
                  </p>
                </div>
                <button
                  onClick={() => removePlaylist(playlist.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>

              {playlist.tracks && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">
                    Pistes ({playlist.tracks.items.length})
                  </h4>
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
                          <p className="text-sm text-gray-500">
                            Ajouté le:{' '}
                            {new Date(item.added_at).toLocaleDateString(
                              'fr-FR',
                            )}
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
