$(function () {
  $('.segmented').UIPanelToggle('#toggle-panels',function (){
    $.noop;
  });
  
  $('#bookmarks-nav').on('singletap', function () {
    $.UIGoToArticle('#bookmarks');
  });

  $.UITabbar({
    tabs: 3,
    icons: ['fa fa-newspaper-o fa-2x', 'fa fa-star-o fa-2x', 'fa fa-info-circle fa-2x'],
    labels: ['Home', 'Favorites', 'About'],
    selected: 1
  });

  $('.bn-about-list li').on('singletap', function () {
    var url = $(this).attr('data-link');
    window.open(url, '_blank');
  });
});
