const userInput = document.getElementById('userInput'),
    countdown = document.getElementById('countdown'),
    result = document.getElementById('result'),
    restart = document.getElementById('restart'),
    randomNumberID = document.getElementById('randomNumberID');

userInput.addEventListener('keypress',() => {
    const playerNumber = userInput.value;
    startCountdown ();
    setRandomNumer (playerNumber);
    
});

function startCountdown () { 
    const countdownTimer = seconds => {
        const interval = setInterval(() => {
            countdown.innerText = `Cuenta atrás:${seconds} segundos`
            seconds--;
            if(seconds < 0) {
                clearInterval(interval);
            }
        },800)
    };
    countdownTimer(5);
};

function setRandomNumer (playerNumber) {
    const MIN = 1;
    const MAX = 3;
    const promesa = new Promise((resolve) => {
      setTimeout(() => {
        randonNumber1 = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
        resolve(randonNumber1);
      }, 5000);
    }).then((randonNumber) => {
        compareNumbers (playerNumber, randonNumber);
    });
};

function compareNumbers (playerNumber, randonNumber) {
    if (playerNumber == randonNumber) {
        showResults ('win');
    } else {
        result.innerHTML = `<p>La bomba ha estallado</p>`
        showResults ('lose');
    };
    setTimeout(() => {
        randomNumberID.innerHTML = `<p class="num-imput">${randonNumber} </p>`;
    }, "1000");
};

const customNumPlayer = document.querySelectorAll('.custom-num')[0];
const customNumBomb = document.querySelectorAll('.custom-num')[1];
const star = document.querySelector('.star');

function showResults (string) {
    if (string == 'win') {
        result.innerHTML = `<p>¡Has salvado el mundo!</p>`;
        setTimeout(() => {
            customNumPlayer.style.backgroundColor = "green";
            customNumBomb.style.backgroundColor = "green";
            star.style.background = "none";
           }, "1000");
    } else if (string == 'lose') {
        result.innerHTML = `<p>La bomba ha estallado</p>`;
        setTimeout(() => {
            customNumPlayer.style.backgroundColor = "red";
            customNumBomb.style.backgroundColor = "red";
            star.style.animation = "starAnimation 4s";
        }, "1000");
    }; 
};


restart.addEventListener('click', () => {
    window.location.reload();
});

const customNum = document.querySelector('.custom-num');
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