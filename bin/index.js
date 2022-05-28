#!/usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils.js"); 




main();
function main() { 
  yargs.help(true); 

  if (yargs.argv._[0] == null) {
    utils.showHelp();
  }

  if (yargs.argv._[0]) {
    utils.showOptions(yargs.argv._);
  }
}
