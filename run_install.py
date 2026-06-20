#!/usr/bin/env python3
import subprocess, os, sys, json

os.chdir('/home/team/shared/hasslefix-store')

# Check if node_modules exists
if os.path.exists('node_modules'):
    print("node_modules exists")
    sys.exit(0)
else:
    print("node_modules MISSING - running npm install")
    r = subprocess.run(['npm', 'install'], capture_output=True, text=True, timeout=120)
    print("STDOUT:", r.stdout[-500:])
    print("STDERR:", r.stderr[-500:])
    print("RC:", r.returncode)
    
    if os.path.exists('node_modules'):
        print("SUCCESS: node_modules created")
    else:
        print("FAILED: node_modules still missing")