const core = require("@actions/core");
const github = require("@actions/github");

const run = async () => {
  try {
    const token = core.getInput("repo-token", { required: true });
    // const client = github.getOctokit(token);
    console.log(github.context);
  } catch (err) {
    core.setFailed(err.message);
  }
};

module.exports = { run };
