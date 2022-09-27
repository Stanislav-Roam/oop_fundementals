/**
 * The Liskov substitution principle states that replacing an instance of a class with its child class should not produce any negative side effects
 * 
 * Basically, if you are extending a class, you need to make sure that the subclass does not introduce regression where it may be used instead of its parent class
 * 
 * This also ties in a little with Dependency inversion, in that if you change a class that is hidden behind an abstraction, you need to make sure that
 * it does not introduce side effects that may cause errors or a regression of any kind
 * 
 * A good rule of thumb is to ensure that all typing changes are consistent, as well as all exit conditions matching
 * I.e don't throw an error if the parent does not
 * This is most likely to come up when testing input
 */


