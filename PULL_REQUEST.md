# Pull Request: fix/mobile-nav-scroll

This PR fixes the mobile navigation sheet so it can be scrolled on small viewports.

## Summary
- Constrain SheetContent to the viewport and enable vertical scrolling.
- Reduce top/bottom margins so content stays within the scrollable region.

## Files changed
- components/layout/MobileNav.tsx

## How to test
1. Checkout this branch: git fetch origin && git checkout fix/mobile-nav-scroll
2. npm install
3. npm run dev
4. Open the app on a mobile viewport and open the mobile menu; it should now scroll.

Fixes: Mobile menu not scrollable on small screens.
