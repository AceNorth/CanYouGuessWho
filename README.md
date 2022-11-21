# Can You Guess Who? An excellent game

This app makes use of [DALL-E-2](https://openai.com/dall-e-2/) to run a simple Guess Who?-style game. Each round, four prompts are generated, and one of the four is randomly selected and sent to the DALL-E API to generate an image. The point of the game is to guess which of the prompts was used to generate the image.

<img width="410" alt="Screen Shot 2022-11-22 at 11 04 43 AM" src="https://user-images.githubusercontent.com/20522677/203363524-9f4dcaa8-6290-497d-a774-0980beaf6601.png">

To use yourself:

1. Clone this repository
2. Sign up for an OpenAI beta account and get an [API Key](https://beta.openai.com/account/api-keys)
3. Navigate to this repository on your local system
4. Create a file called `.env` and add the following contents:

```
API_TOKEN=yourApiToken
```

5. Run `npm run ios` to run the app on an iOS simulator
