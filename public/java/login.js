$(document).ready(function () {
    const loginForm = $("#login");
    const password = $("input#inputPassword4");
    const name = $("input#inputName");

    loginForm.on("submit", function (event) {
        console.log("click");
        event.preventDefault();
        var usr = {
            username: name.val().trim(),
            password: password.val().trim(),
        }

        if (!usr.username || !usr.password) {
            return;
        }
        loginUsr(usr);

    });

    const loginUsr = (usr) => {
        $.post("/api/login", {
            username: usr.username,
            password: usr.password
        })
            .then(function (data) {
                console.log("Logged in!");
                window.location.replace("/");

            }).catch(handleLoginError);
    }


    const handleLoginError = (err) => {
        $("#alert .msg").text("User name already exists");
        $("#alert").fadeIn(500);
    };

});