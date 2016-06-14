/**
 * Created by sammy on 2016/4/6.
 */
define([],function(){
  'use strict';
  function lorryCtrl($scope,$rootScope,$ionicLoading,$ionicPopup,$ionicActionSheet,$state,$timeout,storageService,LorryService){

    console.log("---------------enter lorryCtrl-------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------lorryCtrl销毁-------------------");
    })


    //*************初始化******************
    var storageKey = "driver";
    var _this = this;
    _this.lorrys = [];
    _this.showloading = true;

    $rootScope.hideTabs = ' ';

    var user = storageService.get(storageKey);

    var getList = function(uid){
      _this.showloading = true;

      var timer = $timeout(
        function() {
          LorryService.getList(uid).then(function(res){
            if(res.code == 1){
              _this.lorrys = res.lorrys;
              _this.showloading = false;
            }else{
              $ionicLoading.show({
                noBackdrop: true,
                template: res.message,
                duration: 1500
              });
            }

          },function(err){
            console.log(err);
          });
          $timeout.cancel(timer);
        },
        500
      );
    }

    // A confirm dialog
    var showConfirm = function(str,callback) {
      var confirmPopup = $ionicPopup.confirm({
        title: '提示信息',
        template: str,
        cancelText:"取消",
        okText:"确定"
      });

      confirmPopup.then(function(res) {
        if(res) {
          callback();
        } else {
          console.log('You are not sure');
        }
      });
    };

    // An alert dialog
    var showAlert = function(str) {
      var alertPopup = $ionicPopup.alert({
        title: '提示信息',
        template: str
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

  getList(user.id);


    // 跳转到添加页面
    _this.toAdd = function(){
      $state.go("menu.tabs.addLorry");
    };

    // 删除车辆
    _this.dele = function(id){
      showConfirm("该车辆下的车源信息也将一起删除，是否确定删除？",function(){   // 由于没有做后台管理系统，这里假设点击确定以后，运单就被取消了。
        LorryService.deleteLorry(id).then(function(res){
          if(res.code == 1){
            $ionicLoading.show({
              noBackdrop: true,
              template: res.message,
              duration: 500
            });
            getList(user.id);
          }
        },function(err){
          console.log(err);
        });
      });
    }
  }

  return lorryCtrl;

});
