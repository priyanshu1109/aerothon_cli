module.exports = { showHelp: showHelp, showOptions: showOptions };
const { execSync } = require("child_process");
var clc = require("cli-color");
const { supported } = require("./tech.js");
const exec = require("child_process").exec;

function showHelp() {
  console.log(clc.red("Invalid or no NHP Command Used."));
  console.log("");
  console.log("To view list of available backend-frontend combinationsasdf");
  console.log(
    "#  use command " + clc.blueBright("ls") + " or " + clc.blueBright("list")
  );
  console.log(
    "To create a new project from any of the available " +
    clc.yellowBright("<backend-frontend>")
  );
  console.log(
    "#  use command " +
    clc.blueBright("i") +
    " or " +
    clc.blueBright("init") +
    " with the available " +
    clc.yellowBright("<backend-frontend>") +
    " name"
  );
}

function showOptions(command) {
  let techList = supported(); 
  if (command[0] == "ls" || command[0] == "list") { listCommand(); }
  else if (command[0] == "init" || command[0] == "i") {
    for (let i = 0, len = techList.length; i < len; i++) {
      if (command[1] == techList[i].name) {        
        initCommand(command[1]);
        return
      }      
    }
      console.log(clc.redBright("The requested framework is not supported yet"));
  }

  else {
    showHelp();
  }
}

function initCommand(command) {
  let techList = supported();
  for (let i = 0, len = techList.length; i < len; i++) {
    if (command == techList[i].name) {
      console.log("--------------------------------");
      console.log(clc.cyan("INITIATING " + command));
      console.log("at location ");
      console.log("processing ... " + clc.blue(techList[i].git));
      var op = exec("git clone " + techList[i].git, (error, stdout, stderr) => {
        console.log(`......${stdout}`);
        if (error) {
          if (stderr[0] == "f") {
            console.log(clc.redBright("ERROR: Project configuration not found."));
          } else {
            console.log(
              clc.redBright(
                "ERROR: Project already exists in the specified location."
              )
            );
            console.log(clc.redBright("SOLUTION: change the project location."));
            //console.log(clc.redBright(error));
            //console.log(clc.redBright(stderr));
          }
        }
      });
    }
  }
}





function listCommand() {
  let techList = supported();
  console.log(clc.greenBright("(•)") + " -> Backend Framework Installed")
  console.log(clc.red("(X)") + " -> Backend Framework Not installed")
  for (let i = 0, len = techList.length; i < len; i++) {
    try {
      exec(techList[i].backend_version, (error, stdout, stderr) => {

        let backend = clc.green("(•)")
        if (error) {
          if (stderr[0] == "f") {
            backend = clc.red("(X)")
          } else {
            backend = clc.red("(X)")
          }
        }
        console.log(clc.cyan(techList[i].name) + " " + backend);
      });
    }
    catch (err) {
      console.log(err)
    }
  }
}
