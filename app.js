var myApp = angular.module('myApp', ['ui.router', 'ngMaterial']);

// Configuring the states of our application.
myApp.config(function($stateProvider) {

    // First state 'Home' config
    var homeState = {
      name: 'Home',
      url: '',
      controller: 'homeController',
      templateUrl: 'views/formDiv.html',
      params: {
        fromWhere: '',
        toWhere: '',
        people:''
      }
    }
  
    // Second state 'Info' config 
    var infoState = {
      name: 'Info',
      url: '/Info',
      component: 'infoComponent',
      params: {
        fromWhere: '',
        toWhere: '',
        people: ''
      }
    }
  
    // Specifying the states.
    $stateProvider.state(homeState);
    $stateProvider.state(infoState);

  });


  // Controller for the home page.
  myApp.controller('homeController', ['$scope', '$state','$stateParams' , function($scope, $state, $stateParams) {
    
    $scope.searchValues = function() {

        if($scope.vacation === undefined){
          $scope.vacation.from = '';
          $scope.vacation.to = '';
          $scope.vacation.people = '';
        }
        
        // Linking the information entered by the user to the params object.
        $stateParams.fromWhere = $scope.vacation.from;
        $stateParams.toWhere = $scope.vacation.to;
        $stateParams.people = $scope.vacation.people;

        console.log($scope.vacation);

        // Making the input fields empty.
        $scope.vacation.from = '';
        $scope.vacation.to = '';
        $scope.vacation.people = '';

        // Transfering the state to the about state and passing stateParams as a parameter.
        $state.go('Info', $stateParams);
    };

  }]);

// Thee '$ctrl.something in the temlate accesses the information from the controller.
// Receiving the $stateParams parameters (copies the $stateParams of the sending object).

myApp.component('infoComponent', {
    templateUrl: 'views/secondRoute.html',
    controller: function($stateParams, $scope){

        // Setting variables to receive the values passed in $stateParams.
        this.destination = $stateParams.toWhere;
        this.leaving = $stateParams.fromWhere;
        this.number = $stateParams.people;
        $scope.number = $stateParams.people;
        $scope.destination = $stateParams.toWhere;
        $scope.leaving = $stateParams.fromWhere;

        // List of fictiv flights.
        $scope.flights = [
          {
            from: 'Israel',
            to: 'Japan'
          },
          {
            from: 'Russia',
            to: 'Japan'
          },
          {
            from: 'US',
            to: 'Russia'
          },
          {
            from: 'Israel',
            to: 'Russia'
          },
          {
            from: 'Israel',
            to: 'US'
          }
        ];


        $scope.searchValues = function() {

          leaving = $scope.leaving;
          destination = $scope.destination;

          // Linking the information entered by the user to the params object.
          $stateParams.fromWhere = $scope.leaving;
          $stateParams.toWhere = $scope.destination;
    
          // Making the input fields empty.
          $scope.leaving = '';
          $scope.destination = '';
  
          // Setting local variables equal to inputs from the user.
          $scope.destination = $stateParams.toWhere;
          $scope.leaving = $stateParams.fromWhere;
      };

    }
})