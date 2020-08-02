require('dotenv').config()
const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const { Octokit } = require("@octokit/core");

const ghToken = core.getInput('gh_token');

const postComment = async (prNum) => {
  const octokit = new github.GitHub(ghToken)
  const config = {
    ...github.context.repo,
    issue_number: prNum,
    body: `Awaiting approval from PM and PD!`
  }

  octokit.issues.createComment(config)
    .then(newComment => {
      console.log('Results from post request =====> ', newComment)
      const commentID = newComment.data.id
      const commentRefURL = newComment.data.html_url
      const updateCommentURL = newComment.data.url

      const update = () => {
        octokit.issues.updateComment({
          ...github.context.repo,
          comment_id: commentID,
          body: `Awaiting approval from PM and PD, updated!`
        })
          .then(data => console.log(`Updated Successfully`))
          .catch(err => console.log(`Update error`, err))
      }

      const seconds = num => num * 1000

      setTimeout(update, seconds(10))
    })
    .catch(err => console.log(`Adding Comment Error: `, err))
}

const postSlackMsg = () => {
  try {
    /*
      RUN THIS ncc build index.js
    */
    postComment(github.context.payload.pull_request.number);

    const slackHook = core.getInput('slack_hook');
    console.log("SLACKHOOK", slackHook)
    // console.log("PAYLOAD", JSON.stringify(github.context.payload))

    const prNumber = `${JSON.stringify(github.context.payload.pull_request.number)}`
    const token = ghToken

    // const prAndToken = prNumber + '/' + token

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
              "value": "Approve"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Deny"
              },
              "style": "danger",
              "value": "Deny"
            }
          ]
        }
      ]
    }

    axios.post(slackHook, complexMsg)
      .then(data => console.log(`Slack Hook Success!`, data))
      .catch(err => console.log(`Slack Hook Error =>`, err))

  } catch (error) {
    core.setFailed(error.message);
  }
}

// Might need some of this for updating comments
const updatingComment = () => {
  const eventNum = core.getInput('event_num')
  const repo = core.getInput('repo')

  const body = {
    method: 'post',
    data: {
      body: `Hello from the other side. Your PR is waiting from approval from
      PM: ❌
      PD: ❌
      `,
      path: `.github/workflows/hackathon_slack_bot.yml`,
      position: 1,
      line: null
    }
  }

  const headers = {
    authorization: `Bearer ${ghToken}`
  }
}

postSlackMsg()


