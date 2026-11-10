import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
export default function MinhaPagina() {
  return (
    <div style={{ padding: "24px" }}>
      <FiltroPesquisa
        onBuscar={(filtros) => {
          console.log("Filtros selecionados:", filtros);
          // Aqui depois vamos chamar o Axios passando os filtros!
        }}
      />
    </div>
  );
}