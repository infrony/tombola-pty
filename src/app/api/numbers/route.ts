import { NextResponse } from "next/server";
import accessSpreadsheet from "../../lib/sheets";

export async function GET() {
  try {
    const sheet = await accessSpreadsheet();
    const rows = await sheet.getRows();

    // Crear un array de 99 elementos, todos inicialmente disponibles (true)
    const numbers = Array(99).fill(true);

    // Marcar los números que ya han sido elegidos (false)
    rows.forEach((row: any) => {
      const numero = parseInt(row.get("Numero"));
      if (!isNaN(numero) && numero >= 1 && numero <= 99) {
        numbers[numero - 1] = false;
      }
    });

    return NextResponse.json({ numbers }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error al acceder a la hoja de cálculo",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
