# ReadMe

## Folder structure

> *Use this to edit folder structure: [tree.nathanfriend.io](https://tree.nathanfriend.io/?s=(%27opqzs!(%27fancy!true~fullPath!false~trailingSlash!true~rootDot!false)~source!(%27source!%27%2F.stLybW0*7StLybW%20Kuraqz8.yarn0B*-YarHvQsioHmanagQ8hWs0B*-Custom%20hW6fL%20devs8intQface0*3-Database%20schemas23PayOSObjectZBB*-PayOS%20Obj%226IntQface8lib23hWsZ0*Fpredefined%20hWs23stLeZ0*FstLe23%2Ffeatures03Flogics8prisma0B3-Postgre%20setup%20with%20Prisma8public0B3-StaqcJiles8src23%2Fapp0B7MaiHsrcJoldQ23%2FstLies0*-C96foldQ2*%20%2Fassets0-Asset6foldQ2*Vc9%3E.cssB*7cs6rule6fLVc9%3E2*4.stLiesZ*-StLie6fL42*4ZxB*7TSXJL48uqls23payOSUqlsZBB*7fL%20PayOS2.env0B*3-Envirzment%20variables2.gitattributes07eol%20setupJL%20evQyJile6iHproject5.giqgnLe0*3-Git%20ignLeJiles5.pretqQrc0*7PretqQ%20rule6Kured5next.K.mjs0-Default%20Nextj6K2p*.jsz0\*-P_6and%20p*%20managQ2README.MD0B-Instrucqz6oHsetqng%20up%20the%20envirzment2yarn.lock0B-yarHlockfile%27)~vQsiz!%271%27)_37%23%200BBB2%5Cn3%20%204VC9%3E5%2C%20dzt%20touch26s%207%20-82%2F9ompzentB\*\*F-Redux%20Hn%20J%20fKczfigLorQerV%20%3CWookZ.ts_ackageqtizon%01zq_ZWVQLKJHFB987654320-_)\*

```bash
/.storybook                      # Storybook configuration
/.yarn                           # Yarn version manager
/hooks                           # Custom hooks for devs
/interface                       # Database schemas/
└── PayOSObject.ts               # PayOS Obj's Interface
/lib/
├── hooks.ts                     # Redux predefined hooks
├── store.ts                     # Redux store
└── /features                    # Redux logics
/prisma                          # Postgre setup with Prisma
/public                          # Static files
/src/
├── /app                         # Main src folder
└── /stories                     # Components folder/
    ├── /assets                  # Assets folder
    ├── <component>.css          # css rules for <component>
    ├── <Component>.stories.ts   # Stories for <Component>
    └── <Component>.tsx          # TSX for <Component>
/utils/
└── payOSUtils.ts                # for PayOS
.env                             # Environment variables
.gitattributes                   # eol setup for every files in project, dont touch
.gitignore                       # Git ignore files, dont touch
.prettierrc                      # Prettier rules configured, dont touch
next.config.mjs                  # Default Nextjs config
package.json                     # Packages and package manager
README.MD                        # Instructions on setting up the environment
yarn.lock                        # yarn lockfile
```

## NVM-windows

- Next require React ≥ 18.17.0, so install NVM to manage them.
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
1. Run "yarn prisma generate" -> Update schema
2. Run "yarn prisma db push" -> Create db base on schema

Schema Location:
/prisma/schema.prisma
```
