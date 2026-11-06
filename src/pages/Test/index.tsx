import Botao from '@/components/botao/botao'
import { faShareNodes, faDownload } from "@fortawesome/free-solid-svg-icons";
import React from 'react'


export default function index() {
  return (
    <>
        <Botao texto="Entrar" page="/home" />
      <Botao texto="Buscar" onPress={() => console.log("Buscando...")} />
      <Botao texto="Nova Execução" />
      {/* 2. Botões com Ícone à esquerda (Compartilhar / Vídeo.mp4) */}
      <Botao variante="branco" icone={faShareNodes} texto="Compartilhar" />
      <Botao variante="laranja" icone={faDownload} texto="Vídeo.(mp4)" />
      {/* 3. Botão Branco sem ícone (Gerar Relatório) */}
      <Botao variante="branco" texto="Gerar Relatório" />
      {/* 4. Botão Vazado (Cancelar) */}
      <Botao variante="cancelar" texto="Cancelar" />
      {/* 5. Botão Laranja Claro (Assinar Roteiro) */}
      <Botao variante="assinar" texto="Assinar Roteiro" />
    </>
  )
}