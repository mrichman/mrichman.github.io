if (typeof jQuery != 'undefined') {     
    $("#contact-form").validate({
        submitHandler: function(form) {
            $.ajax({
                url: "//formspree.io/mark@markrichman.com",
                method: "POST",
                data: {
                    name: $(form).find("input[name='name']").val(),
                    _replyto: $(form).find("input[name='_replyto']").val(),
                    message: $(form).find("textarea[name='message']").val()
                },
                dataType: "json",
                success: function() {
                    $("#submit-success").fadeIn();
                    $("#contact-form").fadeOut();
                },
                error: function() {
                    $("#submit-errors").fadeIn();
                }
            });
        }
    });
}