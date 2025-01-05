type SoundType = 'newMessage';

class SoundManager {
    private readonly sounds: Record<SoundType, HTMLAudioElement>;

    constructor() {
        this.sounds = {
            newMessage: new Audio('/sounds/new.mp3'),
        };

        this.sounds.newMessage.volume = 0.8;
    }

    play(type: SoundType): void {
        this.sounds[type]?.play().catch(error => console.error(`Error playing ${type} sound:`, error));
    }
}

export const soundManager = new SoundManager();
