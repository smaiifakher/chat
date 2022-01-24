require('./bootstrap');

import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
})
console.log('users');
window.Echo.join('online')
    .here((users) => {
        console.log(users);
        console.log('users');
        users.forEach(function (user) {
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
