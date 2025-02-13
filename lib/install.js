const fs = require("fs");
const { exec } = require("child_process");
const configFile = "./config.json";

module.exports = function install(pkg) {
  console.log(`Installing ${pkg}...`);

  exec(`npm install ${pkg}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error installing ${pkg}: ${error.message}`);
      return;
    }

    console.log(stdout);
    console.log(`✅ ${pkg} installed successfully!`);

    // Ensure config file exists and is valid
    let config = {};
    if (fs.existsSync(configFile)) {
      try {
        const data = fs.readFileSync(configFile, "utf8");
        config = data.trim() ? JSON.parse(data) : {}; // Handle empty JSON
      } catch (err) {
        console.error("❌ Error reading config.json:", err.message);
        return;
      }
    }

    // Add package to config
    config[pkg] = "latest";

    try {
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      console.log(`✅ ${pkg} added to config.json successfully!`);
    } catch (err) {
      console.error("❌ Error writing to config.json:", err.message);
    }
  });
};