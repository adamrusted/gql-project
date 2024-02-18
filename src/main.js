const core = require("@actions/core");
const github = require("@actions/github");

const run = async () => {
  try {
    const token = core.getInput("repo-token", { required: true });
    const project = core.getInput("project", { required: true });
    const select = core.getInput("select_name", { required: true });
    const column = core.getInput("column_name", { required: true });
    const client = github.getOctokit(token);
    console.log(github.context.payload.pull_request.number);
    const getProject = await fetch(``, {
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query GetProject($Org: String!, $Proj: Int!){
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
        variables: {
          Proj: project,
          Org: github.context.payload.repository.owner.login,
        },
      }),
    }).then((res) => res.json());
    console.log(getProject);
  } catch (err) {
    core.setFailed(err.message);
  }
};

module.exports = { run };
