import basic
import sys

text = sys.argv[1]
file = open(text)
content = file.read()

result, error = basic.run('<stdin>', content.replace("\n", "").replace("can liao", ";"))

if error:
    print(error.as_string())
elif result:
    if len(result.elements) == 1:
        print(repr(result.elements[0]))
    else:
        print(repr(result))