import { useEffect } from "react";
import { useDispatch } from "react-redux";
import catchAsyncError from "../src/api/catchError";
import { updateNotification } from "../src/store/notificaton";
import { useQuery } from "@tanstack/react-query";
import client from "../src/api/client";
import { AudioData, PlayList } from "../src/@types/audio";
import { getFromAsyncStorage, keys } from "../src/utils/asyncStorage";


const fetchLatest = async () : Promise<AudioData[]> =>{
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
      console.log(query)
    }, [query.error, dispatch]);
    return query
}


const fetchRecommended = async (): Promise<AudioData[]> =>{
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
      console.log(query)
    }, [query.error, dispatch]);
    return query
}

const fetchPlaylist = async (): Promise<PlayList[]> =>{
  const token = await getFromAsyncStorage(keys.Auth_TOKEN);
  const {data} = await client.get('/playlist/by-profile', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  console.log(data)
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
      console.log(query)
    }, [query.error, dispatch]);
    return query
}