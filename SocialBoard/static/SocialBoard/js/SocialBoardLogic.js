var addButton = document.getElementById("add-button");
var addButtonContainer = document.getElementById("add-post");
var closePostButton = document.getElementById("close");
var postPostButton = document.getElementById("post");
var newPostContainer = document.getElementById("new-post-container");
var newTitle = document.getElementById("newtitle");
var newText = document.getElementById("newtext");
var newAuthor = document.getElementById("newauthor");
var noMessages = document.getElementById("no-messages");
var newest = document.getElementById("newest");
var logout = document.getElementsByClassName("logout-button")[0];
var newestPosts = [];


addButton.addEventListener("click", function(){
    newPostContainer.style.display="block";
    addButtonContainer.style.display="none";
})

closePostButton.addEventListener("click", function(){
    newPostContainer.style.display="none";
    addButtonContainer.style.display="flex"
})

postPostButton.addEventListener("click", function(){
    addToDb(newTitle.value, newText.value, newAuthor.value);
    addPost(newTitle.value, newText.value, newAuthor.value);
    newPostContainer.style.display="none";
    addButtonContainer.style.display="flex";
})

logout.addEventListener("click", function(){
    $.ajax({
        type: "GET",
        url: "/SocialBoard/logout/",
        headers: {"X-CSRFToken": csrf},
        success: function(response){
            window.location.assign("/SocialBoard/login/");
            console.log("Success: " + response)
        },
        error: function(response){
            window.location.assign("/SocialBoard/login/");
            console.log("Error: " + response)
        }
    })
})


function addToDb(title, text, author){
    if(title === "" || author === ""){
        return
    }
    $.ajax({
        type: "POST",
        url: "/SocialBoard/addPost/",
        headers: {"X-CSRFToken": csrf},
        dataType: "json",
        data:{
            title: title,
            text: text,
            author: author
        },
        success: function(response){
            console.log(response)
        },
        error: function(response){
            console.log(response)
        }
    })
}

function addPost(title, text, author){
    if(title === "" || author === ""){
        return
    }
    newest.innerHTML=""
    var d = new Date();
    var date = d.toDateString();
    date = date.substring(4,);
    var hour = formatAMPM(d);
    date += " " + hour;
    var data = {
        "title": title,
        "text": text,
        "author": author
    }
    newestPosts.push(data);
    var temp = "<div class='temp'>"
    for(var i=0; i<newestPosts.length;i++){
        temp += "<div class='comment alt'><div class='date'>"+date+"</div><h2 class='comment-title'>"+newestPosts[i]['title']+"</h2><div class='comment-content'>"+newestPosts[i]['text']+"</div><div class='comment-author'><span>"+newestPosts[i]['author']+"</span></div></div>";
    }
    temp += "</div>";
    newest.innerHTML=temp;
    newTitle.value="";
    newAuthor.value="";
    newText.value="";
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}