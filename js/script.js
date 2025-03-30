console.log('HTML & JS connected');

const userInput = document.getElementById('userInput');
const countdown = document.getElementById('countdown');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
console.log('getElementById',userInput,countdown,result,restart);
const randomNumberID = document.getElementById('randomNumberID');


// 2. Introduce un número del 1 al 3 en el campo de entrada.
userInput.addEventListener('keypress',() => {
    const playerNumber = userInput.value;
    console.log('userInput', playerNumber);
    startCountdown ();
    setRandomNumer (playerNumber);
    
});

// 3. El juego se iniciará automáticamente con una cuenta atrás de 5 segundos.
// ## Pistas: - Puedes usar `setInterval()` para generar el contador de 5 segundos 
// (recuerda que es del 5 al 0, por tanto el intervalo debería ser uno más) 
// 5, 4, 3, 2, 1, 0 ...
function startCountdown () { 
    const countdownTimer = seconds => {
        const interval = setInterval(() => {
            console.log(`${seconds}seconds remaining`);
            countdown.innerText = `Cuenta atrás:${seconds} segundos`
            seconds--;
            if(seconds < 0) {
                clearInterval(interval);
                console.log('Countdown finished');
            }
        },800)
    };
    countdownTimer(5);
};

// El juego genera un número aleatorio del 1 al 3 
// y presenta una cuenta atrás de 5 segundos.
function setRandomNumer (playerNumber) {
    const MIN = 1;
    const MAX = 3;
    // ## Pistas: 
    // Puedes usar `setTimeout()` para generar la asincronía de 5 segundos
    // Usa promesas para una vez pasado ese tiempo devuelva el resultado y puedas trabajar con él
    const promesa = new Promise((resolve) => {
      setTimeout(() => {
        randonNumber1 = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
        resolve(randonNumber1);
      }, 5000);
    }).then((randonNumber) => {
        console.log('Nº en 5s', randonNumber); 
        compareNumbers (playerNumber, randonNumber);
    });
};

// Después de la cuenta atrás, 
// compara el número aleatorio con el número introducido por el usuario.
// 4. Después de la cuenta atrás, el juego evaluará el número introducido.
function compareNumbers (playerNumber, randonNumber) {
    console.log(`Llegod el playerNumber ${playerNumber} y el randonNumber ${randonNumber}`);
    if (playerNumber == randonNumber) {
        showResults ('win');
    } else {
        result.innerHTML = `<p>La bomba ha estallado</p>`
        showResults ('lose');
    }

    // En ambos casos tendrá que salir el núemro elegido 
    // y junto con el número correcto (el generado aleatoriamente). 
    // No se sabrá que número es hasta que pasen 5 segundos.
    setTimeout(() => {
       // result.innerHTML = `<p>Tu numero: ${playerNumber} y el numero aleatorio ${randonNumber}</p>`;
        randomNumberID.innerHTML = `<p class="num-imput">${randonNumber} </p>`;
      }, "1000");
};

const customNumPlayer = document.querySelectorAll('.custom-num')[0];
const customNumBomb = document.querySelectorAll('.custom-num')[1];
const star = document.querySelector('.star');
/**5. Se mostrará un mensaje indicando si has salvado el mundo 
   o si la bomba ha estallado. 
    // Si coinciden, se muestra un mensaje de "¡Has salvado el mundo!", 
    // de lo contrario, se muestra "La bomba ha estallado".*/
function showResults (string) {
    if (string == 'win') {
        console.log("¡Has salvado el mundo!");
        result.innerHTML = `<p>¡Has salvado el mundo!</p>`;
        setTimeout(() => {
            customNumPlayer.style.backgroundColor = "green";
            customNumBomb.style.backgroundColor = "green";
            star.style.background = "none";
           }, "1000");
    } else if (string == 'lose') {
        console.log("La bomba ha estallado");
        result.innerHTML = `<p>La bomba ha estallado</p>`;
        setTimeout(() => {
            customNumPlayer.style.backgroundColor = "red";
            customNumBomb.style.backgroundColor = "red";
            star.style.animation = "starAnimation 4s";
           }, "1000");
    }; 
};

/**## Reiniciar el Juego: Puedes reiniciar el juego en cualquier momento 
 * haciendo clic en el botón "Reiniciar Juego". 
 * Esto comenzará una nueva cuenta atrás 
 * y permitirá que ingreses otro número. */
// ## Pistas: - Crea un botón de reinicio del juego voviendo 
// a iniciar la función inicial o reiniciando la página al pulsarlo.
restart.addEventListener('click', () => {
    console.log('Boton clickado');
    //clearTimeout();
    window.location.reload();
});

const customNum = document.querySelector('.custom-num');
console.log(customNum)
const numImput = customNum.querySelector('.num-imput');
const arrUp = customNum.querySelector('.arr-up');
const arrDown = customNum.querySelector('.arr-down');

arrUp.addEventListener('click', () => {
    numImput.stepUp();
    checkMaxMin();
});
arrDown.addEventListener('click', () => {
    numImput.stepDown();
    checkMaxMin();
});
numImput.addEventListener('input', checkMaxMin);

function checkMaxMin () {
    const numImputValue = parseInt(numImput.value);
    const numImputMax = parseInt(numImput.max);
    const numImputMin = parseInt(numImput.min);

    if (numImputValue === numImputMax) {
        customNum.style.paddingTop = "1.8em";
        arrUp.style.display = "none";
        customNum.style.paddingBottom = "0";
        arrDown.style.display = "block";
    } else if (numImputValue === numImputMin) {
        customNum.style.paddingBottom = "1.8em";
        arrDown.style.display = "none";
        customNum.style.paddingTop = "0";
        arrUp.style.display = "block";
    } else {
        customNum.style.padding = "0";
        arrUp.style.display = "block";
        arrDown.style.display = "block"; 
    }
};