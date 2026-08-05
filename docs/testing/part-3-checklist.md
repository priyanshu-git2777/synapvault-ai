# Part 3 Verification Checklist

## Home Page

- [ ] Updated hero loads
- [ ] Hero CTA buttons work
- [ ] Trust strip displays
- [ ] Interactive product demo displays
- [ ] Core capabilities display
- [ ] Workflow section displays
- [ ] Supported file types display
- [ ] Security section displays
- [ ] FAQ displays
- [ ] Final CTA displays
- [ ] Footer displays

## Interactive Demo

- [ ] Document Chat tab works
- [ ] Summary tab works
- [ ] Study Tools tab works
- [ ] Knowledge Graph tab works
- [ ] Active tab is visually clear
- [ ] Mobile tab list can scroll
- [ ] No false backend interaction is presented

## FAQ

- [ ] FAQ questions open
- [ ] FAQ questions close
- [ ] Keyboard Enter works
- [ ] Arrow rotates
- [ ] Text remains readable
- [ ] One item stays open where browser support exists

## Pricing

- [ ] Pricing cards display
- [ ] Pricing limitations are clearly stated
- [ ] Comparison table displays
- [ ] Comparison table scrolls on mobile
- [ ] No fake checkout is active
- [ ] Registration buttons work

## New Routes

- [ ] `/about`
- [ ] `/privacy`
- [ ] `/terms`
- [ ] Footer links to all routes
- [ ] Header About link works

## SEO

- [ ] Root metadata exists
- [ ] Page titles use template
- [ ] Dynamic app icon loads
- [ ] Dynamic Open Graph image loads
- [ ] `/robots.txt` loads
- [ ] `/sitemap.xml` loads
- [ ] Sitemap contains all public routes
- [ ] Production domain is controlled by environment variable

## Accessibility

- [ ] Skip link appears with keyboard focus
- [ ] Skip link moves focus to main content
- [ ] All buttons have accessible text
- [ ] Icon-only buttons have `aria-label`
- [ ] Demo uses tab roles
- [ ] FAQ works with keyboard
- [ ] Visible focus indicator appears
- [ ] Reduced-motion preference is respected
- [ ] Heading order is logical
- [ ] Tables use headings and caption

## Responsive Layout

- [ ] 320px
- [ ] 375px
- [ ] 430px
- [ ] 768px
- [ ] 1024px
- [ ] 1440px
- [ ] No horizontal page scrolling
- [ ] Interactive demo fits
- [ ] Legal pages remain readable
- [ ] Footer columns stack correctly

## Quality

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Production server starts
- [ ] Browser console has no red errors
- [ ] Network panel has no unexpected failed requests
- [ ] `.env.local` is ignored