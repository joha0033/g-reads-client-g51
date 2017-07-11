const BOOK_URL = 'http://localhost:3000/api/v1/books';

$( document ).ready(function() {
    //materialize dropdown initialize
    dropDown();
    getBooks().then(showBooks)//then(showBooks)
});
//materialize dropdown initialize
const dropDown = () => $(".dropdown-button").dropdown();

const getBooks = () => $.get(BOOK_URL)

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
