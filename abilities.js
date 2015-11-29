angular.module('splatoonApp').abilities = function ($scope) {

	$scope.abilities =[{
		name : 'Special Charge Up',
		info : 'Special Charge Up',
		icon : 'assets/images/Ability_Special_Charge_Up.png',
		stackable: true,
		affects: 'Special Charge'
	}, {
		name : 'Ink Saver (Main)',
		info : 'Ink Saver (Main)',
		icon : 'assets/images/Ability_Main_Ink_Saver.png',
		stackable: true,
		affects: 'Ink Usage Main'
	}, {
		name : 'Ink Saver (Sub)',
		info : 'Ink Saver (Sub)',
		icon : 'assets/images/Ability_Sub_Ink_Saver.png',
		stackable: true,
		affects: 'Ink Usage Sub'
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
		affects: 'Damage'
	}, {
		name : 'Defense Up',
		info : 'Defense Up',
		icon : 'assets/images/Ability_Defense_Up.png',
		stackable: true,
		affects: 'Defense'
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
		affects: 'Bomb Throw Range'
	}, {
		name : 'Ink Recovery Up',
		info : 'Ink Recovery Up',
		icon : 'assets/images/Ability_Ink_Recovery_Up.png',
		stackable: true,
		affects: 'Ink Recovery'
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
		negative: true, //FIXME "negative" does not simply negate a main. Check the wiki.
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
		affects: 'Respawn Rate'
	}, {
		name : 'Quick Super Jump',
		info : 'Quick Super Jump',
		icon : 'assets/images/Ability_Quick_Super_Jump.png',
		stackable: true,
		affects: 'Jump Speed'
	}, {
		name : 'Run Speed Up',
		info : 'Run Speed Up',
		icon : 'assets/images/Ability_Run_Speed_Up.png',
		stackable: true,
		affects: 'Run Speed'
	}, {
		name : 'Special Duration Up',
		info : 'Special Duration Up',
		icon : 'assets/images/Ability_Special_Duration_Up.png',
		stackable: true,
		affects: 'Special Time'
	}, {
		name : 'Special Saver',
		info : 'Special Saver',
		icon : 'assets/images/Ability_Special_Saver.png',
		stackable: true,
		affects: 'Special Save'
	}, {
		name : 'Stealth Jump',
		info : 'Stealth Jump',
		icon : 'assets/images/Ability_Stealth_Jump.png',
		stackable: false,
		effects: 'Hides jump location from enemy team',
		affects: 'Jump Speed',
		negative: true //FIXME "negative" does not simply negate a main. Check the wiki.
	}, {
		name : 'Swim Speed Up',
		info : 'Swim Speed Up',
		icon : 'assets/images/Ability_Swim_Speed_Up.png',
		stackable: true,
		affects: 'Swim Speed'
	}, {
		name : 'Tenacity',
		info : 'Fills the special gauge automatically if your team has fewer active players than the enemy',
		icon : 'assets/images/Ability_Tenacity.png',
		stackable: false,
		affects: 'nothing',
		effects: 'Fills the special gauge automatically if your team has fewer active players than the enemy'
	}];
};
