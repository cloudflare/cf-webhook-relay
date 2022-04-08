# Cloudflare Webhook Relay
If you use a tool that is not currently supported by [Cloudflare's Webhook Notification System](https://developers.cloudflare.com/fundamentals/notifications/create-notifications/configure-webhooks), 
you can use [Cloudflare Worker's](https://workers.cloudflare.com/) in combination with a generic webhook to support pretty much any tool on the planet.

This repo contains an example of how to transform the generic webhook response so that it can be delivered to rocket Chat.
The entirety of the codebase is 60 lines long and heavily commented. 

Check out `index.js` to get started.

# How Would I adapt this for a Different Tool?
The general principle behind making this work is to transform the generic webhook response into the one
your service of choice expects. In this repo you can see in `sample-data.json` what a Cloudflare Generic Webhook Response
looks like. You can also see in `rocket-chat.json` what our target payload looks like. It is simply an exercise of transforming
one to the other and passing it on. 

# Further Reading
- [Configuring Notifications in Cloudflare](https://workers.cloudflare.com/)
- [Getting Started with Cloudflare workers](https://workers.cloudflare.com/)