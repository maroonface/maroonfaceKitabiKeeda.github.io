/**
 * Created by maroonface on 14/8/16.
 */

var authorList = [];
var searchBook;
$('document').ready(function(){
    $('#searchButton').click(function() {
        getData();
        console.log(searchBook);
        console.log("button clicked");

        display();
        });
    $('#inputArea').on('change' , function(){
        clear();
    })


});
function getData(){
    searchBook = $('#inputArea').val();
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=" + searchBook, function (data) {
        for (var i = 0; i < data.items.length; i++) {
            authorList.push(data.items[i]);
            //console.log(data.items[i].volumeInfo.authors[0]);
        }
        display();
    });
}
function display(){
    for(a of authorList) {
        console.log(a);
        document.getElementById('displayArea').innerHTML += '<li><div id="bookDisplay"><div id="bookTitle"><a target="_blank" href='+a.volumeInfo.infoLink+'>'+a.volumeInfo.title+'</a></div><br>' +
            '<div id="bookImg"><img src='+a.volumeInfo.imageLinks.thumbnail +'></div>' +
            '<div id="bookAuthor"><p>Author: '+a.volumeInfo.authors+'</p></div>' +
            '<div id="bookPageCount"><p>Page Count: '+a.volumeInfo.pageCount +'</p></div>' +
            '<div id="bookPublisher"><p>Publisher: '+a.volumeInfo.publisher +'</p></div>' +
            '<div id="bookReview"><p>Review: '+a.volumeInfo.averageRating +'</p></div>' +
            '<div id="bookDescription"><p>Description: '+a.volumeInfo.description +'</p></div><hr>' +
            '</div></li>';
    }

}

function clear(){
    console.log("Data wiped");
    authorList.splice(0,authorList.length);
    $('#displayArea').html(' ');
    getData();

}