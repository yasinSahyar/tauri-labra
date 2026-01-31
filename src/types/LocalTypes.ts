import Loki from 'lokijs';

type Thumb = 'Thumb_Up' | 'Thumb_Down';

type Vote = {
  faceName: string;
  vote: Thumb;
};

type DBState = {
  db: Loki | null;
  facesCollection: Collection<Float32Array> | null;
  votesCollection: Collection<Vote> | null;
  isReady: boolean;
  faces: (Float32Array & LokiObj)[];
  votes: (Vote & LokiObj)[];
};

export type { Thumb, Vote, DBState };