import subprocess
import os

os.chdir('d:/transport-management-system-main')

# Add files
subprocess.run(['git', 'add', '-A'])

# Commit
subprocess.run(['git', 'commit', '-m', 'Initial commit - Transport Management System'])

# Push
subprocess.run(['git', 'push', '-u', 'origin', 'master'])

print("Done!")
