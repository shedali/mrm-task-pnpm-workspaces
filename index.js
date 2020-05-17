const { json, packageJson, lines, install } = require("mrm-core");

function task() {
  const pkg = packageJson()
  .setScript("test", "pnpm recursive run test")
  .setScript("dev", "pnpm recursive run dev")
  .setScript("build", "pnpm recursive run build")
  .save();

  lines('pnpm-workspace.yaml')
  .add('packages:')
  .add("  - '**'")
  .save();

  lines('.npmrc')
  .add('link-workspace-packages=true').save();
}

task.description = "adds pnpm workspace";
module.exports = task;
