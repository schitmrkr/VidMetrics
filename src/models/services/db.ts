import type { Channel, RecentChannel } from "@/models/types/channel";
import type { VideoWithStats } from "@/models/types/video";

const DB_NAME = "VidMetricsDB";
const DB_VERSION = 2;

interface AnalyzedChannel {
  channel: Channel;
  videos: VideoWithStats[];
  analyzedAt: string;
}

class IndexedDBService {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<IDBDatabase> | null = null;

  private setupDatabase(db: IDBDatabase): void {
    if (db.objectStoreNames.contains("analyzed_channels")) {
      db.deleteObjectStore("analyzed_channels");
    }
    const channelStore = db.createObjectStore("analyzed_channels", { keyPath: "channel.id" });
    channelStore.createIndex("analyzedAt", "analyzedAt", { unique: false });

    if (db.objectStoreNames.contains("recent_channels")) {
      db.deleteObjectStore("recent_channels");
    }
    const recentStore = db.createObjectStore("recent_channels", { keyPath: "id" });
    recentStore.createIndex("analyzedAt", "analyzedAt", { unique: false });

    if (db.objectStoreNames.contains("saved_channels")) {
      db.deleteObjectStore("saved_channels");
    }
    db.createObjectStore("saved_channels", { keyPath: "id" });
  }

  async init(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("IndexedDB not available on server"));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error("IndexedDB open error:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.setupDatabase(db);
      };

      request.onblocked = () => {
        console.warn("IndexedDB blocked - please close other tabs");
      };
    });

    return this.initPromise;
  }

  private async getStore(storeName: string, mode: IDBTransactionMode = "readonly"): Promise<IDBObjectStore> {
    const db = await this.init();
    const transaction = db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  async saveAnalyzedChannel(channel: Channel, videos: VideoWithStats[]): Promise<void> {
    const store = await this.getStore("analyzed_channels", "readwrite");
    const analyzedChannel: AnalyzedChannel = {
      channel,
      videos,
      analyzedAt: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(analyzedChannel);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAnalyzedChannel(channelId: string): Promise<AnalyzedChannel | null> {
    const store = await this.getStore("analyzed_channels");
    return new Promise((resolve, reject) => {
      const request = store.get(channelId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllAnalyzedChannels(): Promise<AnalyzedChannel[]> {
    const store = await this.getStore("analyzed_channels");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteAnalyzedChannel(channelId: string): Promise<void> {
    const store = await this.getStore("analyzed_channels", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(channelId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async addRecentChannel(channel: RecentChannel): Promise<void> {
    const store = await this.getStore("recent_channels", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(channel);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async updateRecentChannel(channel: RecentChannel): Promise<void> {
    return this.addRecentChannel(channel);
  }

  async getRecentChannel(channelId: string): Promise<RecentChannel | null> {
    const store = await this.getStore("recent_channels");
    return new Promise((resolve, reject) => {
      const request = store.get(channelId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getRecentChannels(limit = 10): Promise<RecentChannel[]> {
    const store = await this.getStore("recent_channels");
    const index = store.index("analyzedAt");

    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, "prev");
      const results: RecentChannel[] = [];

      request.onerror = () => reject(request.error);
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  }

  async clearRecentChannels(): Promise<void> {
    const store = await this.getStore("recent_channels", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async saveChannel(channel: RecentChannel): Promise<void> {
    const store = await this.getStore("saved_channels", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(channel);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async unsaveChannel(channelId: string): Promise<void> {
    const store = await this.getStore("saved_channels", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(channelId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async isChannelSaved(channelId: string): Promise<boolean> {
    const store = await this.getStore("saved_channels");
    return new Promise((resolve, reject) => {
      const request = store.get(channelId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(!!request.result);
    });
  }

  async getSavedChannels(): Promise<RecentChannel[]> {
    const store = await this.getStore("saved_channels");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async toggleSavedChannel(channel: RecentChannel): Promise<boolean> {
    const saved = await this.isChannelSaved(channel.id);
    if (saved) {
      await this.unsaveChannel(channel.id);
      return false;
    } else {
      await this.saveChannel(channel);
      return true;
    }
  }
}

export const db = new IndexedDBService();
export type { AnalyzedChannel };
