
// -------------NECESSÁRIO PASSAR UMA VARIÁVEL "RODADA" COMO ARGUMENTO, QUE SERÁ A CONTABILIZADORA DOS NÍVEIS 1 A 16 DO JOGO.-------------

let acertar, errar, parar, acertarFormatado, pararFormatado, errarFormatado;

    let premios = calculaPremio(rodada)
    let premiosFormatados = formataValores(premios.acertar, premios.parar, premios.errar, rodada)

    // -------------PARA USAR OS VALORES RETORNADOS > premiosFormatados.acertarFormatado | premiosFormatados.pararFormatado | premiosFormatados.errarFormatado------------



    // -------------FUNÇÃO QUE RETORNA OS VALORES A CADA RODADA-------------
function calculaPremio(rodada) {

    const valoresAcertar = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1];

        acertar = valoresAcertar[rodada - 1];

        if (rodada === 1) {
            parar = 0.5;
            errar = 0;
        } else {
            parar = valoresAcertar[rodada - 2];
            errar = parar / 2;
        }

    return { acertar, parar, errar };
}


    // -------------FUNÇÃO QUE FORMATA OS VALORES + MILHAR OU MILHÃO EM STRING-------------
function formataValores(acertar, parar, errar, rodada){
    
    if(rodada === 1){
        acertarFormatado = `${acertar} MIL`
        pararFormatado = `500`
        errarFormatado = `0`

    } else if(rodada === 2){
        acertarFormatado = `${acertar} MIL`
        pararFormatado = `${parar} MIL`
        errarFormatado = `500`
    } else if(rodada === 16){
        acertarFormatado = `${acertar} MILHÃO`
        pararFormatado = `${parar} MIL`
        errarFormatado = `${errar} MIL`
    } else{
        acertarFormatado = `${acertar} MIL`
        pararFormatado = `${parar} MIL`
        errarFormatado = `${errar} MIL`
    }

    return { acertarFormatado, pararFormatado, errarFormatado }
}