'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SpotifyPlaylistResponse } from '../types/spotify';

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export default function PlaylistForm() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [tracks, setTracks] = useState<SpotifyPlaylistResponse | null>(null);
  const [error, setError] = useState('');

  const extractPlaylistId = (url: string) => {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTracks(null);

    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      setError('URL de playlist invalide');
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la playlist');
      }

      const data = await response.json();
      setTracks(data);

      console.log('Nombre de pistes:', data.items.length);
      console.log('ID de la playlist:', playlistId);
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
                  Entrez l&apos;url de votre playlist ici
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                      placeholder="URL de la playlist Spotify"
                      value={playlistUrl}
                      onChange={(e) => setPlaylistUrl(e.target.value)}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      URL de la playlist Spotify
                    </label>
                  </div>
                  <div className="relative">
                    <button className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      Charger la playlist
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="mt-8 text-center text-red-500">{error}</div>}

      {tracks && (
        <div className="mt-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {tracks.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={item.track.album.images[0].url}
                    alt={item.track.name}
                    width={200}
                    height={200}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {item.track.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ajouté le:{' '}
                    {new Date(item.added_at).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Par : {item.added_by.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
