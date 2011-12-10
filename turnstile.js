var _turnstile = {
	_defaults: {
		rate: 250,
		limit: 8
	},
	_q: {
		list: []
	},
	_p: {
		rate: 0,
		n: 0,
		limit: 0,
		active: false,
		poll: false,
		running: false,
		start: function() {
			this.running = true;
			this.n = 0;
			this.poll = setInterval(function(){
				if(_turnstile._p.n >= _turnstile._p.limit) {
					_turnstile._p.running = false;
					_turnstile._p.active = false;
					clearInterval(_turnstile._p.poll);
				} else {
					if(typeof _turnstile._q.list[0] == 'function' && !_turnstile._p.active) {
						_turnstile._p.n = 0;
						_turnstile._p.active = true;
						_turnstile._q.list[0](_turnstile._p);
						_turnstile._q.list.splice(0,1);
						_turnstile._p.active = false;
					} else {
						_turnstile._p.n++;
					}
				}
			}, this.rate);
		}
	},
	init: function(options) {
		if(typeof options == 'object') {
			this._defaults.rate = typeof options.rate == 'number' ? options.rate : this._defaults.rate;
			this._defaults.limit = typeof options.limit == 'number' ? options.limit : this._defaults.limit;
		}
		this._p.rate = this._defaults.rate;
		this._p.limit = this._defaults.limit;
	},
	push: function(callback) {
		this._q.list.push(callback);
		if(!this._p.running) {
			this._p.start();
		}
	}
};
function turnstile(options){
	_turnstile.init(options);
	return _turnstile;
}