import { useEffect } from "react";
import { useDispatch } from "react-redux";
import catchAsyncError from "../src/api/catchError";
import { updateNotification } from "../src/store/notificaton";
import { useQuery } from "@tanstack/react-query";
import {getClient} from "../src/api/client";
import { AudioData, History, PlayList, } from "../src/@types/audio";



const fetchLatest = async () : Promise<AudioData[]> =>{
  const client = await getClient()
  const {data} = await client.get('/audio/latest')
  return data.audios
}

export const useFetchLatestAudios = () =>{
    const dispatch = useDispatch()
      const query =  useQuery({
      queryKey: ['latest-uploads'],
      queryFn: () => fetchLatest(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
        dispatch(updateNotification({ message: errorMessage, type: 'error' }));
      }
    }, [query.error, dispatch]);
    return query
}


const fetchRecommended = async (): Promise<AudioData[]> =>{
  const client = await getClient()
  const {data} = await client.get('/profile/recommended')
  return data.audios
}

export const useFetchRecommendedAudios = () =>{
    const dispatch = useDispatch()
      const query =  useQuery({
      queryKey: ['recommened-audios'],
      queryFn: () => fetchRecommended(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
        dispatch(updateNotification({ message: errorMessage, type: 'error' }));
      }
    }, [query.error, dispatch]);
    return query
}

const fetchPlaylist = async (): Promise<PlayList[]> =>{
  const client = await getClient()
  const {data} = await client.get('/playlist/by-profile')
  return data.playlist
}

export const useFetchPlaylist = () =>{
    const dispatch = useDispatch()
      const query =  useQuery({
      queryKey: ['playlist'],
      queryFn: () => fetchPlaylist(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
        dispatch(updateNotification({ message: errorMessage, type: 'error' }));
      }
    }, [query.error, dispatch]);
    return query
}


const fetchUploadsByProfile = async (): Promise<AudioData[]> =>{
  const client = await getClient()
  const {data} = await client.get('/profile/uploads')
  return data.audio
}

export const useFetchUploadsByProfile = () =>{
    const dispatch = useDispatch()
      const query =  useQuery({
      queryKey: ['uploads-by-profile'],
      queryFn: () => fetchUploadsByProfile(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
        dispatch(updateNotification({ message: errorMessage, type: 'error' }));
      }
    }, [query.error, dispatch]);
    return query
}


const fetchFavourite = async (): Promise<AudioData[]> =>{
  const client = await getClient()
  const {data} = await client.get('/favourite/')
  return data.audios
}

export const useFetchFavourites = () =>{
    const dispatch = useDispatch()
      const query =  useQuery({
      queryKey: ['favourite'],
      queryFn: () => fetchFavourite(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
        dispatch(updateNotification({ message: errorMessage, type: 'error' }));
      }
    }, [query.error, dispatch]);
    return query
}


const fetchHistory = async ():Promise<History[]> =>{
  const client = await getClient()
  const {data} = await client.get('/history/')
  return data.histories
}

export const useFetchHistory = () =>{

      const query =  useQuery({
      queryKey: ['histories'],
      queryFn: () => fetchHistory(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
      }
    }, [query.error]);
    return query
}

const fetchRecentlyPlayed = async ():Promise<AudioData[]> =>{
  const client = await getClient()
  const {data} = await client.get('/history/recently-played')
  return data.audios
}

export const useFetchRecentlyPlayed = () =>{

      const query =  useQuery({
      queryKey: ['recently-played'],
      queryFn: () => fetchRecentlyPlayed(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
      }
    }, [query.error]);
    return query
}

const fetchRecommendedPlaylist = async ():Promise<PlayList[]> =>{
  const client = await getClient()
  const {data} = await client.get('profile/auto-generated-playlist')
  return data.playlist
}

export const useFetchRecommendedPlaylist = () =>{

      const query =  useQuery({
      queryKey: ['recommended-playlist'],
      queryFn: () => fetchRecommendedPlaylist(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
      }
    }, [query.error]);
    return query
}
const fetchIsFavourite = async (id: string):Promise<boolean> =>{
  const client = await getClient()
  const {data} = await client.get('favourite/is-fav?audioId='+id)
  return Boolean(data.result)
}

export const useFetchIsFavourite = (id: string) =>{ // because each favourite will be unique we are accepting id here .
      const query =  useQuery({
      queryKey: ['favourite', id],
      queryFn: () => fetchIsFavourite(id),
      enabled: id ? true : false
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
      }
    }, [query.error]);
    return query
}
