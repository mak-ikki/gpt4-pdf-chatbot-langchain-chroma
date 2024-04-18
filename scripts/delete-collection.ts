import { COLLECTION_NAME } from '@/config/chroma';
import { ChromaClient } from 'chromadb';

export const deleteCollection = async () => {
  const client = new ChromaClient();
  const collection = await client.getCollection(COLLECTION_NAME);
  console.log('deleting collection...', collection.name);
  await client.deleteCollection(COLLECTION_NAME);
};

(async () => {
  await deleteCollection();
  console.log('ingestion complete');
})();
