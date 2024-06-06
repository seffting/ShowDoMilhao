let premioAtual = 4500; // placeholder 

botaoParar.addEventListener("click", confirmaSaida);
botaoNao.addEventListener("click", fechaDialogoSair);
botaoSim.addEventListener("click", sairJogo);

function confirmaSaida() {
    let dialogoSair = document.getElementById("dialogoSair");
    let campoTextoDialogo =  document.getElementById("textoDialogoSair");
    campoTextoDialogo.innerHTML = 
    `<div id="frase1">
        <span>Se sair, irá ficar com 
        <div class="circulo">
        <span class="iconeCifrao">R$</span>
    </div>${premioAtual}.</div>
    <div id="frase2">\nTem certeza de que quer sair?</div></span>`;
    dialogoSair.showModal();
}

function sairJogo () {
    fechaDialogoSair();
}

function fechaDialogoSair () {
    let dialogoSair = document.getElementById("dialogoSair");
    dialogoSair.close();
}
