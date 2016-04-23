# a-cycle-frame-debugger
Attempt to make 3D debugger for cycle streams with A-frame library

## Install
Run
``` npm install ```

To run the server
``` npm start ```

This will run budo server which recompiles ES6 code on save.
(You still have to reload browser)


## Shooting troubles
A-frame is so kind that when you left out some components (e.g. light)
it will add it into the scene for you. That's pretty cool right?
But this causes an issue with virtual-dom diff-patch when there is something
added into the scene but not specified as a virtual node the patch will update
attributes on different element that the virtual dom describes.
So please be aware of this magic anytime it looks like it doesn't listen to you.
