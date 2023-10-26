<script type="text/javascript">
$(document).ready(function($)

    {



        




        


        $("#frm_enquirenow").validate(

            {

                errorElement: 'div',

                rules: {

                    first_name:

                    {

                        required: true,

                        lettersonly: true,

                        minlength: 2,

                        maxlength: 99

                    },

                    last_name:

                    {

                        required: true,

                        lettersonly: true,

                        minlength: 2,

                        maxlength: 99

                    },

                    phone_number:

                    {

                        required: true

                        //minlength:10,

                        //maxlength:10,

                        //mobileIN:true

                    },

                    email_address:

                    {

                        required: true,

                        email: true

                    },

                    country:

                    {

                        required: true

                    },

                    city:

                    {

                        required: true

                    },

                    interested_in:

                    {

                        required: true

                    },

                    message:

                    {

                        required: true

                    }

                },

                messages:

                {

                    first_name:

                    {

                        required: "Please enter first name",

                        lettersonly: "Please enter first name in alphabets only",

                        minlength: "First name should not be less than 2 letters",

                        maxlength: "First name should not be more than 99 letters"

                    },

                    last_name:

                    {

                        required: "Please enter last name",

                        lettersonly: "Please enter last name in alphabets only",

                        minlength: "Last name should not be less than 2 letters",

                        maxlength: "Last name should not be more than 99 letters"

                    },

                    phone_number:

                    {

                        required: "Please enter phone number"

                        //minlength:"Mobile number should be 10 digits",

                        //maxlength:"Mobile number should be 10 digits",

                        //mobileIN:"Please enter valid mobile number"

                    },

                    email_address:

                    {

                        required: "Please enter email address",

                        email: "Please enter valid email address"

                    },

                    country:

                    {

                        required: "Please select country name"

                    },

                    city:

                    {

                        required: "Please enter city name"

                    },

                    interested_in:

                    {

                        required: "Please select product interested in"

                    },

                    message:

                    {

                        required: "Please enter message"

                    }

                }

            });



        $("#frm_newsletter").validate({

            errorElement: 'div',

            rules: {

                newsletter_email_address:

                {

                    required: true,

                    email: true

                }

            },

            messages:

            {

                newsletter_email_address:

                {

                    required: "Please enter email address",

                    email: "Please enter valid email address"

                }

            },

            submitHandler: function(form) {

                $.ajax({

                    url: "/submit-newsletter.php",

                    type: "POST",

                    //dataType  : 'json',

                    data: $('#frm_newsletter').serialize(),

                    cache: false,

                    processData: false,

                    success: function(response) {

                        if (response != "")

                        {

                            $("#frm_newsletter").html(response);

                        }

                    }

                });

                return false;

            }

        });

    });

$(document).on('click', '.brochure-enquiry', function() {
    $("#frm_brochure_enquiry").submit();
});

$("#frm_brochure_enquiry").validate({
    errorElement: 'div',

    rules: {

        first_name: {
            required: true,
        },

        last_name: {
            required: true,
        },

        phone_number: {
            required: true,
        },

        email_address:

        {

            email: true

        }

    },

    messages:

    {
        first_name:

        {

            required: "Please enter first name",

            lettersonly: "Please enter first name in alphabets only",

            minlength: "First name should not be less than 2 letters",

            maxlength: "First name should not be more than 99 letters"

        },

        last_name:

        {

            required: "Please enter last name",

            lettersonly: "Please enter last name in alphabets only",

            minlength: "Last name should not be less than 2 letters",

            maxlength: "Last name should not be more than 99 letters"

        },
        phone_number:

        {
            required: "Please enter phone number"
        },
        email_address:

        {

            email: "Please enter valid email address"

        }

    },

    submitHandler: function(form) {
        var brochure_link = $('.brochure-enquiry').attr('data-brochure_link');
        var form_details = $('.brochure-enquiry-form').serializeArray();
        $.ajax({
            url: 'https://www.steelage.com/submit_enquiry.php',
            data: form_details,
            type: "POST",
            dataType: "json",
            beforeSend: function() {
                $('.brochure-enquiry').removeClass('brochure-enquiry').html('Submitting...')
                    .addClass('brochure-download').attr('disabled', true);
            },
            success: function(response) {

                if (response.status == true) {
                    $('.brochure-enquiry-form input[type="text"]').val('');
                    $("#enquiremodal2").modal("hide");

                    var brochure_anchor = document.createElement('a');
                    // brochure_anchor.target= '_blank';
                    brochure_anchor.download = 'Steelage-product-brochure';
                    brochure_anchor.href = brochure_link;
                    brochure_anchor.click();

                    google_captcha();
                } else {
                    alert(response.msg);
                }
            },
            error: function(response) {
                alert('An Error occured while submitting the form.');
            },
            complete: function(response) {
                $('.brochure-download').removeClass('brochure-download').addClass(
                    'brochure-enquiry').html('Download Brochure').attr('disabled', false);
            }
        });

        return false;

    }
});
</script>

Array
(
    [first_name] => testing
    [last_name] => testuing
    [phone_number] => 12345678
    [email_address] => avinash@gmail.com
    [country] => India
    [city] => mumbai
    [interested_in] => Certified Safes
    [message] => testing
    [datedon] => 2023-10-26 00:29:39
    [pageurl] => https://www.steelage.com//
    [ipaddress] => 152.58.152.52
)