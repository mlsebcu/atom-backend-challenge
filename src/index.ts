import * as functions from "firebase-functions";
import * as dotenv from "dotenv";

dotenv.config();

import app from "./app";

export const api = functions.https.onRequest(app);
