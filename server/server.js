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

// Define a function to generate a response given an input prompt
async function generateResponse(prompt) {
    // Generate a completion using the given prompt
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.5,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });

    // Return the generated response text
    return response.data.choices[0].text;
}

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello from BrociBot',
    });
});

app.post("/", async (req, res) => {
    try {
        // Retrieve the input text from the request body
        const prompt = req.body.prompt;

        const responseText = await generateResponse(prompt);

        // Send the response text back to the client
        res.status(200).send({
            bot: responseText,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: e,
        });
    }
});

app.listen(5000, () => {
   console.log('Server is running on port http://localhost:5000');
});
