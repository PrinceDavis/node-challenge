import config from 'config';
import { createClient } from 'redis';

let client = createClient();

export async function connectClient() {
  const cleint = createClient({ url: config.redisUrl });
  await client.connect();
  return cleint;
}

export function saveData(key: string, value: any) {
  if (!client) {
    client = createClient();
  }
  return client.set(key, JSON.stringify(value), {
    EX: 60,
  });
}

export function getDate(key: string) {
  if (!client) {
    client = createClient();
  }
  return client.get(key);
}

export function closeClient() {
  if (client) {
    client.disconnect();
  }
}
