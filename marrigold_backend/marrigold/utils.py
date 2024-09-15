# myapp/utils.py

import portalocker

def lock_file(file):
    portalocker.lock(file, portalocker.LOCK_EX)
