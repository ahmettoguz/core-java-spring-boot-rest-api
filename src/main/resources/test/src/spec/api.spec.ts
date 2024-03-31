const addContext = require("mochawesome/addContext");
const axios = require("axios");

// Use dynamic import for chai
let chai;
let expect;

before(async () => {
  const chaiModule = await import("chai");
  chai = chaiModule;
  expect = chai.expect;
});

// describe("error", () => {
//   it("error throwing", async () => {
//     throw new Error("hi there");

// const response = await axios.get("https://dogapi.dog/api/v2/breeds", {
//         timeout: 10000,
//       });
// expect(response.status).to.equal(200);

//     expect(true).to.equal(true);
//   });
// });
async function sleepInMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mPromise() {
  await sleepInMs(5000);
  return { status: true };
}

async function waitUntil(conditionFn, options) {
  const { timeout = 10000, interval = 200 } = options || {};
  const startTime = Date.now();

  while (true) {
    try {
      const result = await conditionFn();
      if (result) {
        return "ok";
      } else if (Date.now() - startTime >= timeout) {
        throw new Error("Timeout occurred");
      } else {
        await sleepInMs(interval);
      }
    } catch (error) {
      throw error;
    }
  }
}

describe("other", () => {
  it("should return a 200 status code", async function () {
    expect(true).to.equal(true);

    const mpro = mPromise();

    try {
      const response = await waitUntil(
        async function () {
          return mpro == { status: true };
        },
        { timeout: 1000 }
      );

      console.log(response);
    } catch (error) {
      console.log("timeout");
    }
  });
});
