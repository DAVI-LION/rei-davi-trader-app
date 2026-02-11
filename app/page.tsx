"use client";

import { useEffect, useState } from "react";

interface Signal {
  ativo: string;
  direcao: string;
  preco: number;
  horario: string;
}

interface SignalsData {
  ultimaAtualizacao: string;
  sinais: Signal[];
}

export default function Home() {
  const [data, setData] = useState<SignalsData | null>(null);

  async function carregarSinais() {
    try {
      const response = await fetch("/api/signals");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Erro ao carregar sinais:", error);
    }
  }

  useEffect(() => {
    carregarSinais();

    const intervalo = setInterval(() => {
      carregarSinais();
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <h1 className="text-2xl mb-4">REI DAVI TRADER</h1>
      <p>Status do sistema: <strong>operacional</strong></p>

      {data && (
        <>
          <p className="mt-4">
            Última atualização: {data.ultimaAtualizacao}
          </p>

          <h2 className="mt-6 text-xl">Sinais Ativos</h2>

          <div className="mt-4 space-y-4">
            {data.sinais.map((sinal, index) => (
              <div key={index} className="border border-zinc-700 p-4 rounded">
                <p>
                  {sinal.ativo} — {sinal.direcao}
                </p>
                <p>Preço: {sinal.preco}</p>
                <p>Horário: {sinal.horario}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
