// cucumber.js
let common = [
  'features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require-module tsconfig-paths/register', // Load TS config paths
  '--require features/step-definitions/**/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
  '--publish-quiet', //disable message
].join(' ')

module.exports = {
  default: common,
}
