'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const changePlayers = function () {
    // Switch to next player
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        // 2. Display dice (remove hidden class)
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            //Add Dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            changePlayers();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        console.log(scores[activePlayer]);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player's score is >= 100
        // If so, end game
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to next player
            changePlayers();
        }
    }
});