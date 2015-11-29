'use strict';

var splatoonApp = angular.module('splatoonApp', []);


splatoonApp.controller('MainCtrl', function ($scope) {

	//Load in datatables
	angular.module('splatoonApp').stats($scope);
	angular.module('splatoonApp').abilities($scope);
	angular.module('splatoonApp').gear($scope);

	//Start main logic
	var points = 0;
	$scope.mains = [];
	$scope.subs = [];
	$scope.showModal = false;
	$scope.ErrorMessage= 'Testing';
  $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
  };

	$scope.activate = function(ability){

		/*
		for(var i = 0; i < $scope.mains.length; i++){
			for(var j=0; j < $scope.gear.length; j++){

					if($scope.gear[j].ability === $scope.mains[i].name){
						abilitygear[i].push($scope.gear[j].type)
				}

			}
		}
		*/


		if (points >= 57) {
			//alert('Too Many Abilities!!');
			$scope.ErrorMessage = 'Too Many Abilities!!';
			$scope.toggleModal();
			return;
		}

		var i = $scope.abilities.indexOf(ability);
		if( $scope.mains.length<3 ){

			if($scope.abilities[i].stackable || $scope.mains.indexOf(ability) == -1){
				$scope.mains.push($scope.abilities[i]);
				points+=10;
				console.log($scope.mains.length);

				console.log($scope.mains[$scope.mains.length-1]);
				calc();
			}
			else {
				//alert('Cannot Stack This Ability!!');
				$scope.ErrorMessage = 'Cannot Stack This Ability!!';
				$scope.toggleModal();
				return;
			}
		}

		else if ( $scope.abilities[i].stackable ){
			$scope.subs.push($scope.abilities[i]);
			points+=3;
			calc();
		}
		else {
			//alert('Cannot Sub This Ability!!');
			$scope.ErrorMessage = 'Cannot Sub This Ability!!';
			$scope.toggleModal();		}
	};

	$scope.demain = function(main) {
		$scope.mains.splice($scope.mains.indexOf(main), 1);
		points-=10;
		calc();
	};
	$scope.desub = function(sub) {
		$scope.subs.splice($scope.subs.indexOf(sub), 1);
		points-=3;
		calc();
	};

	// Calc function for finding values
	function calc() {


		//Hide all gear and show what is selected.
		for(var i = 0; i < $scope.gear.length; i++){
				console.log('hiding gear');
				$scope.gear[i].show = false;
				$scope.gear[i].uname = $scope.gear[i].name.replace(/ /g,'_');
			}
			console.log($scope.gear[0].show);

		for(var i = 0; i < $scope.gear.length; i++){
				for(var j=0; j < $scope.mains.length; j++){

					if($scope.gear[i].ability === $scope.mains[j].name){
						console.log('showing ' + $scope.gear[i].name);

						$scope.gear[i].show = true;
						console.log('showing ' + $scope.gear[i].show);

					}
					for(var itm in $scope.gear[i]){
						if(itm === $scope.mains[j].name && $scope.gear[i][itm] === '1/3.3'){
							console.log('showing ' + $scope.gear[i].name);
							$scope.gear[i].show = true;
							console.log('showing ' + $scope.gear[i].show);
						}
					}
				}
			}

		for(var i=0; i < $scope.stats.length; i++){
			var name = $scope.stats[i].name;
			$scope.stats[i].apply(
				$scope.mains.count(name),
				$scope.subs.count(name)
			);
		}
	}

	$scope.clear = function() {
		console.log('CLEARED');
		$scope.mains.length=0;
		$scope.subs.length=0;
		points = 0;
		calc();
	};
});

splatoonApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' +
          '<div class="modal-dialog">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">{{ ErrorMessage }}</h4>' +
								'</div>' +
	              '<div class="modal-body" ng-transclude></div>' +
	            '</div>' +
	          '</div>' +
	        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
});
