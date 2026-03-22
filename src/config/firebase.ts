import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount = require('../../serviceAccount.json') as ServiceAccount;

class FirebaseApp {
  private static instance: admin.app.App | null = null;

  static getInstance(): admin.app.App {
    if (!FirebaseApp.instance) {
      FirebaseApp.instance = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
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