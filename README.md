# ReadMe

## Folder structure

```bash
/.storybook                      # Storybook configuration
/.yarn                           # Yarn version manager
/prisma                          # Postgre setup with Prisma
/public                          # Static files
/src/
├── /app                         # Main src folder/
│   └── /api                     # REST API code
├── /assets                      # Main assets folder
├── /hooks                       # Dev's custom hooks
├── /interfaces                  # Database schemas/
│   └── PayOSObject.ts           # PayOS Obj's Interface
├── /libs/
│   ├── /features                # Redux logics
│   ├── /ui                      # Styles and components/
│   │   └── /components          # Code for <Component>.tsx
│   ├── hooks.ts                 # Redux predefined hooks
│   └── store.ts                 # Redux store
├── /services
├── /stories                     # Stories folder/
│   └── <Component>.stories.ts   # Stories for <Component>
└── /utils/
    └── payOSUtils.ts            # utilties functions for PayOS
.env                             # Environment variables
.gitattributes                   # eol setup for every files in project, dont touch
.gitignore                       # Git ignore files, dont touch
.prettierignore                  # Prettier ignore files
.prettierrc                      # Prettier rules configured, dont touch
cypress.config.ts                # Config settings for Cypress (E2E only)
jest.config.ts                   # Config for Jest
next.config.mjs                  # Default Nextjs config
package.json                     # Packages and package manager
README.MD                        # Instructions on setting up the environment
yarn.lock                        # yarn lockfile
```

## NVM-windows

- Next require Node ≥ 18.17.0, so install NVM to manage them.
  ### Install [here](https://github.com/coreybutler/nvm-windows/releases)
  **⭐⭐ Uninstall any pre-existing Node installations!! ⭐⭐**
  > _Recommend - it’s hard to setup nvm-windows with current ongoing Node on the manchine_
  > Delete the existing npm install location (e.g. `%AppData%\npm`) to prevent global module conflicts.
  ```bash
  nvm install latest
  nvm use latest
  ```
- Install yarn
  ```bash
  corepack enable
  npm i -g yarn
  ```
- Install project packages
  ```bash
  yarn set version 4.0.2
  yarn install --immutable  # equal to --frozen-lockfile
  ```

## CLI to open tools

```bash
# Dev server Nextjs
yarn dev

# Storybook
yarn storybook

# Prisma
yarn prisma studio

# Cypress
yarn cypress:open

# Jest
yarn test
```

## Backend note

### Install PostgreSQL Server

> [www.postgresql.org](https://www.postgresql.org/download/windows/)

Change env:

```
"postgresql://postgres:1@localhost:5432/os" -> Change postgres:1" to "[username]:[password]
```

Run server with Postgre:

```bash
1. Run "yarn prisma-multischema" -> merge multi schema
2. Run "yarn prisma generate" -> Update schema
3. Run "yarn prisma db push" -> Create db base on schema

Schema Location:
/prisma/schema.prisma
```
