let tempoJogo = 0; // Variáveis globais
let emJogo = false;
let intervalo;

function cicloRelogio() { // Iteração a cada 1s do relógio
    tempoJogo++;
    
    document.getElementById("relogioTempoJogo").innerHTML = atualizaTempoTela(tempoJogo);
}

function atualizaTempoTela (tempo) { // Transforma o tempo de jogo em horário na tela

    let horas = Math.floor(tempo/3600);
    let minutos = Math.floor((tempo - (horas * 3600)) / 60);
    let segundos = tempo - (horas * 3600) - (minutos * 60);

    if (validoHorario(horas, minutos, segundos)){
        horas = horas < 10 ? ("0" + horas) : horas;
        minutos = minutos < 10 ? ("0" + minutos) : minutos;
        segundos = segundos < 10 ? ("0" + segundos) : segundos;
    
        return horas+':'+minutos+':'+segundos;
    } else {
        paraRelogio();
    }
}

function validoHorario (horas, minutos, segundos) { // Confere se o tempo vai até 23:59:59
    return (horas<=23 && minutos<=59 && segundos<=59);
}


function iniciaRelogio(){ // Seta o intervalo de iteração do ciclo do relógio (1s)
    intervalo = setInterval(cicloRelogio, 1000);
}


function paraRelogio(){ // Para o ciclo do relógio e retorna o tempo de jogo em milissegundos
    clearInterval(intervalo);
    return tempoJogo;
}