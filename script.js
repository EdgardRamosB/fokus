//AHORA QUEREMOS QUE EN CADA BOTON APAREZCA UN DETERMINANDO TIEMPO DIFERENTE, PARA ESO COLOCAREMOS "tiempoTranscurridoEnSegundos" EN CADA addEventListener
const html = document.querySelector ('html');

const botonCorto = document.querySelector ('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector ('.app__card-button--largo');
const baner = document.querySelector('.app__image');
const botonSiesta = document.querySelector('.app__card-button--dark');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica'); 
const textoIniciarPausar = document.querySelector('#start-pause span')// declaramos la variable  cambie el texto de comenzar a pausar y de pausar a comnenzar

//cambiar icono al boton al darle click
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer')//;declaramos una variable con el el id: timer para la cuenta regresiva

const musica = new Audio('./sonidos/luna-rise-part-one.mp3')

const audioPlay = new Audio('./sonidos/play.wav'); 
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')

const botonIniciarPausar = document.querySelector('#start-pause')
let tiempoTranscurridoEnSegundos = 1500; //queremos que aparezca por 25 minutos, seria igual a 1500

let idintervalo = null 



inputEnfoqueMusica.addEventListener('change', () =>{
    if (musica.paused){
       musica.play()
    }else{
        musica.pause()
    }
})

musica.loop = true; 

botonCorto.addEventListener('click', () =>{
    tiempoTranscurridoEnSegundos = 300;//Aca queremos 5 minutos, multipl x 60 = 300
    cambiarContexto('descanso-corto'); 
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', () =>{
    tiempoTranscurridoEnSegundos = 1500;// aca queremos 25 minutos, multi 25 x 60  1500 
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
})

botonLargo.addEventListener('click', () =>{
    tiempoTranscurridoEnSegundos = 900;// aca queremos 15 minutos, multi 15 x 60  900 
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})

botonSiesta.addEventListener('click', () =>{
    tiempoTranscurridoEnSegundos = 2400; // aca queremos 40 minutos, multi 40 x 60 = 2400
    cambiarContexto('descanso-siesta');
    botonSiesta.classList.add('active');
})

function cambiarContexto(contexto){
    
    mostrarTiempo () //Y PARA MOSTRAR CADA TIEMPO EN CADA BOTON NECESITAMOS CAMBIAR EL CONTEXTO
    botones.forEach (function (contexto){
      contexto.classList.remove('active')
    })


    html.setAttribute('data-contexto', contexto);
    baner.setAttribute('src', `./imagenes/${contexto}.png`);
 
 
    switch (contexto) {
    case "enfoque":
        titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
        
        break;
    case "descanso-corto":
        titulo.innerHTML = `¿Qué tal tomar un respiro? 
                <strong class="app__title-strong">¡Haz una pausa corta! </strong>`
        break;

    case "descanso-largo":
        titulo.innerHTML = `Hora de volver a la superficie
                 <strong class="app__title-strong">Haz una pausa larga.</strong>`
        break;    
    
    case "descanso-siesta":  
        titulo.innerHTML = `Hora de darte un merecido descanso
                 <strong class="app__title-strong">Empieza a soñar.</strong>`
        break;  
 }
   
}

//creamos otra funcion
const cuentaRegresiva = () =>{
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado .play()
        alert("tiempo final")
        reiniciar()
       
       return;
    }
    textoIniciarPausar.textContent = "Pausar"
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo () //llamamos a la funcion de abajo
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar (){
    if(idintervalo){
        audioPausa.play()
       reiniciar()
       return;
    }

    audioPlay.play(); 
    idintervalo = setInterval(cuentaRegresiva, 1000)
    iconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`);
}

function reiniciar (){
    clearInterval(idintervalo);
    idintervalo = null;
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`);
}

//crearemos otra funcion para mostrar el tiempo
 function mostrarTiempo (){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000) //AHORA COLOCAREMOS UN OBjETO , QUE ES DATE este objeto es usado para manejar fechas y horas; Y LE PASAREMOS UN PARAMETRO tiempoTranscurridoEnSegundos, este objeto necesita que la hora sea pasado en milisegundos
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute: '2-digit',second:'2-digit'}) //este metodo formatea la hora de acuerdo a la region
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`; //ahora cambiaremos esta variable "tiempo" por tiempoformateado
 }

 mostrarTiempo ()
