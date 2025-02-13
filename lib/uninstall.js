const fs = require("fs");
const { exec } = require("child_process");
const configFile = "./registry/config.json";

module.exports = function uninstall(pkg) {
  console.log(`Uninstalling ${pkg}...`);

  exec(`npm uninstall ${pkg}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error uninstalling ${pkg}: ${error.message}`);
      return;
    }

    if (fs.existsSync(configFile)) {
      let config = JSON.parse(fs.readFileSync(configFile));
      delete config[pkg];
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    }

    console.log(`${pkg} uninstalled successfully!`);
  });
};