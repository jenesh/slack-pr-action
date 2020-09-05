# Slack PR Action

This action triggers a slack message to notify PM/PDs to test the live site based on the PR. 

## Inputs

### `slack_hook`

**Required** The slack hook endpoint to send the message to. Default `"World"`.


### `gh_token`

**Required** Token to authenticate the network requests for Github API. Default `""`.


### `event_num`

**Required** Event number which is also the PR number. Default `""`.


### `repo`

**Required** The repo that the PR is located in. Default `""`.

## Outputs


The time we greeted you.

## Example usage of variables

```yaml
name: Slack PR Action
  uses: jenesh/slack-pr-action@v0.5.2
  with:
    slack_hook: ${{ secrets.SLACK_HOOK }}
    gh_token: ${{ secrets.GITHUB_TOKEN }}
    event_num: ${{ github.event.number }}
    repo: ${{ github.repository }}
```






