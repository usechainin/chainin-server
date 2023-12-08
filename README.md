## ChainIn - Backend

ChainIn Server powered by Tableland. Written in Express and TypeScript.

<div align="center">
<img 
  src="https://github.com/usechainin/.github/blob/main/assets/chainin-logo.png" 
  style="width:40%; height:40%;"
/>
</div>

### API Documentation
<div align="center">
  <a href="https://elements.getpostman.com/redirect?entityId=31443216-dd0d4c78-1b59-4c28-93767605289e74b8&entityType=collection">
    <img 
      src="https://github.com/usechainin/chainin-server/assets/42776950/40d2c2a2-931f-449e-bfde-f5265662536a" 
      alt="Chainin Server" 
      style="width:40%; height:40%;"
    />
  </a>
</div>

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

```
ALCHEMY_MATIC_API_KEY="your_alchemy_matic_api_key"
ALCEHMY_SEPOLIA_API_KEY="your_alchemy_sepolia_api_key"

JWT_SECRET="your_json_web_token"

WALLET_PRIVATE_KEY="paste_your_private_key_here"

WHITELISTED_IPS="your_public_ipv4_address"

TABLELAND_USER_DATABASE="tableland_database_name"
TABLELAND_EDUCATION_DATABASE="tableland_database_name"
TABLELAND_SCHOOL_DATABASE="tableland_database_name"
TABLELAND_COMPANY_DATABASE="tableland_database_name"
```

- For `WALLET_PRIVATE_KEY` export your wallet private key from your wallet.
- For `TABLELAND_[TABLE_NAME]_DATABASE` paste your tableland database names from studio.tableland.xyz.
- For `WHITELISTED_IPS` paste your public IPv4 address to prevent unauth access to tableland database.
