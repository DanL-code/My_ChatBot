const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: `${secrets.OPENAI_API_KEY}`
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ask', async (req, res) => {
  const userMessage = req.query.message;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo',
    });

    const chatResponse = completion.choices[0].message.content;
    res.send(chatResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
