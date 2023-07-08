import pinataSDK, { PinataPinOptions } from '@pinata/sdk';
import algosdk from 'algosdk';
import { CID } from 'multiformats/cid';
import fs from 'fs';
import { getAsset } from '../algorand';
import multihash from 'multihashes';

const apiKey: string = process.env.PINATA_API_KEY as string;
const apiSecret: string = process.env.PINATA_API_SECRET as string;
const pinataClient = pinataSDK(apiKey, apiSecret);

export const cidToReserveURL = (cid: string) => {
  const decoded = CID.parse(cid);
  const { version } = decoded;
  const url = `template-ipfs://{ipfscid:${version}:dag-pb:reserve:sha2-256}`;
  const reserveAddress = algosdk.encodeAddress(
    Uint8Array.from(Buffer.from(decoded.multihash.digest))
  );
  return {
    cid,
    url,
    reserveAddress,
  };
};

export const ReserveURLToCid = async (assetID: number) => {
  const asset = await getAsset(assetID);
  const decodedUrl = algosdk.decodeAddress(asset.params.url);
  const encoded = multihash.encode(decodedUrl.publicKey, 'sha2-256');
  return encoded;
};

export const pinFile = async (filePath: string) => {
  const file = fs.createReadStream(filePath);
  const options: PinataPinOptions = {
    pinataMetadata: {
      name: 'Test',
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const resultFile = await pinataClient.pinFileToIPFS(file, options);
  console.log(
    'SC1: The NFT original digital asset pinned to IPFS via Pinata: ',
    resultFile
  );
  return resultFile;
};
