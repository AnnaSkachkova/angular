(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var toByItems = [{
      name: "Bread",
      quantity: 1
    }, {
      name: "Milk",
      quantity: 2
    }, {
      name: "Apples",
      quantity: 10
    }, {
      name: "Bananas",
      quantity: 5
    }, {
      name: "Fish",
      quantity: 3
    }];

    var boughtItems = [];

    service.buyItem = function (itemIndex) {
      boughtItems.push(toByItems[itemIndex]);
      toByItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toByItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

})();
