
import { useState } from "react";

import ModalPerfil from "../components/perfil/ModalPerfil";

export default function Index() {

    // Controla a abertura do modal
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <>

            <main>

                <h1>Qore Analytics</h1>

                <button
                    type="button"
                    onClick={() => setModalAberto(true)}
                >
                    Meu perfil
                </button>

            </main>

            <ModalPerfil
                aberto={modalAberto}
                onFechar={() => setModalAberto(false)}
            />

        </>
    );
}
