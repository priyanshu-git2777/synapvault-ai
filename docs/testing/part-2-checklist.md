# Part 2 Verification Checklist

## Installation

- [ ] Next.js frontend exists in `apps/web`
- [ ] TypeScript works
- [ ] Tailwind CSS works
- [ ] ESLint works
- [ ] Prettier works
- [ ] Lucide icons work
- [ ] Shared UI utility works
- [ ] Production build completes

## Design System

- [ ] White transparent glass panels display correctly
- [ ] Purple, blue and cyan background gradients display
- [ ] Gradient shapes move smoothly
- [ ] Reduced-motion preference is respected
- [ ] No cursor lag appears
- [ ] No horizontal scrolling appears
- [ ] Text remains readable over the background

## Navigation

- [ ] Desktop navigation works
- [ ] Mobile menu opens
- [ ] Mobile menu closes
- [ ] Background overlay works
- [ ] Home logo returns to `/`
- [ ] Features link works
- [ ] Use Cases link works
- [ ] Pricing link works
- [ ] Security link works
- [ ] Docs link works
- [ ] Login link works
- [ ] Register link works
- [ ] Footer links work

## Routes

- [ ] `/`
- [ ] `/features`
- [ ] `/use-cases`
- [ ] `/pricing`
- [ ] `/security`
- [ ] `/docs`
- [ ] `/contact`
- [ ] `/login`
- [ ] `/register`
- [ ] Custom 404 page

## Functional Behaviour

- [ ] Contact form validates required fields
- [ ] Contact success state displays
- [ ] Login fields are clearly disabled until backend integration
- [ ] Registration fields are clearly disabled until backend integration
- [ ] Pricing does not claim billing is active
- [ ] All active buttons lead to a valid route

## Responsive Testing

- [ ] 375px width
- [ ] 768px width
- [ ] 1024px width
- [ ] 1440px width
- [ ] Mobile menu is usable
- [ ] Cards stack correctly
- [ ] Hero content remains readable

## Quality

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Browser console has no red errors
- [ ] Terminal has no runtime errors
- [ ] Git does not track `.env`