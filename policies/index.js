var fs = require("fs");

var dirs = fs.readdirSync("./policies");

var exportMod = {};

for (var i in dirs) {
  dirs[i] = dirs[i].replace(".js", "");
  if (dirs[i] !== "index")
    exportMod[dirs[i]] = require("./" + dirs[i]);
}

module.exports = exportMod;