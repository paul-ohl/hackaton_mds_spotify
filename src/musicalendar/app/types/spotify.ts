export interface SpotifyTrack {
  added_at: string;
  added_by: {
    id: string;
  };
  track: {
    name: string;
    album: {
      images: {
        url: string;
        height: number;
        width: number;
      }[];
    };
  };
}

export interface SpotifyPlaylistResponse {
  href: string;
  items: SpotifyTrack[];
}

export interface SavedPlaylist {
  id: string;
  name: string;
  lastFetched: string;
  tracks?: SpotifyPlaylistResponse;
}

export interface PlaylistContextType {
  playlists: SavedPlaylist[];
  isLoading: boolean;
  addPlaylist: (playlistId: string) => Promise<boolean>;
  removePlaylist: (playlistId: string) => void;
  refreshPlaylists: () => Promise<void>;
}
