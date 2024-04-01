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
}

module.exports = CommonUtil;
