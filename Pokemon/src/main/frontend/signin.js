var userName = ""
var password = ""
$("#submitButton").click(function () {
    userName = ($("input[name='username']").val())
    password = ($("input[name='password']").val())
    localStorage.setItem("username", userName);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/Login",
        data: JSON.stringify({"username":userName, "password":password}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          window.location.href = "userPage.html";
        },
        error: function(errMsg) {
            alert("Please Enter a valid username and/or password");
        }
  });

});
