$(document).ready(function () {
    const signForm = $("#newUsr");
    const email = $("input#inputEmail4");
    const password = $("input#inputPassword4");
    const name = $("input#inputName");

    signForm.on("submit", function (event) {
        console.log("click");
        event.preventDefault();
        var newUsr = {
            username: name.val().trim(),
            password: password.val().trim(),
            email: email.val().trim()
        }

        if (!newUsr.username || !newUsr.password || !newUsr.email) {
            return;
        }
        createNewUsr(newUsr);

    });

    const createNewUsr = (newUsr) => {
        $.post("/login/signup", {
            username: newUsr.username,
            password: newUsr.password,
            email: newUsr.email
        }).then(function (data) {
            console.log("signed up");
            window.location.replace("/");

        }).catch(handleLoginError);
    };

    const handleLoginError = (err) => {
        $("#alert .msg").text("User name already exists");
        $("#alert").fadeIn(500);
    };

});