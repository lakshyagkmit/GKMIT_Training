//forEach

const digits = [1, 2, 3, 4, 5, 6];
digits.forEach(function(element){
  console.log(element * 2); // Output: 2, 4, 6, 8, 10, 12
});

//map

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

const peopleWithGreetings = people.map(person => {
  return {
    ...person,  
    greeting: `Hi, my name is ${person.name} and I am ${person.age} years old.`
  };
});

console.log(peopleWithGreetings);

//filter

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = numbers.filter(function (number) {
  return number % 2 === 0;
});

console.log(evenNumbers);

//reduce 

const sum = numbers.reduce((total, ele) => total + ele);
console.log(sum);

//find

const array = [10, 11, 3, 20, 5];

const greaterThanTen = array.find(element => element > 10);

console.log(greaterThanTen)