const { json, packageJson, lines, install } = require("mrm-core");

function task() {
  const file = json("./package.json");
  file.exists();
  install("@ava/typescript");
  install("ava");
  const pkg = packageJson()
    .setScript("test", "ava")
    .setScript("test:watch", "ava --watch")
    .save();
  file.merge({
    ava: {
      typescript: {
        extensions: ["ts", "tsx"],
        rewritePaths: {
          "src/": "dist/"
        }
      }
    }
  });
  file.save();
}

task.description = "Adds ava config";
module.exports = task;
