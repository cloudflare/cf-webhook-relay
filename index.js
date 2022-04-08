addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const headers = request.headers

    // You should always have a configured webhook secret. We should validate we received a request with this secret
    // before proceeding any further. Environment variables can either be configured in the Cloudflare UI or with the
    // wrangler.toml file (there is an example in this repo).
    // You can read more about this here: https://developers.cloudflare.com/workers/platform/environment-variables
    if (headers.get("cf-webhook-auth") !== WEBHOOK_SECRET) {
        return new Response(":(", {
            headers: {'content-type': 'text/plain'},
            status: 401
        })
    }

    let incReq = await request.json()

    // so we can see what we actually get sent.
    console.log(incReq)


    // if you have created a generic webhook in the notification tab, the request should look the same as the format in
    // sample-data.json. We therefore now want to transform it into a format that our webhook service receives. In this
    // example, I have used Rocket chat. An example of what a webhook for rocket chat looks like it available in
    // rocket-chat.json
    let msg = incReq.text
    let webhookName = incReq.name
    let rocketBody = {
        "text": webhookName,
        "attachments": [
            {
                "title": "Cloudflare Webhook",
                "text": msg,
                "title_link": "https://cloudflare.com",
                "color": "#764FA5"
            }
        ]
    }
    const rocketReq = {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(rocketBody),
    }

    const response = await fetch(
        ROCKET_CHAT_URL,
        rocketReq,
    )
    const res = await response.json()
    console.log(res)
    // TODO: You will likely want to do more with failure scenarios here.

    return new Response(":)", {
        headers: {'content-type': 'text/plain'},
    })
}