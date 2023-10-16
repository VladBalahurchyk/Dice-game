'use strict'

/*------------Elements selection------------------------------------------------------------------ */
const diceElement = document.querySelector('.dice'),
  btnRollElement = document.querySelector('.btn--roll'),
  btnNewGameElement = document.querySelector('.btn--new'),
  btnHoldElement = document.querySelector('.btn--hold'),
  scoreElement0 = document.querySelector('#score--0'),
  scoreElement1 = document.querySelector('#score--1'),
  totalScoreElement0 = document.querySelector('#total--0'),
  totalScoreElement1 = document.querySelector('#total--1')

let score, activePlayer, totalScores, continueTheGame

/*------initial-setup-------------------------------------------------------------------------------------------- */
const setTheInitialSettings = () => {
  continueTheGame = true
  document.querySelector(`.player--0`).classList.remove('player--winner')
  document.querySelector(`.player--1`).classList.remove('player--winner')
  document.querySelector(`.player--1`).classList.remove('player--active')
  document.querySelector(`.player--0`).classList.add('player--active')
  score = 0
  scoreElement0.textContent = 0
  scoreElement1.textContent = 0
  activePlayer = 0
  totalScores = [0, 0]
  totalScoreElement0.textContent = 0
  totalScoreElement1.textContent = 0
  diceElement.classList.add('hidden')
}
setTheInitialSettings()

/*------change active player-------------------------------------------------------------------------------------------- */
const changeActivePlayer = () => {
  score = 0
  document.querySelector(`#score--${activePlayer}`).textContent = score
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0)
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
}

/*------------btn-Roll------------------------------------------------------------------ */
btnRollElement.addEventListener('click', () => {
  if (continueTheGame) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1
    diceElement.src = `/images/dice${diceNumber}.png`
    diceElement.classList.remove('hidden')

    if (diceNumber !== 1) {
      score += diceNumber
      document.querySelector(`#score--${activePlayer}`).textContent = score
    } else {
      changeActivePlayer()
    }
  }
})

/*------------btn-Hold------------------------------------------------------------------ */
btnHoldElement.addEventListener('click', () => {
  if (continueTheGame) {
    totalScores[activePlayer] += score
    document.querySelector(`#total--${activePlayer}`).textContent = totalScores[activePlayer]
    if (totalScores[activePlayer] < 100) {
      changeActivePlayer()
    } else {
      continueTheGame = false
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`#score--${activePlayer}`).textContent = 'Winner!'
      diceElement.classList.add('hidden')
    }
  }
})

/*------------btn-New game----------------------------------------------------------------- */
btnNewGameElement.addEventListener('click', setTheInitialSettings)
