/**
 * The core of the Dependency Inversion Principle, is that code that depends on other code, should rely on abstractions instead of 
 * concrete implementations
 */

{
    // here we define an interface for some functionality that represents a Person
    interface Person {
        introduceSelf(): void;
    }

    // here we define an interface for some functionality that introduces something
    interface IntroductionService {
        introduce(): void;
    }

    // Now, say we have 2 types of people, engineers and musicians
    // with the current scheme, we can create 2 different services that implements  IntroductionService
    // Which will log out what kind of person they are
    class EngineerIntroductionService implements IntroductionService {
        public introduce() {
            console.log('I am an engineer');
        }
    }

    class MusicianIntroductionService implements IntroductionService {
        public introduce() {
            console.log('I am a musician');
        }
    }


    // If we do away with Dependency Inversion, we will now need to create 2 classes for each type of person we want to support
    class Engineer implements Person {
        private introductionService = new EngineerIntroductionService();
        public introduceSelf() {
            this.introductionService.introduce();
        }
    }

    class Musician implements Person {
        private introductionService = new MusicianIntroductionService();
        public introduceSelf() {
            this.introductionService.introduce();
        }
    }

    // This is a big issue, as now both Engineer and Musician are dependent on their own specific introduction service
    // If we had a new kind pf person appear, we would need to add in a new introduction service, as well as a new type of person class to add this
    // This can also be hard to unit test, as the introduction services are hard-coded dependencies, very difficult to mock
    // What if our introduction services had some API calls, or did something with a database? We would struggle to stop this blocking unit tests

    // A solution is to refactor in order to use dependency inversion
}


{
    // here we define an interface for some functionality that introduces something
    interface IntroductionService {
        introduce(): void;
    }

    // Now, say we have 2 types of people, engineers and musicians
    // with the current scheme, we can create 2 different services that implements  IntroductionService
    // Which will log out what kind of person they are
    class EngineerIntroductionService implements IntroductionService {
        public introduce() {
            console.log('I am an engineer');
        }
    }

    class MusicianIntroductionService implements IntroductionService {
        public introduce() {
            console.log('I am a musician');
        }
    }

    // instead of having 2 classes to represent people, we can now just have a person class, that takes in a class that implements IntroductionService
    // this is consistent with Dependency Inversion, as Person is now dependent on an abstraction instead of a concrete implementation
    class Person {
        private readonly introductionService: IntroductionService;

        constructor(introductionService: IntroductionService) {
            this.introductionService = introductionService;
        }
        public introduceSelf() {
            this.introductionService.introduce();
        }
    }

    // Now when creating a Person, we can pass an instance of the service we would like it to use
    // This makes unit testing very easy as we can pass in mock services instead of the real ones
    const engineer = new Person(new EngineerIntroductionService());
    const musician = new Person(new MusicianIntroductionService());

    engineer.introduceSelf(); // I am an engineer
    musician.introduceSelf(); // I am a musician
}