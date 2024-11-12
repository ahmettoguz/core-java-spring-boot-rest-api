class CommonUtil {
  /*
        //usage
        const response = axios.get("http://localhost:3000");

        const result = await CommonUtil.waitUntil(response, {
        timeout: 100,
        interval: 200,
        });
   */
  static async waitUntil(promise, options) {
    const { timeout = 10000, interval = 200 } = options || {};

    return new Promise((resolve, reject) => {
      const checkPromise = async () => {
        try {
          const result = await Promise.race([
            promise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), timeout)
            ),
          ]);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const intervalId = setInterval(checkPromise, interval);

      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        reject(new Error("Max timeout reached"));
      }, timeout);

      checkPromise()
        .then(() => {
          clearTimeout(timeoutId);
          clearInterval(intervalId);
        })
        .catch(() => {
          clearInterval(intervalId);
        });
    });
  }

  /*
        //usage
        await CommonUtil.sleepInMs("8000");
   */
  static async sleepInMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /* 
    // usage
    const randomWord = CommonUtil.generateRandomWord();
   */
  static generateRandomWord() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let randomWord = "";

    while (randomWord.length < 6) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);

      randomWord += randomChar;
    }

    // add ms
    randomWord += "_" + String(Date.now()).slice(-5);

    return randomWord;
  }

  /* 
    // usage
    // min and max included
    const randomNumber = CommonUtil.generateRandomNumber(0, 10);
   */
  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static extractJwtToken(response) {
    const authorizationHeader = response.headers["authorization"];

    // check
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
      throw new Error("Invalid authorization header");

    return authorizationHeader.substring(7);
  }
}

export default CommonUtil;
