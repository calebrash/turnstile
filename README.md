#Turnstile: JavaScript execution scheduler

Turnstile is used to rate limit JavaScript execution. This is useful in situations where execution order is important and you do not necessarily have control over that order, or potentially processor-intensive situations where you don't have control over how many processes are trying to run at once.

For example, suppose you have a image editing web app with buttons 'Grayscale' and 'Blur'. Assume a user clicks both buttons in rapid succession. Without turnstile, you might have an image that's one-half blurry and one-half grayscale. That sucks. Passing the grayscaling and blurring functions through Turnstile would queue the processes, making each function wait its turn.

_Version 1.1.0_

## Now with Node support!
__Note:__ Turnstile hasn't been published to NPM yet. You will need to download/clone this repository.
```javascript
var turnstile = require('./turnstile'),
    limiter = turnstile();
```

##Methods

###push(callback)
- Adds the callback to the execution queue.
	

##Options

###rate
- Controls the frequency at which the queue executes. Default 250ms.

###limit
- Contols the number of times an empty queue should run before dying. Default 8 times.
	

##Usage

###Initialize

```javascript
// browser
var ts = turnstile();

// node
var turnstile = require('./turnstile'),
    ts = turnstile();
```

or with options...

```javascript
var ts = turnstile({
	rate: 1000, // time in ms
	limit: 5
});
```

###Standard application

```javascript
var ts.push(my_function);
```
or

```javascript
var ts.push(function(){
	// do something
});
```

###The Double-anon Example
- used when you need to freeze the value of a 
  variable before pushing to the queue

####Ex 1: normal

```javascript
for(var i = 1; i <= 5; i++) {
	t.push( function() {
		console.log(i + ', ');
	});
}
```
Output: 6, 6, 6, 6, 6, 

####Ex 2: double-anon

```javascript
for(var i = 1; i <= 5; i++) {
	(function() { // anon 1
		var n = i;
		t.push( function() { // anon 2
			console.log(n + ', ');
		});
	})();
}
```
Output: 1, 2, 3, 4, 5, 

