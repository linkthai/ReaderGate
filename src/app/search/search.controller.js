(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($scope, $routeParams, $window, $location) {
    var vm = this;
    vm.searchString = '';
    vm.searchString = $routeParams.param1;
    vm.comicList = [];
    vm.comicListResult = [];
    vm.chunkData = [];

    $scope.$on('$viewContentLoaded', function() {
      window.scrollTo(0, 0);
    });

    vm.searchPressed = function() {

      $location.path('/search/' + vm.searchString);

      vm.search();
    }
    
    
    vm.chunk = function(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

    vm.filterResult = function() {

      vm.comicListResult.length = 0;
      while (vm.comicListResult.length > 0) {
        vm.comicListResult.pop();
      }

      var subString = vm.searchString.toLowerCase();
      for (var i = 0; i < vm.comicList.length; i++) {
        var title = vm.comicList[i].title.toLowerCase();
        if (title.indexOf(subString) > -1) {
          vm.comicListResult.push(vm.comicList[i]);
        }
      }
         
      vm.chunkData = vm.chunk(vm.comicListResult, 4);
    }

    vm.search = function() {

      if (vm.searchString == null || vm.searchString == '')
        return;

      $scope.getAllSeries();
      vm.filterResult();

      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();//  your code here
          if (--i) myLoop(i) //  decrement i and call myLoop again if i > 0
        }, 50)
      })(100);
    }

    vm.goToTitle = function(bookId) {
      $location.path('/archive/' + bookId);
    }

    $scope.getAllSeries = function() {
      var database = firebase.database();
      vm.comicList.length = 0;

      database.ref('series/').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.comicList.push({
            data: childData,
            title: childData._title,
            author: childData._author,
            cover: childData._cover,
            genres: childData._genres,
            status: 'Incomplete'
          });
        });
      });
    }
    

    vm.search();
  }
})();
