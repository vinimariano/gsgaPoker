$(function () {
    // Declare a proxy to reference the hub.
    var chat = $.connection.PokerHub;

    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        if (message == 'H') {
            $('#central > *').remove();
        }
        else if (message == 'S') {
            $('.hid').show('slow');
        }
        else if (name != null && name != "") {
            $('#central').append(' <div class="vote font shadow font4">' + name + '<br> <p class="hid font shadow" hidden>' + message + '</p></div>');
        }
    };

    // Start the connection.
    $.connection.hub.start().done(function () {
    });
        
    gsgaPoker = {};

    $('#c').click(function () {
        chat.server.send(gsgaPoker.username, 'C');
    })

    $('#cardsContainer').click(function () {
        if (gsgaPoker.username == null || gsgaPoker.username == "") {
            $('#central > *').remove();
            $('#central').append('<p class="font font4">You need to be logged to vote.</p>');
        }
    })

    $('#mp').click(function () {
        chat.server.send(gsgaPoker.username, 'MP');
    })

    $('#p').click(function () {
        chat.server.send(gsgaPoker.username, 'P');
    })

    $('#m').click(function () {
        chat.server.send(gsgaPoker.username, 'M');
    })

    $('#g').click(function () {
        chat.server.send(gsgaPoker.username, 'G');
    })

    $('#mg').click(function () {
        chat.server.send(gsgaPoker.username, 'MG');
    })

    $('#any').click(function () {
        chat.server.send(gsgaPoker.username, '?');
    })

    $('#reset').click(function () {
        chat.server.send('-', 'H');
    })

    $('#login').toggle(function () {
        gsgaPoker.username = $('#name').val();
        $("#form > input").remove();
        $('#central > p').remove();
        $("#form").prepend('<p class="font font4">' + gsgaPoker.username + '</p>');
        $('#login > *').remove();
        $('#login').append('<span>Logout</span>');
    }, function () {
        gsgaPoker.username = "";
        $("#form > p").remove();
        $("#form").prepend('<input class=marginIt id="name" type=text placeholder="Your name">');
        $('#login > *').remove();
        $('#login').append('<span>Sign in</span>');
    });

    $('#show').click(function () {
        chat.server.send('-', 'S');
    })
});



