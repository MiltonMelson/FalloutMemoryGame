const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = document.getElementById('score');
let startbutton = document.getElementById("start");
let gameWin = 0;

function flipCard() {
   if (lockBoard) return;

   // prevents double click locking
   if (this === firstCard) return;

   this.classList.toggle('flip');

   if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
   }
   secondCard = this;
   score.innerHTML++;
   checkForMatch();
}

function checkForMatch() {
   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
   if (isMatch) {
      disableCard();
      gameWin++;
   }
   else {
      unflipCards();
   }
}

function disableCard() {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);

   resetBoard();
}

function unflipCards() {
   lockBoard = true;
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
   }, 1500);
}

function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
}

(function shuffle() {
   cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 19);
      card.style.order = randomPos;
   })
})();

function timer() {
   var sec = 50;
   var timer = setInterval(function () {
      if (sec < 10) {
         document.getElementById('timer').innerHTML = '00:0' + sec;
      } else {
         document.getElementById('timer').innerHTML = '00:' + sec;
      }
      sec--;
      if (sec < 0 || gameWin == 6) {
         clearInterval(timer);
         gameOver();
      }
   }, 1000);
}

function startGame() {
   startbutton.style.pointerEvents = "none";
   timer();
   cards.forEach(card => card.addEventListener('click', flipCard));
}

function reset() {
   window.location.reload();
}

function gameOver() {
   document.getElementById("board").style.display = "none";
   let gameOverEle = document.getElementById("gameover");
   gameOverEle.innerHTML = "<h1>GAME OVER</h1><br>";
   if (gameWin == 6) {
      gameOverEle.innerHTML += "<h1>You Won!</h1>";
   }
   else {
      gameOverEle.innerHTML += "<h1>Better Luck Next Time</h1>";
   }
}