const rodada = 1; // PLACEHOLDER
const rodadaFinal = 16;
const chanceMax = 90;
const chanceMin = 60;
const respostaCerta = 1; // PLACEHOLDER

ajudaConvidados()
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
    const indiceCerteza = Math.floor((Math.random() * 100) + 1);
    const certezaAlta = chanceAtual;
    const certezaMedia = (100 - certezaAlta)/2 + certezaAlta;
    let porcentagemCerteza;

    /*
        As faixas de certeza são
        0 - Chance Atual
        Chance Atual - (Metade da distância restante até 100, divido por 2)
        (Metade da distância restante até 100, divido por 2) - 100
    */
    if (respostaCerta) {
        if (certezaAlta >= indiceCerteza) { // tem certeza
            porcentagemCerteza = Math.floor(Math.random() * 21) + 80;
        } else if (certezaMedia >= indiceCerteza) { // duvida
            porcentagemCerteza = Math.floor(Math.random() * 61) + 20;
        } else { // não sabe
            porcentagemCerteza = Math.floor(Math.random() * 21);
        }
    }
    // Caso a resposta seja incorreta, a chance de ter certeza é menor
    else {
        if (certezaAlta >= indiceCerteza) {
            porcentagemCerteza = Math.floor(Math.random() * 21); // não sabe
        } else if (certezaMedia >= indiceCerteza) {
            porcentagemCerteza = Math.floor(Math.random() * 61) + 20; // duvida
        } else {
            porcentagemCerteza = Math.floor(Math.random() * 21) + 80; // tem certeza
        }
    }

    return porcentagemCerteza;
}