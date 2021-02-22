// function sum() {
//     let sum = 0;
//     for (i=0; i<arguments.length; i++) {
//         sum += arguments[i];
//     }
//     return sum;
// }

function sum(...args) {
    return args.reduce(function (acc, ele) {
        return acc += ele;
    });
}


// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind = function(context) {
    const that = this;
    let bindArgs = [];
    for(i=1; i<arguments.length; i++) {
        bindArgs.push(arguments[i]);
    }
    return function() {
        let callArgs = [];
        for (i = 0; i < arguments.length; i++) {
            callArgs.push(arguments[i]);
        }

        return that.apply(context, bindArgs.concat(callArgs) )
    }
}

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true


