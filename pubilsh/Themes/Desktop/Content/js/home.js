$(document).ready(function() {
  $(".menu li").on("click", function(evt) {
    let item = $(evt.target).closest("li");
    item.siblings(".selected").removeClass("selected");

    item.addClass("selected");

    //$("#selected-country-code").val(item.children("span:last-child").html());
  });
});
