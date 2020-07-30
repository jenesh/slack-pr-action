const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);

  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  const slackHook = core.getInput('slack_hook')
  const slackJSON = core.getInput('slack_json')

  const options = {
    method: 'post',
    url: slackHook,
    data: JSON.stringify(slackJSON),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  }

  axios.post(options)
} catch (error) {
  core.setFailed(error.message);
}
