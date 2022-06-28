/**
 * Inheritance is the concept by which an object/class is able to obtain some/all properties of another object/class
 * Most of us will be familiar with the concept of one class extending another class. E.g "Class Dog extends Animal"
 * 
 * When extending a class, the new subclass has access to all private, protected and public members of its superclass
 * A subclass is free to implement its own members, whether that's methods, variables or some combination of both
 * 
 * If a superclass has a constructor, it is also run in the constructor of a subclass
 * 
 * All objects of a subclass, are also types of their superclass
 * 
 * In Typescript we usually have 3 different types of inheritance. Extends, Implements and Abstract Extension
 * 
 * Extends: 
 *  - class keyword
 *  - A class can only extend one class
 *  - The superclass has logic for each of its methods, a subclass can inherit these methods and use them
 *  - You can create an instance of the superclass
 * 
 * Abstract Extension:
 *  - abstract class keyword
 *  - You cannot create an instance of an abstract class, it must be extended
 *  - A class can only extend one class
 *  - Similar to Extends
 *  - Used in cases where you would like to define a partial implementation of a superclass that is meant to be extended
 *      - if you would like to implement a method signature that is to be implemented in a subclass, you can use the abstract keyword
 *  - Also used in cases where you would like to add some common functionality to many classes
 * 
 *  * Implements:
 *  - interface keyword
 *  - A class can implement many interfaces
 *  - An interface that can be used to specify required method signatures for a class
 *  - Used a lot in frameworks where inversion of control is a large part of the functionality
 *  - You cannot create an instance of an interface
 *      - this gets a little muddy in typescript as interfaces can also be used in place of "type" and 
 *        are often used to define object structure without needing to create an instance of something
 * 
 * NOTE: Implements doesn't totally come under the umbrella of Inheritance, as an interface does not have functionality, but merely defines the "shape" of a class
 * That being said it is good to bring up here
 * 
 * In all 3 cases, all subclasses are of type superclass. However variables that type an object as the superclass will only have access to members of the superclass, not the subclass
 */

// Below is a more complex example from the Encapsulation doc that also implements inheritance in a few forms

// a class that we can use to audit access to a class instance
abstract class Auditable {
    private _numberOfTimesRead: number;
    private _numberOfTimesWritten: number;

    protected _incrementRead() {
        this._numberOfTimesRead += 1;
    }

    protected _incrementWrite() {
        this._numberOfTimesWritten += 1;
    }

    public get numberOfTimesRead(): number {
        return this._numberOfTimesRead;
    }

    public get numberOfTimesWritten(): number {
        return this._numberOfTimesWritten;
    }

    constructor() {
        this._numberOfTimesRead = 0;
        this._numberOfTimesWritten = 0;
    }
}

// a baseline class that defines some base behaviour of an animal
// this class implements the concept of Encapsulation. Each private instance variable has the appropriate getter + setter methods
// 
abstract class Animal extends Auditable {
    private _isSleeping: boolean;
    private _isPlaying: boolean;
    private _isEating: boolean;

    // we cannot change this, thus it has a getter and no setter
    private _isAlive: boolean;

    // this is a secret and should not be exposed
    // therefore we assign no public getter or setter methods and keep it within the class to be used if needed
    private _SUPER_SECRET_STRING: string = "shhhhhh";

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
        this.makeAnimalCall(state === false ? "wakes up" : "goes to sleep");
    }

    public set isEating(state: boolean) {
        this._incrementWrite();
        this._isSleeping = false;
        this._isEating = state;
        this._isPlaying = false;
        this.makeAnimalCall(state === false ? "stops eating" : "starts eating");
    }

    public set isPlaying(state: boolean) {
        this._incrementWrite();
        this._isSleeping = false;
        this._isEating = false;
        this._isPlaying = state;
        this.makeAnimalCall(state === false ? "Starts playing" : "starts playing");
    }

    // a private method that is called on our setters as part of the functionality of a class
    private makeAnimalCall(action: string): void {
        console.log(`The ${this.animalName} makes a ${this.call} sound as it ${action}`);
    }

    // Abstract methods that allow a derived class to implement its custom metadata
    abstract get call(): string;
    abstract get animalName(): string;

    public constructor() {
        super();
        this._isEating = false;
        this._isPlaying = false;
        this._isSleeping = false;
        this._isAlive = true;
    }
}

interface Walker {
    walk(): void;
}

interface Swimmer {
    swim(): void;
}

interface Slitherer {
    slither(): void;
}

class Dog extends Animal implements Walker {

    // abstract method in Animal that must be implemented
    get animalName(): string {
        return "Dog";
    }

    // abstract method in Animal that must be implemented
    get call(): string {
        return "barking";
    }

    // Method signature in Walker that must be implemented
    walk() {
        console.log("The dog walks away from you");
    }
}

class Whale extends Animal implements Swimmer {

    // abstract method in Animal that must be implemented
    get animalName(): string {
        return "Whale";
    }

    // abstract method in Animal that must be implemented
    get call(): string {
        return "clicking";
    }

    // Method signature in Walker that must be implemented
    swim() {
        console.log("The whale swims away from you");
    }
}

class Snake extends Animal implements Slitherer {

    // abstract method in Animal that must be implemented
    get animalName(): string {
        return "Snake";
    }

    // abstract method in Animal that must be implemented
    get call(): string {
        return "hissing";
    }

    // Method signature in Walker that must be implemented
    slither() {
        console.log("The whale swims away from you");
    }
}

// after all is said an done, it is very simple for a consumer to use the classes
const dog: Dog = new Dog();
const whale: Whale = new Whale();
const snake: Snake = new Snake();

// can access setters
dog.isEating = true;
whale.isSleeping = true;
snake.isPlaying = true;

// can access methods prescribed by interfaces
dog.walk();
whale.swim();
snake.slither();

// superclass access
const dog_animal: Animal = dog; // dog is type Dog and Animal so it can be assigned to an Animal variable without complaint
dog.isEating;

// interface access
const whale_interface: Swimmer = whale; // whale is type Whale and also Swimmer, so it can be assigned to a swimmer variable without complaint
//whale_interface.isEating; // this doesn't work as the Swimmer type does not have the isEating member, even though the whale object itself has it

