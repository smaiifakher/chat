require('./bootstrap');

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
