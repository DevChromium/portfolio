export interface SongData {
    is_playing: boolean,
    song: string,
    artists: string,
    album: string,
    albumUrl: string,
    albumImageUrl: string,
    songUrl: string,
    progress_ms: number,
    duration_ms: number
}