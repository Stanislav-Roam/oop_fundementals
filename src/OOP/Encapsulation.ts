/**
 * Encapsulation is the principle which defines *access* to a particular object
 * A class adhering to Encapsulation must:
 * 1: Define a private state (If needed)
 * 2: Provide a public list of methods that allow manipulation of private state (if needed)
 * 3: Do not set state variables to be public
 * 
 * This principle allows a few things to take place
 * 1: Explicit control over what is returned
 * 2: Allows custom logic to run when getting + setting values
 * 3: Prevents the consumer from setting instance members in a way that is inconsistent
 * 4: Consumer does not need to worry as much about how to format a value, that is left to the class (ties in with Abstraction)
 * 
 * In a nutshell, a class that adheres to Encapsulation must not set instance members to public, and instead provide getters and setters for each instance member that is intended to be publicly written or read
 */

// a baseline class that defines some base behaviour of an animal
// this class implements the concept of Encapsulation. Each private instance variable has the appropriate getter + setter methods
// 
class Cat {
    private _isSleeping: boolean;
    private _isPlaying: boolean;
    private _isEating: boolean;
    private _numberOfTimesRead: number;
    private _numberOfTimesWritten: number;

    // we cannot change this, thus it has a getter and no setter
    private _isAlive: boolean;

    // this is a secret and should not be exposed
    // therefore we assign no public getter or setter methods and keep it within the class to be used if needed
    private _SUPER_SECRET_STRING: string = "shhhhhh";

    protected _incrementRead() {
        this._numberOfTimesRead += 1;
    }

    protected _incrementWrite() {
        this._numberOfTimesWritten += 1;
    }

    // because we created getters, we can now run our own logic on get. Such as this increment read method
    public get isSleeping(): boolean {
        this._incrementRead();
        return this._isSleeping;
    }

    public get isPlaying(): boolean {
        this._incrementRead();
        return this._isPlaying;
    }

    public get isEating(): boolean {
        this._incrementRead();
        return this._isEating;
    }

    public get isAlive(): boolean {
        this._incrementRead();
        return this._isAlive;
    }

    // for each of these methods, we can set the animals state, however they can only be doing one of these at a time
    // encapsulation allows us to correctly set the state within the class's logic without relying on implementors and consumers to do this properly
    public set isSleeping(state: boolean) {
        this._incrementWrite();
        this._isSleeping = state;
        this._isEating = false;
        this._isPlaying = false;
        this.call(state === false ? "wakes up" : "goes to sleep");
    }

    public set isEating(state: boolean) {
        this._incrementWrite();
        this._isSleeping = false;
        this._isEating = state;
        this._isPlaying = false;
        this.call(state === false ? "stops eating" : "starts eating");
    }

    public set isPlaying(state: boolean) {
        this._incrementWrite();
        this._isSleeping = false;
        this._isEating = false;
        this._isPlaying = state;
        this.call(state === false ? "Starts playing" : "starts playing");
    }

    // a private method that is called on our setters as part of the functionality of a class
    private call(action: string): void {
        console.log(`The cat makes a meow sound as it ${action}`);
    }

    public constructor() {
        this._isEating = false;
        this._isPlaying = false;
        this._isSleeping = false;
        this._isAlive = true;
        this._numberOfTimesRead = 0;
        this._numberOfTimesWritten = 0;
    }
}


// after all is said an done, it is very simple for a consumer to use the classes
const cat = new Cat();

cat.isEating = true;
cat.isSleeping = true;
cat.isPlaying = true;