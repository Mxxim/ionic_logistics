/**
 * Created by sammy on 2016/4/9.
 */

define([],function(){
  'use strict';
  function lorryInfoCtrl($scope,$ionicModal,$ionicActionSheet,$state){
    console.log("------车源-------");


    $scope.toAdd = function(){
      $state.go("menu.addLorryInfo");
    };

    $scope.$on('$destroy',function(){
      console.log("------lorryInfoCtrl销毁页面-------");
    })

    // 定义模态框操作，这是固定的写法
    $ionicModal.fromTemplateUrl('templates/lorry/selectLorry.html', function (modal) {
      $scope.PublishModal = modal
    }, {
      animation: "slide-in-up",
      focusFirstInput: true,
      scope: $scope
    });
    $scope.showPublishModal = function () {
      $scope.PublishModal.show();
    };

    $scope.closePublishModal = function () {
      $scope.PublishModal.hide();
    };

    $scope.$on('modal.hidden', function () {
      //cordova.plugins.Keyboard.disableScroll(false);
      console.log("modal.hidden");
    });

  }

  return lorryInfoCtrl;

});
