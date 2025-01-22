export interface SpotifyTrack {
  added_at: string;
  added_by: {
    id: string;
  };
  track: {
    id: string;
    name: string;
    album: {
      name: string;
      release_date: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
    };
    artists: {
      name: string;
    }[];
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
  selectedPlaylists: SavedPlaylist[];
  setSelectedPlaylists: (playlists: SavedPlaylist[]) => void;
}
