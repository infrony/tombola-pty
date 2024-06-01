// src/app/lib/sheets.ts
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import * as dotenv from "dotenv";

dotenv.config();

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!;
const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

const accessSpreadsheet = async () => {
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
};

export default accessSpreadsheet;
