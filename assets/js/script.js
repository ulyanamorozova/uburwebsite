// билет по умолчанию скрыт, будет доступен после выбора зоны
$(document).ready(function () {
  $(".ticket-section").hide();
});
var selectedZoneIndex = null;
$(".zone-select-button").on('click', function () {
  var dataIndex = $(this).data('index');
  selectedZoneIndex = (dataIndex === selectedZoneIndex) ? null : dataIndex;

  $(".zone-select").removeClass("zone-select_active");
  if (selectedZoneIndex) {
    $(this).parents(".zone-select").addClass("zone-select_active");
    $(".ticket-selected-zone").text($(this).data("zone"));
    $(".ticket-section").slideDown();
  } else {
    $(".ticket-section").slideUp();
  }
});

// добавляем/убираем класс активности при нажатии на вопрос
$(".section-qa:not(.section-qa_sticky)").on('click', function () {
  $(this).toggleClass('section-qa_active');
});

// при вводе имени делаем переход в театр доступным
$("#formInputName").on('keyup', function () {
  var value = $(this).val();
  if (value) {
    $(".link-scene").removeClass('link-scene_disabled');
  } else {
    $(".link-scene").addClass('link-scene_disabled');
  }
});

// код для рисования
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var coord = { x: 0, y: 0 };
// добавляем слушатели событий
document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);
resize();
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
function reposition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
function start(event) {
  document.addEventListener("mousemove", draw);
  reposition(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}
// рисуем
function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000000";
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}
