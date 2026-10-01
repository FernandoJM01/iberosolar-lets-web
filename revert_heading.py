import re

# 1. Update HTML
with open('Sensors.html', 'r') as f:
    html = f.read()

# Replace the page-header div with the original heading
old_html_block = """<div class="page-header">
            <h1 class="heading">Sensores Meteorológicos</h1>
            <p class="sub-heading">Explora nuestra avanzada gama de instrumentos de grado profesional para el monitoreo ambiental y solar.</p>
          </div>"""

new_html_block = '<h3 class="heading">Sensores Meteorológicos</h3>'

if old_html_block in html:
    html = html.replace(old_html_block, new_html_block)
else:
    # Fallback regex in case formatting is slightly different
    html = re.sub(r'<div class="page-header">.*?</div>', new_html_block, html, flags=re.DOTALL)

with open('Sensors.html', 'w') as f:
    f.write(html)

# 2. Update CSS
with open('Styles/Sensores.css', 'r') as f:
    css = f.read()

# Remove .page-header, .heading, and .sub-heading
css = re.sub(r'\.page-header\s*\{[^}]+\}', '', css)
css = re.sub(r'\.heading\s*\{[^}]+\}', '', css)
css = re.sub(r'\.sub-heading\s*\{[^}]+\}', '', css)

# Append the original heading styles
original_heading_css = """
.heading {
  text-transform: uppercase;
  font-size: 30px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  letter-spacing: 3px;
  margin-right: -3px;
  margin-bottom: 4rem;
  text-align: center;
  color: #333;
  position: relative;
}
.heading::after {
  content: "";
  width: 15rem;
  height: .6rem;
  background-color: #E00034; /* Updated to use Ibero Red */
  position: absolute;
  bottom: -1.7rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2rem;
}
"""

with open('Styles/Sensores.css', 'w') as f:
    f.write(css + original_heading_css)

print("Heading reverted and subtitle removed.")
