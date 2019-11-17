const username = 'mihail';
const password = '123456';
const url = 'https://baas.kinvey.com/appdata/kid_rkC94xknr/books';

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const isbnInput = document.getElementById('isbn');

const loadBtn = document.getElementById('loadBooks');
loadBtn.addEventListener('click', getBooks);

const tbody = document.querySelector("body > table > tbody");
const trTemplate = document.querySelector("body > table > tbody > tr:nth-child(1)").cloneNode(true);
tbody.innerHTML = '';

let submitBtn = document.querySelector("body > form > button");
submitBtn.addEventListener('click', e => e.preventDefault());
submitBtn.addEventListener('click', createBook);

function generateHeaders(type, body, bookId)
{
    let obj = 
    {
        method: type,
        headers:
        {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
    }

    if(type !== 'GET') obj.headers['Content-Type'] = 'application/json';
    if(body) obj.body = body;

    return obj;
}


async function getBooks()
{
    tbody.innerHTML = '';

    let books;

    await fetch(url, generateHeaders('GET'))
    .then(x => x.json())
    .then(x => books = x);

    books.forEach(b => displayBook(b));
}

async function createBook()
{
    let book =
    {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    };

    let newBook;
    await fetch(url, generateHeaders('POST', JSON.stringify(book)))
    .then(x => x.json())
    .then(x => newBook = x);

    displayBook(newBook);
}

function setCols(tr, bookObj)
{
    tr.childNodes[1].textContent = bookObj.title;
    tr.childNodes[3].textContent = bookObj.author;
    tr.childNodes[5].textContent = bookObj.isbn;

    tr.childNodes[7].childNodes[1].addEventListener('click', e => editBook(e.target.parentNode.parentNode));
    tr.childNodes[7].childNodes[3].addEventListener('click', e => deleteBook(e.target.parentNode.parentNode));
}

function displayBook(bookObj)
{
    let tr = trTemplate.cloneNode(true);
    tr.setAttribute('bookId', bookObj._id);

    setCols(tr, bookObj);

    tbody.appendChild(tr);
}

function displayEditedBook(bookObj)
{
    let tr = Array.from(tbody.children)
    .find(x => x.getAttribute('bookId') === bookObj._id);

    setCols(tr, bookObj);
}

function editBook(targetNode)
{
    let id = targetNode.getAttribute('bookId');

    let eventlessBtn = submitBtn.cloneNode(true);
    eventlessBtn.addEventListener('click', e => {e.preventDefault(); editSubmit(id)});
    submitBtn.parentNode.replaceChild(eventlessBtn, submitBtn);
    submitBtn = eventlessBtn;

    titleInput.value = targetNode.childNodes[1].textContent;
    authorInput.value = targetNode.childNodes[3].textContent;
    isbnInput.value = targetNode.childNodes[5].textContent;

    submitBtn.textContent = 'Edit';
}

async function editSubmit(id)
{
    let book =
    {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    };

    await fetch(`${url}/${id}`, generateHeaders('PUT', JSON.stringify(book)))
    .then(x => x.json())
    .then(x => displayEditedBook(x));

    let eventlessBtn = submitBtn.cloneNode(true);
    eventlessBtn.addEventListener('click', e => {e.preventDefault(); createBook()});
    submitBtn.parentNode.replaceChild(eventlessBtn, submitBtn);
    submitBtn = eventlessBtn;

    titleInput.value = '';
    authorInput.value = '';
    isbnInput.value = '';
    submitBtn.textContent = 'Create';
}

async function deleteBook(targetNode)
{
    let id = targetNode.getAttribute('bookId');

    await fetch(`${url}/${id}`, generateHeaders('DELETE'))
    .then(x => x.json())
    .then(targetNode.remove());
}
