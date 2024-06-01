import { NextResponse } from "next/server";
import accessSpreadsheet from "../../lib/sheets";

export async function GET() {
  try {
    const sheet = await accessSpreadsheet();
    const rows = await sheet.getRows();

    const ganadorExistente = rows.find(
      (row: any) => row.get("Ganador") === "TRUE"
    );
    console.log(sheet.headerValues);
    if (ganadorExistente) {
      return NextResponse.json(
        {
          winner: `${ganadorExistente.get(
            "Nombre"
          )} con el Número: (${ganadorExistente.get("Numero")})`,
        },
        { status: 200 }
      );
    }

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
    winnerRow.set("Ganador", "true");
    await winnerRow.save();

    const winner =
      winnerRow.get("Nombre") +
      " con el Número: (" +
      winnerRow.get("Numero") +
      ")";

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
