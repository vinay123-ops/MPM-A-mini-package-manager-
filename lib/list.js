const fs = require("fs");
const configFile = "./config.json";

module.exports = function list() {
  if (!fs.existsSync(configFile)) {
    console.log("No packages installed.");
    return;
  }

  const config = JSON.parse(fs.readFileSync(configFile));
  console.log("Installed packages:");
  Object.keys(config).forEach((pkg) => console.log(`- ${pkg}`));
};