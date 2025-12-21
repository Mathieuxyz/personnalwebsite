import crypto from "crypto";

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return secret;
}

export function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function makeSessionValue(login: string): string {
  const signature = sign(login);
  return `${login}.${signature}`;
}

export function verifySessionValue(session: string): string | null {
  const [login, signature] = session.split(".");
  if (!login || !signature) return null;
  const expected = sign(login);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;
  return login;
}
