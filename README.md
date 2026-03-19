# Professional Portfolio | Next.js 15 & Sanity CMS

A high-performance, fully dynamic portfolio built with the latest web technologies. This project features a seamless integration between Next.js 15 (Server Components) and Sanity CMS, providing a modern architecture for content management and rapid delivery.

## 🚀 Teck Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **CMS**: [Sanity.io](https://www.sanity.io/) (Headless CMS)
- **Styling**: Tailwind CSS & Framer Motion (Animations)
- **Icons**: Lucide React & React Icons
- **Deployment**: Optimized for Vercel

## ✨ Key Features

- **SSR & ISR**: Server-Side Rendering for dynamic data and Incremental Static Regeneration (1-hour revalidation) for static pages to ensure performance and SEO.
- **Integrated CMS**: Manage Projects, Case Studies, Services, Profile, and Resume details directly through the built-in [Sanity Studio](/studio).
- **Dynamic Metadata**: Automatic SEO optimization for all pages.
- **Glassmorphic Design**: Modern, premium UI with smooth animations and interactive 3D elements.
- **Responsive**: Fully optimized for all device sizes.

## 🛠️ Getting Started

### 1. Environment Setup

Create a `.env` file in the root directory and add the following:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production

# Write token for migration (internal use)
SANITY_API_WRITE_TOKEN=your_write_token_here

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 2. Installation

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit:
- Website: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📦 Production Readiness

To build the project for production:

```bash
npm run build
```

This will:
1. Validate TypeScript types.
2. Prerender static pages (Home, Services, etc.).
3. Optimize images and assets.
4. Prepare the dynamic server routes.

### Final Verification Checklist
- [x] All hardcoded data migrated to Sanity.
- [x] Images configured for `cdn.sanity.io`.
- [x] Server Components implemented for all data-fetching routes.
- [x] Metadata optimized for SEO.
- [x] Build successfully passes type-checking and prerendering.

## 📄 License

[MIT](LICENSE)
