angular.module('splatoonApp').abilities = function ($scope) {
	
	$scope.abilities =[{
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
		mb : [-10,-10,-10],
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
};