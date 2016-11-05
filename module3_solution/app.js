(function (){
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundList', FoundList);

    function FoundList() {
      var ddo = {
        templateUrl: 'foundList.html',
				scope: {
					items: '<',
					onRemove: '&'
				},
				controller: ShoppingListDirectiveController,
				controllerAs: 'list',
				bindToController: true
      };

      return ddo;
    }
		
		function ShoppingListDirectiveController() {
			var list = this;
		}

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var list = this;

      list.searchTerm = '';
      list.items = [];
			list.nothingFound = false;

      list.search = function () {
        if (list.searchTerm.length) {

          var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

          promise.then(function (response) {
            if (response.length) {
							list.nothingFound = false;
							list.items = response;
						} else {
							list.nothingFound = true;
						}
          })
          .catch(function (error) {
            console.error('Error!!!');
          });
        } else {
					list.nothingFound = true;
				}
      };

      list.removeItem = function (index) {
        list.items.splice(index, 1);
      }

    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
      var service = this;

      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          metod: "GET",
          url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).then(function (result) {
          var foundItems = result.data.menu_items.filter(function (item) {
            return item.description.indexOf(searchTerm) > 0;
          });

          return foundItems;
        });
      }

    }

})();
