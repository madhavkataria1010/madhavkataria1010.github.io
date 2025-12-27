# Bolt Journal - Performance

## Optimization
- Added `loading="lazy"` to BentoGrid project images.
  - **Reason:** The BentoGrid section is below the fold. Lazy loading these images ensures they are only fetched when the user scrolls near them, reducing initial page load time and bandwidth usage.
  - **Location:** `components/BentoGrid.tsx`
