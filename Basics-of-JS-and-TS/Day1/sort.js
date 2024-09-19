const numbers = [1,5,89,3,85,26,7,8];

const ascNumber = [...numbers];
const dscNumber = [...numbers];
const asec = ascNumber.sort((a,b) => a-b);
const desc = dscNumber.sort((a,b) => b-a);

console.log(asec);
console.log(desc);

const strings = ["Lakshya", "Ayush", "Paras", "Harshit"];

const asecString = [...strings];
const descString = [...strings];

const ascen = asecString.sort();
const descen = descString.sort().reverse();

console.log(ascen);
console.log(descen);

const arrObjects = [
    {
        id: 5,
        name: "Lakshya"
    },
    {
        id: 6,
        name: "Harshit"
    },
    {
        id: 1,
        name: "Ayush"
    },
]

const asecObj = [...arrObjects];
const descObj = [...arrObjects];

const ascenId =asecObj.sort((a, b) => a.id - b.id);
const descId =descObj.sort((a, b) => b.id - a.id);

console.log(ascenId);
console.log(descId);

const asecObj1 = [...arrObjects];
const descObj1 = [...arrObjects];

const ascenName =asecObj1.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
const descName =descObj1.sort((a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  });

console.log(ascenName);
console.log(descName);