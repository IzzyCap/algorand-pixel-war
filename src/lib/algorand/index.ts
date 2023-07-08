import algosdk from 'algosdk';

// Uncomment this if using Purestake
const token = {
  'x-api-key': process.env.ALGORAND_TOKEN as string,
};
// Comment next line if using Purestake
// const token = config.get('algorand.token');

const port = '';
const server = process.env.ALGORAND_SERVER as string;

export const algodClient: algosdk.Algodv2 = new algosdk.Algodv2(
  token,
  server,
  port
);

export const getAccountNode = async () => {
  try {
    const myaccount = algosdk.mnemonicToSecretKey(
      process.env.WALLET_MNEMONIC as string
    );
    return myaccount;
  } catch (err) {
    console.log('err', err);
  }

  return null;
};

export const getAccountInfo = async (address: string) => {
  const clientInfo = await algodClient.accountInformation(address).do();
  return clientInfo;
};

export const getAsset = async (assetID: number) => {
  const asset = await algodClient.getAssetByID(assetID).do();
  return asset;
};
