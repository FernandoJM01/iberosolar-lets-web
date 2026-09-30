# Technical Debt

1. **Client-Side HTML Injection**
   - **Severity**: Medium
   - **Current behavior**: The Navbar and Footer are fetched via AJAX and injected into the DOM on page load.
   - **Impact**: Causes layout shift, impacts SEO, and requires JavaScript to display core navigation.
   - **Recommended implementation**: Use a build step (Vite, Astro, Hugo, or even simple PHP/SSI) to construct pages at build/serve time.

2. **Data Polling via Text File**
   - **Severity**: Low/Medium
   - **Current behavior**: Data is polled from `data-floating2.txt`.
   - **Impact**: Inefficient network usage and potential caching issues.
   - **Recommended implementation**: Develop a lightweight API endpoint using Express or FastAPI to serve JSON data.

3. **Global Scope Pollution**
   - **Severity**: Low
   - **Current behavior**: Variables and functions in vanilla scripts are largely in the global scope.
   - **Recommended implementation**: Wrap scripts in IIFEs or migrate completely to ES6 modules.
