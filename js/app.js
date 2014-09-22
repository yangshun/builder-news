function MainCtrl ($scope) {
  $scope.news = [];
  $scope.displayedNews = [];
  $scope.currentFilter = 'all';
  
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
    })
  }

  $.ajax({
    method: 'GET',
    url: 'https://www.kimonolabs.com/api/2he37zjs?apikey=lC5em34Ewkmh4mK8CPTGeEDJer15kwus', 
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
        $scope.news.push(item); 
      }
      $.ajax({
        method: 'GET',
        url: 'https://www.kimonolabs.com/api/6dts50j0?apikey=lC5em34Ewkmh4mK8CPTGeEDJer15kwus', 
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
            $scope.news.push(item);
          }

          $scope.news = _.sortBy($scope.news, function (item) {
            return item.points;
          });

          $scope.news.reverse();

          $scope.displayNews('all'); 
          $scope.$apply();
        },
        error: function (data) {
          console.log(data);
        }
      });
    },
    error: function (data) {
      console.log(data);
    }
  });
}