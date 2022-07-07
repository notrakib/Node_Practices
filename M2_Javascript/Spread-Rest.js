const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  },
};

const copiedPerson = { ...person, geder: "male" };
console.log(copiedPerson);

const hobbies = ["Sports", "Cooking"];

const copiedArray = [...hobbies, "Fishing"];
console.log(copiedArray);

const toArray = (...args) => {
  return args;
};

console.log(toArray(1, 2, 3, 4));

// ...Array/Object is Spread
// (...args) => is Rest
