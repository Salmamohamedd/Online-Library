// var descriptions = document.getElementsByClassName("description");

// for (var i = 0; i < descriptions.length; i++) {
//     var description = descriptions[i];
//     if (description.innerHTML.length > 100) {
//         var truncatedHTML = description.innerHTML.substring(0, 100) + "...";
//         description.innerHTML = truncatedHTML;
//     }
// }

var descriptions = document.getElementsByClassName("description");
for (var i = 0; i < descriptions.length; i++) {
    var description = descriptions[i];
    if (description.innerHTML.length >= 174) {
        var truncatedHTML = description.innerHTML.substring(0, 174) + "...";
        description.innerHTML = truncatedHTML;
        document.getElementsByClassName("readbtn")[i].style="display:block"
    }
    
}

// $('.likebutton').click(function(){
//     catid = $(this).attr("data-catid");
//     userid = $(this).attr("data-user");

// $.ajax(
// {
//     type:"POST",
//     url: "likepost",
//     data:{
//              book_id: catid,
//              user_id: userid,
//              'csrfmiddlewaretoken': '{{ csrf_token }}'
//     },
//     success: function( data ) 
//     {
//         console.log("success");
//     }
//  })
// });

$(document).ready(function() {
    $('.likebutton').click(function(){
        bookid = $(this).attr("data-bookid");
        userid = $(this).attr("data-user");
        bookname = $(this).attr("book-name");

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




