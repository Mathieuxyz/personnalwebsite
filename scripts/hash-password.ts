import { hashPassword } from "../lib/password";

async function main() {
  const plain = process.argv[2];
  if (!plain) {
    console.error("Usage: npm run hash-password -- <password>");
    process.exit(1);
  }

  const hash = await hashPassword(plain);
  console.log(hash);
}

main().catch((error) => {
  console.error("Failed to hash password.");
  process.exit(1);
});
