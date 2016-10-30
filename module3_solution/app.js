(function (){
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        }
      };

      return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var list = this;

      list.searchTerm = "";
      list.items = [];

      list.search = function () {
        if (list.searchTerm.length) {
          console.log('searchTerm', list.searchTerm);

          var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

          promise.then(function (responce) {
            console.log(responce);
            list.items = responce;
          })
          .catch(function (error) {
            console.error('Error!!!');
          });
        }
      };

      list.removeItem = function (index) {
        list.items.splice(index, 1);
      }

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          metod: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
          console.log('result', result);
          var foundItems = result.data.menu_items.filter(function (item) {
            return item.description.indexOf(searchTerm) > 0;
          });

          console.log(foundItems);

          return foundItems;
        });
      }

    }

})();
