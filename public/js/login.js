$(document).ready(function () {

    let url = window.location.search

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

    $("#addIngredient").on("click", event => {
        event.preventDefault();

        let newIngredient = {
            name: $("#name").val(),
            expiration: $("#expiration").val(),
            category: $("#category").val(),
        }

        if (updating) {
            newIngredient.id = ingredientId;
            // updatePost(newIngredient)
            $.ajax({
                method: "PUT",
                url: "/api/ingredients",
                data: newIngredient
            }).then(function () {
                window.location.href = "/"
            }).fail(err => {
                alert("Something went wrong")
            })
        }

        else {

            $.post("/api/ingredients", newIngredient).then(data => {
                window.location.href = "/"
            }).fail(err => {
                alert("Something went wrong")
                // console.log(err)
            })
        }
    })

    $(".delete").on("click", function () {
        const id = $(this).data("id");
        console.log(id)
        $.post("/api/ingredients/delete/" + id, {
            type: "DELETE"
        }).then(data => {
            window.location.href = "/"
        }).fail(err => {
            alert("Something went wrong")
            // console.log(err)
        })
    })

    const categories = ["bread", "beverages", "canned-goods", "condiments-spices", "dairy", "frozen-foods", "meat-seafood", "produce", "snacks", "other"]

    $(".categoryBtn").on("click", function () {
        let currentCategory = $(this).text()
        console.log(currentCategory)
        if (currentCategory === "all") {
            for (var i = 0; i < categories.length; i++) {
                $(`.${categories[i]}`).attr("style", "display:block")
            }
        } else {
            for (var i = 0; i < categories.length; i++) {
                if (currentCategory === categories[i]) {
                    $(`.${categories[i]}`).attr("style", "display:block")
                } else {
                    $(`.${categories[i]}`).attr("style", "display:none")

                }
            }
        }
    })

    let updating = false;
    let ingredientId;


        if (url.indexOf("?ingredient_id=") !== -1) {
            ingredientId = url.split("=")[1];
            console.log(ingredientId)
            getIngredientData(ingredientId)
        }
    

    function getIngredientData(id) {
        let queryUrl = "/api/ingredients/" + id;

        $.get(queryUrl, function (data) {
            if (data) {
                console.log(data.id)

                $("#name").val(data.name);
                $("#expiration").val(data.expiration);
                $("#category").val(data.category);

                updating = true;

            }
        })

    }

    $(".update").on("click", function () {
        const id = $(this).data("id")
        console.log(id)

        window.location.href = "/add?ingredient_id=" + id;

    })

})