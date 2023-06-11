function jump() {
  var Email = document.getElementById("email");
  var User = document.getElementById("username");
  var Img = document.getElementById("userimage");
  var Password = document.getElementById("pwd");

  var file = document.getElementById("userimage").files[0];
  if(window.FileReader){
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function () {
      localStorage.setItem("img", JSON.stringify(fr.result));
    }
  }
  var url = 'http://localhost:3000/api/users'
  var user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pwd").value,
    image: localStorage.img
  }
  if (Email.value == "" || User.value == "" || Img.value == "" || Password.value == "") {
    alert("邮箱、用户名、头像或密码不能为空！");
  } else {
    axios.post(url, {
      user
    }).then(function (res) {
      var registerFlag = res.status
      if (registerFlag = 201) {
        alert("注册成功")
        window.location.href = "login.html";
      } else {
        alert("注册信息有误！");
      }
    }).catch(function (error){
      alert("注册信息有误！");
    })
  }
}

function addatmng() {
  var Email = document.getElementById("email");
  var User = document.getElementById("username");
  var Img = document.getElementById("userimage");
  var Password = document.getElementById("pwd");

  var file = document.getElementById("userimage").files[0];
  if(window.FileReader){
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function () {
      localStorage.setItem("img", JSON.stringify(fr.result));
    }
  }
  var url = 'http://localhost:3000/api/users'
  var user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pwd").value,
    image: localStorage.img
  }
  if (Email.value == "" || User.value == "" || Img.value == "" || Password.value == "") {
    alert("邮箱、用户名、头像或密码不能为空！");
  } else {
    axios.post(url, {
      user
    }).then(function (res) {
      var registerFlag = res.status
      if (registerFlag = 201) {
        alert("添加用户成功")
        window.location.href = "managers.html";
      } else {
        alert("添加用户信息有误！");
      }
    }).catch(function (error){
      alert("添加用户有误！");
    })
  }
}

function jump1(){
  localStorage.gameState={}
  localStorage.gameState1={}
  localStorage.setItem("password",document.getElementById("pwd").value);
  localStorage.setItem("email",document.getElementById("email").value);

  var url = 'http://localhost:3000/api/users/login'
  var Email = document.getElementById("email");  
  var Password = document.getElementById("pwd");
  var user = {
    email: document.getElementById("email").value,
    password: document.getElementById("pwd").value
  }
  if (Email.value == ""|| Password.value == "") {
    alert("邮箱、密码不能为空！");
  } else {
    axios.post(url, {
      user
    }).then(function (res) {
      var registerFlag = res.status
      if (registerFlag = 200) {
        alert("登录成功！")
        //console.log(res.data.user.best);
        localStorage.setItem("bestScore",res.data.user.best)
        window.location.href = "select.html";
      } else {
        alert("密码错误!");
      }
    }).catch(function (error){
      alert("密码错误!");
    })
  }
}
