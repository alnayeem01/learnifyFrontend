import { useEffect } from "react";
import { useDispatch } from "react-redux";
import catchAsyncError from "../src/api/catchError";
import { updateNotification } from "../src/store/notificaton";
import { useQuery } from "@tanstack/react-query";
import {getClient} from "../src/api/client";
import { AudioData, History, PlayList } from "../src/@types/audio";
import { getFromAsyncStorage, keys } from "../src/utils/asyncStorage";


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
      queryKey: ['history'],
      queryFn: () => fetchHistory(),
    })
     useEffect(() => {
      if (query.error) {
        const errorMessage = catchAsyncError(query.error);
      }
    }, [query.error]);
    return query
}