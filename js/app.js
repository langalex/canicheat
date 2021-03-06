$(function() {
  'use strict';

  var $sections = $('#start, #yes, #no'),
    $backButton = $('.goback');

  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);

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
        var offset = Math.round(Math.random() * 10); // some time in the next 10 days
        window.localStorage.setItem('nextCheatAt', now + offset * day);
      }
      return nextCheatAt < now;
    }
  });

  function showSection(name) {
    $sections.addClass('hidden');
    $('#' + name).removeClass('hidden');
    if(name === 'start') {
      $backButton.css('visibility', 'hidden');
    } else {
      $backButton.css('visibility', 'visible');
    }
  }
});
