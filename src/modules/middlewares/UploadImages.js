import axios from 'axios'
import fs  from 'fs';
import FormData from 'form-data';
import rfs from 'recursive-fs';
import basePathConverter from "base-path-converter";
import got from 'got';
import { config } from '../../config/config.js';




const testAuthentication = async () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  try {
        const response = await axios
            .get(url, {
                headers: {
                    'pinata_api_key': config.pinataApiKey,
                    'pinata_secret_api_key': config.pinataSecretApiKey
                }
            })
            console.log("response == ",response);
  } 
    catch (error) { 
      console.log(error);
  }
};

const getTokenmetaData = async () => {
var config = {
  method: 'get',
  url: 'https://gateway.pinata.cloud/ipfs/QmcCoEXqgTdbkm1kELe4UiM9ioCALBtJm9BpUdXH1ZRtkF/6.json',
  headers: { 
    'pinata_api_key': config.pinataApiKey,
    'pinata_secret_api_key': config.pinataSecretApiKey
  }

};

const res = await axios(config);
console.log(res);

}

const uploadNfts = async (imagePath) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    const path = imagePath
    data.append('file', fs.createReadStream(path));
    try {
        const response = await axios.post(url, data,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                    'pinata_api_key': config.pinataApiKey,
                    'pinata_secret_api_key': config.pinataSecretApiKey
                }
            }
        );
        return  response.data.IpfsHash
    } catch (error) {
       console.log(error);
    }
};

const uploadJason = async () => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //we gather a local file from the API for this example, but you can gather the file from anywhere
    let data = new FormData();
    data.append('file', fs.createReadStream('/home/troon60/Ethereum-StoreFront/zain.png'));

    try {
        const response = await axios.post(url, data,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                    'pinata_api_key': config.pinataApiKey,
                    'pinata_secret_api_key': config.pinataSecretApiKey
                }
            }
        );
        // console.log("Responce == ",response);
    } catch (error) {
       console.log(error);
    }
};




// Upload directory 
const pinDirectoryToPinata = async (req,res,next) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const {path} = req.body
  // const src = "RELATIVE PATH TO DIRECTORY TO UPLOAD";
  const src =  path
  // const src =  req.body
  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }    
    const response = await got(url, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        'pinata_api_key': config.pinataApiKey,
        'pinata_secret_api_key': config.pinataSecretApiKey
      },
      body: data
  })		
		.on('uploadProgress', progress => {
			console.log(progress);
		});

	console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
};

const pinJasonDirectoryToPinata = async (req,res,next) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const {path} = req.body
  // const src = "RELATIVE PATH TO DIRECTORY TO UPLOAD";
  const src =  path
  // const src =  req.body
  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }    
    const response = await got(url, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        'pinata_api_key': config.pinataApiKey,
        'pinata_secret_api_key': config.pinataSecretApiKey
      },
      body: data
  })		
		.on('uploadProgress', progress => {
			console.log(progress);
		});

	console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
};

export {getTokenmetaData ,uploadNfts,uploadJason,testAuthentication,pinDirectoryToPinata,pinJasonDirectoryToPinata}