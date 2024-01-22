## Getting Started

## Front end view

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend note (from DucViet2003)

Change env:

```
"postgresql://postgres:1@localhost:5432/os" -> Change postgres:1" to "[username]:[password]
```

Run server with Postgre:

```bash
1. Run "yarn install" -> Install package
2. Run "npx prisma generate" -> Update schema
3. Run "npx prisma db push" -> Create db base on schema
4. Run "yarn dev" -> Start server

Schema Location:
/prisma/schema.prisma
```
