/**
 * Created by sammy on 2016/4/6.
 */
define([],function(){
  'use strict';
  function lorryCtrl($scope,$rootScope,$ionicLoading,$ionicActionSheet,$state,storageService,LorryService){

    console.log("---------------enter lorryCtrl-------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------lorryCtrl销毁-------------------");
    })


    //*************初始化******************
    var storageKey = "driver";
    var _this = this;
    _this.lorrys = [];

    $rootScope.hideTabs = ' ';

    var user = storageService.get(storageKey);
    LorryService.getList(user.id).then(function(res){
      console.log(res);
      if(res.code == 1){
        _this.lorrys = res.lorrys;
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


    // 跳转到添加页面
    _this.toAdd = function(){
      $state.go("menu.tabs.addLorry");
    };
  }

  return lorryCtrl;

});
