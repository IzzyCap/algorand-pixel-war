import { getAccountInfo, getAsset } from "@/lib/algorand";
import { DatabaseManager } from "@/lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Recieve AssetID from POST
      const assetId: string = req.body.id;

      // Recieve Wallet addr from POST
      const walletAddr: string = req.body.addr;

      // Check If Wallet have Asset
      const accountInfo = await getAccountInfo(walletAddr);
      const asset = await accountInfo.assets.find((asset: any) => asset['asset-id'] === +assetId && asset.amount > 0 );

      // Get Node.
      // Get Singleton instance of database manager.
      const dbManager: DatabaseManager = DatabaseManager.getInstance();

      // Search Node data on db.
      const node = await dbManager.getNodeData(assetId);

      // If not have Asset return error
      if (!asset || !node) {
        // Return error
        res.status(422).json({ statusCode: 422, message: 'Node not found in your wallet' });
      } else {
        // Return Token
        res.status(200).json({ statusCode: 200, message: 'Node found.', node: node });
      }
    }catch (err) {
      res.status(501).json({ statusCode: 501, message: 'Node not found in your wallet' });
    }
  } else {
    res.status(501).json({ statusCode: 501, message: 'Not Implemented.' });
  }
}

export default handler;
