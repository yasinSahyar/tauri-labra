import { DBState, Vote } from '@/types/LocalTypes';
import { create } from 'zustand';
import Loki from 'lokijs';

type DBStore = DBState & {
  init: () => Promise<void>;
  addFaces: (doc: Float32Array) => Float32Array | undefined;
  getAllFaces: () => (Float32Array & LokiObj)[];
  deleteAllFromDB: () => void;
  addVotes: (vote: Vote) => Vote | undefined;
  getAllVotes: () => (Vote & LokiObj)[];
};

const useStore = create<DBStore>((set, get) => ({
  db: null,
  facesCollection: null,
  votesCollection: null,
  isReady: false,
  faces: [],
  votes: [],

  init: async () => {
    return new Promise((resolve) => {
      const db = new Loki('face.db', {
        autoload: true,
        autosave: true,
        autoloadCallback: () => {
          const facesCollection =
            db.getCollection('faces') || db.addCollection('faces');
          const votesCollection =
            db.getCollection('votes') || db.addCollection('votes');
          set({
            db,
            facesCollection,
            votesCollection,
            isReady: true,
            faces: facesCollection.find(),
            votes: votesCollection.find(),
          });
          resolve();
        },
      });
    });
  },
  addFaces: (doc) => {
    const result = get().facesCollection?.insert(doc);
    set({ faces: get().facesCollection?.find() || [] });
    return result;
  },
  getAllFaces: () => get().faces,
  deleteAllFromDB: () => {
    get().facesCollection?.clear();
    get().votesCollection?.clear();
    set({ faces: [], votes: [] });
  },
  addVotes: (vote) => {
    const result = get().votesCollection?.insert(vote);
    set({ votes: get().votesCollection?.find() || [] });
    return result;
  },
  getAllVotes: () => get().votes,
}));

export { useStore };
