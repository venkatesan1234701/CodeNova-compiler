import sys
import os

code = sys.stdin.read()

# memory limit (Linux only)
try:
    import resource
    resource.setrlimit(resource.RLIMIT_AS, (100*1024*1024, 100*1024*1024))
except:
    pass

try:
    exec(code)
except MemoryError:
    print("❌ Memory limit exceeded")
except RecursionError:
    print("❌ Recursion limit exceeded")
except Exception as e:
    print("❌ Error:", e)