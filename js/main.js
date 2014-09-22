$(function () {
  $('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});
  $('#bookmarks-nav').on('singletap', function() {
    $.UIGoToArticle('#bookmarks');
  });
});
