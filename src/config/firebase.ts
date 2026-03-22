import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { ServiceAccount } from "firebase-admin";

dotenv.config();

const serviceAccountPath =
  process.env["SERVICE_ACCOUNT_PATH"] ?? "./serviceAccount.json";
const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);

if (!fs.existsSync(resolvedPath)) {
  throw new Error(`serviceAccount.json no encontrado en: ${resolvedPath}`);
}

const serviceAccount = require(resolvedPath) as ServiceAccount;

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
