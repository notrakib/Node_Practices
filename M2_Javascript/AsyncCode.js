// const fetchData = () => {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Done!");
//     }, 1500);
//   });
//   return promise;
// };

// setTimeout(() => {
//   console.log("Timer is done!");
//   fetchData()
//     .then((text) => {
//       console.log(text);
//       return fetchData();
//     })
//     .then((text2) => {
//       console.log(text2);
//     });
// }, 2000);

// console.log("Hello!");
// console.log("Hi!");
console.log(1);
const fetchData = (a) => {
  console.log(3);
  a("Done");
  console.log(6);
};
console.log(2);
fetchData((text) => {
  console.log(4);
  console.log(text);
  console.log(5);
});
