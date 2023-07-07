import algosdk from "algosdk";
import { algodClient, getAccountNode, getAsset } from "."
import { txConfigNode, txMintNode } from "./transactions";

export class Minter {
  private static instance: Minter;

  constructor() {

  }

  /**
   * Singleton instance
   */
  public static getInstance(): Minter {
    if (!Minter.instance) {
      Minter.instance = new Minter();
    }

    return Minter.instance;
  }

  // [TODO] Refactor this function
  public async mintCharacterArc19(
    id: string,
    cid: string,
    url: string,
    reserveAddress: string,
    node: WarNode
  ): Promise<boolean> {
    try {
      // Get project wallet account
      const account = await getAccountNode() as algosdk.Account;

      // Create mint transaction
      const txnMint = await txMintNode(id, cid, url, reserveAddress, node) 
    
      // Sign the transaction
      const signedTxn = txnMint.signTxn(account.sk);
      const txId = txnMint.txID().toString();

      // Submit the transaction
      await algodClient.sendRawTransaction(signedTxn).do();

      // Wait for confirmation
      const confirmedTxn = await algosdk.waitForConfirmation(
        algodClient,
        txId,
        4
      );
      // Get the completed Transaction
      console.log(
        `Transaction ${txId} confirmed in round ${confirmedTxn['confirmed-round']}\n`
      );
      
      // [TODO] Add data to DB

      return true;
    }  catch (error) {
      throw new Error('Unable to mint Character');
    }
  }

  public async configNodeArc19(
    assetID: number,
    cid: string,
    reserveAddress: string,
    node: WarNode
  ) {
    try {
      // Get project wallet account
      const account = await getAccountNode() as algosdk.Account;

      const asset = await getAsset(assetID);

      const txnConfig = await txConfigNode(assetID, asset, cid, reserveAddress, node);
    
      // Sign the transaction
      const signedTxn = txnConfig.signTxn(account.sk);
      const txId = txnConfig.txID().toString();

      // Submit the transaction
      await algodClient.sendRawTransaction(signedTxn).do();

      // Wait for confirmation
      const confirmedTxn = await algosdk.waitForConfirmation(
        algodClient,
        txId,
        4
      );
      // Get the completed Transaction
      console.log(
        `Transaction ${txId} confirmed in round ${confirmedTxn['confirmed-round']}\n`
      );

      // [TODO] Add data to DB

      return true;
    }  catch (error) {
      console.log(error);
      throw new Error('Unable to config Character');
    }
  }
} 
