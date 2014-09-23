$(function () {
  $('.segmented').UIPanelToggle('#toggle-panels',function () {
    $.noop;
  });
  
  $.UITabbar({
    tabs: 4,
    icons: [
      'fa fa-newspaper-o fa-2x', 
      'fa fa-star-o fa-2x', 
      'fa fa-gear fa-2x',
      'fa fa-info-circle fa-2x'
    ],
    labels: ['Home', 'Favourites', 'Settings', 'About'],
    selected: 1
  });

  $.subscribe('chui/navigate/enter', function (event, id) {
    if (id === 'settings') {
      $('#feed-limit-input').UIRange();
    }
  });
});
