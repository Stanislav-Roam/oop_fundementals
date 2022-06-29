/**
 * The interface segregation principle is defined as:
 * "Clients should not be forced to depend on the interfaces they do not use"
 * 
 * In plain english, make your interfaces as small as possible when using them to define behaviour
 */

{
    // in the following example, we have a Bird interface, which defines two methods, fly and walk, seems logical right?
    interface Bird {
        fly(): void;
        walk(): void;
    }

    // Here we have defined a Tui class, Tui's as we know can both fly and walk, so we define the implementations for both walk and fly
    class Tui implements Bird {
        public fly() {
            /// ...
        }
        public walk() {
            /// ...
        }
    }

    // However we now have an issue when defining a Kiwi class
    // Kiwi are flightless, so in this scenario we need to make sure fly does not work for us
    // This goes directly against the Interface Segregation Principle, as the kiwi is now depending on an interface it does not use
    // The fundamental issue here, is in defining a Bird interface, we have included components that all things we might want to
    // label as a bird to have, when not taking into account that not all birds will need all of the components of a bird as defined in the interface
    class Kiwi implements Bird {
        public fly() {
            throw new Error('Unfortunately, Kiwi can not fly!');
        }
        public walk() {
            /// ...
        }
    }

}

{
    // Lets revisit the previous example, but now make it follow the interface segregation principle
    // We can achieve this by defining interfaces that are more specific
    // These are sometimes referred to as Role Interfaces

    interface CanWalk {
        walk(): void;
    }

    interface CanFly {
        fly(): void;
    }

    class Tui implements CanWalk, CanFly {
        public fly() {
            /// ...
        }
        public walk() {
            /// ...
        }
    }

    class Kiwi implements CanWalk {
        public walk() {
            /// ...
        }
    }

    // we have now defined more specific interfaces that follow the Interface Segregation Principle
    // This change of approach has led to more maintainable code that does not introduce unnecessary bloat

}
