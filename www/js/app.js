define([
  'services/services',  // 加载services.js，该文件中注明了所有模块的service，因此也会加载各个模块的service文件
  'controllers/controllers', // 加载controllers.js，该文件中注明了所有模块的controller，因此也会加载各个模块的controller文件
  'directives/directive'
],function(){
    'use strict';

  // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

  function config($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicNativeTransitionsProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    // 调用原生页面切换，配置 ionic-native-transitions 属性
    $ionicNativeTransitionsProvider.setDefaultOptions({
      duration: 400, // in milliseconds (ms), default 400,
      slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default4
      iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in,default -1
      androiddelay: -1, // same as above but for Android, default -1
      winphonedelay: -1, // same as above but for Windows Phone, default -1,
      fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS andAndroid)
      fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default0 (iOS and Android)
      triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
      backInOppositeDirection: true // Takes over default back transition and state backtransition to use the opposite direction transition to go back
    });
// 配置默认页面切换效果
    $ionicNativeTransitionsProvider.setDefaultTransition({
      type: 'slide',
      direction: 'left'
    });
// 配置默认页面返回切换效果
    $ionicNativeTransitionsProvider.setDefaultBackTransition({
      type: 'slide',
      direction: 'right'
    });

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('menu', {
        url: '/menu',
        abstract: true, // 抽象的意思就是只有在嵌套state出现的时候才出现，比如menu.tabs,menu.tabs.cargo
        templateUrl: 'templates/user/personal-menu.html'
      })

      // Each tab has its own nav history stack:

      .state('menu.tabs', {
        url: '/tabs',
        views: {
          'menuContent': {
            templateUrl: 'templates/public/tabs.html'
          }
        }
      })

      .state('menu.tabs.cargo', {
        url: '/cargo',
        views: {
          'tab-cargo': {
            templateUrl: 'templates/cargo/tab-cargo.html',
            controller:'CargoCtrl'
            //controllerAs:'cargo',  // 控制器与$scope绑定，在页面中不再使用{{someObject}} ，而是用{{cargo.someObject}},控制器内用this代替$scope
            //resolve:CargoCtrl.resolve
          }
        }
      })
      .state('menu.tabs.cargoDetail', {
        url: '/cargo/1',
        //nativeTransitionsAndroid: {
        //  "type": "slide",
        //  "direction": "up"
        //},
        views: {
          'tab-cargo': {
            templateUrl: 'templates/cargo/cargoDetail.html',
            controller: 'CargoCtrl'
          }
        }
      })

      .state('menu.lorry', {
        url: '/lorry',
        views: {
          'menuContent': {
            templateUrl: 'templates/lorry/myLorry.html',
            controller:'LorryCtrl'
          }
        }
      })
      .state('menu.addLorry', {
        url: '/addLorry',
        views: {
          'menuContent': {
            templateUrl: 'templates/lorry/addLorry.html',
            controller:'LorryCtrl'
          }
        }
      })

      .state('menu.lorryInfo', {
        url: '/lorryInfo',
        views: {
          'menuContent': {
            templateUrl: 'templates/lorry/myLorryInfo.html',
            controller:'LorryInfoCtrl'
          }
        }
      })

      .state('menu.addLorryInfo', {
        url: '/addLorryInfo',
        views: {
          'menuContent': {
            templateUrl: 'templates/lorry/addLorryInfo.html',
            controller:'LorryInfoCtrl'
          }
        }
      })

      .state('menu.tabs.price', {
        url: '/price',
        views: {
          'tab-price': {
            templateUrl: 'templates/public/tab-price.html',
            controller:'CargoCtrl'

          }
        }
      })

      .state('tab.personal', {
        url: '/personal',
        views: {
          'tab-personal': {
            templateUrl: 'templates/user/tab-personal.html',
            controller:'UserCtrl'

          }
        }
      })

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/menu/tabs/cargo');

  }

  var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.directive','ionic-native-transitions','ngCordova']);

    app.run(run)

    .config(config);

  return app;

});
