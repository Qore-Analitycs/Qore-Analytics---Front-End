
import { useState } from "react";
import ModalUsuario from "../components/usuario/ModalUsuario";

export default function Home() {

  // Controla se o modal está aberto.
  const [modalAberto, setModalAberto] = useState(true);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E99500",
      }}
    >

      {/* Componente de cadastro de usuário */}
      <ModalUsuario
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
      />

      {/* Botão que permite abrir novamente */}
      {!modalAberto && (
        <button
          onClick={() => setModalAberto(true)}
          style={{
            padding: "12px 24px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Novo usuário
        </button>
      )}

    </main>
  );
}
