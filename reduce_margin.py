with open('Styles/Sensores.css', 'r') as f:
    css = f.read()

# Currently padding: 60px 50px;
css = css.replace("padding: 60px 50px;", "padding: 20px 50px 60px 50px;")

with open('Styles/Sensores.css', 'w') as f:
    f.write(css)
print("Margin reduced")
