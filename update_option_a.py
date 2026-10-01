import re

# 1. Update CSS
with open('Styles/Sensores.css', 'r') as f:
    css = f.read()

# Replace badge CSS with Option A
old_badge_css = """
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  width: max-content;
}
.badge-blue { background: #E6F0FF; color: #0056B3; }
.badge-orange { background: #FFF0E6; color: #CC5500; }
.badge-green { background: #E6F9F0; color: #008040; }
.badge-gray { background: #F1F3F5; color: #495057; }
"""

new_badge_css = """
.badge {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
  color: #E00034; /* Ibero Red */
}
/* We can leave the color classes but override their backgrounds to transparent and color to the red or gray */
.badge-blue, .badge-orange, .badge-green, .badge-gray { 
  background: transparent; 
  color: #E00034;
}

/* Page Header Styling */
.page-header {
  margin-bottom: 3.5rem;
}
.heading {
  font-size: 42px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  color: #111827;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}
.sub-heading {
  font-size: 16px;
  color: #4B5563;
  font-family: 'Inter', sans-serif;
  max-width: 650px;
  line-height: 1.6;
}

/* Improve Card Title */
.sensors-container .card .content .name {
  font-size: 1.25em;
  font-weight: 800;
  color: #111827;
  margin-bottom: 15px;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.3;
  letter-spacing: -0.3px;
}
"""
css = css.replace(old_badge_css.strip(), new_badge_css.strip())

# Remove old heading style if it exists standalone
css = re.sub(r'\.heading\s*{[^}]+}', '', css)

with open('Styles/Sensores.css', 'w') as f:
    f.write(css)

# 2. Update HTML (Add sub-heading for the mockup look)
with open('Sensors.html', 'r') as f:
    html = f.read()

old_heading = '<h3 class="heading">Sensores Meteorológicos</h3>'
new_heading = """<div class="page-header">
            <h1 class="heading">Sensores Meteorológicos</h1>
            <p class="sub-heading">Explora nuestra avanzada gama de instrumentos de grado profesional para el monitoreo ambiental y solar.</p>
          </div>"""

html = html.replace(old_heading, new_heading)

with open('Sensors.html', 'w') as f:
    f.write(html)

print("Option A and Title Styling Applied.")
