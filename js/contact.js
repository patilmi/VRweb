function handleFeedback() {

    var msg = $('#textbox').val();

    alert(msg);


    $.post("https://us-central1-seismic-catbird-338021.cloudfunctions.net/function-1", function(msg, status){
        alert("Data: " + msg + "\nStatus: " + status);
    });

    $.ajax({
        type: "POST",
        url: "https://us-central1-seismic-catbird-338021.cloudfunctions.net/function-1",
        data: msg,
        success: success,
        dataType: string
    })
    

}