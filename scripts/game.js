class Game {
    constructor() {
        this.Setup();
        this.SoundsManager = new SoundsManager();
    }

    Setup() {
        this.secretNumber = Math.trunc(Math.random() * 20) + 1;
        this.score = 20;
        this.highscore = 0;
        this.message = Strings.START_GUESSING_TEXT;
        this.state = States.UNDEFINED;
        this.hasHighscored = this.score > this.highscore;
    }

    PlaySound(sound) {
        this.SoundsManager.Play(sound);
    }
    
    CheckGuess(guess) {
        // When there is no input
        if (!guess) {
            this.message = Strings.NO_NUMBER_TEXT;
            this.state = States.NO_INPUT;
        }
        // When player wins
        else if (guess === this.secretNumber) {
            this.message = Strings.CORRECT_NUMBER_TEXT;
            this.state = States.PLAYER_WINS;
            this.TryToUpdateHighscore();
        }
        // When guess is wrong
        else if (guess !== this.secretNumber) {
            if (this.score > 1) {
                this.score--;

                if (guess > this.secretNumber) {
                    this.message = Strings.TOO_HIGH_TEXT;
                    this.state = States.TOO_HIGH;
                } else {
                    this.message = Strings.TOO_LOW_TEXT;
                    this.state = States.TOO_LOW;
                }
            }
            else {
                this.message = Strings.LOST_THE_GAME_TEXT;
                this.state = States.PLAYER_LOSTS;
            }
        }
        // Something is problem on implementation logic
        else {
            this.message = Strings.ERROR_ON_CHECK_GUESS_TEXT;
            this.state = States.UNDEFINED;
        }
    }

    TryToUpdateHighscore() {
        if (this.score > this.highscore) {
            this.highscore = this.score;
        }
    }

    Restart() {
        let highscore = this.highscore;
        this.Setup();
        this.highscore = highscore;

        console.log("Game has restarted!");
    }
}