// alert("Hello!")

// when login button is clicked
$("#login").submit(event => {
    event.preventDefault();
    $.post("/login", {
        username: $("#username").val(),
        password: $("#password").val(),
    }).then(data => {
        console.log("Logged in!")
        window.location.href = "/"
    }).fail(err => {
        alert("Login failed")
        console.log("Login failed")
        console.log(err)
    })
})

// event for sign up form submission
$("#signup").submit(event => {
    event.preventDefault();
    $.post("/signup", {
        username: $("#username").val(),
        password: $("#password").val(),
    }).then(data => {
        console.log("Signed up!")
        window.location.href = "/"
    }).fail(err => {
        alert("Signup failed")
        console.log("Signup failed")
        console.log(err)
    })
})

$("#addIngredient").submit(event => {
    event.preventDefault();
    $.post("/api/ingredients", {
        name: $("#name").val(),
        expiration: $("#expiration").val(),
        category: $("#category").val(),
    }).then(data => {
        window.location.href = "/"
    }).fail(err => {
        alert("Something went wrong")
        // console.log(err)
    })
})

$("#delete").on("click", function(){
    const id = $(this).data("id");

    $.post("/api/ingredients/delete/" + id, {
        type: "DELETE"
    }).then(data=>{
        window.location.href = "/"
    }).fail(err => {
        alert("Something went wrong")
        // console.log(err)
    })
})