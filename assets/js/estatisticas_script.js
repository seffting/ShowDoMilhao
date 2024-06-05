// BASE DE TESTES ---------------------------------------------------

valoresPontuacao = [0, 1000, 2000, 3000, 4000, 5000, 10000];
const NUM_HISTORICOS = 10; // Define o número de históricos a serem gerados
let historicos = [];

iniciarTeste();

function iniciarTeste() {
    localStorage.clear();

    for (let i = 0; i < NUM_HISTORICOS; i++) {
        historicos.push(gerarHistoricoAleatorio());
    }

    // Salvando no localStorage
    localStorage.setItem("historicos", JSON.stringify(historicos));
}

function gerarHistoricoAleatorio() {
    const dicas = aleatorio(0, 3);
    const pulos = aleatorio(0, 3);
    const pontuacao = valoresPontuacao[aleatorio(0, 6)];
    const qtPerguntasRespondidas = aleatorio(0, 16);
    const estadoPartida = aleatorio(1, 3);
    let resultadoPartida = "";

    if (estadoPartida == 1) {
        resultadoPartida = "perdeu";
    } else if (estadoPartida == 2) {
        resultadoPartida = "parou";
    } else {
        resultadoPartida = "venceu";
    }

    const horas = aleatorio(0, 23);
    const minutos = aleatorio(0, 59);
    const segundos = aleatorio(0, 59);
    const tempoPartida = horas + ":" + minutos + ":" + segundos;

    return {
        "Dicas usadas": dicas,
        "Pulos usados": pulos,
        "Pontuação": pontuacao,
        "Quantidade perguntas respondidas": qtPerguntasRespondidas,
        "Resultado da partida": resultadoPartida,
        "Tempo da partida": tempoPartida
    };
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
function lerHistorico() {
    const historicosString = localStorage.getItem("historicos");
    const historico = JSON.parse(historicosString);
    let totalDicas = 0;
    let totalPulos = 0;
    let totalPontuacao = 0;
    let totalPerguntasRespondidas = 0;
    let totalDerrotas = 0;
    let totalDesistencias = 0;
    let totalVitorias = 0;
    let totalTempoJogado = "00:00:00";

    historico.forEach((jogo) => {
        totalDicas += jogo["Dicas usadas"];
        totalPulos += jogo["Pulos usados"];
        totalPontuacao += jogo["Pontuação"];
        totalPerguntasRespondidas += jogo["Quantidade perguntas respondidas"];
        let resultado = jogo["Resultado da partida"];
        switch (resultado) {
            case "perdeu":
                totalDerrotas++;
                break;
            case "parou":
                totalDesistencias++;
                break;
            case "venceu":
                totalVitorias++;
                break;
            default:
                break;
        }

        let tempoAtual = totalTempoJogado.split(":")
        let tempoDeJogo = jogo["Tempo da partida"].split(":");
        tempoAtual[0] = parseInt(tempoAtual[0]);
        tempoAtual[1] = parseInt(tempoAtual[1]);
        tempoAtual[2] = parseInt(tempoAtual[2]);

        tempoAtual[2] += parseInt(tempoDeJogo[2]);
        if (tempoAtual[2] >= 60) {
            tempoAtual[2] -= 60;
            tempoAtual[1]++;
        }
        tempoAtual[1] += parseInt(tempoDeJogo[1]);
        if (tempoAtual[1] >= 60) {
            tempoAtual[1] -= 60;
            tempoAtual[0]++;
        }
        tempoAtual[0] += parseInt(tempoDeJogo[0]);

        totalTempoJogado = tempoAtual[0] + ":" + tempoAtual[1] + ":" + tempoAtual[2];
    });

    const estatisticas = [totalDicas, totalPulos, totalPontuacao, totalPerguntasRespondidas,
        totalDerrotas, totalDesistencias, totalVitorias, totalTempoJogado];

    return estatisticas;
}