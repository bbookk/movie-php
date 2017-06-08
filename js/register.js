 function usernameChange(){
    var username = document.getElementById("username");
    checkUsernameExist();
    if(username.value == '') 
        username.style.border = "2px solid red";
}
function emailChange(){
    var e = document.getElementById("e");
    checkEmailExist();
    if(e.value == '') 
        e.style.border = "2px solid red";

    validateEmail();
}

window.addEventListener("load", function(){
});

function protectSQLInjection(){
    var input = document.querySelectorAll("form input");

    for(var i=0;i<input.length;i++){
        var str = input[i].value;
        for(var j=0;j<str.length;j++){
            if(str[j]==="'" || str[j]==="\""){
                alert("Not Pass SQL");
                return false;
            }
        }
    }
    //alert("pass SQL");
    return true;
}

function validateEmail(){
    var email   = document.getElementById("e");
    var regex   = /[\S]+@[\S]+\.[\S]+/;
    var ok      = true;

    if(!regex.test(email.value)){
        email.style.border = "2px solid red";
        ok = false;
    }
    return ok;
}

function validatePassword(){
    var pwd     = document.getElementById("p1");
    var cpwd    = document.getElementById("p2");
    var ok      = true;

    if(pwd.value != cpwd.value){
        alert("Pasword Not Match");
        pwd.style.border    = "2px solid red";
        cpwd.style.border   = "2px solid red";
        ok = false;
    }else{
        pwd.style.border    = "none";
        cpwd.style.border   = "none";
        //alert("Match");
    }
    var tmp     = ok;
    var tmpE    = validateEmail();
    if(!tmpE) alert("Email was wrongs");
    var tmpS    = protectSQLInjection();
    var tmpC    = checker(tmpE);
    var tempLast = tmpE && tmpS && tmpC && tmp;
    return tempLast;
}   

function checker(checkE){
    var a = checkUsernameExist();
    if(!a)  alert("Username is used");
    
    var b = false;
    if(checkE){
        b = checkEmailExist();
        if(!b) alert("Email is used");
    }
    return a&&b;
}

function checkUsernameExist(){
    var username    = document.getElementById('username');
    var ok          = false;
    $.ajax({ 
        url     : "./phpajax/check_username.php", 
        type    : "POST",
        async   : false,
        data    : {username: username.value},        
        success : function (response){						
            if (response==0){
                ok = false;
                username.style.border = "2px solid red";
                //alert("Username is used");
            }
            if (response==1){
                ok = true;
                //username.style.border = "1px solid #ccc";
                username.style.border = "2px solid green";
                //console.log("Username Pass");
            }         
        }
    });	 
    return ok;
}

function checkEmailExist(){
    var email   = document.getElementById('e');
    var ok      = false;
    $.ajax({ 
        url     : "./phpajax/check_email.php", 
        type    : "POST",
        async   : false,
        data    : {email: email.value},        
        success :  function (response){						
            if (response==0){
                ok = false;
                email.style.border = "2px solid red";
                //alert("Email is used");
            }
            if (response==1){
                email.style.border = "2px solid green";
                ok = true;
                
                //console.log("Email Pass");
            }      
        }
    });	 

    return ok;
    
}