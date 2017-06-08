<html>
    <head>
        <link rel="stylesheet" type="text/css" href="./css/login.css">
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <meta charset="utf-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="./js/login.js"> </script>

    </head>
    
    <body>
        <?php session_start() ?>
        <div class="detail_login">
        <form action="./" onsubmit="return verify()" method="post">
        <div class="info">
         <h1>Login</h1>
           <input type="text" id="username" name="uname" value="" placeholder="Username"><br>
            <input type="password" id="password" name="password" value="" placeholder="Password"><br>
            <p id="errMsg">Username OR Password Incorrect!</p><br>
            <input type="submit" value="Login">
            </div>
        </form>
        </div>
    </body>

    <script>
        function verify(){
            var uname    = document.getElementById("username");
            var password = document.getElementById("password");
            var ok       = false;
            $.ajax({
                url     : "./phpajax/check_login.php",
                type    : "POST",
                async   : false,
                data    : {uname:uname.value,password:password.value},
                success : function(res){
                    if(res==1){ 
                        ok = true;
                        //alert("SESSION Start");
                    }
                    if(res==0){
                        ok = false;
                        document.getElementById("errMsg").style.display = "inline";
                        setTimeout(function(){
                            document.getElementById("errMsg").style.display = "none";
                        }, 2000);
                        //alert("WRONG USERNMAE OR PASS");
                    }
                }
            });
            return ok; 
        }
    </script>
</html>