function gerarHtmlHistorico(pontuacao, data, tempo, pulos, dicas, perguntas, resultado) {
  let containerConteudoHistorico = document.getElementById('containerConteudoHistorico'); // Corrigido o nome da variável
  let partidaHTML = `
    <div class="partida">
      <div class="containerPontuacaoDataTempo">
        <span class="pontuacao">${pontuacao}</span>
        <div>
          <span class="data">${data}</span>
          <span class="tempo">${tempo}</span>
        </div>
      </div>
      <div class="direitaPartida">
        <div class="puloPerguntaDicaResultado">
          <div class="pulos">
            <span>Pulos</span>
            <span class="valoresCaixas">${pulos}</span>
          </div>
          <div class="dicas">
            <span>Dicas</span>
            <span class="valoresCaixas">${dicas}</span>
          </div>
          <div class="perguntas">
            <span>Perguntas</span>
            <span class="valoresCaixas">${perguntas}</span>
          </div>
          <div class="resultado">
            <span>Resultado</span>
            <span class="valoresCaixas">${resultado}</span>
          </div>
        </div>
      </div>
    </div>`;
  containerConteudoHistorico.innerHTML += partidaHTML;
}

gerarHtmlHistorico(0,'0/0/0','00:00',0,0,0,0);
