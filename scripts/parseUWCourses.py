from bs4 import BeautifulSoup
import json

with open('uwcoursesf23.html', 'r') as f:
    soup = BeautifulSoup(f, 'html.parser')

rows = soup.find_all('tr')
# current_row = rows[1].find_all('td')
# print(current_row[0].text)

json_array = []

for current_row in rows[1:]:
    row_items = current_row.find_all('td')
    if len(row_items) < 3:
        continue
    subject = row_items[0].text
    number = row_items[1].text
    course_code = (subject+number).replace(" ", "")
    name = row_items[2].text
    json_array.append({"course_code": course_code, "name": name})

json_object = json.dumps(json_array)

with open("uwcoursesf23.json", "w") as outfile:
    outfile.write(json_object)