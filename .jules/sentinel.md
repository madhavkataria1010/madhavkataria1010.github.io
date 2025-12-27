# Sentinel Journal - Security

## Enhancements
- Added `target="_blank"` and `rel="noopener noreferrer"` to external social media links in the Footer.
  - **Reason:** Prevents "Reverse Tabnabbing" attacks where a malicious page could hijack the `window.opener` object to redirect the original page. While standard modern browsers handle this better with `target="_blank"`, being explicit is safer. Also improves UX by keeping the portfolio open.
  - **Location:** `components/Footer.tsx`
