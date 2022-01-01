function strTime( minutos, segundos  ) {

    let tiempo; //Variable que contendra el tiempo ya formateado.

    //Lógica del formato del tiempo.
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
    let segs = 0;
    let mins = 60;
    
    //Intervals
    let intervalo;

    //Timers
    let timer = document.getElementById("timer");
    timer.innerText = `${mins}:0${segs}`;

    //Botones
    let controles = document.getElementById("controls");
    let start = document.getElementById("start");
    let addMins = document.getElementById("addMins");

    //Audio.
    const final = new Audio("./statics/media/finish.mp3");

    /*EVENTOS CLICK
    ---------------------------------------------------------------------------------*/

    
    controles.addEventListener("click", (evento)=>{+

        console.log(evento.target.className);
        
        //Constante que guarda el estado de los botones (-1 si no fue tocado)
        const ControlBtn = [
            evento.target.className.indexOf("lssMins"),
            evento.target.className.indexOf("start"), 
            evento.target.className.indexOf("addMins")
        ];
        
        console.log(ControlBtn);

        //Evento boton inicio( usando delegación de eventos )
        if ( ControlBtn[1] !== -1 ) {

            //Condicional para determinar play y pause del interval
            if( start.innerHTML === '\n            <i class="btn-start fas fa-2x fa-play"></i>\n        ' || start.innerHTML === '<i class="btn-start fas fa-2x fa-play"></i>' ) {

                start.innerHTML = '<i class="btn-start fas fa-2x fa-pause"></i>'; //Cambiando el icno del botón a Pausar.

                //Intervalo que lleva el tiempo
                intervalo = setInterval( () => {
                    
                    //Cuando el contador llegue a 0...
                    if( mins === 0 && segs === 0 ) {
                        
                        clearInterval( intervalo ); //Limpiando el intervalo.

                        //Reproducciendo el sonido de final.
                        final.play();

                        //Reiniciando el contador 
                        mins = 60;
                        segs = 0;                    

                    } else if( segs === 0 ) {   //Manejo de los segundos y minutos.

                        segs = 60;
                        mins--;

                    }

                    //Restando los segundos.
                    segs--;
                    segs = segs === -1? 0:segs;

                    //Insertando el texto en el div del contador
                    timer.innerText = strTime( mins, segs );

                }, 1000 );

            } else {

                //Limpiando el intervalo para la pausa.
                clearInterval( intervalo );

                start.innerHTML = '<i class="btn-start fas fa-2x fa-play"></i>'; //Cambiando el icono del boton a Play.

            }

        } else if( ControlBtn[2] != -1 ) { // Evento boton de añadir minutos

            mins += 10; //Añadiendo 10 minutos al timer.  
    
            //Insertando el texto en el div del contador
            timer.innerText = strTime( mins, segs );
        
        } else if( ControlBtn[0] != -1 ) { // Evento boton de quitar minutos

            mins = mins>=5? mins - 5:mins; //Añadiendo 10 minutos al timer.  
            
            //Insertando el texto en el div del contador
            timer.innerText = strTime( mins, segs );
        
        }
        
    });

    
    
}