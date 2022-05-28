const { exec, execSync } = require("child_process");

install()
function install() {
  let x = exec("npm install https://github.com/mayurs-code/framework-CLI.git -g", (error, stdout, stderr) => {
    console.log("NHP Installed") 
  });
  console.log("Installing NHP")
}