import { historico } from "../../data/historico.js";
import { atualizarHistorico } from "../../data/historico.js";

window.addEventListener('load', function() {
    // Verifica se a página atual corresponde à página desejada
    if (window.location.href.includes('/pages/historico.html')) {
        // Se corresponder, execute sua função

        popularHistorico();
    }
});

window.addEventListener('load', function () {
    // Verifica se a página atual corresponde à página desejada
    if (window.location.href.includes('estatisticas.html')) {
        // Se corresponder, execute sua função
        let estatisticas = contarEstatisticas();
        let melhores = melhoresEstatisticas();
 
        preencherDados(estatisticas, 0);
        preencherDados(melhores, 8)
    }
});

function preencherDados(dados, idInicial) {
    for (let i = 0; i < dados.length; i++) {
        const divPai = document.getElementById(i + idInicial);
        const novaDiv = document.createElement('div');
        let dado = dados[i] == -1? "N/A" : dados[i];
        novaDiv.innerHTML = dado;
        divPai.appendChild(novaDiv);
    }
}

function adicionarRegistro(dicas, pulos, pts, perguntasRespondidas, resultadoFinal, tempo, data) {
    let historicoSalvo = JSON.parse(localStorage.getItem('historico')) || [];
    
    // Cria um novo registro
    const novoRegistro = {
        dicasUsadas: dicas,
        pulosUsados: pulos,
        pontuacao: pts,
        qtPerguntasRespondidas: perguntasRespondidas,
        resultado: resultadoFinal,
        tempoPartida: tempo,
        dataPartida: data
    };
 
    // Adiciona o novo registro ao histórico
    historicoSalvo.push(novoRegistro);
    localStorage.setItem('historico', JSON.stringify(historicoSalvo));
    atualizarHistorico(historicoSalvo);
}

function popularHistorico() {
    let jogos = JSON.parse(localStorage.getItem('historico'));
    jogos.forEach(jogo => {
        let dicas = jogo["dicasUsadas"];
        let pulos = jogo["pulosUsados"];
        let pontuacao = jogo["pontuacao"];
        let qtPerguntasRespondidas = jogo["qtPerguntasRespondidas"];
        let resultado = jogo["resultado"];
        let tempoDeJogo = jogo["tempoPartida"];
        let dataPartida = jogo["dataPartida"];

        gerarHtmlHistorico(pontuacao, dataPartida, tempoDeJogo, pulos, dicas, qtPerguntasRespondidas, resultado);
    });
}

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
                <span class="valoresCaixas" id="textoResultado">${resultado}</span>
            </div>
          </div>
        </div>
      </div>`;
    containerConteudoHistorico.innerHTML += partidaHTML;
}

// PARTE DAS ESTATISTICAS ----------------------------------

/* Retorna um vetor de 8 itens {
    0 -> total de dicas
    1 -> total de pulos
    2 -> pontuação total ganha
    3 -> total de perguntas respondidas
    4 -> total de derrotas
    5 -> total de desistencias
    6 -> total de vitorias
    7 -> total de tempo jogado
*/
function contarEstatisticas() {
    const historicos = historico;
    let totalDicas = 0;
    let totalPulos = 0;
    let totalPontuacao = 0;
    let totalPerguntasRespondidas = 0;
    let totalDerrotas = 0;
    let totalDesistencias = 0;
    let totalVitorias = 0;
    let totalTempoJogado = "00:00:00";

    historicos.forEach((jogo) => {
        totalDicas += jogo["dicasUsadas"];
        totalPulos += jogo["pulosUsados"];
        totalPontuacao += jogo["pontuacao"];
        totalPerguntasRespondidas += jogo["qtPerguntasRespondidas"];
        // ----- Resultado do jogo
        let resultado = jogo["resultado"];
        switch (resultado) {
            case "Perdeu":
                totalDerrotas++;
                break;
            case "Parou":
                totalDesistencias++;
                break;
            case "Venceu":
                totalVitorias++;
                break;
            default:
                break;
        }
        let tempoAtual = horarioParaSegundos(totalTempoJogado)
        let tempoDeJogo = horarioParaSegundos(jogo["tempoPartida"]);

        totalTempoJogado = formatarHorario(tempoAtual + tempoDeJogo);
    });

    const estatisticas = [totalDicas, totalPulos, totalPontuacao, totalPerguntasRespondidas,
        totalDerrotas, totalDesistencias, totalVitorias, totalTempoJogado];

    console.log(estatisticas) // RETIRAR
    return estatisticas;

}

/* Retorna um vetor de 4 itens {
    0 -> partida mais longa
    1 -> vitoria mais rapida
    2 -> vitoria com menor numero de dicas
    3 -> vitoria com menor numero de pulos
    Retornam -1 caso não tenha dados
*/
function melhoresEstatisticas() {
    const historicos = historico
    let vitoriaMaisRapida = -1;
    let jogoMaisDemorado = -1;
    let menorNumeroDicas = -1;
    let menorNumeroPulos = -1;

    historicos.forEach((jogo) => {
        let resultado = jogo["resultado"];
        let tempoDeJogo = horarioParaSegundos(jogo["tempoPartida"]);
        let dicas = jogo["dicasUsadas"];
        let pulos = jogo["pulosUsados"];

        console.log(resultado + " - " + formatarHorario(tempoDeJogo) + " | d: " + dicas + " p: " + pulos); // RETIRAR

        jogoMaisDemorado = calcularMelhor(tempoDeJogo, jogoMaisDemorado);
        // Dados de vitórias
        if (resultado == "Venceu") {
            vitoriaMaisRapida = calcularMelhor(tempoDeJogo, vitoriaMaisRapida, true);
            menorNumeroDicas = calcularMelhor(dicas, menorNumeroDicas, true);
            menorNumeroPulos = calcularMelhor(pulos, menorNumeroPulos, true);
        }
    });

    jogoMaisDemorado = jogoMaisDemorado != -1 ?
        jogoMaisDemorado = formatarHorario(jogoMaisDemorado) :
        jogoMaisDemorado;
    vitoriaMaisRapida = vitoriaMaisRapida != -1 ?
        vitoriaMaisRapida = formatarHorario(vitoriaMaisRapida) :
        vitoriaMaisRapida;

    const melhoresEstatisticas = [jogoMaisDemorado, vitoriaMaisRapida, menorNumeroDicas, menorNumeroPulos];

    console.log(melhoresEstatisticas); // RETIRAR
    return melhoresEstatisticas;
}

function calcularMelhor(atual, melhor, menorQue = false) {
    let resultado;
    melhor == -1 ? resultado = atual : resultado = melhor;

    if (menorQue) {
        if (atual < melhor) {
            resultado = atual;
        }
    } else {
        if (atual > melhor) {
            resultado = atual;
        }
    }

    return resultado;
}

function formatarHorario(horario) {
    let horas = Math.floor(horario / 3600);
    let minutos = Math.floor((horario - horas * 3600) / 60);
    let segundos = Math.floor(horario % 60);
    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    return horas + ":" + minutos + ":" + segundos;
}

function horarioParaSegundos(horario) {
    let partesHorario = horario.split(":");
    for (let i = 0; i < 3; i++) {
        partesHorario[i] = parseInt(partesHorario[i]);
    }
    return (partesHorario[0] * 60 + partesHorario[1]) * 60 + partesHorario[2];
}


export { adicionarRegistro } 