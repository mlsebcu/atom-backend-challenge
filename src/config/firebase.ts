import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { ServiceAccount } from "firebase-admin";

dotenv.config();

class FirebaseApp {
  private static instance: admin.app.App | null = null;

  static getInstance(): admin.app.App {
    if (!FirebaseApp.instance) {
      const serviceAccountPath = process.env["SERVICE_ACCOUNT_PATH"];

      // En local usa serviceAccount.json, en Cloud Functions usa ADC
      if (serviceAccountPath) {
        const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
        if (!fs.existsSync(resolvedPath)) {
          throw new Error(
            `serviceAccount.json no encontrado en: ${resolvedPath}`,
          );
        }
        const serviceAccount = require(resolvedPath) as ServiceAccount;
        FirebaseApp.instance = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } else {
        // Cloud Functions — usa credenciales del entorno automáticamente
        FirebaseApp.instance = admin.initializeApp();
      }
    }
    return FirebaseApp.instance;
  }

  static getFirestore(): admin.firestore.Firestore {
    FirebaseApp.getInstance();
    return admin.firestore();
  }
}

export default FirebaseApp;
