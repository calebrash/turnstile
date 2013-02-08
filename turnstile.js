(function (win) {
    var _ts = {
        _defaults: {
            rate: 250,
            limit: 8
        },
        _q: [],
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
                this.poll = setInterval(function() {
                    if(_ts._p.n >= _ts._p.limit) {
                        _ts._p.running = false;
                        _ts._p.active = false;
                        clearInterval(_ts._p.poll);
                    } else {
                        if(typeof _ts._q[0] == 'function' && !_ts._p.active) {
                            _ts._p.n = 0;
                            _ts._p.active = true;
                            _ts._q[0](_ts._p);
                            _ts._q.splice(0,1);
                            _ts._p.active = false;
                        } else {
                            _ts._p.n++;
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
            this._q.push(callback);
            if(!this._p.running) {
                this._p.start();
            }
        }
    };

    var turnstile = function(options) {
        _ts.init(options);
        return _ts;
    };

    if(module && module.exports) {
        module.exports = turnstile;
    } else {
        window.turnstile = turnstile;
    }

}) ();
