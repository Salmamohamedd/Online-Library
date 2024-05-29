var descriptions = document.getElementsByClassName("description");
for (var i = 0; i < descriptions.length; i++) {
    var description = descriptions[i];
    if (description.innerHTML.length >= 174) {
        var truncatedHTML = description.innerHTML.substring(0, 174) + "...";
        description.innerHTML = truncatedHTML;
        document.getElementsByClassName("readbtn")[i].style="display:block"
    }
    
}

//==============================SEARCH=================================
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

var booksJson = document.currentScript.getAttribute('data-books');
var books = JSON.parse(booksJson);
console.log(books);

const userID = document.currentScript.getAttribute('data-user');

var likedBooksJson = document.currentScript.getAttribute('data-likedbooks');
var likedBooks = JSON.parse(likedBooksJson);

const staticURL = document.currentScript.getAttribute('book-cover');
// const userbookJS = document.currentScript.getAttribute('userbookJS');


const inputBox=document.getElementById("input");

//onkeyup:while typing
inputBox.onkeyup = function(){ 
    document.getElementById("empty").style.display="none";

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
        else{
            document.getElementById("empty").style.display="block";
        };
    }
}

//display result
function display(result){

    // let script = document.createElement('script');
    // script.src = userbookJS + "booksUser.js";
    // document.body.appendChild(script);
    const content = result.map((book)=>{
        console.log(book['name']);
        console.log(book.id);
        
        let isLiked=false;
        for (let i=0 ; i<likedBooks.length ; i++){
            if(likedBooks[i].id==book.id){
                isLiked=true;
                break;
            }
        }
        console.log(isLiked)
        console.log(likedBooks)

        return ( `
        <div class="book">
        <img src="${staticURL}${book.cover}" alt="${book.name}">
            <a class="bookname" href="/bookhub${book.id}/${userID}/bookPage" target="_blank">${book.name}</a>
            <p class="auther">by <span>${book.author}</span></p>
            <p class="description">${book.description}</p>
            <a href="/bookhub${book.id}/${userID}/bookPage" class="readbtn" id="readbtn" > Read more.. </a>

            <div class="categories"><p>${book.category}</p></div>
            <div class="btn">
                ${book.availability === 'Unavailable' ?
                    `<span class="ribbon" id="rib${book.id}" style="background-color:#60453c">${book.availability}</span>
                     <button class="borrowbtn" type="button" disabled>Borrow</button>` :
                    `<span class="ribbon" id="rib${book.id}">${book.availability}</span>
                     <button class="borrowbtn" id="brw${book.id}" data-bookid="${ book.id }" data-user="${ userID }" book-name="${ book.name }">Borrow</button>`
                }
                ${ isLiked ?`
                    <button class="fa fa-heart likebutton" id="like${book.id}" data-bookid="${ book.id }" data-user="${ userID }" book-name="${ book.name }"></button>` :
                     `<button class="fa fa-heart-o likebutton" id="like${book.id}" data-bookid="${ book.id }" data-user="${ userID }" book-name="${ book.name }"></button>
                `}
            </div>
        </div>
        
        `
    );
    });


    document.getElementById("lists").innerHTML =  content.join("");
    var descriptions = document.getElementsByClassName("description");
    for (var i = 0; i < descriptions.length; i++) {
        var description = descriptions[i];
        if (description.innerHTML.length >= 174) {
            var truncatedHTML = description.innerHTML.substring(0, 174) + "...";
            description.innerHTML = truncatedHTML;
            document.getElementsByClassName("readbtn")[i].style="display:block"
        }
    }


$(document).ready(function() {
    $('.likebutton').click(function(){
        bookid = $(this).attr("data-bookid");
        userid = $(this).attr("data-user");
        bookname = $(this).attr("book-name");

        let book;
        for(let i=0 ; i<books.length ; i++){
            if(bookid==books[i].id){
                book=books[i];
                break;
            }
        }

        let idx;
        let isLiked=false;
        for (let i=0 ; i<likedBooks.length ; i++){
            if(likedBooks[i].id==bookid){
                isLiked=true;
                idx=i;
                break;
            }
        }
        console.log(likedBooks)
        if(isLiked) likedBooks.splice(idx , 1)
        else likedBooks.push(book);
    console.log(likedBooks)

        $.ajax({
            type:"POST",
            url: "likepost",
            data:{
                    book_id: bookid,
                    user_id: userid,
                    'csrfmiddlewaretoken': '{{ csrf_token }}'
            },
            success: function( data ) 
            { 

                if ($(`#like${bookid}`).hasClass('fa-heart-o')){
                    document.getElementById("likepopup").innerHTML = bookname + " is added to your liked books";

                }
                else{
                    document.getElementById("likepopup").innerHTML = bookname + " is removed from your liked books";

                }
                document.getElementById("likepopup").style.display = "block";
                setTimeout(function () {
                    document.getElementById("likepopup").style.display = "none";
                }, 3000); // Set timeout for 2 seconds (2000 milliseconds)
                $(`#like${bookid}`).toggleClass('fa-heart-o fa-heart');
                
            }
        });
    });
});

/////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    $('.borrowbtn').click(function(){
        bookid = $(this).attr("data-bookid");
        userid = $(this).attr("data-user");
        bookname = $(this).attr("book-name");
        thiss = $(this);

        $.ajax({
            type:"POST",
            url: "borrowBook",
            data:{
                    book_id: bookid,
                    user_id: userid,
                    'csrfmiddlewaretoken': '{{ csrf_token }}'
            },
            success: function( data ) 
            { 

                
                document.getElementById("likepopup").innerHTML = bookname + " is added to your Borrowed books";

                document.getElementById("likepopup").style.display = "block";
                setTimeout(function () {
                    document.getElementById("likepopup").style.display = "none";
                }, 3000); // Set timeout for 2 seconds (2000 milliseconds)
                thiss.prop('disabled', true);

                var idx;
                var book;
                for(let i=0 ; i<books.length ; i++){
                    if(bookid==books[i].id){
                        book=books[i];
                        idx=i;
                        break;
                    }
                } 
                book.availability='Unavailable';
                let ribbon = document.getElementById(`rib${book.id}`)
                ribbon.style.backgroundColor="#60453c"
                ribbon.innerHTML="Unavailable"

            }
        });
    });
});
}


///////////////////////////////////////OUTSIDE SEARCH//////////////////////////////////

$(document).ready(function() {
    $('.likebutton').click(function(){
        bookid = $(this).attr("data-bookid");
        userid = $(this).attr("data-user");
        bookname = $(this).attr("book-name");
        thisss = $(this);

        $.ajax({
            type:"POST",
            url: "likepost",
            data:{
                    book_id: bookid,
                    user_id: userid,
                    'csrfmiddlewaretoken': '{{ csrf_token }}'
            },
            success: function( data ) 
            { 

                if ($(`#like${bookid}`).hasClass('fa-heart-o')){
                    document.getElementById("likepopup").innerHTML = bookname + " is added to your liked books";

                }
                else{
                    document.getElementById("likepopup").innerHTML = bookname + " is removed from your liked books";

                }
                document.getElementById("likepopup").style.display = "block";
                setTimeout(function () {
                    document.getElementById("likepopup").style.display = "none";
                }, 3000); // Set timeout for 2 seconds (2000 milliseconds)
                $(`#like${bookid}`).toggleClass('fa-heart-o fa-heart');
                
            }
        });
    });
});



/////////////////////////////////////////////////////////////////////////////


$(document).ready(function() {
    $('.borrowbtn').click(function(){
        bookid = $(this).attr("data-bookid");
        userid = $(this).attr("data-user");
        bookname = $(this).attr("book-name");
        thiss = $(this);

        $.ajax({
            type:"POST",
            url: "borrowBook",
            data:{
                    book_id: bookid,
                    user_id: userid,
                    'csrfmiddlewaretoken': '{{ csrf_token }}'
            },
            success: function( data ) 
            { 

                
                document.getElementById("likepopup").innerHTML = bookname + " is added to your Borrowed books";

                document.getElementById("likepopup").style.display = "block";
                setTimeout(function () {
                    document.getElementById("likepopup").style.display = "none";
                }, 3000); // Set timeout for 2 seconds (2000 milliseconds)
                thiss.prop('disabled', true);

                let idx;
                let book;
                for(let i=0 ; i<books.length ; i++){
                    if(bookid==books[i].id){
                        book=books[i];
                        idx=i;
                        break;
                    }
                } 
                book.availability='Unavailable';
                let ribbon = document.getElementsByClassName('ribbon')[idx]
                ribbon.style.backgroundColor="#60453c"
                ribbon.innerHTML="Unavailable"

            }
        });
    });
});
