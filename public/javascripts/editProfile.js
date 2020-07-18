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
       
    });
}