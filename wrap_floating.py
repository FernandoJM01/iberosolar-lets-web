with open('ModulesJS/GraphFloating.js', 'r') as f:
    content = f.read()
if "let weather" in content and "(function()" not in content:
    content = "(function() {\n" + content + "\n})();"
    with open('ModulesJS/GraphFloating.js', 'w') as f:
        f.write(content)
