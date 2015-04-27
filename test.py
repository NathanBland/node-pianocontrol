#!/usr/bin/python2
import sys
import urllib
import urllib2
import json

type = sys.argv[1]
params = {}
for s in sys.stdin.readlines():
	param, value = s.split("=", 1)
	params[param.strip()] = value.strip()

params['type'] = type
data = urllib.urlencode(params)
url = 'http://localhost:1337/watch'
full_url = url + '?' + data
#print (full_url)
data = urllib2.urlopen(full_url)
#print data
print("params sent")
