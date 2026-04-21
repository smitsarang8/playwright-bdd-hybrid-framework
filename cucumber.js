module.exports = {
  default: {
    require: [
      "framework/fixtures/**/*.ts",
      "framework/hooks/**/*.ts",
      "tests/steps/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    timeout: 60000
  }
};
