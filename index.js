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
  console.log(`SLACK HOOK TYPE`, typeof slackHook)
  console.log(`SLACK HOOK`, slackHook)
  // const slackJSON = core.getInput('slack_json')
  const jsonData = {
    text: 'Hello world!'
  }

  const options = {
    method: 'post',
    url: slackHook,
    data: JSON.stringify(jsonData),
    headers: { 'content-type': 'application/json' }
  }

  try {
    axios.post(options)
  } catch (err) {
    console.log(`Error =>`, err)
  }
} catch (error) {
  core.setFailed(error.message);
}
