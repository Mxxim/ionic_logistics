/**
 * Created by sammy on 2016/5/8.
 */

/**
 * Created by xiaomin on 2016/3/30.
 */


define([],function(){
  'use strict';
  function cargoDetailCtrl($scope,$rootScope,$ionicPopup,$ionicLoading,$timeout,$state,$stateParams,storageService,cargoService,ENV,orderService,LorryService ){

    console.log("---------------enter cargoDetailCtrl-------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------cargoDetailCtrl销毁-------------------");
    })

    //**************初始化*******************
    var storageKey = "driver";
    var user = storageService.get(storageKey);
    var _this = this;
    _this.cargo = {};
    _this.lorrys = [];
    _this.selected = "";


    $rootScope.hideTabs = ' ';
    //$rootScope.api = ENV.api;


    // 根据ID得到该条货源详情
    cargoService.getById($stateParams.cid).then(function(res){
      if(res.code == 1){
        _this.cargo = res.cargo;
      }
    },function(err){
      console.log(err);
    });

    _this.showPopup = function(obj){

      // 得到车主车辆的车牌号
      LorryService.getList(user.id).then(function(res){
        if(res.code == 1){
          _this.lorrys = res.lorrys;
        }
      },function(err){
        console.log(err);
      });


      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        //template: '<a href="tel:'+_this.cargo.user.username+'"><button class="button button-outline button-positive" ng-click="cargoDetail.addOrder()">确定(拨号)</button></a>',
        template: '<div>' +
        '<select ng-model="cargoDetail.selected" style="padding:5px;">' +
        '<option value="">请选择车辆</option>' +
        '<option value="{{l.number}}" ng-repeat="l in cargoDetail.lorrys">{{l.number}}</option>' +
        '</select></div><br/>' +
        '<button class="button button-positive" style="position:absolute;z-index:99;bottom:9px;" ng-click="cargoDetail.addOrder()">确定(拨号)</button>',
        title: '请确认运单信息',
        subTitle: '点击确定后将自动拨通货主号码,生成运单',
        scope: $scope,
        buttons: [
          { text: '',
            onTap:function(e){
              e.preventDefault();
            }
          },

          {
            text: '取消',
            type: 'button-positive'
            //,
            //onTap: function(e) {
            //  //if (!$scope.data.wifi) {
            //  //  //don't allow the user to close unless he enters wifi password
            //  //  e.preventDefault();
            //  //} else {
            //  //  return $scope.data.wifi;
            //  //}
            //  console.log("--------onTap-----------");
            //  e.preventDefault();
            //  $timeout(function() {
            //    myPopup.close(); //close the popup after 3 seconds for some reason
            //  }, 3000);
            //}
          }
        ]
      });

      _this.closePopup = function(){
        //$timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
        //}, 3000);
      }

      _this.addOrder = function(){
        if(_this.selected == ""){
          $ionicLoading.show({
            noBackdrop: true,
            template: "请选择车辆，不能为空！",
            duration: 1500
          });
        }else{
          _this.closePopup();
          orderService.add(user.id,$stateParams.cid,_this.selected).then(function(res){
            console.log(res);
            if(res.code == 1){
              $state.go("menu.tabs.order");
            }else{
              $ionicLoading.show({
                noBackdrop: true,
                template:res.message,
                duration: 1500
              });
            }

          },function(err){
            console.log(err);
          });
        }
      }
    }
  }

  return cargoDetailCtrl;
});
