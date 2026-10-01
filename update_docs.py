import os

# 1. Update README.md
with open('README.md', 'r') as f:
    readme = f.read()

if "UI/UX Modernization" not in readme:
    readme = readme.replace(
        "**Update (Phase 1 Complete):**",
        "**Updates (Phases 1 & UI Modernization Complete):**\n- **UI/UX Modernization**: The 'Equipos' (Sensors) page has been fully redesigned with a responsive CSS Grid, edge-to-edge images, modern typography (Inter/Montserrat), and sleek 'Editorial Overline' categorization badges.\n- **Graphing Bugs Fixed**: Resolved race conditions and rendering initialization bugs (`myChart_Mid.width`) inside Chart.js plugins, and properly sequenced asynchronous DOM loading in `GraphFloating.js`."
    )
    with open('README.md', 'w') as f:
        f.write(readme)

# 2. Update docs/IMPLEMENTATION_PLAN.md
with open('docs/IMPLEMENTATION_PLAN.md', 'r') as f:
    plan = f.read()

if "✅ **Task**: Restrict EmailJS" not in plan:
    plan = plan.replace("- **Task**: Restrict EmailJS", "✅ **Task**: Restrict EmailJS API Keys (Completed in Phase 1)")
    
    # Add Phase D updates
    plan = plan.replace("## Phase D", "## Phase D — UI and UX Improvements (In Progress)\n✅ **Task**: Modernize Sensors Catalog\n- **Action**: Applied CSS Grid, modernized card elevation, edge-to-edge images, and editorial typography. (Completed)\n\n## Phase E")
    with open('docs/IMPLEMENTATION_PLAN.md', 'w') as f:
        f.write(plan)

# 3. Update docs/TECHNICAL_DEBT.md
with open('docs/TECHNICAL_DEBT.md', 'r') as f:
    debt = f.read()

if "✅ **[RESOLVED]**" not in debt:
    debt = debt.replace("3. **Global Scope Pollution**", "3. **Global Scope Pollution** ✅ **[RESOLVED]**")
    debt = debt.replace("- **Current behavior**: Variables and functions", "- **Current behavior**: (FIXED) Variables and functions")
    
    # Add new resolved debt entry about Async execution
    debt += "\n\n4. **Asynchronous DOM Race Conditions** ✅ **[RESOLVED]**\n   - **Severity**: High\n   - **Current behavior**: Scripts were executing immediately and crashing when looking for DOM elements that `modules.js` hadn't injected yet.\n   - **Resolution**: Implemented `startWhenReady` polling and IIFE isolation to ensure rendering waits for the DOM."
    
    with open('docs/TECHNICAL_DEBT.md', 'w') as f:
        f.write(debt)

print("Documentation updated successfully.")
