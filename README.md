## Authentication

- Set `AUTH_SECRET` in your `.env` (copy from `.env.example` and replace with a long random string).
- Generate a password hash with `npm run hash-password -- "yourPassword"`.
- Paste the resulting hash into `db/users.json` for the admin user.
- The protected page is `/admin`.
