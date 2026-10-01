with open('Styles/Sensores.css', 'r') as f:
    css = f.read()

old_css = """
.sensors-container .card img.img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  padding: 25px;
  background-color: #F8F9FA;
  border-bottom: 1px solid #f1f1f1;
}
"""

new_css = """
.sensors-container .card img.img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  padding: 0;
  background-color: #ffffff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom: 1px solid #f1f1f1;
}
"""

css = css.replace(old_css.strip(), new_css.strip())

with open('Styles/Sensores.css', 'w') as f:
    f.write(css)

print("Fixed image spacing")
