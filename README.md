# Notice Board

A modern notice board application built with Next.js (Pages Router), TypeScript, Tailwind CSS, Prisma, and MySQL.

## Features

- Display all notices
- Create notice
- Edit notice
- Delete notice with confirmation dialog
- Responsive UI
- Server-side validation
- Urgent notices highlighted first by database ordering
- Optional image URL field

## Tech Stack

- Next.js (Pages Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL-compatible database
- Vercel deployment

## Local Development

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a MySQL database and add your connection string to `.env`
3. Run Prisma migrations
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start the development server
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="mysql://user:password@host:3306/database"
```

## Deployment

Deploy to Vercel and set the `DATABASE_URL` environment variable in the Vercel dashboard.
