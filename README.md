# Free Internship Portal

A role-based internship portal platform connecting Students, Colleges, and Companies.

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── (auth)/            # Authentication related routes
│   ├── (dashboard)/       # Dashboard routes for all roles
│   ├── (public)/         # Public routes
│   └── api/              # API routes
├── components/
│   ├── common/           # Shared components across all roles
│   ├── student/          # Student-specific components
│   ├── college/          # College-specific components
│   ├── company/          # Company-specific components
│   └── internship/       # Internship-related components
├── features/             # Feature-specific logic and components
│   ├── auth/            # Authentication related features
│   ├── internships/     # Internship posting and management
│   ├── profiles/        # Profile management for all roles
│   └── dashboard/       # Dashboard features for all roles
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared logic
├── types/              # TypeScript type definitions
├── styles/             # Global styles and Tailwind configurations
└── utils/              # Helper functions and utilities
```

## Role-Based Architecture

The project follows a role-based architecture with three main user types:
- Students
- Colleges
- Companies

Each role has its own specific components and features while sharing common functionality like internship posts.

## Technology Stack

- Next.js (React)
- TypeScript
- Tailwind CSS
- ESLint

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
