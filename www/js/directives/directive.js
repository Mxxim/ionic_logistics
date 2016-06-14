/**
 * Created by xiaomin on 2016/1/12.
 */

//
//angular.module('starter.directive',[])
//
//    /**
//     * 隐藏页面底部标签栏
//     */
//    .directive('hideTabs',function($rootScope){
//        return {
//            restrict:'AE',
//            link:function($scope){
//              console.log("------come-------");
//                $rootScope.hideTabs = 'tabs-item-hide';
//              $scope.$on('$ionicView.afterLeave', function (e, data) {
//               console.log(e);
//               console.log(data);
//              });
//                $scope.$on('$destroy',function(){
//                  console.log("------销毁页面-------");
//                    $rootScope.hideTabs = ' ';
//                })
//            }
//        }
//    })
//
//  .directive('resizeFootBar', ['$ionicScrollDelegate', function($ionicScrollDelegate){
//    // Runs during compile
//    return {
//      replace: false,
//      link: function(scope, iElm, iAttrs, controller) {
//        scope.$on("taResize", function(e, ta) {
//          if (!ta) return;
//          var scroll = document.body.querySelector("#message-detail-content");
//          var scrollBar = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
//          // console.log(scroll);
//          var taHeight = ta[0].offsetHeight;
//          var newFooterHeight = taHeight + 10;
//          newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;
//
//          iElm[0].style.height = newFooterHeight + 'px';
//          scroll.style.bottom = newFooterHeight + 'px';
//          scrollBar.scrollBottom();
//        });
//      }
//    };
//  }])
define(function(){

  var directives = angular.module('starter.directive',[]);

  /**
   * 隐藏页面底部标签栏
   */
  directives
    .directive('hideTabs',function($rootScope){
    return {
      restrict:'AE',
      link:function($scope){
        console.log("------come-------");
        $rootScope.hideTabs = 'tabs-item-hide';
        //$scope.$on('$ionicView.afterLeave', function (e, data) {
        //  console.log(e);
        //  console.log(data);
        //});
        $scope.$on('$destroy',function(){
          console.log("------hideTabs指令销毁页面-------");
          $rootScope.hideTabs = ' ';
        })
      }
    }
  })

    .directive('resizeFootBar', ['$ionicScrollDelegate', function($ionicScrollDelegate){
      // Runs during compile
      return {
        replace: false,
        link: function(scope, iElm, iAttrs, controller) {
          scope.$on("taResize", function(e, ta) {
            if (!ta) return;
            var scroll = document.body.querySelector("#message-detail-content");
            var scrollBar = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
            // console.log(scroll);
            var taHeight = ta[0].offsetHeight;
            var newFooterHeight = taHeight + 10;
            newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

            iElm[0].style.height = newFooterHeight + 'px';
            scroll.style.bottom = newFooterHeight + 'px';
            scrollBar.scrollBottom();
          });
        }
      };
    }])

    .directive('showImage', [
      function() {

        return {
          restrict: 'AE',
          replace: true,
          link: function(scope, element, attr) {
            //scope.date_index = "";
            //console.log(element);
            //console.log(attr);
            scope.carHead = {
              typeName: "车头照",
              url: "../www/img/carHead.jpg"
            };
            scope.car45 = {
              typeName: "45°照",
              url: "../www/img/car45.jpg"
            };
            scope.carTail = {
              typeName: "车尾照",
              url: "../www/img/carTail.jpg"
            };

            element.bind('click',function(event){
              console.log(this);
            });

            //scope.$watch("date_index", function() {
            //  if(scope.date_index != ""){
            //    scope.resultData.year = aDate[scope.date_index].year;
            //    scope.resultData.month = aDate[scope.date_index].month;
            //    scope.resultData.day = aDate[scope.date_index].day;
            //  }
            //});
          },
          //scope: {
          //  //imageInfo: '=theImage'
          //}
          //,
          //template: '<div class="img_wrap">' +
          //'<div class="layer" ng-click="showActionSheet()">' +
          //'<p class="layer_text">' +
          //'{{imageInfo.typeName}}<br><span>点击上传</span>' +
          //'</p>' +
          //'</div>' +
          //'<div class="img_container"><img class="" src="{{imageInfo.url}}" style="display: inline-block;"/></div>' +
          //'</div>'
        }
      }
    ])

  .directive('errSrc', function() {
    return {
      restrict: 'A',
      link: function(scope,element, attr) {
console.log(attr);
        if(attr.src == undefined || attr.src == ""){
          console.log(attr.src);
          attr.src = attr.errSrc;
          console.log(attr.src);
          console.log(attr);
        }
      }
    };
  })

    .directive("searchAddr",function($q,$document,baiduMapApi){
      return {
        restrict: 'E',
        replace: true,
        link:     function link(scope, element, attrs){

          scope.placeholder = attrs.placeholder;
          //scope.mapID = attrs.mapID;
          scope.suggestId = attrs.suggestid;
          //scope.selectData = "";
          scope.resultData = "";

          baiduMapApi.then(function(BMap) {

            //function G(id) {
            //  return document.getElementById(id);
            //}
            var localCity = new BMap.LocalCity();

            localCity.get(function(msg){    // msg.name为当前城市的名称

              //var map = new BMap.Map("scope.mapID");
              //map.centerAndZoom(msg.name,12);                   // 初始化地图,设置城市和地图级别。

              var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                {"input" : scope.suggestId
                  //,"location" : map
                });

              ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                console.log("鼠标放在下拉列表上的事件");
                var str = "";
                var _value = e.fromitem.value;
                var value = "";
                if (e.fromitem.index > -1) {
                  value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                }
                str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                value = "";
                if (e.toitem.index > -1) {
                  _value = e.toitem.value;
                  value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                }
                str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                //G("searchResultPanel").innerHTML = str;
                scope.str = str;
              });

              var myValue;
              ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                console.log(e);
                console.log("鼠标点击下拉列表后的事件");
                var _value = e.item.value;
                myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                //G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
                scope.str ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                //var myGeo = new BMap.Geocoder();    // 将地址解析结果显示在地图上,并调整地图视野
                //myGeo.getPoint(myValue,function(point){     // 根据用户选择得到经纬度，以便于后面计算两点的距离
                //  console.log(point);
                //  scope.resultData.point = point;
                //});
                scope.resultData = myValue;
                //setPlace();
              });
              //
              //function setPlace(){
              //  map.clearOverlays();    //清除地图上所有覆盖物
              //  function myFun(){
              //    var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
              //    map.centerAndZoom(pp, 18);
              //    map.addOverlay(new BMap.Marker(pp));    //添加标注
              //  }
              //  var local = new BMap.LocalSearch(map, { //智能搜索
              //    onSearchComplete: myFun
              //  });
              //  local.search(myValue);
              //}

            });
          });
        },
        scope: {
          resultData:"=selectvalue"
        },
        template: '<div style="display:inline-block;width:100%">' +
        '<div id="r-result"><input type="text" id="{{suggestId}}" size="20" value="百度" placeholder="{{placeholder}}" ng-model="resultData" style="width:100%;" /></div>' +
        '<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;z-index:9999" ng-bind-html="str | trustHtml"></div>' +
        '</div>'
      };
    })

    .directive("myMap",function(baiduMapApi){
      return {
        restrict: 'E',
        replace: true,
        link:     function link(scope, element, attrs){
          console.log("----------------------myMap指令-----------------------------");
          scope.mapID = attrs.id;
          scope.city = "";

          baiduMapApi.then(function(BMap) {
            var localCity = new BMap.LocalCity();

            localCity.get(function(msg){    // msg.name为当前城市的名称
              console.log(msg);
              //scope.city = msg.name;
              scope.city = "湛江市";
              var map = new BMap.Map(scope.mapID);
              //map.centerAndZoom(msg.name,12);                   // 初始化地图,设置城市和地图级别。
              map.centerAndZoom("湛江市",12);                   // 初始化地图,设置城市和地图级别。
            });
          });
        },
        scope: {
          city:"=city"
        },
        template: '<div>' +
        '<div id="{{mapID}}" style="height: 180px;"></div>' +
        '</div>'
      };
  });

  return directives;

});
