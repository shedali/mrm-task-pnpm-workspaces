const { json, packageJson, lines, install } = require("mrm-core");
//add file pnpmworkspace

function task() {
  const file = json("./package.json");
  file.exists();
  // install("@ava/typescript");
  // install("ava");
  const pkg = packageJson()
  .setScript("test", "pnpm recursive run test")
  .setScript("dev", "pnpm recursive run dev")
  .setScript("build", "pnpm recursive run build")
  .save();

  lines('pnpm-workspace.yaml').add(`
    packages:
    - '**'
    `).save();

  lines('.npmrc').add('link-workspace-packages = true')
  
  file.save();
}

task.description = "adds pnpm workspace";
module.exports = task;
