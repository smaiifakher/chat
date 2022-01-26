window._ = require('lodash');


try {
    require('bootstrap');
} catch (e) {
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: process.env.APP_URL + ':6001'
})


let onlineUsersLength = 0;
let userId = $('meta[name=user-id]').attr('content');
console.log(userId)
window.Echo.channel(`chat-group`)
    .listen('MessageDelivered', (e) => {
        console.log(e.message);
    });

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
