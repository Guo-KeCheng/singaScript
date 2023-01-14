import basic
import sys

text = sys.argv[1]
file = open(text)
content = file.read()

result, error = basic.run('<stdin>', content.replace("can liao", ";"))


f = open("result.txt", "w")

if error:
    f.write(error.as_string())
elif result:
    f.write(repr(result))


f.close()