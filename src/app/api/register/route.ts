// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import accessSpreadsheet from "../../lib/sheets";

export async function POST(req: NextRequest) {
  const { nombre, celular } = await req.json();

  if (!nombre || !celular) {
    return NextResponse.json(
      { message: "El nombre y celular son requeridos" },
      { status: 400 }
    );
  }

  try {
    const sheet = await accessSpreadsheet();
    const rows = await sheet.getRows();

    // if (rows.length === 0) {
    //   return NextResponse.json(
    //     { message: "No hay participantes" },
    //     { status: 404 }
    //   );
    // }

    if (rows.length === 99) {
      return NextResponse.json(
        { message: "Todos los números han sido elegidos" },
        { status: 404 }
      );
    }

    const nombreExistente = rows.some(
      (row: any) => row.get("Nombre") === nombre.toString()
    );

    if (nombreExistente) {
      return NextResponse.json(
        { message: "El Nombre ya ha sido elegido" },
        { status: 400 }
      );
    }

    await sheet.addRow({ Nombre: nombre, Celular: celular });
    return NextResponse.json({ message: "Registro exitoso" }, { status: 200 });
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

export function GET() {
  return NextResponse.json({ message: "Método no permitido" }, { status: 405 });
}
