const fs = require('fs')
const term = require('terminal-kit').terminal ;
const path = require('path');



items = []


let newPathFile = __dirname




function OpenDir(filename) {
  
  items = []
  filenames = fs.readdirSync(filename);
  filenames.forEach(file => { 
      items.push(file)
  }); 
  return items ;
}









async function loop() {
  while (true){
    await new Promise((resolve,reject) => {

      isDir = fs.lstatSync(newPathFile).isDirectory()
      if (isDir){
          items = OpenDir(newPathFile)
          term.singleColumnMenu(items,(err,response ) =>{
          index = response.selectedIndex;
          fname = '/' + response.selectedText;
          newPathFile += fname
          term.clear()
          resolve()
          })
      } else {
          const FileData = fs.readFileSync(newPathFile,'utf8')
          term.cyan(FileData)
          resolve()
      }
      
    })
  }
}


loop()
console.log(`${newPathFile}`);




