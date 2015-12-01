var Stat = function (name, type, min, max, d, calc_val_fn) {
    this.name = name;
		this.type = type;
    this.min = min;
    this.max = max;
    this.d = d;
    this.calc_val = calc_val_fn;
    this.apply(0, 0);
};

// apply the given number of mains and subs, calculating their effect on the value
Stat.prototype.apply = function (m, s) {
    this.m = m;
    this.s = s;

    var a = 10 * m + 3 * s;
    var tmp = 0.09 * a;
    var x = (0.99 * a - tmp * tmp) / this.d;
    this.calc_val(x);
//    this.perc = (this.val - this.min) / (this.max - this.min) * 100;
};

// count abilities that affect the given stat name.
Object.defineProperties(Array.prototype, {
	count: {
		value: function(stat) {
			return this.reduce(function (total,perk){
				//FIXME "negative" does not simply negate a main. Check the wiki.
				return perk.affects === stat ? (perk.negative ? total-1 : total+1) : total
			}, 0);
		}
	}
});

angular.module('splatoonApp').stats = function ($scope) {

  $scope.stats = [
    new Stat("Damage", "%", 0, 130, 100, function (x) {
        this.value = Math.min(this.max, 100 + 100*x);
    }),
    new Stat("Defense", "%", 83.3, 100, 100, function (x) {
        this.value = Math.max(this.min, 100 - 100*(x/1.8));
    }),
    new Stat("Ink Recovery", "s", 1.8, 3, 75, function (x) {
        this.value = Math.max(this.min, 3 * (1.0 - x));
    }),
    new Stat("Ink Usage Main", "%", 60, 100, 75, function (x) {
        this.value = Math.max(this.min, 100 - 100*x);
    }),
    new Stat("Ink Usage Sub", "%", 75, 100, 120, function (x) {
        this.value = Math.max(this.min, 100 - 100*x);
    }),
    new Stat("Bomb Throw Range", "%", 0, 150, 60, function (x) {
        this.value = Math.min(this.max, (156.8 * (1 + x))/156.8*100);
    }),
    new Stat("Run Speed", "%", 0, 150, 60, function (x) {
        this.value = Math.min(this.max, (96 * (1 + x))/96*100);
    }),
    new Stat("Swim Speed", "%", 0, 125, 120, function (x) {
        this.value = Math.min(this.max, (192 * (1 + x))/192*100);
    }),
    new Stat("Special Charge", "%", 0, 130, 100, function (x) {
        this.value = Math.min(this.max, 100 + 100*x);
    }),
    new Stat("Special Time", "%", 0, 140, 75, function (x) {
        this.value = Math.min(this.max, 100 + 100*x);
    }),
    new Stat("Special Save", "%", 0, 100, 60, function (x) {
        this.value = Math.min(this.max, 50 + 100*x);
    }),
    new Stat("Respawn Rate", "s", 2, (360 + 30 + 120)/60, 45, function (x) {
        this.value = Math.max(this.min, ((1.0 - x) * 360 + 30 + 120)/60);
    }),
    new Stat("Jump Speed", "s", 1.5, 3.54, 60, function (x) {
        this.value = Math.max(this.min, 3 * (1 - x));
    }),
		new Stat("Echolocator/Haunt Duration", "s", 3, 12, 1, function (x) {
				this.value = x > 0 ? 3 : 12;
		})
	];

};
