// Creamos nuevo elemento '<h1></h1>' en el documento y se asigna a la variable 'titulo', pero aún no se encuentra en la página web

    // let titulo = document.createElement("h1");

// El elemento creado se añade como hijo del elemento 'body' del documento. Ahora el elemento está presente en la página web
    // document.body.appendChild(titulo);
// El texto "BUSCAMINAS" aparecerá dentro del elemento 'h1' en la página web.
    // titulo.innerHTML = "BUSCAMINAS";
// Añadimos la clase CSS "titulo" al elemento 'h1' en la página web
    // titulo.classList.add("titulo");

// Creamos un nuevo elemento '<table></table>' en el documento y se asigna a la variable 'tabla', pero aún no se encuentra en la página web
let tabla = document.createElement("table");
// El elemento creado se añade como hijo del elemento 'body' del documento. Ahora el elemento está presente en la página web
document.body.appendChild(tabla);
// Añadimos la clase CSS "tabla" al elemento '<table></table>' en la página web
tabla.classList.add("tabla");


// Declaramos un array bidimensional (de longitud variable)
let arrayBidimensional = [];

let casillasReveladas = 0;

let tiempoTranscurrido = 0;
let intervaloTiempo;

function actualizarContadorTiempo() {
    tiempoTranscurrido++;
    if (tiempoTranscurrido < 10){
        document.getElementById('contadorTiempo').innerText = `00${tiempoTranscurrido}`;
    // Inicia el intervalo del contador de tiempo
    }
    else if(tiempoTranscurrido >= 10 && tiempoTranscurrido < 100){
        document.getElementById('contadorTiempo').innerText = `0${tiempoTranscurrido}`;
    // Inicia el intervalo del contador de tiempo
    }
    else if(tiempoTranscurrido >= 100){
        document.getElementById('contadorTiempo').innerText = `${tiempoTranscurrido}`;
    // Inicia el intervalo del contador de tiempo
    }
    
}

function iniciarContadorTiempo(){
    if (!intervaloTiempo){
        intervaloTiempo = setInterval(actualizarContadorTiempo, 1000);
    }
}


// Declaramos una función para crear una tabla con dos parámetros
function crearTabla(filas, columnas){



    //Declaramos dos variables que se utilizarán para crear filas y columnas
    let fila;
    let columna;
    let celdaIndividual;
    // let cabecera;

    for(let i=0; i<filas; i++){

        fila = document.createElement("tr");
        tabla.appendChild(fila);
            
        for(let j=0; j<columnas; j++){

         /*   if(i==0){
                cabecera = document.createElement("th");
                fila.appendChild(cabecera);

            }
            else { */

            columna = document.createElement("td");
            fila.appendChild(columna);
            columna.classList.add("columna");   
                
            // Creamos un elemento "<div></div>" y se asigna a la variable celdaIndividual para poder acceder a caada una de las celdas
            celdaIndividual = document.createElement("div");
            columna.appendChild(celdaIndividual);
            celdaIndividual.classList.add("celdaIndividual");
            
        }
    }


    // Llamamos a iniciarContadorTiempo para iniciar el contador después de crear la tabla
    iniciarContadorTiempo();
    
}



// Llamamos a la función 'crearTabla' con los argumentos 8 y 8
crearTabla(8, 8);

let numeroBombas = 10;
let numeroDeFilas = 8; // Esto debemos ajustarlo con las filas y las columnas que decidamos en el juego

// Ajusta el ancho del marcador
let marcador = document.querySelector('.marcador');
marcador.style.width = `${53.2 * numeroDeFilas}px`;

let banderas = document.querySelector('.banderas');
banderas.innerHTML = `0${numeroBombas}`;






// Función para comprobar minas adyacentes (en diagonal, horizontal y vertical)
function comprobarBombas(arrayBidimensional, fila, columna){

    let bombasAlrededor = 0;
    let filas = arrayBidimensional.length;
    let columnas = arrayBidimensional[0].length;

    for(let i = fila - 1; i <= fila + 1; i++){
        for(let j = columna - 1; j <= columna + 1; j++){


            if(i>=0 && i<filas && j>=0 && j<columnas){

                if(arrayBidimensional[i][j] == '\u{1F4A3}'){
                    bombasAlrededor++;
                }

            }
        }
    }

    return bombasAlrededor;
}



let emoji = document.querySelector('.emojis');



// Función para mostrar todas las bombas
function finDeJuego(array, filas, columnas){
    // Seleccionamos todas las celdas del tablero
    let celdas = tabla.querySelectorAll(".columna");

    // Recorre todas las filas del array bidimensional
    for (let i = 0; i < filas; i++) {
        // Recorre todas las columnas del array bidimensional
        for (let j = 0; j < columnas; j++) {
            // Calcula el índice de la celda actual en el array unidimensional de celdas
            let indiceCelda = i * columnas + j;

            // Accede a la celda correspondiente en el array unidimensional
            let celda = celdas[indiceCelda];

            // Accede al elemento interno de la celda que contiene el contenido (div con clase "celdaIndividual")
            let celdaInterna = celda.querySelector(".celdaIndividual");

            // Verifica si hay una bomba en la celda actual
            if (array[i][j] === '\u{1F4A3}') {

                celdaInterna.innerHTML = '\u{1F4A3}';
                celdaInterna.style.opacity = 1;
                emoji.innerHTML = '&#128557';
                clearInterval(intervaloTiempo);
            } else {
                let bombasAlrededor = comprobarBombas(array, i, j);
                if (bombasAlrededor > 0) {
                    celdaInterna.innerHTML = bombasAlrededor.toString();
                    celdaInterna.classList.add(`num-${bombasAlrededor}`);
                   
                    
                }
            }
        }
    }
}



// Función para colocar bombas aleatorias en el tablero
function ponerBombas(bombas, filas, columnas){

    let stopJuego = false;

    // Inicializamos la matriz bidimensional
    for(let i=0; i<filas; i++){
        arrayBidimensional[i] = [];
        for(let j=0; j<columnas; j++){
            // Establecemos todos los elementos de la matriz bidimensional en cero que será donde no hay minas
            arrayBidimensional[i][j] = 0;
        }
    }

    // Rellenamos la matriz con bombas aleatorias
    
    for (let i=0; i< bombas; i++){
        let posicionAleatoriaFila = Math.floor(Math.random() * filas);
        let posicionAleatoriaColumna = Math.floor(Math.random() * columnas);

        if (arrayBidimensional[posicionAleatoriaFila][posicionAleatoriaColumna] == '\u{1F4A3}'){
            // Si hay una bomba en esa posición volvemos a sacar una posición aleatoria
            i--;
        }
        else{
            arrayBidimensional[posicionAleatoriaFila][posicionAleatoriaColumna] = '\u{1F4A3}';
        }
    }


    // Actualizamos los número en las celdas que no tienen bombas
    for (let i=0; i<filas; i++){
        for(let j=0; j<columnas; j++){
            if(arrayBidimensional[i][j] == 0){
               let num = comprobarBombas(arrayBidimensional, i, j);
               arrayBidimensional[i][j] = num;
            }
        }
    }


   

    // Actualizamos la tabla con las bombas y los números
    for (let i=0; i<filas; i++){
        for(let j=0; j<columnas; j++){
            


            if(arrayBidimensional[i][j] === '\u{1F4A3}'){
                arrayBidimensional[i][j].innerHTML = '\u{1F4A3}';
            }
            else {
                arrayBidimensional[i][j].innerHTML = comprobarBombas(arrayBidimensional, i, j);
            }
        }
    }


    function actualizarNumerosCeldas(array, filas, columnas) {
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                if (array[i][j] === 0) {
                    // Si la celda está vacía, actualiza con el número de bombas circundantes
                    array[i][j] = comprobarBombas(array, i, j);
                }
            }
        }
    }
    
    // Seleccionamos todas las celdas del tablero alm
    let celdas = tabla.querySelectorAll(".columna");
    
    
    

    // Recorre todas las filas del array bidimensional
    for (let i = 0; i < filas; i++) {
        // Recorre todas las columnas del array bidimensional
        for (let j = 0; j < columnas; j++) {
            
            // Calcula el índice de la celda actual en el array unidimensional de celdas
            let indiceCelda = i * columnas + j;

            // Accede a la celda correspondiente en el array unidimensional
            let celda = celdas[indiceCelda];

            // Asignamos eventos de clic a cada celda del tablero


    //event.stopPropagation();






            let cell;
            

            celda.addEventListener("click", (e) => {
                cell = e.target;

                if (stopJuego){
                        //emoji = '128513';
                        return;
                }

                if(!cell.classList.contains(".bandera")){
            
                    // Accede al elemento interno de la celda que contiene el contenido (div con clase "celdaIndividual")
                    let celdaInterna = celda.querySelector(".celdaIndividual");

                    if (arrayBidimensional[i][j] === '\u{1F4A3}') {
                        finDeJuego(arrayBidimensional, filas, columnas);
                        stopJuego = true;
                    } else if (casillasReveladas == ((filas*columnas)-bombas)-1){
                        
                        let victoria = document.createElement("h1");
                        document.body.appendChild(victoria);
                        victoria.innerHTML = "¡¡HAS GANADO!! &#128170 &#128526;";
                        victoria.classList.add("victoria");
                        console.log("VICTORIA");
                        clearInterval(intervaloTiempo);
                    } else {
                        asignarContenidoCelda(celda, i, j, arrayBidimensional);
                    }
                }
            });
    }
}

    // Función para asignar el contenido y estilo a una celda específica en función de su contenido en el array bidimensional
    function asignarContenidoCelda(celda, i, j, arrayBidimensional) {
        // Accede al elemento interno de la celda que contiene el contenido (div con clase "celdaIndividual")
        let celdaInterna = celda.querySelector(".celdaIndividual");

        if (arrayBidimensional[i][j] === '\u{1F4A3}') {
            // Añade la clase "bomba-celda" a la celda para aplicar estilos de bomba
            celda.classList.add("bomba-celda");
            // Muestra el símbolo de bomba en el interior de la celda
            celdaInterna.innerHTML = '\u{1F4A3}';
            // Si existe una bomba queremos que aparezcan el resto de las bombas
            finDeJuego(arrayBidimensional, filas, columnas);
        } else {
            // Si la celda no contiene una bomba, comprueba cuántas bombas hay alrededor
            let bombasAlrededor = comprobarBombas(arrayBidimensional, i, j);
            if (bombasAlrededor > 0) {
                // Si hay bombas alrededor, muestra el número de bombas
                celdaInterna.innerHTML = bombasAlrededor.toString();
                // Añade una clase específica de número para aplicar estilos
                celdaInterna.classList.add(`num-${bombasAlrededor}`);

                 // Si la celda no tiene la clase "no-bomba-celda", agrega la clase "fondo"
                if (!celda.classList.contains("no-bomba-celda")) {
                    celda.classList.add("fondo");
                    celda.classList.add("revelada");
                   // celdaInterna.classList.add(`revelada`);
                // if(celdaInterna.classList.contains(`revelada`)){
                        casillasReveladas++;
                        console.log(casillasReveladas);
                    //}

                }

            } else {
                // Si no hay bombas alrededor, revela celdas vacías en cascada
                revelarCeldasVacias(arrayBidimensional, i, j);
            }

            // Si no hay bombas alrededor, agrega la clase "no-bomba-celda" a la celda
            if (bombasAlrededor === 0){
                celda.classList.add("no-bomba-celda");
                
            }
            
            // Hacemos visible la celda interna
            celdaInterna.style.opacity = 1;
        }
    }


    // Creamos una función para revelar celdas vacías en cascada a partir de una celda específica
    function revelarCeldasVacias(arrayBidimensional, fila, columna) {
        // Obttenemos el número de filas y columnas en el array bidimensional
        let filas = arrayBidimensional.length;
        let columnas = arrayBidimensional[0].length;

        // Define una función recursiva para revelar las celdas vacías en cascada
        function revelarCelda(f, c) {
            if (f >= 0 && f < filas && c >= 0 && c < columnas) {
                let celdaActual = document.querySelector(`.tabla tr:nth-child(${f + 1}) td:nth-child(${c + 1})`);
                let celdaInterna = celdaActual.querySelector(".celdaIndividual");

                if (!celdaActual.classList.contains("no-bomba-celda")) {
                    celdaActual.classList.add("no-bomba-celda");
                    celdaInterna.style.opacity = 1;

                     // Verificar si la celda no ha sido contada antes
                    if (!celdaActual.classList.contains("revelada")) {
                        casillasReveladas++;
                        celdaActual.classList.add("revelada");
                        console.log(casillasReveladas);
                    }


                    // Si la celda es vacía, continúa revelando celdas vecinas
                    if (arrayBidimensional[f][c] === 0) {
                        revelarCelda(f - 1, c);
                        revelarCelda(f + 1, c);
                        revelarCelda(f, c - 1);
                        revelarCelda(f, c + 1);
                    } else {
                        // Si la celda contiene un número, muestra el número y cambia su fondo a beige
                        let numero = arrayBidimensional[f][c];
                        celdaInterna.innerHTML = numero.toString();
                        celdaInterna.classList.add(`num-${numero}`);
                       
                    }
            }   }
        }

        // Inicia la revelación de celdas vacías
        revelarCelda(fila, columna);
    }

}
    




// Añade un listener para el evento contextmenu



tabla.addEventListener("contextmenu", function (event) {
  
    event.preventDefault();

    let target = event.target;

    // Busca el elemento '.celdaIndividual' ascendiendo en la jerarquía del DOM desde el elemento clicado
    let celdaInterna = target.closest('.columna');

    //event.stopPropagation();


    if(celdaInterna.classList.contains(".bandera")){
        celdaInterna.style.backgroundImage = 'none';
        /* celdaInterna.style.backgroundImage = 'rgb(173, 168, 168)'; */
        numeroBombas++;

        if(numeroBombas<10){
            banderas.innerHTML = `00${numeroBombas}`;
        }
        else {
            banderas.innerHTML = `0${numeroBombas}`;
        }
        console.log(celdaInterna);
        celdaInterna.classList.remove(".bandera");
        console.log(numeroBombas);
        
    }
    else if (numeroBombas>0 && !celdaInterna.classList.contains("no-bomba-celda")){
        celdaInterna.style.backgroundImage = 'url(imagenes/bandera.png)';
        celdaInterna.style.backgroundSize = '94%';
        numeroBombas--;
        if(numeroBombas<10){
            banderas.innerHTML = `00${numeroBombas}`;
        }
        else {
            banderas.innerHTML = `0${numeroBombas}`;
        }
        console.log(celdaInterna);
        celdaInterna.classList.add(".bandera");  
    }

    console.log(numeroBombas);


//    banderaColocada = !banderaColocada;
    /* 
    // Verifica si se hizo clic en una celda y si es así, muestra o quita la bandera
         if (columna.dataset.flag == 'bandera'){
            celdaInterna.style.backgroundImage = 'rgb(173, 168, 168)';
         }
         else {
            celdaInterna.style.backgroundImage = 'url(imagenes/bandera.png)';
            columna.dataset.flag = 'bandera';
            celdaInterna.style.backgroundSize = '94%';
         }
    }
    */
});


emoji.addEventListener("click", () => {
    window.location.reload();
});


/* celda.addEventListener("click", () => {
                if (stopJuego){
                    return;
                }
            // Accede al elemento interno de la celda que contiene el contenido (div con clase "celdaIndividual")
            let celdaInterna = celda.querySelector(".celdaIndividual");

            if (arrayBidimensional[i][j] === '\u{1F4A3}') {
                finDeJuego(arrayBidimensional, filas, columnas);
                stopJuego = true;
            } else {
                asignarContenidoCelda(celda, i, j, arrayBidimensional);
            }

        }); */

/* ESTO TIENE QUE COINCIDIR CON CREARTABLA(12,12)*/
ponerBombas(10, 8, 8);

console.log(arrayBidimensional);