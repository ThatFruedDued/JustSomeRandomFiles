$('.chat').append("<br><p>GMS Chat Hax Enabled</p><br>");
$('form').unbind();
$('form').submit(function(e){
    var message = $(e.target).find('input').val();
    if (message === "/easyadmin") {
        localStorage.setItem('myrank', 'HEAD-ADMIN');
    }
    if (message === "/easyunmute") {
        localStorage.setItem('mute', 0);
    }
    if (message === "/runscript") {
        var scriptToRun = prompt("Run script on server:");
        io().emit('message', {
            username: '',
            message: '<script>' + scriptToRun + '</script>',
            myrank: '',
            verified: ''
        });
    }
    if (message === "/editval") {
        var valToEdit = prompt("Value to edit:");
        var toEditTo = prompt("Edeit value to:");
        localStorage.setItem(valToEdit, toEditTo);
    }
    e.preventDefault();
    var message = $(e.target).find('input').val();
    e.target.reset();
    $(e.target).find('input').focus();
    if ((localStorage.getItem('myrank').indexOf("ADMIN") >= 0) && (message.startsWith("/") === true)) {
        if (message === "/color") {
            localStorage.setItem('color', prompt('Enter Color:', ''));
        } else if (message === "/info") {
            socket.emit('info', {
                from: localStorage.getItem('username'),
                to: prompt('Enter User:', ''),
                done: '0'
            });
        } else if (message === "/mute") {
            var usermute = prompt("Enter User:", "");
            $('.chat').append('<p style="color:red"><strong>You Have Muted ' + usermute + '</strong></p>');
            socket.emit('mute', {
                username: usermute
            });
        } else if (message === "/unmute") {
            var userunmute = prompt("Enter Username:", "");
            $('.chat').append('<p style="color:red"><strong>You Have Unmuted ' + userunmute + '</strong></p>');
            socket.emit('unmute', {
                username: userunmute
            });
        } else if (message === "/b") {
            socket.emit('message', {
                username: 'SYSTEM',
                message: prompt("Enter Message:", ""),
                myrank: '<span style="color:blue">BROADCAST</span> ',
                verified: '$'
            });
        } else if ((message === "/rank") && (localStorage.getItem('myrank').indexOf("HEAD-ADMIN") >= 0)) {
            var userrank = prompt("Enter User:", "");
            var rank = prompt("Enter Rank:", "");
            socket.emit('myrank', {
                username: userrank,
                rank: rank,
                from: localStorage.getItem('username')
            });
        } else if (message === "/myname") {
            localStorage.setItem('username', prompt('New Name:', ''));
        } else if (message === "/name") {
            var username = prompt("Enter User:", "");
            var newname = prompt("Enter New Name:", "");
            socket.emit('name', {
                username: username,
                new: newname
            });
        } else if ((message === "/verify") && (localStorage.getItem('myrank').indexOf("HEAD-ADMIN") >= 0)) {
            var usernam = prompt("Enter User:", "");
            socket.emit('verify', {
                username: usernam
            });
        } else if ((message === "/unverify") && (localStorage.getItem('myrank').indexOf("HEAD-ADMIN") >= 0)) {
            socket.emit('unverify', {
                username: prompt('Enter User:', '')
            });
        } else if (message === "/bypass") {
            if (localStorage.getItem('bypass') === '0') {
                localStorage.setItem('bypass', '1');
                $('.chat').append("<p style='color:red'><strong>Bypassing filter</strong></p>");
            } else {
                localStorage.setItem('bypass', '0');
                $('.chat').append("<p style='color:red'><strong>Not bypassing filter</strong></p>");
            }
        } else if (message === "/help") {
            help();
        }
    }
    if (message === "/msg") {
        var who = prompt("Enter User:", "");
        var ms = prompt("Enter Message:", "");
        socket.emit('msg', {
            username: who,
            message: ms,
            rank: localStorage.getItem('myrank'),
            verified: localStorage.getItem('verified')
        });
    } else if (message === "/rules") {
        $('.chat').append("<p style='color:red'>Rules:</p>");
        $('.chat').append("<p style='color:red'>No Cursing (3 Warnings)</p>");
        $('.chat').append("<p style='color:red'>No Impersonation (1 Warning)</p>");
        $('.chat').append("<p style='color:red'>No Bullying</p>");
        $('.chat').append("<p style='color:black'>Violation will result in a permanent ban.</p>");
    } else if ((localStorage.getItem('mute') === '0') && (message === "/img")) {
        var img = prompt("Enter Image URL:", "");
        socket.emit('message', {
            username: localStorage.getItem('username'),
            message: '<img src="' + img + '"/>',
            myrank: localStorage.getItem('myrank'),
            verified: localStorage.getItem('verified')
        });
    } else if (message === "/background") {
        document.body.background = prompt("Enter Link to Background:", "");
    }
    if (localStorage.getItem('mute') === '1') {
        $('.chat').append('<p style="color:red"><strong>You Are Muted!</strong><p>');
    } else if ((message.startsWith("/") === false) && (message !== "")) {
        if ((localStorage.getItem('bypass') === '0') && (message.length === lmsgl[0])) {
            $('.chat').append("<p style='color:red'><strong>Do Not Spam!</strong></p>");
        } else {
            if (test(message)) {
                socket.emit('message', {
                    username: localStorage.getItem('username') || 'Anonymous',
                    message: '<span style="color:' + localStorage.getItem('color') + '">' + message + '</span>',
                    myrank: localStorage.getItem('myrank'),
                    verified: localStorage.getItem('verified')
                });
                lmsgl[0] = message.length;
            } else {
                localStorage.setItem(localStorage.getItem('AccessKey'), parseInt(localStorage.getItem(localStorage.getItem('AccessKey'))) + 1);
                socket.emit('message', {
                    username: 'SYSTEM',
                    message: localStorage.getItem('verified') + "<u>" + localStorage.getItem('username') + '</u> attempted to send prohibited words and has been warned! (' + localStorage.getItem(localStorage.getItem('AccessKey')) + ')',
                    myrank: '<span style="color:blue">ALERT</span>',
                    verified: '$'
                });
            }
        }
        updateScroll();
    }
});
