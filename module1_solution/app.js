(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.dishes = '';
    $scope.message = '';

    $scope.check = function () {
      if ($scope.dishes === '') {
        $scope.message = 'Please enter data first';
      } else {
        var _dishes = $scope.dishes.split(',');
        if (_dishes.length <= 3)
        {
          $scope.message = 'Enjoy!';
        } else {
          $scope.message = 'Too much!';
        }
      }  
    }
  }

})();
