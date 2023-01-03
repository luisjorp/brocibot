import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from "openai";

dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX',
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            /* The name of the model that we are using. */
            model: "text-davinci-003",
            /* A template literal. */
            prompt: `${prompt}`,
            /* A parameter that controls the randomness of the bot's response. */
            temperature: 0,
            /* Limiting the number of tokens that the bot can generate. */
            max_tokens: 300,
            /* A parameter that controls the randomness of the bot's response. */
            top_p: 1,
            /* A parameter that controls the randomness of the bot's response. */
            frequency_penalty: 0.5,
            /* A parameter that controls the randomness of the bot's response. */
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            error: e,
        });
    }
});

app.listen(5001, () => {
   console.log('Server is running on port http://localhost:5000');
});
