import { sanitiseURL } from './util';
export enum SDType {
  SINGLE = "Single",
  DOUBLE = "Double"
}

const emptySong:Song = {
  name: "", 
  version: "", 
  ssc: false, 
  title: "", 
  titletranslit: "", 
  song_length: 0, 
  per_chart: false, 
  levels: {},
  chart: [
  ]
};

export const fetchSong = async (songName: string) : Promise<Song> => {
  const url = sanitiseURL(`/src/assets/data/${songName}.json`);
  return await (await fetch(url)).json().catch( err =>
    console.error(`Failed to load ${songName}.json`)
  );
}
// export const fetchSong = (songName):Promise<Song> => import(`/src/assets/data/${songName}.json`)

type Level = {
  beginner?: number;
  easy?: number;
  medium?: number;
  hard?: number;
  challenge?: number;
}

export type Song = {
  name: string;
  version: string;
  ssc: boolean;
  title: string;
  titletranslit: string;
  song_length: number;
  per_chart: boolean;
  levels: {
    single?: Level;
    double?: Level;
  };
  chart: Array<{
    dominant_bpm: number;
    true_min: number;
    true_max: number;
    bpm_range: string;
    bpms: Array<{
      st: number;
      ed: number;
      val: number;
    }>;
    stops: Array<{
      st: number;
      dur: number;
      beats: number;
    }>
  }>
}; 
