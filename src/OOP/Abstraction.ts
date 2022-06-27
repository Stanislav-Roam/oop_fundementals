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
 * 
 * To go further with this idea, it should be the goal of a module developer to expose the minimum surface of a feature possible, a module might contain numerous classes, functions, types etc. However only a very small subset
 * of these will actually be required to functionally use the module. Decreasing the surface area behind minimum unambiguous abstractions will aid the ease-of-use of a given module
 */

class CoffeeMachine {
    public async MakeCoffee(cups: 1 | 2) {
        console.log(`Starting to make coffee using ${cups} cups`);
        await this._brewCoffeeInternal();
        console.log(`Coffee has finished brewing`);
    }

    // Super complex method that runs in the background
    private async _brewCoffeeInternal(): Promise<void> {
        for (const iteration in [...Array(5).keys()]) {
            console.log("Brewing...");
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
}

const machine = new CoffeeMachine();
machine.MakeCoffee(2);
