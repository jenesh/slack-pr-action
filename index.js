require('dotenv').config()
const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const test = () => {
  const test = github.repo()
  console.log(`Github Repo ===>`, test)


  try {
    const slackHook = process.env.slackHook

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
              "value": `${github.context.payload}`
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Deny"
              },
              "style": "danger",
              "value": `${github.context.payload}`
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