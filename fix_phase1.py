import re

# 1. Update index.html: 
# - add Montserrat & Inter fonts
# - remove inline emailjs.init
with open('index.html', 'r') as f:
    html = f.read()

# Add fonts
fonts_link = '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/css2?family=Poppins'
html = html.replace('<link href="https://fonts.googleapis.com/css2?family=Poppins', fonts_link)

# Remove emailjs inline
html = re.sub(r'<script type="text/javascript">\s*emailjs\.init\(\'WfqQfI6s1NJIuDhf3\'\)\s*</script>', '', html)

with open('index.html', 'w') as f:
    f.write(html)

# 2. Update ModulesJS/email.js to include emailjs.init and wrap in IIFE
with open('ModulesJS/email.js', 'r') as f:
    email_js = f.read()

if "emailjs.init" not in email_js:
    email_js = "(function() {\n  emailjs.init('WfqQfI6s1NJIuDhf3');\n" + email_js + "\n})();"
    with open('ModulesJS/email.js', 'w') as f:
        f.write(email_js)

# 3. Wrap GraphCircleMain.js in IIFE
with open('ModulesJS/GraphCircleMain.js', 'r') as f:
    graph_circle = f.read()

if "let weather" in graph_circle and "(function()" not in graph_circle:
    # Need to keep it so it executes, wrap the whole thing
    graph_circle = "(function() {\n" + graph_circle + "\n})();"
    with open('ModulesJS/GraphCircleMain.js', 'w') as f:
        f.write(graph_circle)

# 4. Wrap GraphFloating.js in IIFE
with open('ModulesJS/GraphFloating.js', 'r') as f:
    graph_floating = f.read()

if "export function initFloating" not in graph_floating:
    # It might have exports, let's check first. If it's used with `defer` and no exports, wrap it.
    pass # Wait, GraphFloating.js might have exports, let's check it manually before wrapping.

# 5. Update Fonts in Styles/LetsIbero.css
with open('Styles/LetsIbero.css', 'r') as f:
    css = f.read()

css = css.replace("font-family: 'Poppins', sans-serif;", "font-family: 'Inter', sans-serif;")
css = css.replace("font-family: 'Roboto', sans-serif;", "font-family: 'Montserrat', sans-serif;")

with open('Styles/LetsIbero.css', 'w') as f:
    f.write(css)

print("Phase 1 fixes and font updates applied.")
