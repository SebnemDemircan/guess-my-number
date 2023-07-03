class SoundsManager {
    Play(sound) {
        this.audio = new Audio(sound);
        this.audio.play();
    }
}
