# Ali Hasan Portfolio (Next.js)

Modern, animated portfolio built with the Next.js App Router. The homepage composes multiple sections (hero, about, services, skills, projects, reviews, CTA, experience, contact) with GSAP-powered motion and a contact form that emails submissions via Resend with reCAPTCHA validation.

**Tech Stack**
- `Next.js 16` (App Router)
- `React 19` + `TypeScript`
- `Tailwind CSS 4`
- `GSAP` + `ScrollTrigger`
- `Resend` (email delivery)
- `react-google-recaptcha`
- `react-pdf` (resume modal)
- `sonner` (toasts)

**Project Usage**
- Development: `yarn dev`
- Production build: `yarn build`
- Production server: `yarn start`
- Lint: `yarn lint`

Open `http://localhost:3000` after running the dev server.

**Environment Variables**
Create a `.env.local` file with these keys:
- `EMAIL_API_KEY`
- `EMAIL_FROM`
- `EMAIL_TO`
- `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE`
- `GOOGLE_RECAPS_SECRET`

**App Flow**
- `app/layout.tsx` wires global styles, fonts, navbar, footer, cursor, and toast provider.
- `app/page.tsx` renders the homepage sections in sequence.
- `app/api/contact/route.ts` validates reCAPTCHA, rate-limits requests, and sends emails via Resend.

**Home Components**
- `component/home/HeroComponent.tsx`: Hero headline, animated text, floating badges, “Contact” scroll action, resume modal.
- `component/home/AboutUs.tsx`: About section with tabbed content (personal/professional/education) and hover image.
- `component/home/ServicesSection.tsx`: Services grid powered by `content/services` and `CardSection`.
- `component/home/SkillComponent.tsx`: Scrolling skill marquee with GSAP loops.
- `component/home/WhyMeSection.tsx`: Reasons-to-hire section (content-driven).
- `component/home/WorkStyleSection.tsx`: Work style / process presentation.
- `component/home/Project.tsx`: Projects showcase.
- `component/home/Review.tsx`: Client reviews/testimonials.
- `component/home/CteSection.tsx`: CTA block with quick stats and contact scroll.
- `component/home/Expreience.tsx`: Experience timeline/summary.
- `component/home/Contact.tsx`: Contact details + form with Zod validation, reCAPTCHA, and toast feedback.

**Layout Components**
- `component/layout/Navber.tsx`: Sticky navbar with scroll-spy, animated mobile menu, resume modal.
- `component/layout/Footer.tsx`: Footer content and links.
- `component/layout/CustomCursor.tsx`: Custom cursor effects.

**Shared Components**
- `component/share/CardSection.tsx`: Service cards with CTA buttons.
- `component/share/HoverImage.tsx`: Displacement hover effect for images.
- `component/share/Input.tsx`: Unified input/select/textarea with error display.
- `component/share/MyResumeModal.tsx`: PDF modal with paging and download.
- `component/share/ScrollAnimation.tsx`: Wrapper for scroll-reveal animations.
- `component/share/Loading.tsx`: Terminal-style loading indicator.

**Content and Data**
- `content/` contains structured content (about, services, skills, countries, etc.).
- `schema/` contains Zod validation (contact form).
- `hooks/` contains reusable animation and form helpers.

**Notes**
- The contact form uses rate limiting (20 requests per IP per 60 seconds).
- Make sure the reCAPTCHA keys are valid for your domain when deploying.
