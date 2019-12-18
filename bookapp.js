class Book {
  constructor(title, author, isnb) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI
class UI {
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title: 'Book One',
    //     author: 'John Doe',
    //     isbn: 1234567,
    //   },
    //   {
    //     title: 'Book Two',
    //     author: 'Jane Doe',
    //     isbn: 7654321,
    //   }
    // ];
    // const books = storedBooks;
    const books = Store.getBooks();
    if (books != null) {
      books.forEach((book) => UI.addBookToList(book));
    }
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class="delete">X</a></td>
    `;
    list.appendChild(row);
    UI.clearFields();
  }

  static removeBook(book) {
    if (book.classList.contains('delete')) {
      book.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem(books === null)) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    let books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// -- Events --
// Add a Book
document.querySelector('#book-form').addEventListener('submit',
  (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
  });

// Display Books
UI.displayBooks();

// Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.removeBook(e.target);

  // get isbn
  const isbn = e.target.parentElement.previousElementSibling;
  console.log(isbn);
  Store.removeBook(isbn);
});

