# Cooperative App

A Next.js application with PostgreSQL backend for managing cooperatives and their members.

## Features

- **Frontend**: Next.js 15 with React 19
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **Containerization**: Docker & Docker Compose
- **Styling**: TailwindCSS

## Project Structure

```
cooperative-app/
├── app/
│   ├── api/
│   │   ├── auth/            # NextAuth authentication endpoints
│   │   ├── health/          # Database health check endpoint
│   │   ├── users/           # User management API
│   │   └── cooperatives/    # Cooperative management API
│   ├── auth/
│   │   ├── signin/          # Sign in page
│   │   └── signup/          # Sign up page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Main page with auth status
├── components/
│   ├── auth-provider.tsx   # NextAuth session provider
│   └── navigation.tsx      # Navigation with auth buttons
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   └── prisma.ts          # Prisma client configuration
├── prisma/
│   └── schema.prisma       # Database schema
├── docker-compose.yml      # Docker services configuration
├── Dockerfile             # Next.js app container
└── .env                   # Environment variables
```

## Quick Start

### Using Docker (Database Only) + Local Development

This is the recommended approach for development:

1. **Start the PostgreSQL database:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database schema:**
   ```bash
   npm run db:push
   ```

4. **Seed the database with test data:**
   ```bash
   npm run db:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
   - App: http://localhost:3000
   - Database: localhost:5432

### Using Full Docker Setup

1. **Clone and navigate to the project:**
   ```bash
   cd cooperative-app
   ```

2. **Start the application with Docker:**
   ```bash
   docker-compose up --build -d
   ```

3. **Set up the database schema:**
   ```bash
   npm run db:push
   ```

4. **Seed the database:**
   ```bash
   npm run db:seed
   ```

### Local Development Only

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start PostgreSQL (if not using Docker):**
   ```bash
   # Using Docker for database only
   docker run --name postgres-dev -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:15-alpine
   ```

3. **Set up environment variables:**
   ```bash
   # Edit .env with your database credentials
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
   ```

4. **Generate Prisma client and push schema:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/signin` - Sign in user (NextAuth)
- `POST /api/auth/signout` - Sign out user (NextAuth)
- `GET /api/auth/session` - Get current session (NextAuth)

### Application
- `GET /api/health` - Database health check and statistics
- `GET /api/users` - Get all users with their memberships
- `POST /api/users` - Create a new user
- `GET /api/cooperatives` - Get all cooperatives with members
- `POST /api/cooperatives` - Create a new cooperative

## Database Schema

The app includes these main models:
- **User**: Application users with authentication
- **Account**: NextAuth account linking
- **Session**: NextAuth session management  
- **VerificationToken**: NextAuth email verification
- **Cooperative**: Cooperative organizations
- **Membership**: Relationship between users and cooperatives

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with test data
- `npm run docker:up` - Start Docker services (database only)
- `npm run docker:down` - Stop Docker services
- `npm run docker:build` - Build and start Docker services

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-key-here"
```

**Important**: Generate a proper secret for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Development

1. **View database with Prisma Studio:**
   ```bash
   npm run db:studio
   ```

2. **Make schema changes:**
   - Edit `prisma/schema.prisma`
   - Run `npm run db:push` for development
   - Run `npm run db:migrate` for production

3. **Add new API routes:**
   - Create files in `app/api/[endpoint]/route.ts`
   - Use the Prisma client from `lib/prisma.ts`

## Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

# Access database
docker exec -it postgres-db psql -U postgres -d postgres
```

## Troubleshooting

1. **Database connection issues:**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env
   - Verify database credentials

2. **Docker issues:**
   - Ensure Docker is running
   - Check port availability (3000, 5432)
   - Clear Docker cache if needed

3. **Prisma issues:**
   - Regenerate client: `npm run db:generate`
   - Reset database: `npm run db:push --force-reset`
