import sys

code = sys.stdin.read()

try:
    exec(code)
except Exception as e:
    print(e)