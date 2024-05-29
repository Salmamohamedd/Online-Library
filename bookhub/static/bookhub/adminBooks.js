function openDescription(book_n) {
    var description = book_n.parentNode.parentNode.childNodes[19].innerHTML;
    // console.log(book_n.parentNode.parentNode.childNodes[19].innerHTML)
    document.getElementById("book-description").innerHTML = description;
    document.getElementById("descrip").style.display = "block";
}
//-------------------------------------------------------------------------------------------------------------------------------------//

function closeDescription() {
    document.getElementById("descrip").style.display = "none";
}
//-------------------------------------------------------------------------------------------------------------------------------------//

function OpenEditBook(button) {
    // var id = button.parentNode.parentNode.childNodes[1].innerHTML;
    // console.log(id);
    // var cover = button.parentNode.parentNode.childNodes[3].getAttribute("src");
    // console.log(cover);
    var values = [];
    var indexx = 0;
    for (var i = 1; i < 20; i += 2) {
        if (i == 3) {
            values[1] = button.parentNode.parentNode.childNodes[3].firstElementChild.getAttribute("src");
            values[1] = values[1].split('/').pop();
        }
        else {
            values[indexx] = button.parentNode.parentNode.childNodes[i].innerHTML;
        }
        // console.log(values[indexx]);
        indexx++;
    }
    document.getElementById("editkeyvalue").innerHTML = values[2];
    // console.log(values[2]);
    var form = document.getElementById("Edit-form");
    var index = 0;
    for (var j = 5; j < 69; j += 7) {
        console.log(form.childNodes[index]);
        if (j == 8) {
            form.childNodes[j].setAttribute("placeholder", values[index]);
        } else if (j == 68) {
            form.childNodes[j].innerHTML = values[index];
        }
        else {
            form.childNodes[j].setAttribute("value", values[index]);
        }
        index++;
        // console.log(form.childNodes[j].getAttribute("value"));
    }

    document.getElementById("Edit").style.display = "block";
}
//-------------------------------------------------------------------------------------------------------------------------------------//

function CloseEditBook() {
    document.getElementById("Edit").style.display = "none";
}
//-------------------------------------------------------------------------------------------------------------------------------------//
function openDelete(book_name) {
    var bookName = book_name.parentNode.parentNode.childNodes[5].innerHTML;
    document.getElementById("delete-msg").innerHTML = "Are you sure you want to delete \" " + bookName + " \"?";
    // document.getElementById("delete-value").innerHTML = book_name.parentNode.parentNode.childNodes[1];
    bookid= book_name.parentNode.parentNode.childNodes[1].innerHTML;
    document.getElementById("deleteform").childNodes[3].setAttribute("value",bookid);
    document.getElementById("DeleteAlert").style.display = "block";
}
//-------------------------------------------------------------------------------------------------------------------------------------//

function closeDelete() {
    document.getElementById("DeleteAlert").style.display = "none";
}


// $(document).ready(function() {
//     // AJAX for adding a book
//     $(".addForm").submit(function(e) {
//         e.preventDefault();
        
//         $.ajax({
//             type: "POST",
//             url: "{% url 'adminBooks' admin.id %}",
//             data: $(this).serialize(),
//             success: function(response) {
//                 if (response.success) {
//                     // Reload the page or update the book list with the new book
//                     location.reload();
//                 } else {
//                     // Handle error
//                     console.log("Failed to add book");
//                 }
//             }
//         });
//     });

//     // AJAX for deleting a book
//     $(".deleteForm").submit(function(e) {
//         e.preventDefault();
        
//         $.ajax({
//             type: "POST",
//             url: "{% url 'adminBooks' admin.id %}",
//             data: $(this).serialize(),
//             success: function(response) {
//                 if (response.success) {
//                     // Reload the page or update the book list after deletion
//                     location.reload();
//                 } else {
//                     // Handle error
//                     console.log("Failed to delete book");
//                 }
//             }
//         });
//     });

//     // AJAX for editing a book
//     $(".editForm").submit(function(e) {
//         e.preventDefault();
        
//         $.ajax({
//             type: "POST",
//             url: "{% url 'adminBooks' admin.id %}",
//             data: $(this).serialize(),
//             success: function(response) {
//                 if (response.success) {
//                     // Reload the page or update the book list after editing
//                     location.reload();
//                 } else {
//                     // Handle error
//                     console.log("Failed to edit book");
//                 }
//             }
//         });
//     });
// });

//====================================ADD===============================


function openForm() {
    document.getElementById("myForm").style.display = "block";
}
//-------------------------------------------------------------------------------------------------------------------------------------//
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
//-------------------------------------------------------------------------------------------------------------------------------------//


//================================SEARCH==================================


let serachbtn = document.querySelector(".searchbtn");
serachbtn.addEventListener("click", function () {
    let searchinput = document.getElementById("input");
    if (searchinput.style.display == "none") {
        searchinput.style.display = "inline";
    }
    else {
        searchinput.style.display = "none";
    }
})

const booksJson = document.currentScript.getAttribute('data-books');
const books = JSON.parse(booksJson);
console.log(books);

const staticURL = document.currentScript.getAttribute('book-cover');
const adminID = document.currentScript.getAttribute('data-admin');
    
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
            <td class="with-th">${book.id}</td>
            <td id="BOOK1"><img onclick="openDescription(this)" class="bookimg" src= "${staticURL}${book.cover}" alt="${book.name}"
                title="Click to view Description"/>
            </td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.publisher}</td>
            <td>${book.year}</td>
            <td>${book.language}</td>
            <td>${book.pages}</td>
            <td class="book-des">${book.description}</td>
            <td class="with-th"><button class="fa fa-edit" title="Edit" onclick="OpenEditBook(this)"></button>
            <button class="fa fa-trash-o" title="Delete" onclick="openDelete(this)"></button>
            </td>
            </tr>
        
        `);
    });
    document.getElementById("bodyy").innerHTML =  content.join("");
}