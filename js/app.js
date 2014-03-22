$(function() {
  'use strict';

  var $sections = $('#start, #yes, #no');

  $('a').on('click', function(e) {
    e.preventDefault();
  });

  $('.goback').click(function goToSart(e) {
    showSection('start');
  });

  $('#start-btn').on('click', function decideOnCheat(e) {
    if(canCheat()) {
      showSection('yes');
    } else {
      showSection('no');
    }

    function canCheat() {
      var nextCheatAt = parseInt(window.localStorage.getItem('nextCheatAt'), 10) || 0;
      var day = 1000 * 60 * 60 * 24;
      var now = new Date().getTime();

      if(nextCheatAt < now) {
        var offset = 9 - Math.round(Math.random() * 4); // between 5 and 9 days
        window.localStorage.setItem('nextCheatAt', now + offset * day);
      }
      return nextCheatAt < now;
    }
  });

  function showSection(name) {
    $sections.addClass('hidden');
    $('#' + name).removeClass('hidden');
  }
});
