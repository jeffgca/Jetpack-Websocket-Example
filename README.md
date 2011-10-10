# Websocket / Jetpack demo

*A demo that implements a websocket client in a Jetpack Add-on using the
`page-worker` module.*

##### *System Requirements*

* OS X / Linux. Probably works on Windaz, haven't tested it.
* [node.js](http://nodejs.org/)
* [node.websocket](https://github.com/guille/node.websocket.js/)
* [Add-on SDK 1.1+](https://addons.mozilla.org/en-US/developers/)
* [Firefox 7+](http://nightly.mozilla.org/)

##### Starting the server

Open a terminal and type in the following:

`$ node server/app.js`

##### Starting the add-on client

Open a new terminal / terminal tab and activate the SDK environment.

<pre>$ cd $path\to\sdk
$ source bin/activate
$ cd $path\to\demo
$ cfx run</pre>

To monitor the websocket connection, a simple html client is supplied at `client/index.html`.
