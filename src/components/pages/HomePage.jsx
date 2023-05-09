import React ,{useState} from 'react'
import { Web3Storage } from 'web3.storage'
import { Input } from '@mui/material';


import '../../styles/Homepage.css'


export default function HomePage(props){
    const [selectedFile, setSelectedFile] = useState(null);




    const handleFileChange = (event) => {
      setSelectedFile(event.target.files);
    };

    const handleSubmit = async (event) => {
      try{
        event.preventDefault();
        console.log(selectedFile);
        const files = selectedFile
       // const blob = new Blob([file], { type: file.type });
        const results = await storeWithProgress(files)
        if(results){
          console.log('result of uploaded file')
          console.log(results)
        }
      }catch(err){
        console.log(err)
      }
      
      };


      async function storeWithProgress (files) {
        console.log('print the files')
        console.log(files)
        // show the root cid as soon as it's ready
        const onRootCidReady = cid => {
          console.log('uploading files with cid:', cid)
        }
      
        // when each chunk is stored, update the percentage complete and display
        const totalSize = files[0].size
        let uploaded = 0
      
        const onStoredChunk = size => {
          uploaded += size
          const pct = 100 * (uploaded / totalSize)
          console.log(`Uploading... ${pct.toFixed(2)}% complete`)
        }
      
        // makeStorageClient returns an authorized web3.storage client instance
        const client = makeStorageClient()
      
        // client.put will invoke our callbacks during the upload
        // and return the root cid when the upload completes
        return client.put(files,{onStoredChunk,onRootCidReady ,name:files[0].name})
      }


    return (<div className='container'>

      <form className='form' onSubmit={handleSubmit}>
        <h1> Upload File</h1>
      <Input className='upload' type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>

        
    </div>)

}




function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'
return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxMEE3QzRlRDgzZTg3MjNBNmUzNUYwNTYxODE2Yzg1NDUxRTgyQTMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM2Mjk4MDI1NjAsIm5hbWUiOiJzZWMtZmlsZXMifQ.NYfbIR-3ORFlJodn1TRMrdfX8MADr8Y1e9QcnGWiAZE"
  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}