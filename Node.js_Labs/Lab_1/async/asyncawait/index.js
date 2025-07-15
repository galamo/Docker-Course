// (function(require,module, ) { // MY CODE })()

const axios = require("axios");
module.exports = { callApi1 };

async function callApi1() {
  console.log("455");
  const result = await axios.get("https://currentPage1.com");
  console.log("333");
}

async function callApi2() {
  console.log("451");
  const result = await axios.get("https://currentPage2.com");
  console.log("1212");
}

console.log("666");
callApi2();
callApi1();
console.log("888");

// solution
// 666 => 451 => 455 => 888 => 1212 || 333
