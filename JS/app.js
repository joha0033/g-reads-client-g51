//const BOOK_URL = 'http://localhost:3000/api/v1/books';
let BOOK_URL = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1/books`: `https://austin-greads.herokuapp.com/api/v1/books`
console.log(BOOK_URL);
let AUTHOR_URL = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1/authors`: `https://austin-greads.herokuapp.com/api/v1/books`
console.log(AUTHOR_URL);
let POST_URL = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1/books/new`: `https://austin-greads.herokuapp.com/api/v1/books/new`
console.log(POST_URL);

$( document ).ready(function() {
    //materialize dropdown initialize
    dropDown();
    selectBox();
    getBooks().then(showBooks)
    getAuthors().then(populateDropDown)
    submitBookForm()
    //createBook().then(submitBookForm)//then(goto book? success?)
});

//materialize dropdown initialize
const dropDown = () => $(".dropdown-button").dropdown();
// const getAuthors = () =>
const getBooks = () => $.get(BOOK_URL)

const getAuthors = () => $.get(AUTHOR_URL)
//const createBook = () => $.post(BOOK_URL)
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

const populateDropDown = (authors) => {
      $.each(authors, function(index, author) {
        let firstName = author.first_name
        let lastName = author.last_name
        authorsFullName = (firstName + ' ' + lastName)
        console.log(authorsFullName);
        let option = '<option>' + firstName + ' ' + lastName + '</option>'
        console.log(option);
        $("select").append(option);
      })
      $('select').material_select()
}



const submitBookForm = () => {
  $('#addBookButton').on('click', function(){
    $('form').submit(function(event){
      event.preventDefault()
      let title = $('#book-title').val()
      let genre = $('#book-genre').val()
      let cover_url = $('#cover-url').val()
      let description = $('#book-description').val()
      let author = $('select').val()
      console.log('anything?');
      console.log(author);
      let bookObject = {
        'title': title,
        'genre': genre,
        'cover_url': cover_url,
        'description': description,
        'author': author
        //add authors/post array
      }
      console.log(bookObject);
      //below not firing
      $.post(POST_URL, bookObject, function(bookObject){
        console.log('post that shit... DAWG!');

      }).then(result =>{
        console.log(result);
        alert('Great Addition!');
        window.location = 'books.html';

        //res.send(result)
        // window.location = '../HTML/books.html'
        // console.log(results);
      })
    })
  })
}
