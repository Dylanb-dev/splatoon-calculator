angular.module('splatoonApp').stats = function ($scope) {

	$scope.stats = [{
		'name' : 'Special Save',
		'default' : 50,
		'value' : 50,
		'max' : 100,
		'min' : 50,
		'type' : '%'
	}, {
		'name' : 'Special Charge',
		'default' : 180,
		'value' : 180,
		'max' : 180,
		'min' : 126,
		'type' : 'pts'
	}, {
		'name' : 'Special Time',
		'default': 6.82,
		'value' : 6.82,
		'min' : 6.82,
		'max' : 10.23,
		'bonus': 12.5,
		'type' : 's'
	}, {
		'name' : 'Ink Usage Main',
		'default' : 100,
		'value' : 100,
		'min' : 40,
		'max' : 100,
		'type' : '%'
	}, {
		'name' : 'Ink Usage Sub',
		'default' : 100,
		'value' : 100,
		'min': 60,
		'max' : 100,
		'type' : '%'
	}, {
		'name' : 'Ink Recovery',
		'default': 3.17,
		'value' : 3.17,
		'max' : 3.17,
		'type' : 's'
	}, {
		'name' : 'Damage',
		'default' : 100,
		'value' : 100,
		'min' : 100,
		'max' : 130,
		'type' : '%'
	}, {
		'name' : 'Defense',
		'default' : 100,
		'value' : 100,
		'min' : 100,
		'max' : 120,
		'type' : '%'
	}, {
		'name' : 'Bomb Throw Range',
		'default' : 100,
		'value' : 100,
		'min' : 100,
		'max' : 150,
		'type' : '%'
	}, {
		'name' : 'Run Speed',
		'default' : 100,
		'value' : 100,
		'min' : 100,
		'max' : 150,
		'type' : '%'
	}, {
		'name' : 'Swim Speed',
		'default' : 100,
		'value' : 100,
		'min' : 90,
		'max' : 125,
		'type' : '%'
	}, {
		'name' : 'Respawn Rate',
		'default': 8.5,
		'value' : 8.5,
		'max' : 8.5,
		'type' : 's'
	}, {
		'name' : 'Jump Speed',
		'default': 4.1,
		'value' : 4.1,
		'min' : 2.05,
		'max' : 4.9,
		'type' : 's'
	}, {
		'name' : 'Echolocator/Haunt Duration',
		'default': 12,
		'value' : 12,
		'min' : 3,
		'max' : 12,
		'type' : 's'
	}];

};
