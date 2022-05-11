// VARIBALES GLOBALES.
// Tiempo.
let minutos = 60; // Total de minutos y segundos que recorrerá el timer
let segundos = 0;
let mins = minutos; // Variables que controlarán el paso del tiempo
let segs = segundos;

// Timer.
const timer = document.querySelector(".fondoTimer");

// Intervals.
let intervalo;

// FUNCIONES.
// Función que grafica el timer.
function strTime( totalM, totalS, strMinutos=totalM, strSegundos=totalS  ) {

    let tiempo; // Variable que contendra el tiempo ya formateado.
    
    // Variables calculo grados.
    let tiempoGrafico = (totalM * 60) + totalS;
    let tiempoGrados = (strMinutos * 60) + strSegundos;

    // Variables de divs del progress circle.
    const progress = document.querySelectorAll('.progress');
    const progressHide =  document.querySelector('.progress-hide');
    
    // LOGICA DE EL PROGRESS CIRCLE ---------------------------------------
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

    // LÓGICA DEL FORMATO DEL TIEMPO ---------------------------------------
    if ( strMinutos < 10 && strSegundos < 10 ) 
        tiempo = `0${strMinutos}:0${strSegundos}`;
    else if( strMinutos < 10 && strSegundos > 9 )
        tiempo = `0${strMinutos}:${strSegundos}`;
    else if( strMinutos > 9 && strSegundos < 10 )
        tiempo = `${strMinutos}:0${strSegundos}`;
    else 
        tiempo = `${strMinutos}:${strSegundos}`;

    timer.innerText = tiempo;

}

// Función que lleva el manejo del tiempo.
function tiempoInterval() {
    
    // Audio.
    const final = new Audio("./statics/media/finish.mp3");

    // Cuando el contador llegue a 0...
    if(mins === 0 && segs === 0) {

        clearInterval( intervalo ); // Limpiando el intervalo.

        timer.classList.add("timerEnd"); // Animación de cuando el timer llegó a 0.
        
        // Cambiando el icono del boton a Play.
        start.children[0].classList.remove("fa-pause-circle"); 
        start.children[0].classList.add("fa-play-circle");
        
        final.play(); // Sonido final.
        
        // Se elimina la clase de la animación
        final.addEventListener("ended", ()=>{
            timer.classList.remove("timerEnd")
        });
        
        // Reiniciando el contador 
        minutos = 60;
        segundos = 0;                    
        mins = minutos;
        segs = segundos;
        
    } else if( segs === 0 ) {   // Manejo de los segundos y minutos.
        
        segs = 60;
        mins--;
        
    }
    
    // Restando los segundos.
    segs--;
    segs = segs === -1? 0:segs;
    
    // Insertando el texto en el div del contador y poniendo parte grafica.
    strTime( minutos, segundos, mins, segs );
   
}

// Función que cambia el tiempo total y reimprime el timer.
function cambiaTiempo (newMins, newSegs) {

    minutos = newMins;
    segundos = newSegs;
    mins = minutos;
    segs = segundos;
    strTime(minutos, segundos);

}

window.onload = () => {
    
    strTime(minutos, segundos); //Inicializacion del timer y el circulo de progreso.

    // Botones
    let controles = document.getElementById("controls");
    let start = document.getElementById("start");

    /* EVENTOS de controles.
    ---------------------------------------------------------------------------------*/
    controles.addEventListener("click", (evento) => {

        // Constante que guarda el estado de los botones (-1 si no fue tocado)
        const ControlBtn = [
            evento.target.className.indexOf("lssMins"),
            evento.target.className.indexOf("start"), 
            evento.target.className.indexOf("addMins")
        ];
        
        // Evento boton inicio/pausa.
        if ( ControlBtn[1] !== -1 ) {

            let iconClasses = start.children[0].classList; //Obtiene las clases del botón.

            // Condicional para determinar play y pause del interval.
            if( iconClasses.contains("fa-play-circle") ) {

                // Cambiando el icono del botón a Pausar.
                start.children[0].classList.add("fa-pause-circle"); 
                start.children[0].classList.remove("fa-play-circle");

                // Intervalo del que depende TODO EL TIMER.
                intervalo = setInterval( tiempoInterval ,1000 );

            } else if ( iconClasses.contains("fa-pause-circle") ){

                // Limpiando el intervalo para la pausa.
                clearInterval( intervalo );

                // Cambiando el icono del boton a Play.
                start.children[0].classList.remove("fa-pause-circle"); 
                start.children[0].classList.add("fa-play-circle");

            }

        } else if( ControlBtn[2] != -1 ) { // Evento boton de añadir minutos

            minutos += 10; // Añadiendo 10 minutos a variable de control del tiempo.  
            mins += 10; // Añadiendo 10 minutos al timer.
            
            // Insertando el texto en el div del contador y poniendo parte grafica.
            strTime( minutos, segundos, mins, segs );
        
        } else if( ControlBtn[0] != -1 ) { // Evento boton de quitar minutos

            minutos = mins>=5? minutos - 5:minutos; // Restando 5 minutos a variable de control del tiempo.
            mins = mins>=5? mins - 5:mins; // Restando 5 minutos al timer.  
            
            // Insertando el texto en el div del contador y poniendo parte grafica.
            strTime( minutos, segundos, mins, segs );
        
        }
        
    });

}