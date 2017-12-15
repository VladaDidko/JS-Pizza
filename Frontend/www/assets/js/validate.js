$(document).ready(function(){
 	 var val;
		
		$('#order-register').validate({
		rules: {
            nameContact: {
                required: true,
                digits: true
            },
            phoneContact: {
                required: true,
                dateISO: true
            },
            addressContact: {
                required: true
            }
        },					 
            highlight: function(element) {
                $(element).closest('#rules').removeClass('has-success').addClass('has-error');
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
            success: function(element) {
                element
                    .text('OK!').addClass('valid')
                    .closest('.control-group').removeClass('error').addClass('success');
                $(element).closest('#rules').removeClass('has-error').addClass('has-success');
            }
        });
});