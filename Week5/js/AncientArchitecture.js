

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});



var cModal = document.getElementById("commentModal");
var cBtns = document.querySelectorAll(".comments a"); 
var cClose = document.getElementsByClassName("close-comment")[0];
var cForm = document.getElementById("commentForm");


cBtns.forEach(function(btn) {
    btn.onclick = function(e) {
        e.preventDefault(); 
        cModal.style.display = "block";
    }
});


cClose.onclick = function() {
    cModal.style.display = "none";
}


cForm.onsubmit = function(e) {
    e.preventDefault();
    var name = document.getElementById("userName").value;
    var text = document.getElementById("userComment").value;
    var display = document.getElementById("displayComments");

 
    var newComment = "<p><strong>" + name + ":</strong> " + text + "</p>";
    
  
    if(display.innerHTML.includes("No comments yet")) {
        display.innerHTML = "";
    }

    display.innerHTML += newComment;


    cForm.reset();
}


window.onclick = function(event) {
    if (event.target == cModal) {
        cModal.style.display = "none";
    }
}
