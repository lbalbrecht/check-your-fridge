
$(document).ready(function () {
    // materialize methods
    $('.datepicker').datepicker();
    $('select').formSelect();
    $('.sidenav').sidenav();
    let url = window.location.search

    // when login button is clicked
    $("#login").submit(event => {
        event.preventDefault();
        $.post("/login", {
            username: $("#username").val().trim(),
            password: $("#password").val().trim(),
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
            username: $("#username").val().trim(),
            password: $("#password").val().trim(),
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
        console.log(newIngredient);
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

    $("#recipe-area").on("click", ".recipeButton", function () {
        console.log(document.activeElement.id);
        // console.log("test");
        // console.log($("#recipeTitle0").text())
        let newRecipe = {
            title: $(`#recipeTitle${document.activeElement.id}`).text(),
            url: $(`#recipeUrl${document.activeElement.id}`).text(),
            summary: $(`#recipeSum${document.activeElement.id}`).text(),
            instructions: $(`#recipeInst${document.activeElement.id}`).text(),
            ingredients: $(`#recipeInst${document.activeElement.id}`).text(),
            userId: $(`#recipeTitle${document.activeElement.id}`).text()
        }
        console.log(newRecipe);

        if (updating) {
            newRecipe.id = recipeId;
            // updatePost(newIngredient)
            $.ajax({
                method: "PUT",
                url: "/api/recipes",
                data: newRecipe
            }).then(function () {
                window.location.href = "/"
            }).fail(err => {
                alert("Something went wrong")
            })
        }

        else {

            $.post("/api/recipes", newRecipe).then(data => {
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



    $("#search").on("click", function () {
        const food = ['blueberry'];

        $.each($("input[name='food']:checked"), function () {

            food.push($(this).val());
        });
        const searchIngredients = food.join();

        $.post("/api/spoonacular", { searchIngredients }, function (data) {

            // console.log(data[0]);

            createCard({ data })

        })

        $("#recipeTitle").text(`TEST`)
        console.log(food);
    })

    function createCard({ data }) {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let trackedNumber = i;
            let ingredients = [];
            let ingredientArray = data[i].extendedIngredients
            for (let i = 0; i < ingredientArray.length; i++) {
                let ingredientString = ingredientArray[i].originalString
                ingredients.push(ingredientString)
            }
            ingredients = ingredients.join();
            console.log(ingredients)
            let saveButton = $('<input/>').attr({
                type: "button",
                class: "recipeButton",
                id: `${i}`
            });

            let recipeCard = $("<div/>", { class: "card", "id": `recipeCard${i}` })
            let divRecipe = $("<div/>", { class: "card-action", "id": `recipeDiv${i}` });

            let recipeTitle = $("<p/>", { class: "card-title", "id": `recipeTitle${i}` });
            recipeTitle.text(data[i].title);
            let recipeUrl = $("<p/>", { id: `recipeUrl${i}` })
            recipeUrl.append(data[i].sourceUrl)
            let recipeSum = $("<p/>", { id: `recipeSum${i}` })
            recipeSum.append(data[i].summary)
            let recipeInst = $("<p/>", { id: `recipeInst${i}` })
            recipeInst.append(data[i].instructions)
            let ingredientList = $("<p/>", { id: `ingredientList${i}` })
            ingredientList.append(ingredients)
            $('#recipe-area').append(recipeCard)
            $(`#recipeCard${i}`).append(divRecipe);

            $(`#recipeDiv${i}`).append(recipeTitle, recipeUrl, recipeSum, recipeInst, ingredientList, saveButton)
            // for (let i = 0; i < ingredients.length; i++) {
            //     console.log("inside for loop" + ingredients)
            //     let recipeIngr = $("<li/>", {id:`recipeIngr${i}`})
            //     recipeIngr.text(ingredients[i])
            //     $(`#ingredientList${trackedNumber}`).append(recipeIngr)
            // } 
            $(`#recipeCard`).append(saveButton);
        }
    }
})