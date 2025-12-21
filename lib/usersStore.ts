import fs from "fs/promises";
import path from "path";

export type User = { login: string; passwordHash: string };

const USERS_PATH = path.join(process.cwd(), "db", "users.json");

export async function readUsers(): Promise<User[]> {
  try {
    const raw = await fs.readFile(USERS_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isUser);
  } catch {
    return [];
  }
}

export async function findUser(login: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((user) => user.login === login) ?? null;
}

function isUser(value: unknown): value is User {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.login === "string" && typeof record.passwordHash === "string";
}
