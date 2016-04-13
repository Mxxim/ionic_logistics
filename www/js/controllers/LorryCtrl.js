/**
 * Created by sammy on 2016/4/6.
 */
//angular.module('starter.lorryCtrl', [])
//
//  .controller('LorryCtrl', ['$scope','$ionicHistory','$ionicModal',function($scope,$ionicHistory,$ionicModal) {
//
//    console.log("------车辆-------");
//    $scope.GoBack = function(){
//      $ionicHistory.goBack();
//    }
//    $scope.$on('$ionicView.afterLeave', function (e, data) {
//      console.log(e);
//      console.log(data);
//    });
//    $scope.$on('$destroy',function(){
//      console.log("------销毁页面-------");
//    })
//
//    // 定义模态框操作，这是固定的写法
//    $ionicModal.fromTemplateUrl('templates/lorry/addLorry.html', function (modal) {
//      $scope.PublishModal = modal
//    }, {
//      animation: "slide-in-up",
//      focusFirstInput: true,
//      scope: $scope
//    });
//
//    $scope.showPublishModal = function () {
//
//      $scope.PublishModal.show();
//
//    };
//
//    $scope.closePublishModal = function () {
//      $scope.PublishModal.hide();
//    }
//
//    $scope.$on('modal.hidden', function () {
//      //cordova.plugins.Keyboard.disableScroll(false);
//      console.log("modal.hidden");
//
//    });
//
//
//  }])

define([],function(){
  'use strict';
  function lorryCtrl($scope,$ionicHistory,$ionicModal,$ionicActionSheet,$state,LorryService){
    console.log("------车辆-------");

    $scope.$on('$destroy',function(){
      console.log("------lorryCtrl销毁页面-------");
    })
    $scope.toAdd = function(){
      $state.go("menu.addLorry");
    };

    //  定义上拉菜单的样式与操作
     $scope.showActionSheet = function(type){
       $scope.hideSheet = $ionicActionSheet.show({
        buttons:[
          {
            text:"拍照"
          },
          {
            text:"从相册中选择"
          }
        ],
        buttonClicked:function(index){
          switch(index){
            case 0:
              $scope.addImageFromCamera(type);
              break;
            case 1:
              $scope.addImageFromLib(type);
              break;
          }
          return true;
        },
        cancelText:"取消",
        cancel:function(){
          console.log("您执行了取消操作");
          return true;
        }
      });
    }

    // 相机
    $scope.addImageFromCamera = function(type){
      console.log("------------相机------------");
      $scope.hideSheet();
      LorryService.saveFromCamera().then(function(theImage){
        switch(type){
          // 车头
          case 1:
            console.log("--------------1--------------");
            $scope.carHead = theImage;
            break;
          //  45度
          case 2:
            console.log("--------------2--------------");
            $scope.car45 = theImage;
            break;
          // 车尾
          case 3:
            console.log("--------------3--------------");
            $scope.carTail = theImage;
            break;
          // 驾驶证
          case 4:
            console.log("--------------4--------------");
            $scope.carCard = theImage;
            break;
        }
      },function(e){
        console.log("error: "+e);
      });
    }
    // 图库
    $scope.addImageFromLib = function(type){
      console.log("------------图库------------");
      $scope.hideSheet();
      LorryService.saveFromLib().then(function(theImage){
        switch(type){
          // 车头
          case 1:
            console.log("--------------1--------------");
            $scope.carHead = theImage;
            break;
          //  45度
          case 2:
            console.log("--------------2--------------");
            $scope.car45 = theImage;
            break;
          // 车尾
          case 3:
            console.log("--------------3--------------");
            $scope.carTail = theImage;
            break;
          // 驾驶证
          case 4:
            console.log("--------------4--------------");
            $scope.carCard = theImage;
            break;
        }
      },function(e){
        console.log("error: "+e);
      });
    }
  }

  return lorryCtrl;

});
