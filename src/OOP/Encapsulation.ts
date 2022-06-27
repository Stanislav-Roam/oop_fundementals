abstract class Animal {
    private _isSleeping: boolean;
    private _isPlaying: boolean;
    private _isEating: boolean;

    public get isSleeping(): boolean {
        return this._isSleeping;
    }

    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    public get isEating(): boolean {
        return this._isEating;
    }

    public set isSleeping(state: boolean) {
        this._isSleeping = state;
        this._isEating = false;
        this._isPlaying = false;
        this.makeAnimalCall(state === false ? "wakes up" : "goes to sleep");
    }

    public set isEating(state: boolean) {
        this._isSleeping = false;
        this._isEating = state;
        this._isPlaying = false;
        this.makeAnimalCall(state === false ? "stops eating" : "starts eating");
    }

    public set isPlaying(state: boolean) {
        this._isSleeping = false;
        this._isEating = false;
        this._isPlaying = state;
        this.makeAnimalCall(state === false ? "Starts playing" : "starts playing");
    }

    private makeAnimalCall(action: string): void {
        console.log(`The ${this.animalName} makes a ${this.call} sound as it ${action}`);
    }

    abstract get call(): string;
    abstract get animalName(): string;

    public constructor() {
        this._isEating = false;
        this._isPlaying = false;
        this._isSleeping = false;
    }
}

class Dog extends Animal {
    get animalName(): string {
        return "Dog";
    }
    get call(): string {
        return "barking";
    }
}

class Whale extends Animal {
    get animalName(): string {
        return "Whale";
    }
    get call(): string {
        return "clicking";
    }
}

class Snake extends Animal {
    get animalName(): string {
        return "Snake";
    }
    get call(): string {
        return "hissing";
    }
}

const dog = new Dog();
const whale = new Whale();
const snake = new Snake();

dog.isEating = true;
whale.isSleeping = true;
snake.isPlaying = true;