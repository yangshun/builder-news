function MainCtrl ($scope) {
  var HACKER_NEWS_API = 'https://www.kimonolabs.com/api/2he37zjs';
  var DESIGNER_NEWS_API = 'https://www.kimonolabs.com/api/6dts50j0';
  var ACCESS_TOKEN = 'lC5em34Ewkmh4mK8CPTGeEDJer15kwus';

  $scope.news = [];
  $scope.displayedNews = [];
  $scope.currentFilter = 'all';
  $scope.selectedItem = null;
  $scope.loaded = false;
  $scope.newsTypes = [
    {id: 'all', name: 'All'},
    {id: 'hackernews', name: 'Hacker News'},
    {id: 'designernews', name: 'Designer News'}
  ];
  $scope.linkTypes = {designernews: 'Designer News', hackernews: 'Hacker News'};
  
  localforage.getItem('favourites', function (favourites) {
    if (!favourites) {
      favourites = [];
    }
    $scope.favourites = favourites;
  });

  localforage.getItem('defaultNews', function (defaultNews) {
    if (!defaultNews) {
      defaultNews = 'all';
    }
    $scope.defaultNews = defaultNews;
    $scope.currentFilter = $scope.defaultNews;
  });

  localforage.getItem('defaultLimit', function (defaultLimit) {
    if (!defaultLimit) {
      defaultLimit = 30;
    }
    $scope.defaultLimit = defaultLimit;
    $scope.$apply();
  });

  function calculateTimeAgo (timeAgoString) {
    if (timeAgoString.indexOf('minute') > -1) {
      return parseInt(timeAgoString);
    } else if (timeAgoString.indexOf('hour') > -1) {
      return parseInt(timeAgoString) * 60;
    } else if (timeAgoString.indexOf('day') > -1) {
      return parseInt(timeAgoString) * 60 * 24;
    }
  }

  $scope.displayNews = function (type) {
    $scope.displayedNews = _.filter($scope.news, function (item) {
      if (type !== 'all') {
        return item.type === type;
      }
      return true;
    });
    $('.builder-news li').removeClass('animated bounceInUp');
    var i = 0;
    setTimeout(function () {
      $('.builder-news li').each(function () {
        var that = this;
        (function (delay) {
          setTimeout(function () {
            $(that).addClass('animated bounceInUp');  
          }, delay);
        }(i * 100));
        i++;
      });
    }, 0);
  };

  $scope.openLink = function (url) {
    window.open(url, '_blank');
  };

  $scope.bookmarkItem = function (item) {
    if (_.pluck($scope.favourites, 'url').indexOf(item.url) > -1) {
      $.UIPopup({
        id: 'warning',
        title: 'Remove Favourite', 
        message: 'Do you really want to remove the favourited link "' + item.title + '"?',
        cancelButton: 'No', 
        continueButton: 'Yes', 
        callback: function() {
          $scope.favourites = _.reject($scope.favourites, function(bm) { 
            return bm.url == item.url; 
          });
          localforage.setItem('favourites', $scope.favourites);
          $scope.$apply();
        }
      });
    } else {
      $scope.favourites.push(item);
      localforage.setItem('favourites', $scope.favourites);
    }
  };

  $scope.checkBookmark = function (url) {
    if (_.pluck($scope.favourites, 'url').indexOf(url) > -1) {
      return 'fa-star';
    } else {
      return 'fa-star-o';
    }
  };

  var hackerNews = [];
  var hackerNewsLoaded = false;

  $.ajax({
    method: 'GET',
    url: HACKER_NEWS_API + '?apikey=' + ACCESS_TOKEN,
    dataType: 'jsonp',
    crossDomain: true,
    success: function (data) {
      for (var i = 0; i < data.results.collection1.length; i++) {
        var item = data.results.collection1[i];
        item.rank = i + 1;
        item.type = 'hackernews';
        item.url = item.title.href;
        item.title = item.title.text;
        item.domain = item.domain.replace('(', '').replace(')', '');
        item.comments = item.comments.text;
        item.author = item.author.text;
        item.time = item.details.text.split(' ').slice(4, 7).join(' ');
        item.time_ago = calculateTimeAgo(item.time);
        item.points_text = item.points;
        item.points = parseInt(item.points_text);
        delete item.details;
        hackerNews.push(item);
      }
      hackerNewsLoaded = true;
      if (designerNewsLoaded) {
        combineNews();
      }
    },
    error: function (data) {
      console.log(data);
    }
  });

  var designerNews = [];
  var designerNewsLoaded = false;

  $.ajax({
    method: 'GET',
    url: DESIGNER_NEWS_API + '?apikey=' + ACCESS_TOKEN,
    dataType: 'jsonp',
    crossDomain: true,
    success: function (data) {
      for (var i = 0; i < data.results.collection1.length; i++) {
        var item = data.results.collection1[i];
        item.rank = i + 1;
        item.type = 'designernews';
        
        var domainExists = item.title.text.indexOf('(');
        if (domainExists > -1) {
          var domain = item.title.text.slice(domainExists);
          item.title.text = item.title.text.replace(domain, '');
          item.domain = domain.replace('(', '').replace(')', '');
        }

        item.url = item.title.href;
        item.title = item.title.text;
        item.time = item.time.replace('hrs', 'hours').replace('mins', 'minutes');
        item.time_ago = calculateTimeAgo(item.time);

        item.author = item.author.text;
        item.comments = item.comments.text;
        item.points_text = item.points.text;
        item.points = parseInt(item.points_text) * 10 // Give Designer News more weight;
        designerNews.push(item);
      }
      designerNewsLoaded = true;
      if (hackerNewsLoaded) {
        combineNews();
      }
    },
    error: function (data) {
      console.log(data);
    }
  });

  function combineNews () {
    $scope.news = $scope.news.concat(hackerNews).concat(designerNews);
    $scope.news = _.sortBy($scope.news, function (item) {
      return item.points;
    });
    $scope.news.reverse();
    $scope.loaded = true;
    $scope.displayNews($scope.defaultNews);
    var i = 0;
    $('.builder-news').addClass('loaded');
    $scope.$apply();
  }

  $scope.setDefaultLimit = function (number) {
    localforage.setItem('defaultLimit', $scope.defaultLimit);
  };

  $scope.setDefaultNews = function (type) {
    localforage.setItem('defaultNews', type);
  };

  $scope.aboutLinks = [
    {
      url: 'https://news.ycombinator.com/news',
      class: 'fa fa-hacker-news fa-lg hackernews',
      text: 'Hacker News Homepage'
    },
    {
      url: 'https://news.layervault.com',
      class: 'fa fa-picture-o fa-lg designernews',
      text: 'Designer News Homepage'
    },
    {
      url: 'https://github.com/yangshun/builder-news',
      class: 'fa fa-github fa-lg',
      text: 'Builder News on Github'
    },
    {
      url: 'mailto:tay.yang.shun@gmail.com',
      class: 'fa fa-envelope-o fa-lg contact-icon',
      text: 'Send Feedback'
    }
  ];
}