const core = require("@actions/core");
const github = require("@actions/github");

const run = async () => {
  try {
    const token = core.getInput("repo-token", { required: true });
    const project = Number(core.getInput("project", { required: true }));
    const org =
      core.getInput("org") || github.context.payload.repository.owner.login;
    const field = core.getInput("field_name", { required: true });
    const option = core.getInput("option_name", { required: true });
    const client = github.getOctokit(token);
    console.log(github.context.payload.pull_request.number);
    const getProject = await client.graphql(
      `query GetProject($Org: String!, $Proj: Int!){
                  organization(login: $Org){
                    projectV2(number: $Proj) {
                      fields(first:20){
                        nodes {
                          ... on ProjectV2Field {
                            id
                            name
                          }
                          ... on ProjectV2SingleSelectField {
                            id
                            name
                            options {
                              id
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }`,
      {
        Org: org,
        Proj: project,
        headers: {
          Authorization: `Bearer`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(getProject);
  } catch (err) {
    core.setFailed(err.message);
  }
};

module.exports = { run };
