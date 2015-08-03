'use strict';

angular.module('splatoonApp')
.controller('MainCtrl', function ($scope) {
	var points = 0;
	$scope.mains = [];
	$scope.subs = [];

	$scope.activate = function(ability){
		var i = $scope.abl.indexOf(ability);
		if (points >= 18) { 
			alert('Too Many Abilities!!');
		}

		else if( $scope.mains.length<3 ){
			
			if($scope.abl[i].stackable){
				$scope.mains.push($scope.abl[i]);
				points+=3;
				console.log($scope.mains.length);

				console.log($scope.mains[$scope.mains.length-1]);
				calc();
			}
			else if ($scope.mains.indexOf(ability) >-1) {
				alert('Cant Stack This Ability!!'); 
			}
			else{
				$scope.mains.push($scope.abl[i]);
				points+=3;
				console.log($scope.mains.length);

				console.log($scope.mains[$scope.mains.length-1]);
				calc();
			}
		}

		
		
		else if ( $scope.abl[i].stackable ){
			$scope.subs.push($scope.abl[i]);
			points++;
			calc();
		}
		else { 
			alert('Cannot Sub This Ability!!'); 
		}
	};

	$scope.demain = function(main) {
		$scope.mains.splice($scope.mains.indexOf(main), 1);
		points-=3;
		calc();
	};
	$scope.desub = function(sub) {
		$scope.subs.splice($scope.subs.indexOf(sub), 1);
		points--;
		calc();
	};
	
	// Calc function for finding values
	function calc() {
		

		//Hide all clothes and show what is selected.
		for(var i = 0; i < $scope.clothes.length; i++){
				console.log('hiding clothes');
				$scope.clothes[i].show = false;
				$scope.clothes[i].uname = $scope.clothes[i].name.replace(/ /g,'_');
			}
			console.log($scope.clothes[0].show);
	
		for(var i = 0; i < $scope.clothes.length; i++){
				for(var j=0; j < $scope.mains.length; j++){

					if($scope.clothes[i].ability === $scope.mains[j].name){
						console.log('showing ' + $scope.clothes[i].name);

						$scope.clothes[i].show = true;
						console.log('showing ' + $scope.clothes[i].show);

					}

				}
			}

		for(var i=0; i < $scope.stats.length; i++){
			$scope.stats[i].value=$scope.stats[i].default;
		}

		var number = 0;
		for(var i=0; i < $scope.mains.length; i++){
			for(var j=0; j < $scope.stats.length; j++){
				if($scope.mains[i].affects === $scope.stats[j].name){
					number = 0;
					for(var k=0; k < i; k++){
						if($scope.mains[k] === $scope.mains[i]){
							number++;
						}
					}

					$scope.stats[j].value+=$scope.mains[i].mb[number];

		}
				$scope.stats[j].value = Math.round($scope.stats[j].value * 100) / 100;

	}
}
		number = 0;
		for(var i=0; i < $scope.subs.length; i++){
			for(var j=0; j < $scope.stats.length; j++){
				if($scope.subs[i].affects === $scope.stats[j].name){
					number = 0;
					for(var k=0; k < i; k++){
						if($scope.subs[k] === $scope.subs[i]){
							number++;
						}
					}

					$scope.stats[j].value+=$scope.subs[i].sb[Math.min(number,2)];
					if ($scope.stats[j].value < $scope.stats[j].min){
						$scope.stats[j].value=$scope.stats[j].min;
				}
				else if($scope.stats[j].value > $scope.stats[j].max){
						$scope.stats[j].value=$scope.stats[j].max;
				}
			}
				
			$scope.stats[j].value = Math.round($scope.stats[j].value * 100) / 100;

			}

		}
	}

	$scope.clear = function() {
		console.log('CLEARED');
		$scope.mains.length=0;
		$scope.subs.length=0;
		points = 0;
		calc();
	};

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

	$scope.abl =[{
		name : 'Special Charge Up',
		info : 'Special Charge Up',
		icon : 'assets/images/Ability_Special_Charge_Up.png',
		stackable: true,
		affects: 'Special Charge',
		mb : [-11.8,-11.8,-11.8],
		sb : [-3.96,-3.96,-3.96]
	}, {
		name : 'Ink Saver (Main)',
		info : 'Ink Saver (Main)',
		icon : 'assets/images/Ability_Main_Ink_Saver.png',
		stackable: true,
		affects: 'Ink Usage Main',
		mb : [-10,-10,-310],
		sb : [-5,-5,-5]
	}, {
		name : 'Ink Saver (Sub)',
		info : 'Ink Saver (Sub)',
		icon : 'assets/images/Ability_Sub_Ink_Saver.png',
		stackable: true,
		affects: 'Ink Usage Sub',
		mb : [-15,-7.5,-7.5],
		sb : [-7.5,-3.75,-3.75]
	}, {
		name : 'Recon',
		info : 'Reveals enemy locations on spawn',
		icon : 'assets/images/Ability_Recon.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Reveals enemy locations on spawn'
	}, {
		name : 'Bomb Sniffer',
		info : 'Shows location of mines and grenades',
		icon : 'assets/images/Ability_Bomb_Sniffer.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Shows location of mines and grenades'
	}, {
		name : 'Cold-Blooded',
		info : 'Cold-Blooded',
		icon : 'assets/images/Ability_Cold_Blooded.png',
		stackable: false,
		affects: 'Echolocator/Haunt Duration',
		mb: [-9],
		effects: 'Shortens the effect of attacks that let enemies determine your position, such as Point Sensors.'
	}, {
		name : 'Comeback',
		info : 'Comeback',
		icon : 'assets/images/Ability_Comeback.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Boosts Stats on Respawn'
	}, {
		name : 'Damage Up',
		info : 'Damage Up',
		icon : 'assets/images/Ability_Damage_Up.png',
		stackable: true,
		affects: 'Damage',
		mb : [9,7,5],
		sb : [4,3,2]
	}, {
		name : 'Defense Up',
		info : 'Defense Up',
		icon : 'assets/images/Ability_Defense_Up.png',
		stackable: true,
		affects: 'Defense',
		mb : [5,4,4],
		sb : [3,2,2]
	}, {
		name : 'Haunt',
		info : 'Haunt',
		icon : 'assets/images/Ability_Haunt.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Shows location of enemy who splatted you for 12 secs',
	}, {
		name : 'Bomb Range Up',
		info : 'Bomb Range Up',
		icon : 'assets/images/Ability_Bomb_Range_Up.png',
		stackable: true,
		affects: 'Bomb Throw Range',
		mb : [15,13.5,13.5],
		sb: [5,5,5]
	}, {
		name : 'Ink Recovery Up',
		info : 'Ink Recovery Up',
		icon : 'assets/images/Ability_Ink_Recovery_Up.png',
		stackable: true,
		affects: 'Ink Recovery',
		mb : [-0.4755,-0.23775,-0.23775],
		sb: [-0.23775,-0.118875,-0.118875]
	}, {
		name : 'Ink Resistance Up',
		info : 'Ink Resistance Up',
		icon : 'assets/images/Ability_Ink_Resistance_Up.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Increases movement speed on enemy ink',
	}, {
		name : 'Last-Ditch Effort',
		info : 'The Last-Ditch Effort ability boosts ink recovery rate and weapon ink efficiency for the last 30 seconds of battle.',
		icon : 'assets/images/Ability_Last-Ditch_Effort.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Boosts ink recovery rate and weapon ink efficiency for the last 30 seconds of battle',
	}, {
		name : 'Ninja Squid',
		info : 'Hides ink movement from enemy team',
		icon : 'assets/images/Ability_Ninja_Squid.png',
		stackable: false,
		effects: 'Hides ink movement from enemy team',
		affects: 'Swim Speed',
		mb : [-10],
	}, {
		name : 'Opening Gambit',
		info : 'Opening Gambit',
		icon : 'assets/images/Ability_Opening_Gambit.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Boosts  your speed/both Inkling and squid form for the first 30 seconds of battle',
	}, {
		name : 'Quick Respawn',
		info : 'Quick Respawn',
		icon : 'assets/images/Ability_Quick_Respawn.png',
		stackable: true,
		affects: 'Respawn Rate',
		mb : [-0.85,-0.85,-0.85],
		sb : [-0.425,-0.425,-0.425]
	}, {
		name : 'Quick Super Jump',
		info : 'Quick Super Jump',
		icon : 'assets/images/Ability_Quick_Super_Jump.png',
		stackable: true,
		affects: 'Jump Speed',
		mb : [-0.41,-0.41,-0.41],
		sb : [-0.205,-0.205,-0.205]
	}, {
		name : 'Run Speed Up',
		info : 'Run Speed Up',
		icon : 'assets/images/Ability_Run_Speed_Up.png',
		stackable: true,
		affects: 'Run Speed',
		mb : [15,7.5,7.5],
		sb : [7.5,3.75,3.75]
	}, {
		name : 'Special Duration Up',
		info : 'Special Duration Up',
		icon : 'assets/images/Ability_Special_Duration_Up.png',
		stackable: true,
		affects: 'Special Time',
		mb : [0.8525,0.8525,0.8525],
		sb : [0.28644,0.28644,0.28644]
	}, {
		name : 'Special Saver',
		info : 'Special Saver',
		icon : 'assets/images/Ability_Special_Saver.png',
		stackable: true,
		affects: 'Special Save',
		mb : [12.5,12.5,12.5],
		sb : [4.2,4.2,4.2]
	}, {
		name : 'Stealth Jump',
		info : 'Stealth Jump',
		icon : 'assets/images/Ability_Stealth_Jump.png',
		stackable: false,
		effects: 'Hides jump location from enemy team',
		affects: 'Jump Speed',
		mb : [0.82,0.82,0.82]
	}, {
		name : 'Swim Speed Up',
		info : 'Swim Speed Up',
		icon : 'assets/images/Ability_Swim_Speed_Up.png',
		stackable: true,
		affects: 'Swim Speed',
		mb : [10,5,5],
		sb : [5,2.5,2.5]
	}, {
		name : 'Tenacity',
		info : 'Fills the special gauge automatically if your team has fewer active players than the enemy',
		icon : 'assets/images/Ability_Tenacity.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Fills the special gauge automatically if your team has fewer active players than the enemy'
	}];

	$scope.clothes = [{'show':true,'uname': '', 'type': 'Headgear', 'name':'B-Ball Headband','ability':'Opening Gambit','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show':true,'uname': '', 'type': 'Headgear', 'name':'Backwards Cap','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Bike Helmet','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Black Arrowbands','ability':'Tenacity','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Bobble Hat','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Camo Mesh Cap','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Camping Hat','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Designer Headphones','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Fake Contacts','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'FishFry Visor','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'5-Panel Cap','ability':'Comeback','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Gas Mask','ability':'Tenacity','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Golf Visor','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Hero Headset Replica','ability':'Run Speed Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Jet Cap','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Jogging Headband','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Jungle Hat','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Lightweight Cap','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Octoling Goggles','ability':'Bomb Range Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Paintball Mask','ability':'Comeback','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Pilot Goggles','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Power Mask','ability':'Defense Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Retro Specs','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Safari Hat','ability':'Last-Ditch Effort','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Samurai Helmet','ability':'Damage Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Short Beanie','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Skate Helmet','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Snorkel Mask','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Splash Goggles','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Sporty Bobble Hat','ability':'Tenacity','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Squash Headband','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Squid Hairclip','ability':'Swim Speed Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Squid-Stitch Cap','ability':'Opening Gambit','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Squidvader Cap','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Streetstyle Cap','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Striped Beanie','ability':'Opening Gambit','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Studio Headphones','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Takoroka Mesh','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Tennis Headband','ability':'Comeback','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Tentacles Helmet','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Tinted Shades','ability':'Last-Ditch Effort','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Two-Stripe Mesh','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Urchins Cap','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Visor Skate Helmet','ability':'Last-Ditch Effort','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'White Arrowbands','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'White Headband','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Headgear', 'name':'Zekko Mesh','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Linen Shirt','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Squidmark Sweat','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Firefin Navy Sweat','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Green-Check Shirt','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Sage Polo','ability':'Cold-Blooded','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Sky Blue Squideye','ability':'Cold-Blooded','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Anchor Sweat','ability':'Cold-Blooded','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Dark Urban Vest','ability':'Cold-Blooded','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Part-Time Pirate','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Rockenberg Black','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Zink Layered LS','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Navy Striped LS','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Varsity Jacket','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black 8-Bit FishFry','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Mint T-shirt','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Zekko Baseball LS','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Baby-Jelly Shirt','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Retro Sweat','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Ivory Peaks Tee','ability':'Haunt','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Squidmark LS','ability':'Haunt','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Yellow Urban Vest','ability':'Haunt','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Vintage Check Shirt','ability':'Haunt','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Aloha Shirt','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/33','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/3.3','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Grape Tee','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/3.3','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/33','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Rockenberg White','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'School Uniform','ability':'Ink Recovery Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White Shirt','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black Layered LS','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Rainy-Day Tee','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Red Vector Tee','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Red-Check Shirt','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'B-Ball Jersey (Away)','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Blue Peaks Tee','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White Tee','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Choco Layered LS','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Octoling Armor','ability':'Ink Saver (Sub)','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Green Striped LS','ability':'Ninja Squid','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Shrimp-Pink Polo','ability':'Ninja Squid','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Zekko Hoodie','ability':'Ninja Squid','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White Anchor Tee','ability':'Ninja Squid','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Basic Tee','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Tricolor Rugby','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Power Armor','ability':'Quick Respawn','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White Striped LS','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Camo Zip Hoodie','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Gray Vector Tee','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White Baseball LS','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Yellow Layered LS','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black LS','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Striped Shirt','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Varsity Baseball LS','ability':'Recon','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White 8-Bit FishFry','ability':'Recon','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black Anchor Tee','ability':'Recon','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Olive Ski Jacket','ability':'Recon','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black Squideye','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Sailor-Stripe Tee','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Urchins Jersey','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Striped Rugby','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Camo Layered LS','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Samurai Jacket','ability':'Special Charge Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Baseball Jersey','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black Tee','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Pirate Stripe Tee','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Sunny-Day Tee','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Zink LS','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Berry Ski Jacket','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Green Zip Hoodie','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/33','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/3.3','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black Pipe Tee','ability':'Special Saver','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White Layered LS','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'B-Ball Jersey (Home)','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Layered Vector LS','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Splatfest Tee','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/3.3','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/33','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Black Baseball LS','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Gray College Sweat','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/3.3','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/33','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'White Line Tee','ability':'Swim Speed Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Hero Jacket Replica','ability':'Swim Speed Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Clothes', 'name':'Mountain Vest','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Pink Rubber-Soles','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Tan Work Boots','ability':'Bomb Range Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Banana Basics','ability':'Bomb Sniffer','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Yellow Seahorses','ability':'Bomb Sniffer','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Pro Trail Boots','ability':'Bomb Sniffer','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Cyan Trainers','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Plum Casuals','ability':'Damage Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Blue Lo-Tops','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Squid-Stitch Slip-Ons','ability':'Defense Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Hunter Hi-Tops','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'White Seahorses','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Trail Boots','ability':'Ink Recovery Up','Bomb Range Up':'1/16.5','Damage Up':'1/33','Defense Up':'1/3.3','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Neon Sea Slugs','ability':'Ink Resistance Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Red Hi-Tops','ability':'Ink Resistance Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Blue Moto Bots','ability':'Ink Resistance Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Orange Arrows','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Red Hi-Horses','ability':'Ink Saver (Main)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Power Boots','ability':'Ink Saver (Main)','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Blueberry Casuals','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'School Shoes','ability':'Ink Saver (Sub)','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'LE Lo-Tops','ability':'Ink Saver (Sub)','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Black Trainers','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Choco Clogs','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Moto Boots','ability':'Quick Respawn','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Blue Slip-Ons','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Red Slip-Ons','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Hero Runner Replicas','ability':'Quick Super Jump','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Red Work Boots','ability':'Quick Super Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Oyster Clogs','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Purple Sea Slugs','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Gold Hi-Horses','ability':'Run Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Clownfish Basics','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Zombie Hi-Horses','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Turquoise Kicks','ability':'Special Charge Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Purple Hi-Horses','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Samurai Shoes','ability':'Special Duration Up','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'White Arrows','ability':'Special Duration Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Cream Basics','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Octoling Boots','ability':'Special Saver','Bomb Range Up':'1/13','Damage Up':'1/13','Defense Up':'1/13','Ink Recovery Up':'1/13','Ink Saver (Main)':'1/13','Ink Saver (Sub)':'1/13','Quick Respawn':'1/13','Quick Super Jump':'1/13','Run Speed Up':'1/13','Special Charge Up':'1/13','Special Duration Up':'1/13','Special Saver':'1/13','Swim Speed Up':'1/13'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Red Sea Slugs','ability':'Special Saver','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/3.3','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/33','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Cream Hi-Tops','ability':'Stealth Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/33','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/3.3'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Cherry Kicks','ability':'Stealth Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Crazy Arrows','ability':'Stealth Jump','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/3.3','Special Duration Up':'1/33','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Orange Lo-Tops','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/16.5','Special Charge Up':'1/33','Special Duration Up':'1/16.5','Special Saver':'1/3.3','Swim Speed Up':'1/16.5'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'White Kicks','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/16.5','Quick Super Jump':'1/16.5','Run Speed Up':'1/3.3','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/33'},
	{'show' : true,'uname': '', 'type': 'Shoes', 'name':'Black Seahorses','ability':'Swim Speed Up','Bomb Range Up':'1/16.5','Damage Up':'1/16.5','Defense Up':'1/16.5','Ink Recovery Up':'1/16.5','Ink Saver (Main)':'1/16.5','Ink Saver (Sub)':'1/16.5','Quick Respawn':'1/33','Quick Super Jump':'1/3.3','Run Speed Up':'1/16.5','Special Charge Up':'1/16.5','Special Duration Up':'1/16.5','Special Saver':'1/16.5','Swim Speed Up':'1/16.5'
}];

});
