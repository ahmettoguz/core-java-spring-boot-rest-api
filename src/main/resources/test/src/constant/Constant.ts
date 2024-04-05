class Constant {
  static baseUrl = "http://localhost:8080";
  static adminJwtToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzEyMzE2NjAzLCJleHAiOjE3NDM0MjA2MDN9.NoYi1EhXhnKO0yXQULlt0nLLqb7uu5iPpWRDPcfE_I7HYMKSEuRexVIh356wYj83H3NSpNdaXRuDQX-6LB9yTg";
  static preKey = "apiTest_";
  static password = this.preKey + "Password";
}
module.exports = Constant;
