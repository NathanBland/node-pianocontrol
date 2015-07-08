# node-pianocontrol
A node interface for interacting with pianobar

## Installing

Installing is straight forward, but it is assumed you have pianobar already installed.

A simple `git clone https://github.com/NathanBland/node-pianocontrol.git` will
get you started.

Next, you will need to `npm install` inside of the project folder.

Afterwards, you need to configure pianobar to use the broadcast.py script.

To do this navigate to your pianobar config file.

The default location is `~/.config/pianobar/config`

It should also be said that you need to have your username and password already
configured in this file.

To set the broadcast.py to function, append
`event_command = /path/to/project/broadcast.py' to your config file.

After this is done, all you need to do is run `node server.js` and point your
browser to 'localhost:1337'  to use it.
