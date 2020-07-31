require('dotenv').config()
const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const postComment = async (prNum) => {
  const {data} = await axios.post(`https://api.github.com/repos/codecademy-engineering/Codecademy/issues/${prNum}/comments`, {body: "Awaiting approval from PM and designer" });
  console.log('result of post request', data)
}

const test = () => {
  // const test = github.repo()
  // console.log(`Github Repo ===>`, test)


  try {
    /*
      RUN THIS ncc build index.js
    */
   postComment(github.context.payload.pull_request.number);

    const slackHook = core.getInput('slack_hook');
    console.log("SLACKHOOK", slackHook)
    console.log("PAYLOAD", JSON.stringify(github.context.payload))
    const complexMsg = {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*"
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Approve"
              },
              "style": "primary",
              "value": `${JSON.stringify(github.context.payload.pull_request.number)}`
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Deny"
              },
              "style": "danger",
              "value": `${JSON.stringify(github.context.payload.pull_request.number)}`
            }
          ]
        }
      ]
    }

    axios.post(slackHook, complexMsg)
      .then(data => console.log(`Success`, data))
      .catch(err => console.log(`Error =>`, err))

  } catch (error) {
    core.setFailed(error.message);
  }
}

test()
