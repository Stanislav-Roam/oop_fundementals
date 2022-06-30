/**
 * The open-closed principle: Software should be open for extension but closed for modification
 * 
 * Basically, when writing your code, if there was to be a new feature/variant/something added in the future, would that existing code need to be changed?
 * If so, refactor until that is not the case
 */

// Take the following example

class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) { }
}

class Circle {
    constructor(
        public radius: number
    ) { }
}

// We have two shapes, with some basic attributes
// Say we wanted to calculate the area of an array of shapes for whatever reason

function calculateAreaOfShapes(
    shapes: (Rectangle | Circle)[]
) {
    return shapes.reduce((currentTotal: number, shape): number => {
        if (shape instanceof Rectangle) {
            return currentTotal + shape.width * shape.height;
        } 
        if (shape instanceof Circle) {
            return currentTotal + shape.radius * Math.PI;
        }

        return currentTotal;
    }, 0)
}

// This works fine, but what if we needed to add a new shape in the future and make sure we support calculating its area?
// We would need to add the new class as well as modify the calculateAreaOfShapes function

class Square {
    constructor(
        public edgeLength: number,
    ) { }
}

{
    function calculateAreaOfShapes(
        shapes: (Rectangle | Circle | Square)[]
    ) {
        return shapes.reduce((currentTotal: number, shape): number => {
            if (shape instanceof Rectangle) {
                return currentTotal + shape.width * shape.height;
            } 
            if (shape instanceof Circle) {
                return currentTotal + shape.radius * Math.PI;
            }

            if (shape instanceof Square) {
                return currentTotal + shape.edgeLength * shape.edgeLength;
            }
    
            return currentTotal;
        }, 0)
    }
}

// This goes against the open-closed principle as when trying to extend the calculateAreaOfShapes functionality, we are modifying it, which it should be closed to

// We need to refactor this functionality like so:


{

    // We create a Shape interface that specifies a calculateArea method
    interface Shape {
        calculateArea(): number;
    }

    // Each of our shapes implements this Shape interface
    class Rectangle implements Shape {
        constructor(
            public width: number,
            public height: number
        ) { }

        public calculateArea(): number {
            return this.width * this.height;
        }
    }
    
    class Circle implements Shape {
        constructor(
            public radius: number
        ) { }

        public calculateArea(): number {
            return this.radius * Math.PI;
        }
    }

    class Square implements Shape {
        constructor(
            public edgeLength: number,
        ) { }

        public calculateArea(): number {
            return this.edgeLength * this.edgeLength;
        }
    }
    
    // Our function is now much more simple, as we can pass in an array of Shape and call the calculateArea
    // Each class with have its own unique implementation of calculateArea
    function calculateAreaOfShapes(
        shapes: Shape[]
    ) {
        return shapes.reduce((currentTotal: number, shape): number => {
            return currentTotal + shape.calculateArea();
        }, 0)
    }

    /**
     * In this example, we have now changed our code to be open for extension and closed to modification
     * We can extend our functionality by creating a whole new class that implements shape
     * It will automatically be supported by calculateAreaOfShapes
     * When adding a new shape, we do not need to modify the existing code, which is in line with this being closed to modification
     */
}