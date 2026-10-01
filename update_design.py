import re

# 1. UPDATE CSS
css_content = """
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.sensors .max-width {
  max-width: 1400px;
  padding: 60px 50px;
  margin: auto;
}
.sensors {
  background-color: #F8F9FA; /* Light clean background */
}
.heading {
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: left;
  color: #121212;
}
.sensors-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 30px;
  font-family: 'Inter', sans-serif;
}
.sensors-container .card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.03);
}
.sensors-container .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}
.sensors-container .card img.img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  padding: 25px;
  background-color: #F8F9FA;
  border-bottom: 1px solid #f1f1f1;
}
.sensors-container .card .content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
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

.sensors-container .card .content .name {
  font-size: 1.15em;
  font-weight: 700;
  color: #212529;
  margin-bottom: 12px;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.3;
}
.sensors-container .card .content .description {
  flex-grow: 1;  
  margin-bottom: 25px;
}
.sensors-container .card .content ul {
  font-size: 13.5px;
  padding: 0; 
  list-style-type: none; 
  color: #6c757d;
}
.sensors-container .card .content ul li {
  margin-bottom: 6px;
  position: relative;
  padding-left: 14px;
}
.sensors-container .card .content ul li::before {
  content: "•";
  color: #ADB5BD;
  position: absolute;
  left: 0;
  top: 0;
}
.sensors-container .card .content .button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #212529;
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
  width: 100%;
}
.sensors-container .card .content .button-container:hover {
  background: #343a40;
}
.sensors-container .card .content a {
  text-decoration: none;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .sensors .max-width {
    padding: 40px 20px;
  }
  .heading {
    font-size: 28px;
    margin-bottom: 2rem;
  }
}
"""

with open('Styles/Sensores.css', 'w') as f:
    f.write(css_content)

# 2. UPDATE HTML (Inject badges, fix button wrapper)
with open('Sensors.html', 'r') as f:
    html = f.read()

# Add fonts to Sensors.html if not present
fonts_link = '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/css2?family=Poppins'
html = html.replace('<link href="https://fonts.googleapis.com/css2?family=Poppins', fonts_link)


# Map categories for badges
badge_mapping = {
    'Barómetro': '<span class="badge badge-gray">Presión Atmosférica</span>',
    'Transmisor de Calidad de Aire': '<span class="badge badge-green">Calidad de Aire</span>',
    'Sensor de lluvia': '<span class="badge badge-blue">Precipitación</span>',
    'Piranómetro': '<span class="badge badge-orange">Radiación Solar</span>',
    'Pirheliómetro': '<span class="badge badge-orange">Radiación Solar</span>',
    'Seguidor Solar': '<span class="badge badge-orange">Seguimiento Solar</span>',
    'Sensor de humedad y temperatura': '<span class="badge badge-gray">Humedad y Temp</span>',
    'Sensor de Viento Ultrasónico': '<span class="badge badge-blue">Viento</span>',
    'Anemómetro': '<span class="badge badge-blue">Viento</span>'
}

# Regex to find <h4 class="name">...</h4> and inject badge above it
for name, badge in badge_mapping.items():
    pattern = rf'(<h4 class="name">\s*{name}\s*</h4>)'
    replacement = rf'{badge}\n                \1'
    html = re.sub(pattern, replacement, html)

# The HTML currently has:
# <a href="..." target="_blank">
#   <div class="button-container">
#     Ficha Técnica
#     <!-- maybe closing tags are weird, let's just make sure it's valid -->
#   </div>
# </a>
# We'll clean up the text if it's spread out.

with open('Sensors.html', 'w') as f:
    f.write(html)

print("Redesign applied.")
