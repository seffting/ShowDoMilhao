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
contarEstatisticas()
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
        // ----- Resultado do jogo
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
        let tempoAtual = horarioParaSegundos(totalTempoJogado)
        let tempoDeJogo = horarioParaSegundos(jogo["Tempo da partida"]);

        totalTempoJogado = formatarHorario(tempoAtual + tempoDeJogo);
    });

    const estatisticas = [totalDicas, totalPulos, totalPontuacao, totalPerguntasRespondidas,
        totalDerrotas, totalDesistencias, totalVitorias, totalTempoJogado];

        console.log(estatisticas)
    return estatisticas;

}

melhoresEstatisticas();

/* Retorna um vetor de 4 itens {
    0 -> partida mais longa
    1 -> vitoria mais rapida
    2 -> vitoria com menor numero de dicas
    3 -> vitoria com menor numero de pulos
    Retornam -1 caso não tenha dados
*/
function melhoresEstatisticas() {
    const historicosString = localStorage.getItem("historicos");
    const historico = JSON.parse(historicosString);
    let vitoriaMaisRapida = -1;
    let jogoMaisDemorado = -1;
    let menorNumeroDicas = -1;
    let menorNumeroPulos = -1;

    historico.forEach((jogo) => {
        let resultado = jogo["Resultado da partida"];
        let tempoDeJogo = horarioParaSegundos(jogo["Tempo da partida"]);
        let dicas = jogo["Dicas usadas"];
        let pulos = jogo["Pulos usados"];

        console.log(resultado + " - " + formatarHorario(tempoDeJogo) + " | d: " + dicas + " p: " + pulos);

        jogoMaisDemorado = calcularMelhor(tempoDeJogo, jogoMaisDemorado);
        // Dados de vitórias
        if (resultado == "venceu") {
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

    console.log(melhoresEstatisticas);
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