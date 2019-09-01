$(document).ready(function() {
	var video = document.getElementById('video'),
		canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		imageinput = document.getElementById('image'),
		vendorUrl = window.URL || window.webkitURL;

	navigator.getMedia = 	navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia;

	navigator.getMedia({
		video: true,
		audio: false
	}, function(stream) {
		video.srcObject=stream;
		video.play();
	},	function(error) {
		// An error occured
		// error.code
	});

	document.getElementById("capture").addEventListener("click", function(){
  		context.drawImage(video, 0, 0, 400, 300);
  		image.setAttribute('src', canvas.toDataURL('image/jpeg'));
	});


	// Predict
    $('#btn-predict').click(function () {
        //var form_data = new FormData($('image')[0]);
        var dataURI = canvas.toDataURL('image/jpeg', 0.5);
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        var blob = new Blob([ia], {type: mimeString});
        var form_data = new FormData(document.forms[0]);
        form_data.append("image", blob);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });
		
});