/**
 * Created by xiaomin on 2016/3/30.
 */

//angular.module('starter.cargoCtrl', [])
//
//  .controller('CargoCtrl', function($scope) {
//
//    console.log("------货源-------");
//    $scope.hello = "hello Sammy";
//  })

define([],function(){
  'use strict';
  function cargoCtrl($scope,$rootScope,$ionicPopup,$timeout,$state,storageService ){
    // 原来是使用$scope.cargo={}
    // $scope.doSomething = function (){}
    var _this = this;
    _this.cargo = {};
    // resolved!
    //this.something  = cargoService.something;
    $rootScope.hideTabs = ' ';
    console.log("------货源-------");
    $scope.$on('$destroy',function(){
      console.log("------cargoCtrl销毁页面-------");
    })

    var storageKey = "user";
    var us = storageService.get(storageKey);
    if(us != undefined){
      $rootScope.userInfo =us;
    }


    //this.address = {
    //  city:"湛江市",
    //  area:"麻章区"
    //}
    //this.items = [
    //  {
    //    user:{
    //      name:"马女士",
    //      url:"../www/img/ben.png"
    //    },
    //    addrFrom: {
    //      city: "厦门市",
    //      area: "思明区"
    //    },
    //    addrTo: {
    //      city: "广州市",
    //      area: "越秀区"
    //    },
    //    cargo: {
    //      dateTime: "2016-04-05早上",
    //      name: "饮料",
    //      weight: 25,
    //      lorry: {
    //        length: 17.5,
    //        type: "平板车"
    //      }
    //    }
    //  },
    //  {
    //    user:{
    //      name:"马女士",
    //      url:"../www/img/ben.png"
    //    },
    //    addrFrom: {
    //      city: "湛江市",
    //      area: "麻章区"
    //    },
    //    addrTo: {
    //      city: "广州市",
    //      area: "越秀区"
    //    },
    //    cargo: {
    //      dateTime: "2016-04-05早上",
    //      name: "饮料",
    //      weight: 25,
    //      lorry: {
    //        length: 17.5,
    //        type: "平板车"
    //      }
    //    }
    //  },
    //  {
    //    user:{
    //      name:"马女士",
    //      url:"../www/img/ben.png"
    //    },
    //    addrFrom:{
    //      city:"湛江市",
    //      area:"麻章区"
    //    },
    //    addrTo:{
    //      city:"上海市",
    //      area:"黄埔区"
    //    },
    //    cargo:{
    //      dateTime:"2016-04-05早上",
    //      name:"饮料",
    //      weight:25,
    //      lorry:{
    //        length:17.5,
    //        type:"平板车"
    //      }
    //    }
    //  },
    //  {
    //    user:{
    //      name:"马女士",
    //      url:"../www/img/ben.png"
    //    },
    //    addrFrom:{
    //      city:"汕头市",
    //      area:"潮阳区"
    //    },
    //    addrTo:{
    //      city:"上海市",
    //      area:"黄埔区"
    //    },
    //    cargo:{
    //      dateTime:"2016-04-05早上",
    //      name:"饮料",
    //      weight:25,
    //      lorry:{
    //        length:17.5,
    //        type:"面包车"
    //      }
    //    }
    //  }
    //]

    _this.address = {
      city:"",
      area:""
    }
    /* 判断当前是否连网，获取当前地址信息 */
      baidu_location.getCurrentPosition(function(addr){
        // 返回的addr是string类型
        //console.log(typeof(addr));
        //console.log(addr);
        //console.log(JSON.stringify(addr));
        _this.address.city = addr.city;
        _this.address.area = addr.district;
        console.log("--------------定位获取地址----------------");
        console.log(JSON.stringify(addr));

        _this.items = [
          {
            user:{
              name:"马女士",
              url:"../www/img/ben.png"
            },
            addrFrom: {
              city: "厦门市",
              area: "思明区"
            },
            addrTo: {
              city: "广州市",
              area: "越秀区"
            },
            cargo: {
              dateTime: "2016-04-05早上",
              name: "饮料",
              weight: 25,
              lorry: {
                length: 17.5,
                type: "平板车"
              }
            }
          },
          {
            user:{
              name:"马女士",
              url:"../www/img/ben.png"
            },
            addrFrom: {
              city: "湛江市",
              area: "麻章区"
            },
            addrTo: {
              city: "广州市",
              area: "越秀区"
            },
            cargo: {
              dateTime: "2016-04-05早上",
              name: "饮料",
              weight: 25,
              lorry: {
                length: 17.5,
                type: "平板车"
              }
            }
          },
          {
            user:{
              name:"马女士",
              url:"../www/img/ben.png"
            },
            addrFrom:{
              city:"湛江市",
              area:"麻章区"
            },
            addrTo:{
              city:"上海市",
              area:"黄埔区"
            },
            cargo:{
              dateTime:"2016-04-05早上",
              name:"饮料",
              weight:25,
              lorry:{
                length:17.5,
                type:"平板车"
              }
            }
          },
          {
            user:{
              name:"马女士",
              url:"../www/img/ben.png"
            },
            addrFrom:{
              city:"汕头市",
              area:"潮阳区"
            },
            addrTo:{
              city:"上海市",
              area:"黄埔区"
            },
            cargo:{
              dateTime:"2016-04-05早上",
              name:"饮料",
              weight:25,
              lorry:{
                length:17.5,
                type:"面包车"
              }
            }
          },
          {
            user:{
              name:"马女士",
              url:"../www/img/ben.png"
            },
            addrFrom: {
              city: "湛江市",
              area: "麻章区"
            },
            addrTo: {
              city: "广州市",
              area: "越秀区"
            },
            cargo: {
              dateTime: "2016-04-05早上",
              name: "饮料",
              weight: 25,
              lorry: {
                length: 17.5,
                type: "平板车"
              }
            }
          },
          {
            user:{
              name:"马女士",
              url:"../www/img/ben.png"
            },
            addrFrom: {
              city: "湛江市",
              area: "麻章区"
            },
            addrTo: {
              city: "广州市",
              area: "越秀区"
            },
            cargo: {
              dateTime: "2016-04-05早上",
              name: "饮料",
              weight: 25,
              lorry: {
                length: 17.5,
                type: "平板车"
              }
            }
          },
          {
            user:{
              name:"马女士",
              url:"../www/img/ben.png"
            },
            addrFrom: {
              city: "湛江市",
              area: "麻章区"
            },
            addrTo: {
              city: "广州市",
              area: "越秀区"
            },
            cargo: {
              dateTime: "2016-04-05早上",
              name: "饮料",
              weight: 25,
              lorry: {
                length: 17.5,
                type: "平板车"
              }
            }
          }


        ];

      }, function(e){
        console.log("error: "+e);
      });


    _this.showPopup = function(obj){

      //$scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<div>货品信息：</div><a href="tel:13726935307"><button class="button button-outline button-positive" ng-click="cargo.closePopup()">确定(拨号)</button></a>',
        title: '请确认运单信息',
        subTitle: '点击确定后将自动拨通货主号码',
        scope: $scope,
        buttons: [
          { text: '取消' },
          {
            text: '<a href="#/menu/tabs/cargo">确定(拨号)</a>',
            type: 'button-positive',
            onTap: function(e) {
              //if (!$scope.data.wifi) {
              //  //don't allow the user to close unless he enters wifi password
              //  e.preventDefault();
              //} else {
              //  return $scope.data.wifi;
              //}
              console.log("--------onTap-----------");
              e.preventDefault();
              $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
              }, 3000);
            }
          }
        ]
      });

      _this.closePopup = function(){
        //$timeout(function() {
          myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go("menu.order");
        //}, 3000);
      }
      //myPopup.then(function(res) {
      //  console.log('Tapped!', res);
      //});



      //
      //var confirmPopup = $ionicPopup.confirm({
      //  title: '请确认运单信息',
      //   subTitle: '点击确定后将自动拨通货主号码',
      //  okText:'<a href="tel:13726935307">确定(拨号)</a>',
      //  cancelText:'取消',
      //  template: '<div>货品信息：{{cargo.hello}}</div>'
      //});
      //
      //confirmPopup.then(function(res) {
      //  if(res) {
      //    console.log('You are sure');
      //  } else {
      //    console.log('You are not sure');
      //  }
      //});
    }
  }
  // create the resolved property
  //cargoCtrl.resolve = {
  //  doSomething: function(cargoService){
  //    return cargoService.doSomething();
  //  }
  //}

  return cargoCtrl;
});
