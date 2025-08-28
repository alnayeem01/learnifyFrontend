import { categoriesTypes } from "../utils/Categories";


export interface AudioData {
    id: string,
    title: string;
    about: string;
    category: categoriesTypes;
    file: string;
    poster?: {
        url : string,
        id: string
    },
    owner: {
        name: string;
        id: string;
    }
};

export interface PlayList {
    id: string;
    title: string;
    itemsCount: number;
    visibility: "public" | "private";
}

export type  historyAudio ={
      audioId: string,
      date: string,
      id: string,
      title: string
    }

export interface History{
    id:string,
    audios: historyAudio[]
  }
export interface RecentlyPlayed{
    about: string,
    category : string,
    date: string,
    file:string,
    id: string,
    owner:{
        name: string,
        id: string
    },
    poster: string,
    progress: number,
    title: string
}
