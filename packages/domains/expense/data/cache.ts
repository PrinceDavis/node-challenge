import config from 'config';
import { createClient } from 'redis';

let client = createClient();

/**
 * Method to allow for connections to a redis instance
 * @returns redis client
 */
export async function connectClient() {
  const cleint = createClient({ url: config.redisUrl });
  await client.connect();
  return cleint;
}

/**
 * Save data to a redis instance
 * @param key value to be used as data key
 * @param value value to be stored
 * @returns
 */
export function saveData(key: string, value: any) {
  if (!client) {
    client = createClient();
  }
  return client.set(key, JSON.stringify(value), {
    EX: 60,
  });
}

/**
 * retrieve data from redis
 * @param key value to be used as data key
 * @returns redis string value
 */
export function getData(key: string) {
  if (!client) {
    client = createClient();
  }
  return client.get(key);
}

/**
 * close connection to redis client
 */
export function closeClient() {
  if (client) {
    client.disconnect();
  }
}
