export interface SpotifyResponse {
  album: {
    name: string;
    cover: string;
    url: string;
  };
  artists: Artist[];
  name: string;
  url: string;
  progress: number;
  duration: number;
  explicit: boolean;
}

type Artist = {
  name: string;
  url: string;
};
