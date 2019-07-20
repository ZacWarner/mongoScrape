$(document).ready(function () {
    $(document).on("click", "h5", function () {


        var thisId = $(this).attr("data-id");
        var notes = "#notes" + thisId;
        var noteInput = "#notesInput" + thisId;
        var userNameIdDiv = "#usrNameDiv" + thisId;
        $(noteInput).empty();
        $(userNameIdDiv).empty();
        console.log(thisId)

        $.ajax({
            method: "GET",
            url: "/api/articles/" + thisId
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                if (data[0].note) {
                    showNotes(data, notes);
                };


                let user = $("#userName").attr("data-id");
                let userNameId = user + data[0]._id

                if (user) {
                    let usrName = $("<h6>").attr("id", userNameId).html(user);
                    $(userNameIdDiv).append(usrName);

                    let input = $("<input>").addClass("form-control")
                        .attr("id", "noteBody")
                        .attr("type", "text")
                        .attr("placeholder", "Your Note");
                    let btnDiv = $("<div>").addClass("input-group-append");
                    let btn = $("<button>").addClass("btn btn-primary").attr("type", "button").attr("id", "submit").attr("data-id", data[0]._id).text("Post");

                    btnDiv.append(btn);




                    $(noteInput).append(input, btnDiv);
                }
                else {
                    let msg = $("<h6>").html("Login to join the conversation!");
                    $(noteInput).append(msg);
                };
                let controlDiv = $("<div>").addClass("container mt-1 text-center");

                let hideBtn = $("<button>").addClass("btn btn-warning mx-2").attr("type", "button").attr("id", "hide").attr("data-id", data[0]._id).text("Hide");
                let refreshBtn = $("<button>").addClass("btn btn-success mx-2").attr("type", "button").attr("id", "refresh").attr("data-id", data[0]._id).text("refresh");


                controlDiv.append(hideBtn, refreshBtn);
                $(noteInput).append(controlDiv);
            });


    });

    const showNotes = (data, notes) => {

        $(notes).empty();

        $(data[0].note).each(function (i, note) {
            console.log(data);
            let li = $("<li>").addClass("list-group-item");
            let name = $("<h6>").html(note.name + ":");
            let body = $("<p>").html(note.body);
            li.append(name, body);

            $(notes).append(li)
        });
    }

    $(document).on("click", "#submit", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        let user = $("#userName").attr("data-id");
        var notes = "#notes" + thisId;



        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/api/articles/" + thisId,
            data: {
                // Value taken from title input
                name: user,
                // Value taken from note textarea
                body: $("#noteBody").val()
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                showNotes(data, notes);

            });

        // Also, remove the values entered in the input and textarea for note entry

        $("#noteBody").val("");
    });

    $(document).on("click", "#hide", function () {
        var thisId = $(this).attr("data-id");
        var notes = "#notes" + thisId;
        var noteInput = "#notesInput" + thisId;
        var userNameIdDiv = "#usrNameDiv" + thisId;
        console.log(userNameIdDiv);
        $(notes).empty();
        $(noteInput).empty();
        $(userNameIdDiv).empty();


    });

    $(document).on("click", "#refresh", function () {


        var thisId = $(this).attr("data-id");
        var notes = "#notes" + thisId;
        var noteInput = "#notesInput" + thisId;
        var userNameIdDiv = "#usrNameDiv" + thisId;
        $(noteInput).empty();
        $(userNameIdDiv).empty();
        console.log(thisId)

        $.ajax({
            method: "GET",
            url: "/api/articles/" + thisId
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                if (data[0].note) {
                    showNotes(data, notes);
                };


                let user = $("#userName").attr("data-id");
                let userNameId = user + data[0]._id

                if (user) {
                    let usrName = $("<h6>").attr("id", userNameId).html(user);
                    $(userNameIdDiv).append(usrName);

                    let input = $("<input>").addClass("form-control")
                        .attr("id", "noteBody")
                        .attr("type", "text")
                        .attr("placeholder", "Your Note");
                    let btnDiv = $("<div>").addClass("input-group-append");
                    let btn = $("<button>").addClass("btn btn-primary").attr("type", "button").attr("id", "submit").attr("data-id", data[0]._id).text("Post");

                    btnDiv.append(btn);




                    $(noteInput).append(input, btnDiv);
                }
                else {
                    let msg = $("<h6>").html("Login to join the conversation!");
                    $(noteInput).append(msg);
                };
                let controlDiv = $("<div>").addClass("container mt-1 text-center");

                let hideBtn = $("<button>").addClass("btn btn-warning mx-2").attr("type", "button").attr("id", "hide").attr("data-id", data[0]._id).text("Hide");
                let refreshBtn = $("<button>").addClass("btn btn-success mx-2").attr("type", "button").attr("id", "refresh").attr("data-id", data[0]._id).text("refresh");


                controlDiv.append(hideBtn, refreshBtn);
                $(noteInput).append(controlDiv);
            });


    });


});
