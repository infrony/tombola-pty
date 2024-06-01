// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setLoading(true);
    setDisabled(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, numero }),
    });

    const data = await res.json();
    setMensaje(data.message);
    setLoading(false);
    setDisabled(false);

    if (res.status === 200) {
      setNombre('');
      setNumero('');
    }
  };

  // Fecha y hora del sorteo
  useEffect(() => {
    const drawDate = new Date(process.env.NEXT_PUBLIC_DRAW_DATE as string);
    if (isNaN(drawDate.getTime())) {
      console.error('Fecha inválida:', process.env.NEXT_PUBLIC_DRAW_DATE);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = drawDate.getTime() - now.getTime();
      if (timeDifference <= 0) {
        clearInterval(interval);
        fetchWinner();
      } else {
        setTimeLeft(calculateTimeLeft(timeDifference));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchWinner = async () => {
    const res = await fetch('/api/winner');
    const data = await res.json();
    setWinner(data.winner);
  };

  const calculateTimeLeft = (timeDifference: number) => {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const drawDate = new Date(process.env.NEXT_PUBLIC_DRAW_DATE as string);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Tómbola PTY</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre y Apellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={disabled}
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
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${disabled ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
        <div className="mt-8 text-center">
          <h2 className="text-2xl mb-4">Tiempo restante hasta el sorteo:</h2>
          <div className="flex justify-center space-x-4">
            <div>
              <div className="text-5xl font-bold">{timeLeft.days}</div>
              <div className="text-lg">DIAS</div>
            </div>
            <div>
              <div className="text-5xl font-bold">{timeLeft.hours}</div>
              <div className="text-lg">HORAS</div>
            </div>
            <div>
              <div className="text-5xl font-bold">{timeLeft.minutes}</div>
              <div className="text-lg">MINUTOS</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-500">{timeLeft.seconds}</div>
              <div className="text-lg">SEGUNDOS</div>
            </div>
          </div>
          <p className="mt-4 text-lg">
            <span className="font-bold">Fecha del sorteo:</span> {drawDate.toLocaleString(
              'es-PA',
              {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }
            )}
          </p>
          {winner && (
            <div className="mt-4">
              <h2 className="text-2xl">Ganador:</h2>
              <p className="text-xl font-bold">{winner}</p>
            </div>
          )}
        </div>
      </div>
      <footer className="w-full text-center mt-8">
        <p className="text-gray-500">
          Hecho con <span className="text-red-500">❤️</span> en Panamá. Por <a href="https://infrony.dev" className="text-blue-500 hover:underline">infrony.dev</a>
        </p>
      </footer>
    </main>
  );
}
