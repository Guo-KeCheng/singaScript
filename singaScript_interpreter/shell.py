import basic
import sys

text = sys.argv[1]
file = open(text)
content = file.read()

result, error = basic.run('<stdin>', content.replace("can liao", ";"))

if error:
    print(error.as_string())
elif result:
    print(repr(result).replace("True", "true").replace("False", "false"))