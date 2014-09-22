function MainCtrl ($scope) {
  $scope.news = [];
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
        item.title_link = item.title.href;
        item.title = item.title.text;
        item.domain = item.domain.replace('(', '').replace(')', '');
        item.comments = item.comments.text;
        item.author = item.author.text;
        item.time = item.details.text.split(' ').slice(4, 7).join(' ');
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

            item.title_link = item.title.href;
            item.title = item.title.text;
            item.time.replace('hrs', 'hours');

            item.author = item.author.text;
            item.comments = item.comments.text;
            item.points = item.points.text;

            $scope.news.push(item); 
            console.log($scope.news);
            $scope.$apply();
          }
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