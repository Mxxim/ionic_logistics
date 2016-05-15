/**
 * Created by sammy on 2016/5/10.
 */

define([],function(){
  'use strict';
  function lorryInfoAddCtrl($scope,$rootScope,$ionicModal,$ionicLoading,$state,storageService,LorryService){

    console.log("---------------enter lorryInfoAddCtrl-------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------lorryInfoAddCtrl销毁-------------------");
    })


    //*************初始化******************
    var storageKey = "driver";
    var _this = this;
    _this.lorrys = [];
    _this.lorryInfo = {
      from:"",
      to:"",
      dateTime:"",
      lorryID:"",
      text:""
    };
    _this.selectedLorry = {};
    _this.lorryName = "您的车辆";

    var user = storageService.get(storageKey);
    var postData = {};

    $rootScope.hideTabs = ' ';

    // 获取当前车主的所有车辆
    LorryService.getList(user.id).then(function(res){
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

    // 确定选择的车辆
    //_this.select = function(){
    //  console.log( _this.selectedLorry);
    //
    //}


    // 定义模态框操作，这是固定的写法
    $ionicModal.fromTemplateUrl('templates/lorry/selectLorry.html', function (modal) {
      _this.PublishModal = modal
    }, {
      animation: "slide-in-up",
      focusFirstInput: true,
      scope: $scope
    });

    _this.showPublishModal = function () {
      _this.PublishModal.show();
    };

    _this.closePublishModal = function () {
      _this.lorryName = _this.selectedLorry.lorryType +"  "+_this.selectedLorry.number;
      _this.PublishModal.hide();
    };

    //$scope.$on('modal.hidden', function () {
    //  console.log("modal.hidden");
    //});

    // 发布车源
    _this.addInfo = function(from,to,date){

      postData = {
        from:from,
        to:to,
        dateTime:date.year+"-"+date.month+"-"+date.day,
        text:_this.lorryInfo.text,
        lorryID: _this.selectedLorry._id,
        userID:user.id
      };

      LorryService.addLorryInfo(postData).then(function(res){
        console.log(res);
        if(res.code == 1){
          $state.go("menu.tabs.lorryInfo");
        }
        $ionicLoading.show({
          noBackdrop: true,
          template: res.message,
          duration: 1500
        });
      },function(err){
        console.log(err);
      });
      //_this.lorry.userID = user.id;
      //LorryService.addLorry(lorry).then(function(res){
      //  $ionicLoading.show({
      //    noBackdrop: true,
      //    template: res.message,
      //    duration: 1500
      //  });
      //  if(res.code == 1){
      //    $state.go("menu.lorry");
      //  }
      //
      //},function(err){
      //  console.log(err);
      //});
    }
  }

  return lorryInfoAddCtrl;

});
