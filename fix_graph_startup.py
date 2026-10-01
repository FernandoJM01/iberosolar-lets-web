with open('ModulesJS/GraphFloating.js', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if line.startswith('updateWeatherData2(file_name,'):
        new_lines.append("""
function startWhenReady() {
  if (document.getElementById('myChart_Back')) {
    updateWeatherData2(file_name, null, weather_main);
    checkAndScheduleUpdates(file_name, null, weather_main);
  } else {
    setTimeout(startWhenReady, 100);
  }
}
startWhenReady();
""")
        skip = True
    elif skip and line.startswith('checkAndScheduleUpdates'):
        # Ignore this line and turn off skip for the rest
        skip = False
    elif skip and line.startswith('// Schedule'):
        pass
    else:
        new_lines.append(line)

with open('ModulesJS/GraphFloating.js', 'w') as f:
    f.writelines(new_lines)
