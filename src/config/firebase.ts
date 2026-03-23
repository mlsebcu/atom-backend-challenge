import * as admin from "firebase-admin";
import * as path from "path";
import * as fs from "fs";
import { ServiceAccount } from "firebase-admin";

class FirebaseApp {
  private static instance: admin.app.App | null = null;

  static getInstance(): admin.app.App {
    if (!FirebaseApp.instance) {
      const serviceAccountPath = process.env["SERVICE_ACCOUNT_PATH"];
      const isCloudFunction =
        process.env["FUNCTION_TARGET"] ?? process.env["K_SERVICE"];

      if (serviceAccountPath && !isCloudFunction) {
        // Local — usa serviceAccount.json
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
