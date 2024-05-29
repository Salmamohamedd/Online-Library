function openLiked(book) {
    var bookName = book.parentNode.parentNode.childNodes[5].innerHTML;
    var bookid = book.parentNode.parentNode.childNodes[1].innerHTML;
    console.log(bookid)
    document.getElementById("remove-msg").innerHTML = "Are you sure you want to remove \" " + bookName + " \" from your liked books?";
    document.getElementById("id4").setAttribute("value",bookid);
    document.getElementById("RemoveLiked").style.display = "block";
}
//-------------------------------------------------------------------------------------------------------------------------------------//

function closeLiked() {
    document.getElementById("RemoveLiked").style.display = "none";
}


//=========================================================================

let serachbtn = document.querySelector(".searchbtn");
serachbtn.addEventListener("click", function () {
    let searchinput = document.getElementById("input");
    if (searchinput.style.display == "none") {
        searchinput.style.display = "inline";
    }
    else {
        searchinput.style.display = "none";
    }
});

const userID = document.currentScript.getAttribute('data-user');

const likedBooksJson = document.currentScript.getAttribute('data-likedbooks');
const likedBooks = JSON.parse(likedBooksJson);

const staticURL = document.currentScript.getAttribute('book-cover');
// const userbookJS = document.currentScript.getAttribute('userbookJS');

const inputBox = document.getElementById("input");

//onkeyup:while typing
inputBox.onkeyup = function(){ 

    let result=[];//filter available array
    let input=inputBox.value.toLowerCase(); //get what user is typing
    if(input.length){ //when start typing
        result=likedBooks.filter((book)=>{
            return (
                book['name'].toLowerCase().includes(input) ||
                book['author'].toLowerCase().includes(input) ||
                book['category'].toLowerCase().includes(input)
            );
        });

        console.log(result);
    }
    display(result);

    //if there is no result
    if(!result.length){
        if(input.length==0) display(likedBooks);
    }
}
//display result
function display(result) {
    const content = result.map((book) => {
        return (`
            <tr class="{% cycle 'odd-row' 'even-row' %}">
                <td class="with-th">${ book.id }</td>
                <td><img class="bookimg" src= "${staticURL}${book.cover}" alt="${book.name}" onclick="location.href='/bookhub${book.id}/${userID}/bookPage'"></td>
                <td>${ book.name }</td>
                <td>${ book.author }</td>
                <td>${ book.category }</td>
                <td>${ book.publisher }</td>
                <td class="with-th">
                    <button class="fa fa-heart" onclick="openLiked(this)"></button>
                    
                </td>
                </tr>
        `);
    });
    document.getElementById("bodyy").innerHTML =content.join("");
}
