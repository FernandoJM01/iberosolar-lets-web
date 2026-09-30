# Architecture

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
