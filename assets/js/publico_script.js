const rodada = 16; // PLACEHOLDER
const rodadaFinal = 16;
const chanceMax = 95;
const chanceMin = 80;
const respostaCerta = 1; // PLACEHOLDER

//const botao = document.getElementById("botaoAjuda3");
//botao.addEventListener("click", ajudaPublico());
ajudaPublico();

function ajudaPublico() {
    qtPessoas = 16;
    chutes = [0, 0, 0, 0];

    let respostasIndividuais = coletarRespostas();
    let porcentagens = calcularPorcentagens();
}

function coletarRespostas() {
    // calcular quanto cada rodada influencia na chance
    const variacaoChance = (chanceMax - chanceMin) / (rodadaFinal - 1);
    // calcular chance atual
    const chanceAtual = chanceMax - variacaoChance * (rodada - 1);
    const respostas = [1, 2, 3, 4];
    let respostasIndividuais = [];

    // Pegar chute de cada pessoa do público
    for (let i = 0; i < qtPessoas; i++) {
        let resposta = chutePublico(chanceAtual);
        respostasIndividuais[i] = resposta;
        const indexResposta = respostas.indexOf(resposta);
        chutes[indexResposta]++;
    }

    return respostasIndividuais;
}

function calcularPorcentagens() {
    let porcentagens = [0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
        porcentagens[i] = Math.round(chutes[i] / qtPessoas * 100);
    }

    return porcentagens;
}

function chutePublico(chanceAtual) {
    const numSorteado = Math.floor(Math.random() * 100) + 1;
    let resposta;

    if (chanceAtual >= numSorteado) { // caso seja sorteado a resposta ser correta
        resposta = respostaCerta;
    } else { // caso seja sorteado a resposta ser incorreta
        let respostas = [1, 2, 3, 4];
        const indexRespostaCerta = respostas.indexOf(respostaCerta);
        // remover a resposta certa do array
        respostas.splice(indexRespostaCerta, 1);

        // sorteia uma resposta incorreta
        resposta = respostas[Math.floor(Math.random() * respostas.length)];
    }

    return resposta;
}