$(document).ready(function () {
  setBottomObjectRandomDots();
});

var isReverted = false;

$('.scene__curtain').draggable({
  axis: 'x',
  drag: function (ev, ui) {
    $(this).draggable('option', 'revert', false);
    isReverted = false;

    var direction = $(this).data('direction');
    var positionLeft = ui.position.left;

    if ((direction === 'right' && positionLeft < 660) || (direction === 'left' && positionLeft > 0)) {
      isReverted = true;
      $(this).draggable('option', 'revert', true);
    }
  },
  stop: function (ev, ui) {
    if (!isReverted) {
      var direction = $(this).data('direction');
      var hidePosition = (direction === 'left') ? -720 : 1400;

      $(this).animate({ left: hidePosition }, 'slow');
    }
  }
});

var enabledProjectorIndex = 0;

$('.scene__projector').click(function () {
  var projectorIndex = $(this).data('index');

  if (projectorIndex === enabledProjectorIndex) {
    $('.scene__light').css('display', 'none');
    enabledProjectorIndex = 0;
  } else {
    enabledProjectorIndex = projectorIndex;
    $('.scene__light').attr('src', 'assets/img/scene/light_projector_' + enabledProjectorIndex + '.png').css('display', 'block');
    $('.scene').removeClass().addClass('scene scene_animate projector-light-' + enabledProjectorIndex);
  }
});

$('.shell, .corals').click(function () {
  $(this).addClass('object_animate');
});

$('.coral').on('mouseover', function () {
  $(this).addClass('coral_animate');
});

$('.coral').on('mouseleave', function () {
  $(this).removeClass('coral_animate');
});

var dotsCount = 11;
var visibleDotsCount = 0;

$('.bottom__object-click').click(function () {
  if (visibleDotsCount === dotsCount) {
    return;
  }
  ++visibleDotsCount;

  $('#dot_' + visibleDotsCount).css('opacity', '1');
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBottomObjectRandomDots() {
  for (var i = 1; i <= dotsCount; i++) {
    var left = getRandomInt(0, 214);
    var top = getRandomInt(0, 350);
    $('.bottom__object-wrapper')
      .append('<img id="dot_' + i + '" src="assets/img/scene/dot_' + i + '.png" alt="Точка" class="dot" style="left: ' + left + 'px;top: ' + top + 'px;">');
  }
}
