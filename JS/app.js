//const BOOK_URL = 'http://localhost:3000/api/v1/books';
let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000`: `https://austin-greads.herokuapp.com/api/v1/books`
//uncomment when deployed?
// let BASE_URL = `http://localhost:3000/api/v1/books`
let POST_URL = (window.location.hostname == "localhost") ? `http://localhost:3000`: `https://austin-greads.herokuapp.com/api/v1/books/addBook`
// let POST_URL = `http://localhost:3000/api/v1/books/new`
$( document ).ready(function() {
    //materialize dropdown initialize
    dropDown();
    selectBox();
    getBooks().then(showBooks)
    submitBookForm()
    //createBook().then(submitBookForm)//then(goto book? success?)
});

//materialize dropdown initialize
const dropDown = () => $(".dropdown-button").dropdown();
// const getAuthors = () =>
const getBooks = () => $.get(BASE_URL)
//const createBook = () => $.post(BASE_URL)
const selectBox = () => $('select').material_select();

const showBooks = (books) => {
  console.log(books);
  const source = $('#books-template').html()
  console.log(source);
  const template = Handlebars.compile(source)
  const html = template({
    books
  })
  console.log(html);
  $('#book-list-items').append(html)
}

const getAuthorsForDropdown = () => {
  $.get("", function(data) {
      $.each(data, function(index, role) {
        let $option = $("<option>" + role.title + "</option>")
        // console.log(this.title)
        $(".dropDown").append($option);
      })
    });
}

const submitBookForm = () => {
  $('#addBookButton').on('click', function(){
    $('form').submit(function(event){
      event.preventDefault()
      let title = $('#book-title').val()
      let genre = $('#book-genre').val()
      let cover_url = $('#cover-url').val()
      let description = $('#book-description').val()
      let bookObject = {
        'title': title,
        'genre': genre,
        'cover_url': cover_url,
        'description': description
        //add authors/post array
      }
      console.log(bookObject);
      //below not firing
      $.post(POST_URL, bookObject, function(bookObject){
        console.log('post that shit... DAWG!');

      }).then(result =>{
        console.log(result);

        //res.send(result)
        // window.location = '../HTML/books.html'
        // console.log(results);
      })
    })
  })
}
