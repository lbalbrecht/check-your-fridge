// const database = require("")
// when search button is clicked
$("#search").on("click", function() {

//  push all values with checked off boxes to an array
    let ingredients = '';
    $(':checkbox:checked').each(function() {
        ingredients += ($(this).val() + ", ")
    })
//  make ajax call to spoonacular db using that string
//  populate screen with 20? or so recipes that the db gave back
})
