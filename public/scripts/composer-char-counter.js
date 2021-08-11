$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    // const charLeft = 140 - $(this).val().length
    const charLeft = 140 - this.value.length;
    const counter = $(this).closest(".submitForm").find(".counter");

    counter.text(`${charLeft}`);
    // $(".counter").text(`${charLeft}`);

    counter.toggleClass("exceeded", charLeft < 0);
  });
});

// $(document).ready(function() {
//   $("#tweet-text").keyup(function() {
//     let maxChar = 140;
//     $("#counter").text(`${maxChar -= $(this).val().length}`);
//     $("#counter").toggleClass("exceeded", maxChar < 0);    });
