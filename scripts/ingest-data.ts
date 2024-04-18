import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';

import { Chroma } from 'langchain/vectorstores/chroma';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { COLLECTION_NAME } from '@/config/chroma';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

/* Name of directory to retrieve your files from */
const filePath = `backlog/${COLLECTION_NAME}`;

export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    /* const docs = [
      {
        pageContent: `Tortoise: Labyrinth? Labyrinth? Could it Are we in the notorious Little
        Harmonic Labyrinth of the dreaded Majotaur?`,
        metadata: {
          speaker: "Tortoise",
        },
      },
      {
        pageContent: "Achilles: Yiikes! What is that?",
        metadata: {
          speaker: "Achilles",
        },
      },
      {
        pageContent: `Tortoise: They say-although I person never believed it myself-that an I
        Majotaur has created a tiny labyrinth sits in a pit in the middle of
        it, waiting innocent victims to get lost in its fears complexity.
        Then, when they wander and dazed into the center, he laughs and
        laughs at them-so hard, that he laughs them to death!`,
        metadata: {
          speaker: "Tortoise",
        },
      },
      {
        pageContent: "Achilles: Oh, no!",
        metadata: {
          speaker: "Achilles",
        },
      },
      {
        pageContent: "Tortoise: But it's only a myth. Courage, Achilles.",
        metadata: {
          speaker: "Tortoise",
        },
      },
    ];
 */    console.log('split docs', docs);
    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OllamaEmbeddings({
      model: 'mistral',
    });

    let chroma = new Chroma(embeddings, {
      collectionName: COLLECTION_NAME,
    });
    await chroma.index?.reset();

    //embed the PDF documents

    // Ingest documents in batches of 100

    for (let i = 0; i < docs.length; i += 100) {
      const batch = docs.slice(i, i + 100);
      await Chroma.fromDocuments(batch, embeddings, {
        collectionName: COLLECTION_NAME,
      });
    }
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
