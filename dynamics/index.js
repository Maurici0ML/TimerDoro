function strTime( totalM, totalS, minutos, segundos  ) {

    let tiempo; //Variable que contendra el tiempo ya formateado.
    
    // Variables calculo grados
    let tiempoGrafico = totalM * 60 + totalS;
    let tiempoGrados = (minutos * 60) + segundos;

    // Variables de divs del progress circle.
    const progress = document.querySelectorAll('.progress');
    const progressHide =  document.querySelector('.progress-hide');
    
    //LOGICA DE EL PROGRESS CIRCLE ---------------------------------------
    tiempoGrados = (tiempoGrados / tiempoGrafico) * 360;
    tiempoGrados = 360-tiempoGrados; //Grados de acuerdo al tiempo.

    progress.forEach( element => {
        element.style.transform = `rotate(${ tiempoGrados }deg)`;
        if( tiempoGrados >= 180 ) {
            progress[0].style.transform = `rotate(180deg)`;
            progressHide.style.opacity = '0';
        } else {
            progressHide.style.opacity = '1';
        }
    });

    //LÓGICA DEL FORMATO DEL TIEMPO ---------------------------------------
    if ( minutos < 10 && segundos < 10 ) 
        tiempo = `0${minutos}:0${segundos}`;
    else if( minutos < 10 && segundos > 9 )
        tiempo = `0${minutos}:${segundos}`;
    else if( minutos > 9 && segundos < 10 )
        tiempo = `${minutos}:0${segundos}`;
    else 
        tiempo = `${minutos}:${segundos}`;

    return tiempo;

}

window.onload = () => {
    
    /*VARIABLES
    --------------------------------------------------------------------------------*/
    //De tiempo
    let MINUTOS = 60;
    let SEGUNDOS = 0;
    let mins = MINUTOS;
    let segs = SEGUNDOS;
    
    //Intervals
    let intervalo;

    //Timer
    let timer = document.querySelector(".fondoTimer");
    
    // const fondoTimer =  document.querySelector('.fondoTimer');

    timer.innerText = strTime(MINUTOS, SEGUNDOS, mins, segs); //Inicializacion del timer y el circulo de progreso.

    //Botones
    let controles = document.getElementById("controls");
    let start = document.getElementById("start");
    // let addMins = document.getElementById("addMins");

    //Audio.
    const final = new Audio("./statics/media/finish.mp3");

    /*EVENTOS CLICK
    ---------------------------------------------------------------------------------*/
    controles.addEventListener("click", (evento) => {

        //Constante que guarda el estado de los botones (-1 si no fue tocado)
        const ControlBtn = [
            evento.target.className.indexOf("lssMins"),
            evento.target.className.indexOf("start"), 
            evento.target.className.indexOf("addMins")
        ];
        
        //Evento boton inicio( usando delegación de eventos )
        if ( ControlBtn[1] !== -1 ) {

            //Condicional para determinar play y pause del interval
            if( start.innerHTML === '\n            <i class="btn-start fas fa-3x fa-play-circle"></i>\n        ' || start.innerHTML === '<i class="btn-start fas fa-3x fa-play-circle"></i>' ) {

                start.innerHTML = '<i class="btn-start fas fa-3x fa-pause-circle"></i>'; //Cambiando el icno del botón a Pausar.

                //Intervalo que lleva el tiempo
                intervalo = setInterval( () => {
                    
                    //MANEJO DEL TIEMPO----------------------------------------------------------------------------------------------------
                    //Cuando el contador llegue a 0...
                    if( mins === 0 && segs === 0 ) {
                        
                        clearInterval( intervalo ); //Limpiando el intervalo.
                        
                        start.innerHTML = '<i class="btn-start fas fa-3x fa-play-circle"></i>'; //Cambiando el icono del boton a Play.
                        
                        //Reproducciendo el sonido de final.
                        final.play();
                        
                        //Reiniciando el contador 
                        MINUTOS = 60;
                        SEGUNDOS = 0;                    
                        mins = MINUTOS;
                        segs = SEGUNDOS;
                        
                    } else if( segs === 0 ) {   //Manejo de los segundos y minutos.
                        
                        segs = 60;
                        mins--;
                        
                    }
                    
                    //Restando los segundos.
                    segs--;
                    segs = segs === -1? 0:segs;
                    
                    //Insertando el texto en el div del contador y poniendo parte grafica.
                    timer.innerText = strTime( MINUTOS, SEGUNDOS, mins, segs );
                    
                }, 1000 );

            } else {

                //Limpiando el intervalo para la pausa.
                clearInterval( intervalo );

                start.innerHTML = '<i class="btn-start fas fa-3x fa-play-circle"></i>'; //Cambiando el icono del boton a Play.

            }

        } else if( ControlBtn[2] != -1 ) { // Evento boton de añadir minutos

            MINUTOS += 10; //Añadiendo 10 minutos a variable de control del tiempo.  
            mins += 10; //Añadiendo 10 minutos al timer.
            
            // console.log(MINUTOS, "SUMA");
            // console.log(mins, "suma");

            //Insertando el texto en el div del contador y poniendo parte grafica.
            timer.innerText = strTime( MINUTOS, SEGUNDOS, mins, segs );
        
        } else if( ControlBtn[0] != -1 ) { // Evento boton de quitar minutos

            MINUTOS = mins>=5? MINUTOS - 5:MINUTOS; //Restando 5 minutos a variable de control del tiempo.
            mins = mins>=5? mins - 5:mins; //Restando 5 minutos al timer.  
            
            // console.log(MINUTOS, "RESTA");
            // console.log(mins, "resta");

            //Insertando el texto en el div del contador y poniendo parte grafica.
            timer.innerText = strTime( MINUTOS, SEGUNDOS, mins, segs );
        
        }
        
    });

}