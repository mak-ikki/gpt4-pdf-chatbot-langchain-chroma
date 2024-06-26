import { Chroma } from 'langchain/vectorstores/chroma';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { Ollama } from "@langchain/community/llms/ollama";

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context. Answer in french language.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: Chroma) => {
  const model = new Ollama({
    temperature: 0, // increase temperature to get more creative answers
    model: 'mistral', //change this to gpt-4 if you have access
  }) ;

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
