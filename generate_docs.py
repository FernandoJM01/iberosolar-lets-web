import os

os.makedirs('docs', exist_ok=True)

docs = {
    "README.md": """# Ibero Solar - Technical Assessment & Documentation

## 1. Project Title
Ibero Solar / LETS (Laboratorio de Energía Térmica Solar)

## 2. Project Overview
A web-based frontend application for monitoring air quality, sensor data, and presenting information about the LETS laboratory at Universidad Iberoamericana. The site displays real-time environmental data fetched from local text files, rendering graphs and metrics dynamically.

## 3. Objectives and Scope
The goal of this project is to provide a user-friendly interface to visualize meteorological and air quality data captured by sensors, while promoting the research initiatives of the LETS laboratory.

## 4. Key Features
- **Data Visualization**: Real-time graphing of air quality and meteorological data using Chart.js.
- **Dynamic HTML Modules**: Client-side rendering of common UI components (Navbar, Footer) using vanilla JS `fetch`.
- **Contact Form**: Email submission integration using EmailJS.
- **Animations**: Typing animations, carousels, and CSS-based earth/sunrise animations.

## 5. Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, jQuery
- **Libraries**: Chart.js, EmailJS, Typed.js, Owl Carousel, SweetAlert2 (partially implemented)
- **Icons**: Font Awesome, Boxicons
- **Backend/Data**: Local text file (`data-floating2.txt`) acting as a data source. No traditional backend server/API implemented in this repository.

## 6. Architecture Overview
The project follows a static component-based architecture using vanilla JavaScript. HTML pages (`index.html`, `AirQuality.html`, `Sensors.html`) serve as entry points. Reusable components (Navbar, Footer, Modals) are stored in `ModulesHTML` and loaded asynchronously via JS fetch calls in `ModulesJS/modules.js`.

## 7. System Architecture Diagram
```mermaid
graph TD
    UI[User Interface] --> JS[ModulesJS]
    JS --> FetchHTML[Fetch HTML Partials]
    JS --> FetchData[Fetch data-floating2.txt]
    FetchHTML --> UI
    FetchData --> ChartJS[Chart.js Rendering]
    ChartJS --> UI
    UI --> EmailJS[EmailJS API]
```

## 8. Project Directory Structure
See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for full details.

## 9. Prerequisites
- Any modern web browser
- Python 3 (for running a local HTTP server)

## 10. Installation & Running the Project
1. Clone the repository.
2. Open a terminal in the project root.
3. Start a local server: `python3 -m http.server`
4. Access the site at `http://localhost:8000`

## 11. Development Workflow
Modifications to the UI are done directly in the HTML/CSS files. Reusable elements like the navigation bar can be edited in `ModulesHTML/navbar.html`. 

## 12. Technical Debt and Future Improvements
- Migration to a modern framework (e.g., React, Vue) or static site generator (e.g., Astro, Next.js) to avoid layout shifts caused by client-side `fetch` of HTML partials.
- Implementation of a real REST API instead of polling `data-floating2.txt`.
- Removal of unused dependencies (jQuery, if possible, as it's only used for the carousel and navbar toggling).

See [docs/TECHNICAL_DEBT.md](docs/TECHNICAL_DEBT.md) and [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for detailed recommendations.
""",

    "docs/ARCHITECTURE.md": """# Architecture

## 1. Architectural Style
The project uses a **Static Site with Asynchronous Partials** approach. It loosely resembles a Component-based Architecture but implemented from scratch using Vanilla JS `fetch`.

## 2. Application Entry Points and Lifecycle
- **Entry Points**: `index.html`, `AirQuality.html`, `Sensors.html`.
- **Lifecycle**:
  1. The browser loads the HTML file.
  2. Scripts like `callsLetsIbero.js` execute.
  3. `ModulesJS/modules.js` is invoked to fetch and inject partial HTML (Navbar, Footer, popups) into container `div`s.
  4. Once loaded, data-fetching scripts (`GraphCircleMain.js`, `GraphFloating.js`) poll `data-floating2.txt` for updates.
  5. Data is processed and rendered onto Chart.js canvases.

## 3. Data Flow
```mermaid
sequenceDiagram
    participant Browser
    participant JS Modules
    participant TextFile (data-floating2.txt)
    participant ChartJS
    
    Browser->>JS Modules: Load page
    JS Modules->>TextFile: fetch('data-floating2.txt')
    TextFile-->>JS Modules: Return raw text data
    JS Modules->>JS Modules: Parse string (split by ';')
    JS Modules->>ChartJS: Update chart data
    ChartJS-->>Browser: Render updated graphs
```
""",

    "docs/PROJECT_STRUCTURE.md": """# Project Structure

```text
.
├── AirQuality.html          # Air quality page entry point
├── index.html               # Main landing page
├── Sensors.html             # Sensors data page
├── Animation/               # CSS/JS for animations (earth, sunrise)
├── ModulesHTML/             # Reusable HTML partials (navbar, footer, popups)
├── ModulesJS/               # Vanilla JS logic (API calls, charting, utilities)
├── Styles/                  # CSS stylesheets (split by component/page)
├── data-floating2.txt       # Flat-file data source updated by external process
├── calls*.js                # Page-specific initialization scripts
├── images/                  # Static image assets
├── icons/                   # Static icon assets
├── PDF/                     # Downloadable resources and datasheets
└── Readme/                  # Project instructions
```
""",

    "docs/TECHNOLOGY_STACK.md": """# Technology Stack

| Category              | Technology       | Purpose / Usage |
| --------------------- | ---------------- | --------------- |
| Programming languages | HTML5, CSS3, JS  | Core structure, styling, and logic |
| UI technologies       | Chart.js         | Data visualization |
| UI technologies       | Owl Carousel     | Image sliders / team section |
| UI technologies       | Typed.js         | Typing animation on landing page |
| External APIs         | EmailJS          | Contact form submission |
| Build system          | None             | Static files served directly |
| Package management    | None             | Dependencies loaded via CDN |
""",

    "docs/DEVELOPMENT_GUIDE.md": """# Development Guide

## Modifying UI Components
- **Navbar/Footer**: Edit `ModulesHTML/navbar.html` or `ModulesHTML/footer.html`. Changes will reflect across all pages automatically.
- **Adding a Page**: Create a new `.html` file at the root. Include a container `<div id="navbarContainer"></div>` and load `modules.js` to inject the common layout.

## State Management and Data Fetching
- **Data Source**: Data is read from `data-floating2.txt`. The parsing logic is in `ModulesJS/GraphFloating.js` and `ModulesJS/GraphCircleMain.js`.
- **Modifying Graphs**: Adjust Chart.js configurations in the respective Graph JS files.

## Adding Styles
- Use the `Styles/` directory. Create a new CSS file for specific pages or append to existing ones (e.g., `Styles/LetsIbero.css`). Ensure the CSS is linked in the HTML `<head>`.
""",

    "docs/BEST_PRACTICES_AUDIT.md": """# Best Practices Audit

| Area             | Current implementation | Best practice | Status | Proposed action |
| ---------------- | ---------------------- | ------------- | ------ | --------------- |
| Architecture     | Client-side fetch for HTML partials | Use Static Site Generator or Server-Side Includes | Needs improvement | Migrate to a basic SSG (e.g., Astro, Eleventy) to improve SEO and prevent layout shifts. |
| Code quality     | Vanilla JS with CDN imports | ES Modules & Bundler (Webpack/Vite) | Needs improvement | Introduce a bundler like Vite to manage dependencies. |
| Security         | EmailJS key exposed in HTML | Use backend or restrict domains in EmailJS | Needs improvement | Restrict the EmailJS public key usage to specific production domains. |
| Performance      | Polling text files | WebSockets or Server-Sent Events (SSE) | Partial | If real-time data is critical, replace file polling with SSE. |
| Testing          | No tests found | Unit/E2E testing (Jest/Cypress) | Not applicable | Add basic E2E tests for critical paths (e.g., graph rendering). |
""",

    "docs/IMPLEMENTATION_PLAN.md": """# Implementation Plan

## Phase A — Critical Issues
- **Task**: Restrict EmailJS API Keys.
- **Action**: Ensure the public key `WfqQfI6s1NJIuDhf3` is restricted in the EmailJS dashboard to prevent abuse.

## Phase B — Architecture and Maintainability
- **Task**: Migrate to a Static Site Generator (SSG) or Bundler (Vite).
- **Action**: Replace `fetch('ModulesHTML/...')` with compile-time includes to eliminate FOUC (Flash of Unstyled Content) and layout shifts.

## Phase C — Code Quality and Consistency
- **Task**: Remove unused files and libraries.
- **Action**: Remove jQuery if only used for simple toggles. Rewrite Owl Carousel logic or replace it with a vanilla JS alternative (e.g., Swiper) to drop the jQuery dependency.

## Phase D — Testing and Reliability
- **Task**: Implement tests.
- **Action**: Add a testing framework like Playwright to verify that the charts render correctly and data is fetched without errors.
""",

    "docs/TECHNICAL_DEBT.md": """# Technical Debt

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
"""
}

for filepath, content in docs.items():
    with open(filepath, "w") as f:
        f.write(content)

print("Documentation generated successfully.")
