console.log("Starting script ");
console.log("do something");
const globalData = [];
async function init() {
  const result = await fetch("https://restcountries.com/v3.1/name/isr");
  const data = await result.json();
  console.log(globalData.push(data));
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
}

init();
