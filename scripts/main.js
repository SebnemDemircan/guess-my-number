'use strict';

const game = new Game();

const displayMessage = function(message){
    document.querySelector('.message').textContent = message;
}

const onRestartPressed = function() {
    game.PlaySound(SFX.GAME_START);
    game.Restart();

    displayMessage(game.message);
    document.querySelector('.score').textContent = game.score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
}

const onGuessPressed = function() {
    const guess = Number(document.querySelector('.guess').value);
    console.log(game, "Guess: " + guess, typeof guess);

    game.CheckGuess(guess);
    displayMessage(game.message);

    switch (game.state) {
        case States.NO_INPUT:
            game.PlaySound(SFX.ERROR);
            break;
        case States.TOO_HIGH:
        case States.TOO_LOW:
                document.querySelector('.score').textContent = game.score;
            game.PlaySound(SFX.POP);
            break;
        case States.PLAYER_WINS:
            game.PlaySound(SFX.PLAYER_WINS);
            document.querySelector('.number').textContent = game.secretNumber;
            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').style.width = '30rem';

            if (game.hasHighscored) {
                document.querySelector('.highscore').textContent = game.highscore;
            }
            break;
        case States.PLAYER_LOSTS:
            game.PlaySound(SFX.PLAYER_LOSTS);
            document.querySelector('.score').textContent = 0;
            break;
        case States.UNDEFINED:
            throw new Error('Switch statement is state not set!');
        default:
            throw new Error('Something got wrong on switch statements!');
    }
}

document.querySelector('.check').addEventListener('click', function () {
    onGuessPressed();
});

document.querySelector('.again').addEventListener('click', function () {
    onRestartPressed();
});