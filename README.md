
# DelivAir

Our app lets the user choose whether can be a sender or a shipper, in a context of sending or receiving physical goods in airplane luggage. Our app will be a contact intermediary and will give access to the users to view other people's posts, shows how much the user can carry, or send, show price per KG, departure/arrival time as well as instant chat between two users.

## Run Locally

Clone the project

```bash
  git clone https://github.com/DelivAir/DelivAir
```

Go to the project directory

```bash
  cd DelivAir
```

Install  dependencies

```bash
  npm install
```

Start the server

```bash
  cd server
```

```bash
  npm install
```

```bash
  npm run start
```

Start the socket

```bash
  cd socket.io
```

```bash
  npm install
```

```bash
  npm run start
```

Start the app

```bash
  cd client
```

```bash
  npm install
```

```bash
  npm run start
```

create the database with the provided schema

```bash
  npx prisma db pull
```

```bash
  npx prsima generate
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`ANOTHER_API_KEY`

## Tech Stack

**Client:** React, , TailwindCSS , ReactNative , expo , Cloudinary , FireBase,NativeBase

**Server:** Node, Express,Postgresql

**Admin:** NextJS , TypeScript , Bootstrap

## Authors

- [@amineamdouni](https://github.com/amineamdouni)
- [@MehdiDissem](https://github.com/MehdiDissem)
- [@AzizSelini](https://github.com/AzizSelini)
- [@houssem-fraj](https://github.com/houssem-fraj)
