#!/usr/bin/env node
const { program } = require("commander");

// Efficent way to handle the CLI commands that's why we have used this one!!!

program.version("1.0.0").description("Minimal Package Manager (mpm)");

program
    .command("install <package>")
    .description("Install a package")
    .action((pkg) => {
        require("../lib/install")(pkg);
    });

program
    .command("uninstall <package>")
    .description("Remove a package")
    .action((pkg) => {
        require("../lib/uninstall")(pkg);
    });

program
    .command("list")
    .description("List installed packages")
    .action(() => {
        require("../lib/list")();
    });

program.parse(process.argv);