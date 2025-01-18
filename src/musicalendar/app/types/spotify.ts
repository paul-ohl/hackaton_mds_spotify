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
