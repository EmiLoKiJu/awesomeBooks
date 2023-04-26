const form = document.querySelector('.form');
const bookListed = document.querySelector('div');
const deleteButton = document.getElementsByClassName('remove');
let booksList = [];

// function creating html

const createHtml = () => {
  localStorage.setItem('storedBooks', JSON.stringify(booksList));
  bookListed.innerHTML = '';
  booksList.forEach((book) => {
    const item = document.createElement('ul');
    item.innerHTML = `<li>${book.title} <br/> ${book.author} <br/> <button class="remove">Remove</button></li>`;
    bookListed.appendChild(item);
  });
};

// initialisation

if (JSON.parse(localStorage.getItem('storedBooks'))) {
  booksList = JSON.parse(localStorage.getItem('storedBooks'));
} else {
  createHtml();
}

// function to add book to list

const addBookToList = () => {
  createHtml();
};
addBookToList();

// form event listener to push book to list

form.addEventListener('submit', () => {
  const addedBook = {
    title: form.title.value,
    author: form.author.value,
    id: Math.floor(Math.random() * 88),
  };
  booksList.push(addedBook);
  localStorage.setItem('storedBooks', JSON.stringify(booksList));
  addBookToList();
});

// function to delete book from list

const deleteBook = () => {
  const bookToRemove = (index) => {
    booksList.splice(index, 1);
    localStorage.setItem('storedBooks', JSON.stringify(booksList));
    addBookToList();
    deleteBook();
  };

  for (let i = 0; i < deleteButton.length; i += 1) {
    deleteButton[i].onclick = () => {
      bookToRemove(i);
    };
  }
};
deleteBook();
