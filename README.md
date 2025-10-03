# PLAYGON

A modern sports arena booking platform that connects players with sports venues for both physical and online gaming experiences.

## Features

- **Multi-Sport Support** - Book venues for Badminton, Football, Cricket, Tennis, Basketball, and Valorant
- **Smart Booking System** - Zone-based bookings with 30-minute time slot intervals
- **Real-time Availability** - Track arena capacity and booking status (Pending, Housefull, Cancelled)
- **User Authentication** - Secure login via Email/Password or Google OAuth
- **Email Verification** - Verify user accounts via email
- **Role-Based Access Control** - Three user roles: USER, ARENAMASTER, and ADMIN
- **Participant Management** - Join existing bookings and track participants
- **User Profiles** - Track booking history and gameplay statistics
- **Admin Dashboard** - Manage users, arenas, and bookings
- **Arena Management** - Support for both online and offline venues with amenities tracking

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon) with Prisma ORM
- **Authentication:** Better Auth
- **UI Components:** Radix UI primitives
- **Styling:** TailwindCSS v4
- **Animations:** Framer Motion
- **Email:** Nodemailer
- **Icons:** Tabler Icons, Lucide React
- **Password Hashing:** Argon2

## Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun
- PostgreSQL database (Neon recommended)
- Google Cloud Console account (for OAuth)
- Gmail account with App Password (for email verification)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playgon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Better Auth Configuration
   BETTER_AUTH_SECRET="your-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_API_URL="http://localhost:3000"

   # Admin Emails (semicolon separated)
   ADMIN_EMAILS="admin@playgon.in;admin1@playgon.in"

   # Database
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

   # Google OAuth (Setup in Google Cloud Console)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Nodemailer (Gmail App Password)
   NODEMAILER_USER="your-email@gmail.com"
   NODEMAILER_APP_PASSWORD="your-app-password"
   ```

4. **Initialize Prisma and setup database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Push database schema
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables Guide

### Better Auth Setup
- `BETTER_AUTH_SECRET`: Generate using `openssl rand -base64 32`
- `BETTER_AUTH_URL`: Your app's base URL (use `http://localhost:3000` for development)
- `NEXT_PUBLIC_API_URL`: Public API URL for client-side requests

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### Nodemailer Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings > Security
   - Under "2-Step Verification", click "App passwords"
   - Generate a new app password for "Mail"
3. Use the 16-character password in `NODEMAILER_APP_PASSWORD`

### Database Setup (Neon)
1. Sign up at [Neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string to `DATABASE_URL`
4. Ensure the connection string includes `sslmode=require`

## Available Scripts

- `npm run dev` - Start development server with Prisma generation
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
playgon/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── actions/         # Server actions
│   ├── app/             # Next.js app router pages
│   │   ├── (with-sidebar)/  # Protected routes with sidebar
│   │   ├── admin/       # Admin dashboard
│   │   ├── auth/        # Authentication pages
│   │   └── api/         # API routes
│   ├── components/      # Reusable UI components
│   ├── generated/       # Generated Prisma client
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configs
│   ├── my-components/   # Custom form components
│   ├── my-layout-component/ # Layout components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper utilities
└── .env                 # Environment variables (not in git)
```

## User Roles

- **USER** - Default role for registered users. Can book arenas and join games.
- **ARENAMASTER** - Manages sports arenas and zones. Can create and modify venue information.
- **ADMIN** - Full access to the platform. Can manage users, roles, and all system features.

Admin emails defined in `ADMIN_EMAILS` environment variable are automatically assigned the ADMIN role.

## Authentication Flow

1. **Sign Up**: Users register with email/password or Google OAuth
2. **Email Verification**: Verification email sent via Nodemailer
3. **Sign In**: Authenticate and create session
4. **Session Management**: Better Auth handles session tokens and cookies
5. **Role-Based Access**: Middleware protects routes based on user roles

## Database Models

### Key Models
- **UserLocal** - Extended user profile with gaming information
- **User** - Authentication user (Better Auth)
- **SportsArena** - Physical or online venue information
- **ArenaZone** - Specific playing zones within an arena
- **BookingCard** - Booking records with time slots
- **BookParticipant** - Tracks users participating in bookings

## Development Notes

- The project uses Prisma's custom output directory: `src/generated/prisma`
- ESLint is configured to ignore generated files
- The app uses Next.js App Router with Server Components
- Authentication state is managed via Better Auth client
- All dates/times use ISO format and should handle timezones appropriately

## Deployment

For production deployment:

1. Set production environment variables
2. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_API_URL` to production domain
3. Run `npm run build` to create optimized production build
4. Deploy to platforms like Vercel, Netlify, or custom server

### Vercel Deployment

The easiest deployment option is [Vercel Platform](https://vercel.com):

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Contributing

Contributions are welcome! Please ensure your code follows the existing style and passes linting checks.

## License

[Add your license information here]

---

**Built with** Next.js 15, React 19, and Better Auth
