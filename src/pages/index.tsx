import { useState } from "react";
import ModalPerfil from "../components/perfil/ModalPerfil";

export default function Index() {

    // Controla a abertura do modal
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <>
            <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
                <h1>Qore Analytics</h1>

                <button
                    type="button"
                    onClick={() => setModalAberto(true)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#EF7900",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "600",
                        marginTop: "10px"
                    }}
                >
                    Meu perfil
                </button>
            </main>

            {/* O componente do modal que abre por cima da página */}
            <ModalPerfil
                aberto={modalAberto}
                onFechar={() => setModalAberto(false)}
            />
        </>
    );
}