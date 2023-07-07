import { getAccountInfo, getAsset } from "@/lib/algorand";
import { Minter } from "@/lib/algorand/minter";
import { DatabaseManager } from "@/lib/firebase";
import { cidToReserveURL, pinFile } from "@/lib/pinata";
import { NextApiRequest, NextApiResponse } from "next";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const node = req.body.node as WarNode;

    if (!node) {
      res.status(400).json({ message: 'No node sent.' });
    }

    const resultFile = await pinFile(`./public/colors/${node.color}.png`);

    // Generate url and reserveAddress from image
    const {cid, url, reserveAddress} = cidToReserveURL(resultFile.IpfsHash);

    const minter: Minter = Minter.getInstance();
    const minted = await minter.configNodeArc19(node.assetID, cid, reserveAddress, node);

    if (!minted) {
      res.status(500).json({ statusCode: 500, message: `Internal Server Error. Error updating NFT.` });
    }

    // Get Singleton instance of database manager.
    const dbManager: DatabaseManager = DatabaseManager.getInstance();
    const result = await dbManager.writeNodeData(node);

    if (result) {
      res.status(201).json({ statusCode: 201, message: `Node Updated.`, node: node });
    } else {
      res.status(500).json({ statusCode: 500, message: `Internal Server Error.` });
    }
  } else {
    // Get all Nodes.
    // Get Singleton instance of database manager.
    const dbManager: DatabaseManager = DatabaseManager.getInstance();

    // Search Hero data on db.
    const nodes = await dbManager.getAllNodesData();
    
    if (!nodes) {
      res.status(422).json({ statusCode: 422, message: 'Nodes not found.' });
    } else {
      res.status(200).json({ statusCode: 200, nodes: nodes});
    }
  }
}

export default handler;
