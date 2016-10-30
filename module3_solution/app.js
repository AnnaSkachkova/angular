(function (){
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrow = this;

      narrow.searchTerm = "";
      narrow.found = [];

      narrow.search = function () {
        if (narrow.searchTerm.length) {
          console.log('searchTerm', narrow.searchTerm);

          var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

          promise.then(function (responce) {
            console.log(responce);
            narrow.found = response;
          })
          .catch(function (error) {
            console.error('Error!!!');
          });
        }
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
          var foundItems = result.data.menu_items.filter(function (item)
            return item.description.indexOf(searchTerm) > 0;
          });

          console.log(foundItems);

          return foundItems;
        });
      }

    }

})();
