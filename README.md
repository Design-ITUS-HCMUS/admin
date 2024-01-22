# ReadMe

## NVM-windows

- Next require React ≥ 18.17.0, so install NVM to manage them.
  ### Install [here](https://github.com/coreybutler/nvm-windows/releases)
  **⭐⭐ Uninstall any pre-existing Node installations!! ⭐⭐**
  > _Recommend - it’s hard to setup nvm-windows with current ongoing Node on the manchine_
  Delete the existing npm install location (e.g. `%AppData%\npm`) to prevent global module conflicts.
  ```bash
  npm install latest
  nvm use latest
  ```
- Install yarn
  ```bash
  corepack enable
  yarn set version 4.0.2
  yarn install
  yarn --immutable        # trước đây là --frozen-lockfile
  ```

## Backend note

### Install PostgreSQL Server

> [Link](https://www.postgresql.org/download/windows/)

Change env:

```
"postgresql://postgres:1@localhost:5432/os" -> Change postgres:1" to "[username]:[password]
```

Run server with Postgre:

```bash
1. Run "npx prisma generate" -> Update schema
2. Run "npx prisma db push" -> Create db base on schema
3. Run "yarn dev" -> Start server

Schema Location:
/prisma/schema.prisma
```

## CLI to open tools

```bash
# Nextjs
yarn dev

# Storybook
yarn storybook

# Prisma
yarn prisma studio
```
