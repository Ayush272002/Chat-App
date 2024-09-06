import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager;

  private constructor() {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    console.log(`Connecting to Redis at ${redisUrl}`);
    this.client = createClient({ url: redisUrl });
    this.client.connect();

    this.publisher = createClient({ url: redisUrl });
    this.publisher.connect();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }

    return this.instance;
  }

  public publish(channel: string, message: string) {
    this.publisher.publish(channel, message);
  }

  public subscribe(channel: string, callback: (message: string) => void) {
    this.client.subscribe(channel, callback);
  }

  public unsubscribe(channel: string) {
    this.client.unsubscribe(channel);
  }
}
