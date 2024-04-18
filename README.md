# GPT-4 & LangChain - Create a ChatGPT Chatbot for Your PDF Files

Use the new GPT-4 api to build a chatGPT chatbot for multiple Large PDF files.

Tech stack used includes LangChain, Chroma, Typescript, Openai, and Next.js. LangChain is a framework that makes it easier to build scalable AI/LLM apps and chatbots. Chroma is a vectorstore for storing embeddings and your PDF in text to later retrieve similar docs.

[Tutorial video](https://www.youtube.com/watch?v=ih9PBGVVOO4)

[Join the discord if you have questions](https://discord.gg/E4Mc77qwjm)

The visual guide of this repo and tutorial is in the `visual guide` folder.

**If you run into errors, please review the troubleshooting section further down this page.**

Prelude: Please make sure you have already downloaded node on your system and the version is 18 or greater.

## Development

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your platform.

2. Run Mistral with Ollama
   
```
ollama run mistral
```

3. Clone the repo or download the ZIP

```
git clone [github https url]
```

3. Install packages

First run `npm install yarn -g` to install yarn globally (if you haven't already).

Then run:

```
yarn install
```

After installation, you should now see a `node_modules` folder.

4. Set up your `.env` file

- Copy `.env.example` into `.env`
  Your `.env` file should look like this:

```
COLLECTION_NAME=

```

- Choose a collection name where you'd like to store your embeddings in Chroma. This collection will later be used for queries and retrieval.

5. In a new terminal window, run Chroma in the Docker container:

```
docker run -p 8000:8000 ghcr.io/chroma-core/chroma:0.3.21
```

## Convert your PDF files to embeddings

**This repo can load multiple PDF files**

1. Inside `backlog` folder, create another forlder with the collection name. Add there your pdf files or folders that contain pdf files.

2. Run the script `npm run ingest` to 'ingest' and embed your docs. If you run into errors troubleshoot below.

## Run the app

Once you've verified that the embeddings and content have been successfully added to your Pinecone, you can run the app `npm run dev` to launch the local dev environment, and then type a question in the chat interface.

**General errors**

- Make sure you're running the latest Node version. Run `node -v`
- Try a different PDF or convert your PDF to text first. It's possible your PDF is corrupted, scanned, or requires OCR to convert to text.
- `Console.log` the `env` variables and make sure they are exposed.
- Make sure you're using the same versions of LangChain and Pinecone as this repo.
- Check that you've created an `.env` file that contains your valid (and working) API keys, environment and index name.
- If you change `modelName` in `OpenAI`, make sure you have access to the api for the appropriate model.
- Make sure you have enough OpenAI credits and a valid card on your billings account.
- Check that you don't have multiple OPENAPI keys in your global environment. If you do, the local `env` file from the project will be overwritten by systems `env` variable.
- Try to hard code your API keys into the `process.env` variables if there are still issues.

## Credit

Frontend of this repo is inspired by [langchain-chat-nextjs](https://github.com/zahidkhawaja/langchain-chat-nextjs)
