import React, { useState } from "react";
import styles from "./selecaoCargo.module.css";
import SelecaoCargo, {
    SelecaoCargoProps,
    VarianteSelecaoCargo,
    TamanhoSelecaoCargo,
} from "./selecaoCargo";

export { SelecaoCargo };
export type {
    SelecaoCargoProps,
    VarianteSelecaoCargo,
    TamanhoSelecaoCargo,
};

export type CargoItem = Omit<
    SelecaoCargoProps,
    "selecionado" | "selected" | "onPress" | "onClick"
> & {
    id: string;
};

const CARGOS_PADRAO: CargoItem[] = [
    {
        id: "3",
        texto: "Admin",
        icone: <i className="fa-solid fa-shield" />,
        variante: "branco",
    },
    {
        id: "1",
        texto: "Dev",
        icone: <i className="fa-solid fa-code" />,
        variante: "branco",
    },
    {
        id: "2",
        texto: "QA",
        icone: <i className="fa-solid fa-file-lines" />,
        variante: "branco",
    },
];

type SelecoesCargosGroupProps = {
    label?: string;
    cargos?: CargoItem[];
    cargoSelecionado?: string;
    defaultSelecionado?: string;
    variante?: VarianteSelecaoCargo;
    tamanho?: TamanhoSelecaoCargo;
    onSelect?: (id: string) => void;
    className?: string;
};

export default function SelecoesCargos({
    label = "Cargo",
    cargos = CARGOS_PADRAO,
    cargoSelecionado,
    defaultSelecionado = "1",
    variante,
    tamanho,
    onSelect,
    className = "",
}: SelecoesCargosGroupProps) {
    const [selecionadoInterno, setSelecionadoInterno] = useState<string | undefined>(
        defaultSelecionado
    );

    const idAtivo =
        cargoSelecionado !== undefined ? cargoSelecionado : selecionadoInterno;

    const handleSelecionar = (id: string) => {
        if (cargoSelecionado === undefined) {
            setSelecionadoInterno(id);
        }
        onSelect?.(id);
    };

    return (
        <div className={`${styles.grupoContainer} ${className}`.trim()}>
            {label && <label className={styles.label}>{label}</label>}

            <section
                className={styles.gridCargos}
                aria-label={label || "Seleção de Cargos"}
            >
                {cargos.map((item, index) => {
                    const { id, ...restProps } = item;
                    return (
                        <SelecaoCargo
                            key={`${id || item.texto || item.text || "cargo"}-${index}`}
                            {...restProps}
                            variante={variante ?? item.variante}
                            tamanho={tamanho ?? item.tamanho}
                            selecionado={idAtivo === id}
                            onPress={() => handleSelecionar(id)}
                        />
                    );
                })}
            </section>
        </div>
    );
}