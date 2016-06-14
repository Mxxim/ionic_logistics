/**
 * Created by sammy on 2016/4/9.
 */

define([],function(){
  'use strict';
  function lorryInfoCtrl($scope,$ionicModal,$ionicActionSheet,$ionicPopup,$ionicLoading,$timeout,$state,storageService,LorryService){


    console.log("----------------enter lorryInfoCtrl--------------------");
    $scope.$on('$destroy',function(){
      console.log("------------------lorryInfoCtrl销毁页面-------------------");
    })

    var    _this = this;
    _this.lorryInfos = [];

    var storageKey = "driver";
    var user = storageService.get(storageKey);

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

    // 获得我的车源列表
    var getList = function(uid){
      _this.showloading = true;

      var timer = $timeout(
        function() {
          LorryService.getLorryInfoList(uid).then(function(res){
            if(res.code == 1){
              _this.lorryInfos = res.lorryInfos;
              _this.showloading = false;
            }
          },function(err){
            console.log(err);
          });
          $timeout.cancel(timer);
        },
        500
      );
    };

    _this.toAdd = function(){
      $state.go("menu.tabs.addLorryInfo");
    };

    // 删除车源
    _this.del = function(id){
      showConfirm("是否确定删除车源？",function(){   // 由于没有做后台管理系统，这里假设点击确定以后，运单就被取消了。
        LorryService.deleteLorryInfo(id).then(function(res){
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

    getList(user.id);
  }

  return lorryInfoCtrl;

});
