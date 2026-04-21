module.exports = {
  default: {
    require: [
      "framework/fixtures/**/*.ts",
      "framework/hooks/**/*.ts",
      "tests/steps/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "allure-cucumberjs/reporter"
    ],
    formatOptions: {
      resultsDir: "allure-results"
    },
    timeout: 60000
  }
};