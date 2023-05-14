import React ,{useContext, useEffect, useState} from 'react'
import { Web3Storage } from 'web3.storage'
import { Input } from '@mui/material';
import '../../styles/Homepage.css'
import GlobalContext from '../../context/Context';
import {ethers} from 'ethers'
import ipfsContractabi from '../../contracts/ipfsContractABI.json'


export default function ViewFiles(props){
    const ContractAddress = "0x750E6268685fEf6147835280Bff5B5F9bFa924Fa";


    const [data,setData] = useState([])
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const ipfsContract = new ethers.Contract(ContractAddress, ipfsContractabi, provider);

            const result = await ipfsContract.viewTokens()
            if(result){
                console.log(result)
                setData(result)
                setLoading(false)

            }
    
        };
    
        fetchData();
      }, []);

    if(data.length > 0){
        return(<div className='container'>
        <table>
          <thead>
        <tr>
        <th>Index</th>
        <th>Owner</th>
        <th>File Hash</th>
        <th>File Name</th>
        <th>View File</th>
        </tr>
        </thead>
          <tbody>
            {data.map((record,index) => (
            <tr key={index}>
                <td>{index}</td>

                <td>{record.owner}</td>
                <td>{record.data}</td>
                <td>{record.fileName}</td>
                <td><button onClick={()=>window.open(`https://${record.data}.ipfs.w3s.link/${record.fileName}`)}>OpenFile</button></td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>)
    }else{
        return <h1>loading</h1>
    }
   

}