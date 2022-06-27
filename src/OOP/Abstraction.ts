/**
 * Abstraction as a concept is something that every developer comes across whenever they use a library
 * In a nutshell, Abstraction is the concept by which we hide implementation details from a consumer
 * The most common example is making a cup of coffee, as users we know:
 * 1: Walk up to the machine
 * 2: Put ground coffee into the portafilter
 * 3: Insert the portafilter into the machine
 * 4: Place a cup under the nozzle
 * 5: Press the 1 or 2 cup button
 * 6: Remove the cup and drink it
 * 
 * For us, the process is simple. But behind the scenes the machine is going through a relatively complex process in order to produce the coffee
 * In this scenario, the process of actually making the coffee is abstracted behind the act of pressing the button.
 * 
 * This concept allows us to bundle up bits of complex functionality behind abstractions through the use of functions with known inputs + outputs for example.
 * A system with a high level of abstraction means that developers need not worry about how the entire system works, and can just focus on their own functionality and logic
 * 
 * To go further with this idea, it should be the goal of a module developer to expose the minimum surface of a feature possible, a module might contain numerous classes, functions, types etc. However only a very small subset
 * of these will actually be required to functionally use the module. Decreasing the surface area behind minimum unambiguous abstractions will aid the ease-of-use of a given module
 * 
 * Another application of abstraction is passing whatever data to a module that might be needed, and the module consumes what it needs from that data. The entity sending the data to the module doesn't need knowledge of what the module might need at a given time
 * This allows plug + play functionality where consuming modules may be changed without needing to change the sender
 */

// in this example, we have a coffee machine class that handles creating coffee for us
// It has the public "MakeCoffee" method, that takes in the number of cups required, and handles the rest
// The process itself is rather complicated, however all the user of this class needs to know that there is a method that makes coffee
// Perhaps the consumer of this class is creating their own class that is an entire cafe, having this CoffeeMachine that just makes coffee will add less complexity to the solution
class CoffeeMachine {

    // each super complex part of the process
    private _brewingSteps: string[] = [
        "Heating element",
        "Pumping water",
        "Pre-infusion",
        "Increasing pumping pressure",
        "Turning off pump and heating element"
    ];

    public async MakeCoffee(cups: 1 | 2) {
        console.log(`Starting to make coffee using ${cups} cups`);
        await this._brewCoffeeInternal();
        console.log(`Coffee has finished brewing`);
    }

    // Super complex method that runs in the background
    private async _brewCoffeeInternal(): Promise<void> {
        for (const iteration in [...Array(5).keys()]) {
            console.log(this._brewingSteps[iteration]);
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
}

const machine = new CoffeeMachine();

// making coffee is so easy!
machine.MakeCoffee(2);
