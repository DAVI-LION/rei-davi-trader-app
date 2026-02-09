import fs from "fs";
import path from "path";

type Sinal = {
  ativo: string;
  direcao: string;
  preco: number;
  horario: string;
};

type DadosSistema = {
  status: string;
  ultimaAtualizacao: string;
  sinais: Sinal[];
};

export default function Home() {
  const filePath = path.join(process.cwd(), "data", "signals.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const dados: DadosSistema = JSON.parse(jsonData);

  return (
    <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>REI DAVI TRADER</h1>

      <p>
        <strong>Status do sistema:</strong>{" "}
        <span style={{ color: "green" }}>{dados.status}</span>
      </p>

      <p>
        <strong>Última atualização:</strong> {dados.ultimaAtualizacao}
      </p>

      <hr />

      <h2>Sinais Ativos</h2>

      {dados.sinais.length === 0 && <p>Nenhum sinal disponível.</p>}

      <ul>
        {dados.sinais.map((sinal, index) => (
          <li key={index} style={{ marginBottom: "12px" }}>
            <strong>{sinal.ativo}</strong> — {sinal.direcao} <br />
            Preço: {sinal.preco} <br />
            Horário: {sinal.horario}
          </li>
        ))}
      </ul>
    </main>
  );
}
