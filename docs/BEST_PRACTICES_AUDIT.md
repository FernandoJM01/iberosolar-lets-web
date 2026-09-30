# Best Practices Audit

| Area             | Current implementation | Best practice | Status | Proposed action |
| ---------------- | ---------------------- | ------------- | ------ | --------------- |
| Architecture     | Client-side fetch for HTML partials | Use Static Site Generator or Server-Side Includes | Needs improvement | Migrate to a basic SSG (e.g., Astro, Eleventy) to improve SEO and prevent layout shifts. |
| Code quality     | Vanilla JS with CDN imports | ES Modules & Bundler (Webpack/Vite) | Needs improvement | Introduce a bundler like Vite to manage dependencies. |
| Security         | EmailJS key exposed in HTML | Use backend or restrict domains in EmailJS | Needs improvement | Restrict the EmailJS public key usage to specific production domains. |
| Performance      | Polling text files | WebSockets or Server-Sent Events (SSE) | Partial | If real-time data is critical, replace file polling with SSE. |
| Testing          | No tests found | Unit/E2E testing (Jest/Cypress) | Not applicable | Add basic E2E tests for critical paths (e.g., graph rendering). |
