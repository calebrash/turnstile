#Turnstile: JavaScript execution scheduler



##Methods

push(callback)
- Adds the callback to the execution queue.
	

##Options

rate
- Controls the frequency at which the queue executes.

limit
- Contols the number of times an empty queue should run before dying.
	

##Usage

###Initialize

```javascript
var ts = turnstile();
```

or with options...

```javascript
var ts = turnstile({
	rate: 1000,
	limit: 5
});
```

###Standard application

```javascript
var ts.push(my_function);

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
		console.log(n + ', ');
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

