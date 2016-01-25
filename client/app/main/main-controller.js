angular.module('app')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

     $scope.user = [];
     $scope.newItem = {};

     function getUser() {
           $http.get('/api/user')
	          .success(function (user) {
			  $scope.user = user;
		   })
          .error(handleError);
     }

     function handleError() {
         console.log('there was an error accessing the api');
     }

     $scope.add = function () {
         $scope.saving = true;

         if (!$scope.newItem.email) {
	      return;
	 }

	 $http.post('/api/user', angular.copy($scope.newItem))
	     .success(function (user) {
		 $scope.user.push(user);
	         $scope.newItem = {};
	         $scope.saving = false;
	     })
	     .error(function () {
	         handleError();
	         $scope.saving = false;
	     });
     };

     $scope.remove = function (id) {
         var index = this.$index;
         $http.delete('/api/user/' + id)
	      .success(function () {
		  $scope.user.splice(index, 1);
	      })
	      .error(handleError);
      };

      $scope.startEdit = function (user) {
            $scope.currentEdit = angular.copy(user);
      };

      $scope.update = function (user, event, email) {
            if (!user.email) {
		user.email = $scope.currentEdit.email;
            }
	    // submit also triggers blur, prevent double saving
	    if (event === 'blur' && $scope.saveEvent === 'submit') {
	        $scope.saveEvent = null;
	        return;
	    }
	
	    $scope.saveEvent = event;
	    $scope.currentEdit = null;
	
	    $http.put('/api/user/' + user._id, user).error(handleError);
       };

      // Get initial data from api
       getUser();
}]);
