type SoundType = 'newMessage' | 'typing';

class SoundManager {
    private readonly sounds: Record<SoundType, HTMLAudioElement>;

    constructor() {
        this.sounds = {
            newMessage: new Audio('/sounds/new.mp3'),
            typing: new Audio('/sounds/typing.mp3'),
        };

        this.sounds.newMessage.volume = 0.8;
        this.sounds.typing.volume = 0.6;
    }

    play(type: SoundType): void {
        this.sounds[type]?.play().catch(error => console.error(`Error playing ${type} sound:`, error));
    }
}

export const soundManager = new SoundManager();
