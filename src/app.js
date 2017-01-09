let app = angular.module('app', []);

app.controller('controller', ['$scope', '$log', function($scope, $log) {
  $scope.myAlert = function() {
    $log.log('Alert');
  }
}]);

function ScrollObserveController() {
  function isVisible(element) {
    let el = element[0].getBoundingClientRect();
    return ($window.innerHeight > el.top && el.bottom > 0);
  }

  function link(scope, element, attrs) {
    let fired = false;

    angular.element($window).bind('scroll', function() {
      if(isVisible(element)) {
        if(!fired) {
          scope.$apply(attrs.observe);
        }
        fired = true;
      } else {
        fired = false;
      }
      scope.$digest();
    });
  }
}

app.component('scrollObserve', {
  templateUrl: '',
  controller: ScrollObserveController,
  bindings: {
    observe: '>'
  }
});

// app.component('scrollObserve', function($window) {
//   return {
//     link: link
//   };
//
//   function isVisible(element) {
//     let el = element[0].getBoundingClientRect();
//     return ($window.innerHeight > el.top && el.bottom > 0);
//   }
//
//   function link(scope, element, attrs) {
//     let fired = false;
//
//     angular.element($window).bind('scroll', function() {
//       if(isVisible(element)) {
//         if(!fired) {
//           scope.$apply(attrs.observe);
//         }
//         fired = true;
//       } else {
//         fired = false;
//       }
//       scope.$digest();
//     });
//   }
// });