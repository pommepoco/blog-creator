// Load FileSystem module
var fs = require("fs");

// scandir like
var files = fs.readdirSync("./rules");

// require all policies and put them in object
var exportMod = {};
for (var i in files) {
  files[i] = files[i].replace(".js", "");
  if (files[i] !== "index")
    exportMod[files[i]] = require("./" + files[i]);
}

// Export all policies of the dir
module.exports = exportMod;