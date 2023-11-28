## ChainIn - Backend

ChainIn server to build Tableland API with Express and TypeScript.

### API Docs

**API Documentation**: https://elements.getpostman.com/redirect?entityId=31443216-dd0d4c78-1b59-4c28-9376-7605289e74b8&entityType=collection

### Run Locally

Install dependencies:

```bash
  npm i
```

Start the server:

```bash
  npm run dev
```

### Run on main

Install dependencies:

```bash
  npm i; npm run build
```

Start the server:

```bash
  npm run start
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
WALLET_PRIVATE_KEY=paste_your_private_key_here
SISMO_CONNECT_APP_ID=0x123456789

JWT_SECRET=your_json_web_token
WHITELISTED_IPS=127.0.0.1

TABLELAND_USER_DATABASE=user_db_123
TABLELAND_COMMUNITY_DATABASE=community_db_123
TABLELAND_USER_COMMUNITY_DATABASE=user_community_db_123
```

- For `WALLET_PRIVATE_KEY` export your wallet private key from your wallet.
- For `TABLELAND_[NAME]_DATABASE` paste your tableland database names from studio.tableland.xyz.
- For `WHITELISTED_IPS` paste your public IPv4 address to prevent unauth access to tableland DBs.