with open('ModulesJS/GraphCircleMain.js', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if "if(count < 1){" in line:
        new_lines.append("    if(weather){\n")
        new_lines.append("      updateDynamicValues(weather);\n")
        new_lines.append("    }\n")
    if "if(weather){" in line and "updateDynamicValues" in lines[i+1]:
        # Skip this block
        pass
    elif "updateDynamicValues" in line and "if(weather){" in lines[i-1]:
        pass
    elif "}" in line and "updateDynamicValues" in lines[i-1]:
        pass
    else:
        new_lines.append(line)

with open('ModulesJS/GraphCircleMain.js', 'w') as f:
    f.writelines(new_lines)
