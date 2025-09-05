import { FC, useState } from 'react'
import  { getClient } from '../api/client';
import { mapRange } from '../utils/math';
import AudioForm from '../components/form/AudioForm';

interface Props { }

const Upload: FC<Props> = props => {
  const [uploadProg, setUploadProg] = useState<number>(0)
  const [busy, setBusy] = useState(false)
  const handleUpload = async (formdata: FormData) => {
    try {
      setBusy(true)
      const client = await getClient({'Content-Type': 'multipart/form-data;'});
      const data = await client.post('/audio/create', formdata,{
        //using the onUploadProgress function from axios to calcoulate the percerntage of progress 
        onUploadProgress(progressEvent) {
          // util function for calculating progress
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 0,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded
          });
          //when upload reaches 100 we reset the form 
          if(uploaded >=100){
            setBusy(false)
          }
          setUploadProg(Math.floor(uploaded))
        },
      });
      setBusy(false)
    } catch (error: any) {
      
    }
    setBusy(false)
  };

  return <AudioForm progress={uploadProg}  busy={busy}  onSubmit={handleUpload} />
};


export default Upload;
