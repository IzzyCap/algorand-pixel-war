import algosdk from "algosdk";
import { algodClient } from ".";

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
    image_mimetype: 'image/png',
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
    from: process.env.WALLET_ADDR as string,
    note: encNote,
    suggestedParams: params,
    assetIndex: assetID,
    // freeze: config.get('walletHeroes.addr'),
    manager: process.env.WALLET_ADDR as string,
    // clawback: config.get('walletHeroes.addr'),
    reserve: reserveAddress,
    strictEmptyAddressChecking: false,
  });

  return txn;
}
