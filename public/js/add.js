

// TODO: beth's code
// // when add button is pushed
// $("#add").on("click", function() {

//     // prevent default event
//     event.preventDefault();

//     // take input from user (name, type, and expiration date) and trim answers

//     let nameInput = $("#name").val().trim();
//     let categoryInput = $("#category").val().trim();
//     let expInput = $("#expiration")

//     // make sure the user does not leave the name and category field blank
//     if (!nameInput || !categoryInput) {
//         return;
//     }
//     // create object from answers above called newIngredient
//     const newIngredient = {
//         ingredient: nameInput,
//         category: categoryInput,
//         expiration: expInput
//     }
//     // use ajax to 'POST' the newIngredient object
//     $.post("/api/ingredients", newIngredient, function() {
//         // then "alert" the user that a new ingredient was added
//         console.log("new ingredient added:")
//         console.log(newIngredient)
//         // clear the input fields
//         $("#form").reset()

//     })
// })

$(document).ready(function(){
    // materialize methods
    $('.datepicker').datepicker();
    $('select').formSelect();
    $('.sidenav').sidenav();
  });
