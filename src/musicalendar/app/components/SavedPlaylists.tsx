'use client';

import { usePlaylist } from '../context/PlaylistContext';

export default function SavedPlaylists() {
  const { playlists, removePlaylist, refreshPlaylists } = usePlaylist();

  return (
    <div className="mt-8 max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Playlists Sauvegardées</h2>
        <button
          onClick={() => refreshPlaylists()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Rafraîchir
        </button>
      </div>

      {playlists.length === 0 ? (
        <p className="text-gray-500">Aucune playlist sauvegardée</p>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{playlist.name}</h3>
                <p className="text-sm text-gray-500">ID: {playlist.id}</p>
                <p className="text-sm text-gray-500">
                  Dernière mise à jour:{' '}
                  {new Date(playlist.lastFetched).toLocaleString('fr-FR')}
                </p>
                {playlist.tracks && (
                  <p className="text-sm text-gray-500">
                    Nombre de pistes: {playlist.tracks.items.length}
                  </p>
                )}
              </div>
              <button
                onClick={() => removePlaylist(playlist.id)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
