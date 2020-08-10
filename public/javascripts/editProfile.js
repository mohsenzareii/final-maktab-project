const edit= function(){
    
    let userData={
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        userName: document.getElementById('userName').value
    };


    $.ajax({
        url: '/api/user/edit',
        type:"PUT",
        data:userData,
        success : function (res){
            if(res.redirect){
                window.location = res.redirect;
            }
        }    
    });
}

$(document).ready(function () {
    
        $('#customFileLang').change(function() {
            let filename = $('#customFileLang').val();
            validateFileType(filename);
  
        });

});

function validateFileType(fileName){
    
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
        $('.custom-file-label').html(fileName);
    }else{
        alert("فایل با پسوند jpg/jpeg  یا png پذیرفته می شود !");
    }   
}