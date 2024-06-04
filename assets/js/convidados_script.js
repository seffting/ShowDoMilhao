const rodada = 1; // PLACEHOLDER
const rodadaFinal = 16;
const chanceMax = 90;
const chanceMin = 60;
const respostaCerta = 1; // PLACEHOLDER

function ajudaConvidados() {
    // calcular quanto cada rodada influencia na chance
    const variacaoChance = (chanceMax - chanceMin) / (rodadaFinal - 1);
    // calcular chance atual
    const chanceAtual = chanceMax - variacaoChance * (rodada - 1);

    for (let i = 0; i < 3; i++) {
        chuteConvidado(chanceAtual);
    }
}

function chuteConvidado(chanceAtual) {
    const numSorteado = Math.floor(Math.random() * 100) + 1;
    let resposta;
    let certeza;

    if (chanceAtual >= numSorteado) { // caso seja sorteado a resposta ser correta
        resposta = respostaCerta;
        certeza = calcularCerteza(chanceAtual, true);
    } else { // caso seja sorteado a resposta ser incorreta
        let respostas = [1, 2, 3, 4];
        const indexRespostaCerta = respostas.indexOf(respostaCerta);
        // remover a resposta certa do array
        respostas.splice(indexRespostaCerta, 1);

        // sorteia uma resposta incorreta
        resposta = respostas[Math.floor(Math.random() * respostas.length)];
        certeza = calcularCerteza(chanceAtual, false);
    }

    console.log(resposta + ": " + certeza + "%")
}

function calcularCerteza(chanceAtual, respostaCerta) {
    // sorteia um indice para saber se o convidado tem certeza, duvida ou não sabe
    const indiceCerteza = Math.floor((Math.random() * 100) + 1) * (chanceAtual / 100);
    let porcentagemCerteza;

    /*
        Caso o convidado tenha falado a resposta correta:
        80% de chance de ele ter alta certeza
        10% de chance de ele ter dúvida
        10% de chance de ele não saber (chutou)
    */
    if (respostaCerta) {
        if (indiceCerteza > 20) { // tem certeza
            porcentagemCerteza = Math.floor(Math.random() * 21) + 80;
        } else if (indiceCerteza > 10) { // duvida
            porcentagemCerteza = Math.floor(Math.random() * 61) + 20;
        } else { // não sabe
            porcentagemCerteza = Math.floor(Math.random() * 21);
        }
    }
    
    /*
        Caso o convidado tenha falado a resposta incorreta:
        40% de chance de ele ter alta certeza
        35% de chance de ele ter dúvida
        25% de chance de ele não saber (chutou)
    */
    else {
        if (indiceCerteza > 60) {
            porcentagemCerteza = Math.floor(Math.random() * 21);
        } else if (indiceCerteza > 25) {
            porcentagemCerteza = Math.floor(Math.random() * 61) + 20;
        } else {
            porcentagemCerteza = Math.floor(Math.random() * 21) + 80;
        }
    }

    return porcentagemCerteza;
}