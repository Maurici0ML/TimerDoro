window.onload = () => {
    
    // VARIABLES--------------------------------------
    //De tiempo
    let segs = 0;
    let mins = 60;
    
    //Intervals
    let intervalo;

    //Timers
    let timer = document.getElementById("timer");

    //Botones
    let start = document.getElementById("start");
    let addMins = document.getElementById("addMins");

    

    //EVENTOS CLICK----------------------------------

    //Evento boton inicio
    start.addEventListener("click", ()=>{

        //Condicional para determinar play y pause del interval
        if( start.innerHTML === '\n        <i class="fas fa-2x fa-play"></i>\n    ' || start.innerHTML === '<i class="fas fa-2x fa-play"></i>' ) {

            start.innerHTML = '<i class="fas fa-2x fa-pause"></i>'; //Cambiando el icno del botón a Pausar.

            //Intervalo que lleva el tiempo
            intervalo = setInterval( () => {
        
                //Manejo de los minutos y segundos
                if( segs === 0 ){
                    segs = 60;
                    mins--;
                }
                segs--;
        
                //Insertando el texto en el div del contador
                timer.innerText = `${mins}:${segs}`;
                
            }, 1000 );

        } else {

            //Limpiando el intervalo para la pausa.
            clearInterval( intervalo );

            start.innerHTML = '<i class="fas fa-2x fa-play"></i>'; //Cambiando el icono del boton a Play.

        }
        
    });

    //Evento boton de añadir minutos
    addMins.addEventListener('click', ()=>{

        mins += 10; //Añadiendo 10 minutos al timer.

    });
}