$(document).ready(function () {
    var ingredients = [];
    
    $('.modal').modal();

    $("#savedCont").on("click", ".shopping-list", function () {
        console.log(document.activeElement.value);
        ingredients = [];
        const id = document.activeElement.value;
        ingredients.push(id);
        // console.log("test");
        // console.log($("#recipeTitle0").text())
    })


    $("#send-sms").on("click", function () {
        let numberVal = $("#email_inline").val();
        let phoneNumber = getValidNumber(numberVal);
        const list = ingredients.join();
        console.log(list);
        if(phoneNumber !== false){
            phoneNumber = phoneNumber.replace(/-/g,"");
            console.log(phoneNumber)
            $.post("/api/twilio", { list, phoneNumber}, function (data) {

            })
            
            $('#modalIngr').modal('close');
        }
    })

    function getValidNumber(value)
{
    value = $.trim(value).replace(/-|\s/g,"");

    if (value.substring(0, 1) == '1') {
        value = value.substring(1);
    }

    if (value.length == 10) {

        return value;
    }

    return false;
}
})
