var userName = ""
var password = ""
var confirm = ""
$("#submitButton").click(function () {
    userName = ($("input[name='username']").val())
    password = ($("input[name='password']").val())
    confirm = ($("input[name='confirm_password']").val())
    localStorage.setItem("username",userName);

    if (userName == "") {
      userName = null
    }
    if (password == "") {
      password = null
    }
    if (password != confirm) {
      alert("Passwords do not match");
    } else {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/Register",
        data: JSON.stringify({"username":userName, "password":password}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
         window.location.href = "userPage.html"
        },
        error: function(errMsg) {
            alert("Please Enter a username and/or password");
        }
  });
}
});
