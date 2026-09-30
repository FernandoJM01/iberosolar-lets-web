# Development Guide

## Modifying UI Components
- **Navbar/Footer**: Edit `ModulesHTML/navbar.html` or `ModulesHTML/footer.html`. Changes will reflect across all pages automatically.
- **Adding a Page**: Create a new `.html` file at the root. Include a container `<div id="navbarContainer"></div>` and load `modules.js` to inject the common layout.

## State Management and Data Fetching
- **Data Source**: Data is read from `data-floating2.txt`. The parsing logic is in `ModulesJS/GraphFloating.js` and `ModulesJS/GraphCircleMain.js`.
- **Modifying Graphs**: Adjust Chart.js configurations in the respective Graph JS files.

## Adding Styles
- Use the `Styles/` directory. Create a new CSS file for specific pages or append to existing ones (e.g., `Styles/LetsIbero.css`). Ensure the CSS is linked in the HTML `<head>`.
