# ⚛️☎️ React Twilio Phone ☎️⚛️

This application is an implementation of [Twilio Client](https://www.twilio.com/docs/voice/client/javascript) using [React](https://reactjs.org/).

It is a work in progress, being built on my [Twitch stream](https://www.twitch.tv/phil_nash/). Join in and watch the progress or suggest features!

* [Current features](#current-features)
  * [Ideas for future work](#ideas-for-future-work)
* [Running this project](#running-this-project)
  * [Things you will need](#things-you-will-need)
  * [Project Setup](#project-setup)
  * [ngrok](#ngrok)
  * [TwiML App](#twiml-app)
  * [Running the application](#running-the-application)
* [License](#license)

## Current features

Currently this application can:

- [x] Make outbound phone calls
- [x] Cancel outbound phone calls
- [x] Receive inbound phone calls
- [x] Reject inbound phone calls
- [x] Hang up on an active call
- [x] Mute an active call
- [x] Detect speech and warn while on mute (using [Meyda](https://meyda.js.org/))

### Ideas for future work

- [ ] Play DTMF tones down the phone
- [ ] Build a rotary dialler 😅
- [ ] Store a call log
- [ ] Use the web contact picker API to choose a contact to call

## Running this project

### Things you will need

- [Node.js](https://nodejs.org/)
- A Twilio account (you can [sign up for a free Twilio account here](https://www.twilio.com/try-twilio))
- A [Twilio number](https://www.twilio.com/console/phone-numbers) you can make and receive calls with
- [ngrok](https://ngrok.com/) for tunnelling HTTP requests to your local application (you can use any tunnelling service you want, but [ngrok is my favourite](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html))

### Project Setup

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/philnash/react-twilio-phone.git
cd react-twilio-phone
npm install
```

Copy the `.env.example` file to `.env` and fill in with your Twilio credentials. You will need:

| Environment variable        | Description                                                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TWILIO_ACCOUNT_SID          | Your Account Sid, found on your [Twilio console](https://www.twilio.com/console)                                                                                                                                         |
| TWILIO_API_KEY              | Credentials for the Twilio API, used to sign access tokens. Create your [API Key and Secret in the Twilio console](https://www.twilio.com/console/voice/settings/api-keys)                                               |
| TWILIO_API_SECRET           | Credentials for the Twilio API, used to sign access tokens. Create your [API Key and Secret in the Twilio console](https://www.twilio.com/console/voice/settings/api-keys)                                               |
| TWILIO_TWIML_APP_SID        | You will need to create a [TwiML App](https://www.twilio.com/console/voice/twiml/apps) to set a URL that will be used to direct outbound calls. See [the docs on the TwiML app below](#twiml-app) for how to set this up |
| TWILIO_ALLOW_INCOMING_CALLS | If you want to receive incoming calls, set this to "true"                                                                                                                                                                |
| FROM_NUMBER                 | The [Twilio number](https://www.twilio.com/console/phone-numbers) you want to use as your caller ID for outbound calls                                                                                                   |

### ngrok

If you choose to use ngrok to tunnel from the public to this application you will need to run it with an extra setting. Start ngrok like this:

```bash
ngrok http 3000 --host-header localhost:3000
```

### TwiML App

A [TwiML App](https://www.twilio.com/console/voice/twiml/apps) is a container for webhok URLs that can be used for voice and messaging applications. A Twilio Client application requires a TwiML App to tell Twilio where to send a webhook request to when an outbound connection is made. In this application, the webhook request should be a `POST` request to `/voice`.

When running this application locally you will need to create a tunnel from the public internet to the local web application server, you can do this with [ngrok](#ngrok) or another service. Set the Voice _request URL_ to `https://YOUR_NGROK_SUBDOMAIN.ngrok.io/voice` and the request method to HTTP `POST`.

### Running the application

After you have followed the steps above and have your `.env` file complete, you can run the application with the command:

```bash
npm run dev
```

You can start the web application server on its own with the command:

```bash
npm run server
```

Run the React application on its own with the command:

```bash
npm start
```

The React application will run on port 3000 and the server port 3001.

## License

[MIT](LICENSE) © Phil Nash
