import { NextRequest, NextResponse } from "next/server";
import accessSpreadsheet from "../../lib/sheets";

export async function GET() {
  try {
    const sheet = await accessSpreadsheet();
    const rows = await sheet.getCellsInRange("A2:B100");

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No hay participantes" },
        { status: 404 }
      );
    }

    if (rows.length === 99) {
      return NextResponse.json(
        { message: "Todos los números han sido elegidos" },
        { status: 404 }
      );
    }

    const randomIndex = Math.floor(Math.random() * rows.length);
    const winnerRow = rows[randomIndex];
    const winner = winnerRow[0] + " con el Número: (" + winnerRow[1] + ")";

    return NextResponse.json({ winner }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error al acceder a la hoja de cálculo",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
