$(document).ready(function () {
    $(document).on("click", "h5", function () {


        var thisId = $(this).attr("data-id");
        var notes = "#notes" + thisId;
        var noteInput = "#notesInput" + thisId;
        $(noteInput).empty();
        console.log(thisId)

        $.ajax({
            method: "GET",
            url: "/api/articles/" + thisId
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                if (data[0].note) {
                    $(data[0].note).each(function (i, note) {
                        console.log(data);
                        let li = $("<li>");
                        // let title = $("<p>").html(data.note.title);
                        let body = $("<p>").html(note.body);
                        li.append(body);

                        $(notes).append(li)
                    });
                };

                let input = $("<input>").addClass("form-control")
                    .attr("id", "noteBody")
                    .attr("type", "text")
                    .attr("placeholder", "Your Note");
                let btnDiv = $("<div>").addClass("input-group-append");
                let btn = $("<button>").addClass("btn btn-primary").attr("type", "button").attr("id", "submit").attr("data-id", data[0]._id).text("Post");

                btnDiv.append(btn);


                $(noteInput).append(input, btnDiv);

            });


    });

    $(document).on("click", "#submit", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/api/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#noteBody").val()
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);

            });

        // Also, remove the values entered in the input and textarea for note entry

        $("#bodyinput").val("");
    });
});
