angular.module('farmplace')
  .controller('UserCtrl', ['$scope', 'UserService', '$location', '$window', function($scope, UserService, $location, $window) {

    $scope.saveToLS = function(id, token) {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
    };

    // this function creates a new user
    $scope.userSignup = function() {
      if ($scope.user === undefined) {
        $scope.error = 'Please fill the required field(s)!';
        $('#error').show();
      }
      else if ($scope.user.password !== $scope.user.confirmPassword) {
        $scope.error = 'Password Mismatch!';
        $('#error').show();
      } 
      else {
        UserService.userSignup($scope.user).then(function(res) {
          $scope.saveToLS(res.data.id, res.data.token);
          $location.url('/dashboard');
        }, function(err) {
          $scope.error = err.data.message;
          $('#error').show();
        });
      }
    };

    // this function signs a user in
    $scope.userLogin = function() {
      UserService.userLogin($scope.user).then(function(res) {
        $scope.saveToLS(res.data.id, res.data.token);
        $location.url('/dashboard');
      }, function(err) {
        $scope.error = err.data.message;
        $('#error').show();
      });
    };

    $scope.getUser = function() {
      var id = localStorage.getItem('id');
      UserService.getUser(id).then(function(res) {
        $scope.user = res.data;
      }, function(err) {
      })
    };

    $scope.forgotPassword = function() {
      UserService.forgotPassword($scope.user).then(function(res) {
        $scope.user = null;
        $scope.success = res.data.message;
        $('#success').show();
      }, function(err) {
        $scope.error = err.data.message;
        $('#error').show();
      });
    };

    $scope.resetPassword = function() {
      if ($scope.user.password !== $scope.user.confirmPassword) {
        $scope.error = 'Password Mismatch!';
        $('#error').show();
      }
      else {
        UserService.resetPassword($scope.user).then(function(res) {
          $location.url('/');
          $scope.success = res.data.message;
          $('#success').show();
        }, function(err) {
          $scope.error = err.data.message;
          $('#error').show();
        });
      }
    };


    $(window).load(function() { // makes sure the whole site is loaded
      $('#status').fadeOut(); // will first fade out the loading animation
      $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $('body').delay(350).css({'overflow':'visible'});
    })

$(document).ready(function() {
 
  $("#bg-slider").owlCarousel({
      navigation : false, // Show next and prev buttons
      slideSpeed : 100,
      autoPlay: 5000,
      paginationSpeed : 100,
      singleItem:true,
      mouseDrag: false,
      transitionStyle : "fade"
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false 
  });

  $("#testimonial-slider").owlCarousel({
      navigation : false, // Show next and prev buttons
      slideSpeed : 100,
      pagination : true,
      paginationSpeed : 100,
      singleItem:true,
      mouseDrag: false,
      transitionStyle : "goDown"
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false 
  });

    $('.more-jobs a').click(function(e){
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('more-jobs a');
      if($this.hasClass('more-jobs a')){
        $this.text('View less jobs');     
      } else {
        $this.text('View more jobs');
      }
    });

    $('.more-jobs a').click(function(){
      $('.table tr.hide-jobs').toggle();
    });


 
})


  }]);