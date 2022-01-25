require('./bootstrap');

import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io', host: window.location.hostname + ':6001'
})

let userId = $('meta[name=user-id]').attr('content');
console.log(userId)
let onlineUsersLength = 0;

window.Echo.join('online')
    .here((users) => {
        console.log(users);
        onlineUsersLength = users.length;
        users.forEach(function (user) {
            if (user.id === userId) return;

            $('#online-users').append(`<li id="${user.id}" class="list-group-item">${user.name}</li>`);
        })
    })
    .joining((user) => {
        console.log(user);
        $('#online-users').append(`<li id="${user.id}" class="list-group-item">${user.name}</li>`);
    })
    .leaving((user) => {
        console.log(user);
        $(`#user-${user.id}`).remove();
    }).error((errors) => console.log(errors));

window.Echo.channel(`chat-group`)
    .listen('MessageDelivered', (e) => {
        console.log(e.message);
    });


$('#chat-text').keypress(function (e) {
    //
    console.log(e.which);
    if (e.which === 13) {
        e.preventDefault();
        let body = $(this).val();
        let url = $(this).data('url');
        let data = {
            '_token': $('meta[name=csrf-token]').attr('content'),
            body
        }

        $.ajax({
            url: url,
            method: 'post',
            data: data,
            success: function () {

            }, error: function () {

            }
        })
    }
});
