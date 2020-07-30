const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  const slackHook = `https://hooks.slack.com/services/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`

  console.log(`SLACK HOOK TYPE`, typeof slackHook)
  console.log(`SLACK HOOK`, slackHook)

  const jsonData = {
    text: 'Hello world!'
  }

  // const options = {
  //   method: 'post',
  //   url: `${slackHook}`,
  //   data: JSON.stringify(jsonData),
  //   headers: { 'content-type': 'application/json' }
  // }

  // axios.post(options)
  //   .then(data => console.log(`Sucess`))
  //   .catch(err => console.log(`Error =>`, err))

  axios.post(slackHook, jsonData)
    .then(data => console.log(`Sucess`, data))
    .catch(err => console.log(`Error =>`, err))
  
} catch (error) {
  core.setFailed(error.message);
}
