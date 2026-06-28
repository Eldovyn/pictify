// Pinata API Keys dibaca dari .env (Vite: semua env var harus prefix VITE_)
// Setup:
//   1. Copy .env.example → .env
//   2. Isi VITE_PINATA_API_KEY dan VITE_PINATA_SECRET_API_KEY dari https://app.pinata.cloud/keys

import axios from 'axios'

const key    = import.meta.env.VITE_PINATA_API_KEY
const secret = import.meta.env.VITE_PINATA_SECRET_API_KEY

if (!key || !secret) {
  console.warn('[pinata.js] ⚠️ VITE_PINATA_API_KEY atau VITE_PINATA_SECRET_API_KEY belum diset di .env')
}

export const pinJSONToIPFS = async (json, pinataMetaDataJSON) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

  const data = JSON.stringify({
    pinataContent: json,
    pinataMetadata: pinataMetaDataJSON,
  })

  return axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then((res) => res.data.IpfsHash)
    .catch((err) => {
      console.error('[pinata.js] pinJSONToIPFS error:', err)
      throw err
    })
}

export const pinFileToIPFS = async (file, pinataMetaData) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

  const data = new FormData()
  data.append('file', file)
  data.append('pinataMetadata', JSON.stringify(pinataMetaData))

  return axios
    .post(url, data, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then((res) => res.data.IpfsHash)
    .catch((err) => {
      console.error('[pinata.js] pinFileToIPFS error:', err)
      throw err
    })
}

export const deleteFileFromIPFS = async (ipfsHash) => {
  await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`, {
    headers: {
      pinata_api_key: key,
      pinata_secret_api_key: secret,
    },
  })
}