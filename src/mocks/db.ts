import { Post, User } from "@/apis";

type Session = { [key: string]: number };

interface DB {
  session: Session;
  users: User[];
  posts: Post[];
}

const defaultDB = {
  session: {},
  users: [],
  posts: [],
};

export const readDB = (): DB => {
  const db = localStorage.getItem("db");
  if (!db) {
    return writeDB(defaultDB);
  }
  return JSON.parse(db);
};

export const writeDB = (next: React.SetStateAction<DB>): DB => {
  const db = readDB();
  const updated = typeof next === "function" ? next(db) : next;
  localStorage.setItem("db", JSON.stringify(updated));
  return updated;
};
