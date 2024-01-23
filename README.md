# ReadMe

## Folder structure

> _Use this to edit folder structure: [tree.nathanfriend.io](https://tree.nathanfriend.io/?s=(%27optizs!(%27fancy!true~fullPath!false~trailingSlash!true~rootDot!false)~source!(%27source!%27%2F.stKybook9_-StKybook%20VuratizQ.yarn00*3YarBv_sioBmanag_Qint_face98-DatabasFschemas2LPayOSObjectq0*3PayOS%20Obj%227Int_faceQprisma00%20-PostgrFsetup%20with%20PrismaQpublic00%20-Static%20XsQsrc4api00-REST%20API%20code4app00-MaiBsrc%20fold_4assets9*-MaiBasset7fold_4Z98-Dev%227custom%20Z4lib28%2Ffeatures0*Jlogics28%2Fui9\*-Style7and%20cWs2**%2FcWs\***-CodFfK6qx28Zq08Jpredefined%20Z28stKeq08JstKe4stKies9*3StKie7fold_2*6.stKiesq*3StKie7fK6Qutils2LpayOSUtilsq0*-fK%20PayOS2.env008-Envirzment%20variables2.gitattributes9-eol%20setup%20fK%20ev_y%20X7iBproject5.gitignKe98-Git%245.pHignKe93PH%242.pHrc9*-PH%20rule7Vured5next.V.mjs93Default%20Nextj7V2package.jsz9*3Package7and%20packagFmanag_2README.MD003Instructiz7oBsetting%20up%20thFenvirzment2yarn.lock003yarBlockX%27)~v_siz!%271%27)8L-%2039**2%5Cn3%23%2042L%2F5%2C%20dzt%20touch26%20%3CCW%3E7s%208\*%2090**Bn%20Fe%20Hretti_J-Redux%20KorL%20%20Q2%2FVczfigWompzentXfileZhooks_erq.tszon%24%20ignKFXs%01%24zq_ZXWVQLKJHFB987654320-_)_

```bash
/.storybook                      # Storybook configuration
/.yarn                           # Yarn version manager
/interface                       # Database schemas/
└── PayOSObject.ts               # PayOS Obj's Interface
/prisma                          # Postgre setup with Prisma
/public                          # Static files
/src/
├── /app                         # Main src folder/
│   └── /api                     # REST API code
├── /assets                      # Main assets folder
├── /hooks                       # Dev's custom hooks
├── /lib/
│   ├── /features                # Redux logics
│   ├── /ui                      # Styles and components/
│   │   └── /components          # Code for <Component>.tsx
│   ├── hooks.ts                 # Redux predefined hooks
│   └── store.ts                 # Redux store
└── /stories                     # Stories folder/
    └── <Component>.stories.ts   # Stories for <Component>
/utils/
└── payOSUtils.ts                # for PayOS
.env                             # Environment variables
.gitattributes                   # eol setup for every files in project, dont touch
.gitignore                       # Git ignore files, dont touch
.prettierignore                  # Prettier ignore files
.prettierrc                      # Prettier rules configured, dont touch
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
