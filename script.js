const myLibrary = [];

function Book(title, author, pages, read, genre = '') {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read === true || read === 'true';
  this.genre = genre;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read, genre = '') {
  const book = new Book(title, author, pages, read, genre);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const libraryDisplay = document.getElementById('libraryDisplay');
  libraryDisplay.innerHTML = '';

  if (myLibrary.length === 0) {
    libraryDisplay.innerHTML = '<p class="empty-message">No books in library. Add your first book!</p>';
    return;
  }

  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-id', book.id);

    const readStatus = book.read ? 'Read' : 'Not Read';
    const readClass = book.read ? 'read' : 'not-read';

    bookCard.innerHTML = `
      <div class="book-header">
        <h3>${book.title}</h3>
        <button class="btn-remove" data-id="${book.id}" aria-label="Remove book">×</button>
      </div>
      <div class="book-details">
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        ${book.genre ? `<p><strong>Genre:</strong> ${book.genre}</p>` : ''}
        <p class="read-status ${readClass}"><strong>Status:</strong> ${readStatus}</p>
      </div>
      <div class="book-actions">
        <button class="btn-toggle-read" data-id="${book.id}">
          ${book.read ? 'Mark as Unread' : 'Mark as Read'}
        </button>
      </div>
    `;

    libraryDisplay.appendChild(bookCard);
  });

  // Add event listeners for remove buttons
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = e.target.getAttribute('data-id');
      removeBook(bookId);
    });
  });

  // Add event listeners for toggle read buttons
  document.querySelectorAll('.btn-toggle-read').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = e.target.getAttribute('data-id');
      toggleBookRead(bookId);
    });
  });
}

function removeBook(bookId) {
  const index = myLibrary.findIndex(book => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function toggleBookRead(bookId) {
  const book = myLibrary.find(book => book.id === bookId);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

// Dialog and form handling
const dialog = document.getElementById('bookDialog');
const form = document.getElementById('bookForm');
const newBookBtn = document.getElementById('newBookBtn');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
  dialog.showModal();
  form.reset();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').value === 'true';
  const genre = document.getElementById('genre').value;

  addBookToLibrary(title, author, pages, read, genre);
  dialog.close();
  form.reset();
});

// Close dialog when clicking outside of it
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

// Add some sample books for demonstration
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true, 'Fiction');
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false, 'Fiction');
addBookToLibrary('1984', 'George Orwell', 328, true, 'Dystopian');

