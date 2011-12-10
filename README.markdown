Turnstile: JavaScript execution scheduler



-------------------------------------------------
METHODS
-------------------------------------------------

push(callback)
	Adds the callback to the execution queue.
	


-------------------------------------------------
USAGE
-------------------------------------------------

Initialize
	
	var ts = turnstile();



Standard application
	
	var ts.push(my_function);
	
	var ts.push(function(){
		// do something
	});


The Double-anon Example
- used when you need to freeze the value of a 
  variable before pushing to the queue

	Ex 1: normal
	
	for(var i = 1; i <= 5; i++) {
		t.push( function() {
			console.log(n + ', ');
		});
	}
	
	Output: 6, 6, 6, 6, 6, 
	
		
	for(var i = 1; i <= 5; i++) {
		(function() { // anon 1
			var n = i;
			t.push( function() { // anon 2
				console.log(n + ', ');
			});
		})();
	}
	
	Output: 1, 2, 3, 4, 5, 
	