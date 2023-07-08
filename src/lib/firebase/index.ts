import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, child, get, getDatabase, ref, set } from "firebase/database";

export class DatabaseManager {
  private static instance: DatabaseManager;

  private db: Database | undefined;
  private app: FirebaseApp | undefined;

  private constructor() {
    this.init();
  }

  /**
   * Singleton instance
   */
  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }

    return DatabaseManager.instance;
  }

  /**
   * Initialize Database connection
   */
  private init(): Database {
    if (!this.db) {
      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      }

      // Initialize Firebase
      this.app = initializeApp(firebaseConfig);
      // Initialize Realtime Database and get a reference to the service
      this.db = getDatabase(this.app);
      console.log('Database connection');
    } 

    return this.db;
  }


  public writeNodeData(node: WarNode): boolean {
    if (!this.db) { return false }

    set(ref(this.db, `node/${node.assetID}`), {
      ...node
    }).catch((error) => {
      // [TODO] log error
      return false;
    });

    return true;
  }

  public async getNodeData(assetID: string): Promise<WarNode | null> {
    if (!this.db) { return null }

    const dbRef = ref(this.db);
    const node = await get(child(dbRef, `node/${assetID}`)).then((node) => {
      if (node.exists()) {
        return node.val() as WarNode;
      } else {
        console.log("No data available");
        return null;
      }
    }).catch((error) => {
      return null;
    });
  
    return node;
  }

  public async getAllNodesData(): Promise<WarNode[] | null> {
    if (!this.db) { return null }

    const dbRef = ref(this.db);
    const node = await get(child(dbRef, `node/`)).then((node) => {
      if (node.exists()) {
        return node.val() as WarNode[];
      } else {
        console.log("No data available");
        return null;
      }
    }).catch((error) => {
      return null;
    });
  
    return node;
  }
}
