
function OpenReturnBook(button) {
    var bookName = button.parentNode.parentNode.childNodes[5].innerHTML;
    document.getElementById("returnmsg").innerHTML = "Are you sure you want to return \" " + bookName + " \"?";
    bookid = button.parentNode.parentNode.childNodes[1].innerHTML
    // console.log(bookid);
    document.getElementById("id3").setAttribute("value",bookid);
    document.getElementById("ReturnBook").style.display = "block";
}
function closeReturn() {
    document.getElementById("ReturnBook").style.display = "none";

}
// function ReturnBook(button) {

//     var returnbook = document.getElementById("returnvalue").innerHTML;
//     for (var i = 0; i < Borrowed.length; i++) {
//         if (Borrowed[i].bookName == returnbook) {
//             Borrowed.splice(i, 1);
//             break;
//         }
//     }
//     localStorage.setItem("borrowedBooks", JSON.stringify(Borrowed));



//     location.reload();

// }

//==================================SEARCH===========================================

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

const booksJson = document.currentScript.getAttribute('data-books');
const books = JSON.parse(booksJson);
console.log(books);

const userID = document.currentScript.getAttribute('data-user');

const staticURL = document.currentScript.getAttribute('book-cover');
// const userbookJS = document.currentScript.getAttribute('userbookJS');

const inputBox = document.getElementById("input");

//onkeyup:while typing
inputBox.onkeyup = function(){ 

    let result=[];//filter available array
    let input=inputBox.value.toLowerCase(); //get what user is typing
    if(input.length){ //when start typing
        result=books.filter((book)=>{
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
        if(input.length==0) display(books);
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
            <button onclick="OpenReturnBook(this)" class="fa fa-book" title="Return Book"></button>
            </td>
        </tr>
        `);
    });
    document.getElementById("bodyy").innerHTML = content.join("");
}