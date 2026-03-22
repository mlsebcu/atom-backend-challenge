import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

class FirebaseApp {
  private static instance: admin.app.App | null = null;

  static getInstance(): admin.app.App {
    if (!FirebaseApp.instance) {
      FirebaseApp.instance = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    return FirebaseApp.instance;
  }

  static getFirestore(): admin.firestore.Firestore {
    FirebaseApp.getInstance();
    return admin.firestore();
  }
}

export default FirebaseApp;
