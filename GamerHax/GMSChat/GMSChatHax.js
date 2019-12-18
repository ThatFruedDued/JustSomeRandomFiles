$('.chat').append("<br><p>GMS Chat Hax Enabled</p><br>");
$('form').unbind();
$('form').submit(function(e){
    function glc(x) {
        return localStorage.getItem(x);
    }
    var message = $(e.target).find('input').val();
    if (message === "/easyadmin") {
        localStorage.setItem('r', 'HEAD-ADMIN');
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
        let message = $(e.target).find('input').val();
        e.target.reset();
        $(e.target).find('input').focus();
        if ((glc('r').indexOf("ADMIN") >= 0) && (message.startsWith("/") === true)) {
            if (message === "/color") {
                slc('color', prompt('Enter Color:', ''));
            } else if (message === "/info") {
                socket.emit('info', {
                    from: glc('u'),
                    to: prompt('Enter User:', ''),
                    done: '0'
                });
            } else if (message === "/mute") {
                let usermute = prompt("Enter User:", "");
                $('.chat').append('<p class="red"><strong>You Have Muted ' + usermute + '</strong></p>');
                socket.emit('mute', {
                    username: usermute
                });
            } else if (message === "/unmute") {
                let userunmute = prompt("Enter Username:", "");
                $('.chat').append('<p class="red"><strong>You Have Unmuted ' + userunmute + '</strong></p>');
                socket.emit('unmute', {
                    username: userunmute
                });
            } else if (message === "/b") {
                socket.emit('message', {
                    username: 'SYSTEM',
                    message: prompt("Enter Message:", ""),
                    myrank: '<span class="green">BROADCAST</span> ',
                    verified: '$ '
                });
            } else if ((message === "/rank") && (glc('r').indexOf("HEAD-ADMIN") >= 0)) {
                let userrank = prompt("Enter User:", "");
                let rank = prompt("Enter Rank:", "");
                socket.emit('r', {
                    username: userrank,
                    rank: rank,
                    from: glc('u')
                });
            } else if (message === "/myname") {
                slc('u', prompt('New Name:', ''));
            } else if (message === "/name") {
                let username = prompt("Enter User:", "");
                let newname = prompt("Enter New Name:", "");
                socket.emit('name', {
                    username: username,
                    new: newname
                });
            } else if ((message === "/verify") && (glc('r').indexOf("HEAD-ADMIN") >= 0)) {
                let usernam = prompt("Enter User:", "");
                socket.emit('verify', {
                    username: usernam
                });
            } else if ((message === "/unverify") && (glc('r').indexOf("HEAD-ADMIN") >= 0)) {
                socket.emit('unverify', {
                    username: prompt('Enter User:', '')
                });
            } else if (message === "/bypass") {
                if (glc('bypass') === '0') {
                    slc('bypass', '1');
                    $('.chat').append("<p class='red'><strong>Bypassing filter</strong></p>");
                } else {
                    slc('bypass', '0');
                    $('.chat').append("<p class='red'><strong>Not bypassing filter</strong></p>");
                }
            } else if (message === "/help") {
                help();
            }
        }
        if (message === "/msg") {
            let who = prompt("Enter User:", "");
            let ms = prompt("Enter Message:", "");
            socket.emit('msg', {
                username: who,
                message: ms,
                rank: glc('r'),
                verified: glc('v')
            });
        } else if ((glc('mute') === '0') && (message === "/img")) {
            let img = prompt("Enter Image URL:", "");
            socket.emit('message', {
                username: glc('u'),
                message: '<img src="' + img + '"/>',
                myrank: glc('r'),
                verified: glc('v')
            });
        } else if (message === "/background") {
            document.body.background = prompt("Enter Link to Background:", "");
        }
        if (glc('mute') === '1') {
            $('.chat').append('<p class="red"><strong>You Are Muted!</strong><p>');
        } else if ((message.startsWith("/") === false) && (message !== "")) {
            if ((glc('bypass') === '0') && (message.length === lmsgl[0])) {
                $('.chat').append("<p class='red'><strong>Do Not Spam!</strong></p>");
            } else {
                if (test(message)) {
                    socket.emit('message', {
                        username: glc('u') || 'Anonymous',
                        message: '<span style="color:' + glc('color') + '">' + message + '</span>',
                        myrank: glc('r'),
                        verified: glc('v')
                    });
                    lmsgl[0] = message.length;
                } else {
                    slc(glc('AccessKey'), parseInt(glc(glc('AccessKey'))) + 1);
                    socket.emit('message', {
                        username: 'SYSTEM',
                        message: glc('v') + "<u>" + glc('u') + '</u> attempted to send prohibited words and has been warned! (' + glc(glc('AccessKey')) + ')',
                        myrank: '<span class="orange">ALERT</span>',
                        verified: '$ '
                    });
                }
            }
            updateScroll();
        }
    });
