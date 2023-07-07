import algosdk from "algosdk";
import { algodClient } from ".";
import config, { has } from 'config';

export const txMintNode = async (
  id: string,
  cid: string,
  url: string,
  reserveAddress: string,
  node: WarNode
): Promise<algosdk.Transaction> => {
  // Construct the transaction
  const params = await algodClient.getTransactionParams().do();
  // comment out the next two lines to use suggested fee
  params.fee = algosdk.ALGORAND_MIN_TX_FEE;
  params.flatFee = true;
  const enc = new TextEncoder();
  const note = {
    name: config.get('collection.name') + id,
    description: '',
    image: `ipfs://${cid}`,
    decimals: 0,
    unitName: config.get('collection.unitName') + id,
    image_integrity: '',
    image_mimetype: config.get('collection.image_mimetype'),
    properties: {
      // [TODO]
      // Palette: palette,
      // Vehicle: vehicle,
      // Extra: extra,
    }, // Here you can add traits info for rarity!
  };

  const encNote: Uint8Array = enc.encode(JSON.stringify(note));
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: config.get('walletHeroes.addr'),
    total: 1,
    decimals: 0,
    assetName: config.get('collection.name') + id,
    unitName: config.get('collection.unitName') + id,
    assetURL: url,
    assetMetadataHash: '',
    defaultFrozen: false,
    // freeze: config.get('walletHeroes.addr'),
    manager: config.get('walletHeroes.addr'),
    // clawback: config.get('walletHeroes.addr'),
    reserve: reserveAddress,
    note: encNote,
    suggestedParams: params,
  });

  return txn;
};

export const txConfigNode = async (
  assetID: number,
  asset: Record<string, any>,
  cid: string,
  reserveAddress: string,
  node: WarNode
): Promise<algosdk.Transaction> => {
  const note = {
    name: asset.name,
    description: '',
    image: `ipfs://${cid}`,
    decimals: asset.decimals,
    unitName: asset['unit-name'],
    image_integrity: '',
    image_mimetype: config.get('collection.image_mimetype'),
    properties: {
      X: node.x,
      Y: node.y,
      Color: node.color,
      Message: node.message,
    },
  };

  const enc = new TextEncoder();
  const encNote: Uint8Array = enc.encode(JSON.stringify(note));

  const params = await algodClient.getTransactionParams().do();
  params.fee = 1000;
  params.flatFee = true;

  // Note that the change has to come from the existing manager
  const txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
    from: config.get('wallet.addr'),
    note: encNote,
    suggestedParams: params,
    assetIndex: assetID,
    // freeze: config.get('walletHeroes.addr'),
    manager: config.get('wallet.addr'),
    // clawback: config.get('walletHeroes.addr'),
    reserve: reserveAddress,
    strictEmptyAddressChecking: false,
  });

  return txn;
}
