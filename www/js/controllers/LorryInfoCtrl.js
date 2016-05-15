/**
 * Created by sammy on 2016/4/9.
 */

define([],function(){
  'use strict';
  function lorryInfoCtrl($scope,$ionicModal,$ionicActionSheet,$state,storageService,LorryService){


    console.log("----------------enter lorryInfoCtrl--------------------");
    $scope.$on('$destroy',function(){
      console.log("------------------lorryInfoCtrl销毁页面-------------------");
    })

    var    _this = this;
    _this.lorryInfos = [];

    var storageKey = "driver";
    var user = storageService.get(storageKey);

    _this.toAdd = function(){
      $state.go("menu.tabs.addLorryInfo");
    };

    // 获得我的车源列表
    LorryService.getLorryInfoList(user.id).then(function(res){
      if(res.code == 1){
        _this.lorryInfos = res.lorryInfos;
      }
    },function(err){
      console.log(err);
    });

  }

  return lorryInfoCtrl;

});
