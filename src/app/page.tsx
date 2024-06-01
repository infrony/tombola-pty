// src/app/page.tsx
"use client";

import { useState } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, numero }),
    });

    const data = await res.json();
    setMensaje(data.message);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4">Tómbola PTY</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre y Apellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              // text un black color
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Número (1-99)"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Registrar
          </button>
        </form>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
      </div>
      <footer className="w-full text-center mt-8">
        <p className="text-gray-500">
          Hecho con <span className="text-red-500">❤️</span> en Panamá. Por <a href="https://infrony.dev" className="text-blue-500 hover:underline">infrony.dev</a>
        </p>
      </footer>
    </main>
  );
}
