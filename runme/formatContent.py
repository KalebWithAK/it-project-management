import os
import sys
import pyperclip # David Foster - https://stackoverflow.com/questions/1825692/can-python-send-text-to-the-mac-clipboard


content = pyperclip.paste()

print(content)

content = content.split('\n')
content = ' '.join(content) # Colin Basnett - https://stackoverflow.com/questions/43585891/replace-n-with-space-in-string-using-python

print(content)

if (len(content) > 0):
  pyperclip.copy(content)
