import Input from "@/components/input/input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function ExemploInputs() {
  return (
    <div style={{ width: "450px", display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* 1. Imagem 1: Input COM ícone na frente */}
      <Input
        label="BUSCA RÁPIDA"
        placeholder="Buscar..."
        icone={faMagnifyingGlass}
      />
      {/* 2. Imagem 2: Input SEM ícone (basta não passar a prop icone ou usar temIcone={false}) */}
      <Input
        label="Url da pull request"
        placeholder="https://github.com/exemple/Pull...."
        temIcone={false}
      />
    </div>
  );
}