import { useState } from "react";
import Select from "@/components/select/select";
export default function ExemploSelect() {
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  return (
    <div style={{ width: "350px" }}>
      <Select
        label="TIPO"
        placeholder="Todos os Tipos"
        valor={tipoSelecionado}
        onChange={(novoValor) => setTipoSelecionado(novoValor)}
        opcoes={[
          { valor: "todos", texto: "Todos os Tipos" },
          { valor: "web", texto: "Teste Web" },
          { valor: "api", texto: "Teste de API" },
        ]}
      />
    </div>
  );
}