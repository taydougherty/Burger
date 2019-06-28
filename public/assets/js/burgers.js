$(function () {
  $(".eat-burger").on("click", function (event) {
    var id = $(this).data("id");

    var newState = {
      devoured: "TRUE"
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newState
    }).then(
      function () {
        console.log("Ate the burger");

        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {

    event.preventDefault();

    var newBurger = {
      burger_name: $("#burgerName").val().trim(),
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("Added new burger to menu");

        location.reload();
      }
    );
  });
});