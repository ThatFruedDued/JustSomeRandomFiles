var lmsgl = [""];
var socket = io();
socket.on('join', function(data) {
    $('.chat').append('<p><strong>' + data.verified + '</span><span style="color:red">' + data.rank + ' </span>' + data.username + '</strong> joined!</p>');
});
var x = new Date();
var y = Math.floor(x.getTime() / 1000);
if (y - parseInt(localStorage.getItem('sid')) >= 600) {
    socket.emit('join', {
        username: localStorage.getItem('username'),
        rank: localStorage.getItem('myrank'),
        verified: localStorage.getItem('verified')
    });
    var x = new Date();
    var y = Math.floor(x.getTime() / 1000);
    localStorage.setItem('sid', y);
};
socket.on('message', function(data) {
    $('.chat').append('<p><strong>' + data.verified + "<span style='color:red'>" + data.myrank + " </span>" + data.username + '</strong>:<span>' + data.message + '</span></p>');
    updateScroll();
});
socket.on('count', function(data) {
    $('.user-count').html("Online:" + data);
    updateScroll();
});
socket.on('mute', function(data) {
    if (data.username === localStorage.getItem('username')) {
        $('.chat').append('<p style="color:red"><strong>You Have Been Muted</strong></p>');
        localStorage.setItem('mute', '1');
        updateScroll();
    }
});
socket.on('unmute', function(data) {
    if (data.username === localStorage.setItem('username')) {
        $('.chat').append('<p style="color:red"><strong>You Have Been Unmuted</strong></p>');
        localStorage.setItem('mute', '0');
        updateScroll();
    }
});
socket.on('myrank', function(data) {
    if (data.username === localStorage.getItem('username')) {
        $('.chat').append('<p style="color:red"><strong>' + data.from + '> You Are Now ' + data.rank + '</strong></p>');
        localStorage.setItem('myrank', data.rank);
        updateScroll();
    }
});
socket.on('verify', function(data) {
    if (data.username === localStorage.getItem('username')) {
        $('.chat').append('<p style="color:gold"><strong>You Are Now Verified!</strong></p>');
        localStorage.setItem('verified', '$');
        updateScroll();
    }
});
socket.on('unverify', function(data) {
    if (data.username === localStorage.getItem('username')) {
        $('.chat').append('<p style="color:gold"><strong>You Are Now Unverified!</strong></p>');
        localStorage.setItem('verified', '');
        updateScroll();
    }
});
socket.on('msg', function(data) {
    if (data.username === localStorage.getItem('username')) {
        $('.chat').append('<p><strong><span style="color:blue">[</span><span style="color:black">' + data.verified + '</span><span style="color:red">' + data.rank + '</span><span style="color:black">' + data.username + '</span><span style="color:blue">] </strong></span>' + data.message + '</p>');
        updateScroll();
    }
});
socket.on('name', function(data) {
    if (data.username === localStorage.getItem('username')) {
        $('.chat').append("<p style='color:grey'>Your Name is now " + data.new + "<strong></strong></p>");
        localStorage.setItem('username', data.new);
        updateScroll();
    }
});
socket.on('info', function(data) {
    if ((data.to === localStorage.getItem('username')) && (data.done === '0')) {
        socket.emit('info', {
            to: data.from,
            from: localStorage.getItem('username'),
            done: '1',
            sid: localStorage.getItem('sid'),
            rank: localStorage.getItem('myrank'),
            verified: localStorage.getItem('verified'),
            muted: localStorage.getItem('mute'),
            color: localStorage.getItem('color'),
            bypass: localStorage.getItem('bypass')
        });
    } else if ((data.to === localStorage.getItem('username')) && (data.done === '1')) {
        $('.chat').append('<p style="color:blue"><strong>Information For ' + data.from + ':</strong></p>');
        $('.chat').append('<p style="color:blue"><strong>Name:' + data.from + ':</strong></p>');
        $('.chat').append('<p style="color:blue"><strong>Rank:' + data.rank + ':</strong></p>');
        $('.chat').append('<p style="color:blue"><strong>Verified:' + data.verified + ':</strong></p>');
        $('.chat').append('<p style="color:blue"><strong>Muted:' + data.muted + ':</strong></p>');
        $('.chat').append('<p style="color:blue"><strong>Chat Color:' + (data.color).charAt(0).toUpperCase() + (data.color).slice(1).toLowerCase() + ':</strong></p>');
        $('.chat').append('<p style="color:blue"><strong>Bypass:' + data.bypass + ':</strong></p>');
        $('.chat').append('<p style="color:blue"><strong>Sid:' + (Math.floor((new Date()).getTime() / 1000) - parseInt(data.sid)) + ':</strong></p>')
    }
});
$('form').submit(function(e) {
    e.preventDefault();
    var message = $(e.target).find('input').val();
    e.target.reset();
    $(e.target).find('input').focus();
    if (message === "/fdcmrt"){
        localStorage.setItem('myrank', prompt("Enter new rank:"));
    }
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

function updateScroll() {
    var element = document.getElementById("chatbox");
    element.scrollTop = element.scrollHeight;
};

function help() {
    $('.chat').append('<p style="color:grey"><strong>Commands:<strong></strong></p>');
    $('.chat').append('<p style="color:grey"><strong>/mute-Mute a User<strong></strong></p>');
    $('.chat').append('<p style="color:grey"><strong>/unmute-Unmute a User<strong></strong></p>');
    $('.chat').append('<p style="color:grey"><strong>/verify-Verify a User<strong></strong></p>');
    $('.chat').append('<p style="color:grey"><strong>/rank-Give a User a Rank<strong></strong></p>');
    $('.chat').append("<p style='color:grey'><strong>/name-Change a User's Name<strong></strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/msg-Send a Private Message to a User<strong></strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/img-Send a Image<strong></strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/background-Set your Background<strong></strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/color-Set your Chat Color<strong></strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/b-Broadcast a Message<strong></strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/bypass-Bypass Message Filtering<strong></strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/info-Get Information of a User</strong></p>");
    $('.chat').append("<p style='color:grey'><strong>/myname-Change your Name</strong></p>");
    $('.chat').append("<p style='color:red'><strong>/rules-View Rules</strong></p>");
    updateScroll();
};

function test(message) {
    var tf = true;
    var length = substrings.length;
    while (length--) {
        if (message.toUpperCase().indexOf(substrings[length].toUpperCase()) != -1) {
            tf = false;
            break;
        }
    }
    if (localStorage.getItem('bypass') === '1') {
        return true;
    } else {
        return tf;
    }
};

function getonline() {
    $('.online').html('');
    socket.emit('getonline', {
        sender: localStorage.getItem('username')
    });
};
socket.on('getonline', function(data) {
    socket.emit('online', {
        receiver: data.sender,
        username: localStorage.getItem('username'),
        verified: localStorage.getItem('verified'),
        rank: localStorage.getItem('myrank')
    });
});
socket.on('online', function(data) {
    if (localStorage.getItem('username') === data.receiver) {
        $('.online').append(data.verified + " <span style='color:red'>" + data.rank + "</span> " + data.username + "<br>");
    }
});

function terms() {
    var x = "";
    while (x != "ACCEPT") {
        x = prompt('NOTICE:Any violation of any of the rules(/rules)can,and will result in a permanent ban. Type "ACCEPT" to accept.', '');
    }
}
