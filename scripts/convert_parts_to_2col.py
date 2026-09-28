import sys
import os
import pprint

sys.path.append(r"C:\Users\Reza Karim\cembicredit\scripts")

def convert_list(notes_list):
    new_list = []
    for note in notes_list:
        n = dict(note)
        # convert guidance table
        new_g = []
        for row in n.get("guidance_table", []):
            if len(row) == 3:
                new_g.append((row[0], f"{row[1]} {row[2]}".strip()))
            else:
                new_g.append(row)
        n["guidance_table"] = new_g
        
        # convert funding table
        new_f = []
        for row in n.get("funding_table", []):
            if len(row) == 3:
                new_f.append((row[0], f"{row[1]} {row[2]}".strip()))
            else:
                new_f.append(row)
        n["funding_table"] = new_f
        
        # remove custom headers so defaults ["Metric", "Guidance / Desk Assessment"] and ["Item", "Detail"] apply
        n.pop("guidance_headers", None)
        n.pop("funding_headers", None)
        
        new_list.append(n)
    return new_list

# Load part 2
from notes_data_part2 import NOTES_PART2
part2_converted = convert_list(NOTES_PART2)

with open(r"C:\Users\Reza Karim\cembicredit\scripts\notes_data_part2.py", "w", encoding="utf-8") as f:
    f.write("# Notes Data Part 2: Sibanye, Endeavour, Omniyat, Mota-Engil, WE Soda, First Quantum\n")
    f.write("# Strict 2-column Turkey Master Note standard\n\n")
    f.write("NOTES_PART2 = " + pprint.pformat(part2_converted, width=120, sort_dicts=False) + "\n")

print("Converted and saved notes_data_part2.py")

# Load part 3
from notes_data_part3 import NOTES_PART3
part3_converted = convert_list(NOTES_PART3)

with open(r"C:\Users\Reza Karim\cembicredit\scripts\notes_data_part3.py", "w", encoding="utf-8") as f:
    f.write("# Notes Data Part 3: Energy JPM, Hungary, Brazil Election, EM Conf\n")
    f.write("# Strict 2-column Turkey Master Note standard\n\n")
    f.write("NOTES_PART3 = " + pprint.pformat(part3_converted, width=120, sort_dicts=False) + "\n")

print("Converted and saved notes_data_part3.py")
