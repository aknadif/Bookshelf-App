const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;

    const Book = makeBook(BookTitle, BookAuthor, BookYear);
    const selesai = document.getElementById("selesai");

    if (selesai.checked == true) {
        const bookObject = composeBookObject(BookTitle, BookAuthor, BookYear, true);
        Book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        completedBOOKList.append(Book);
        updateDataToStorage();

    } else {
        const bookObject = composeBookObject(BookTitle, BookAuthor, BookYear, false);
        Book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        uncompletedBOOKList.append(Book);
        updateDataToStorage();

    }
}

makeBook = (title, author, year, isComplete) => {

    const BookTitle = document.createElement("h1");
    BookTitle.innerText = title;

    const BookAuthor = document.createElement("h4");
    BookAuthor.innerText = author;

    const BookYear = document.createElement("p");
    BookYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(BookTitle, BookAuthor, BookYear);

    const container = document.createElement("article");
    container.classList.add("book_item", "mt-4")
    container.append(textContainer);
    if (isComplete) {
        container.append(
            createUndoButton(),
            createDeleteButton());

    } else {
        container.append(
            createCheckButton(), 
            createDeleteButton());
}

return container;
}

createButton = (buttonTypeClass, kata, id, eventListener) => {
    const button = document.createElement("button");
    button.innerText = kata;
    button.classList.add("btn", buttonTypeClass);
    button.setAttribute("id", id)
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const BooktaskTitle = taskElement.querySelector(".inner > h1").innerText;
    const BooktaskAuthor = taskElement.querySelector(".inner > h4").innerText;
    const BooktaskYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(BooktaskTitle, BooktaskAuthor, BooktaskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();

}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const BooktaskTitle = taskElement.querySelector(".inner > h1").innerText;
    const BooktaskAuthor = taskElement.querySelector(".inner > h4").innerText;
    const BooktaskYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(BooktaskTitle, BooktaskAuthor, BooktaskYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}


function removeTaskFromCompleted(taskElement) {
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");
    var btnd = document.getElementById("nodelete");
    var btnv = document.getElementById("vdelete");

    modal.style.display = "block";
    btnv.addEventListener("click", function () {
        modal.style.display = "none";

        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);
        taskElement.remove();
        updateDataToStorage();
    })

    btnd.addEventListener("click", function () {
        modal.style.display = "none";
        updateDataToStorage();
    })

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function createCheckButton() {
    return createButton("btn-outline-success", "Selesai dibaca", "check", function (event) {
        addBookToCompleted(event.target.parentElement);
    });
}

function createDeleteButton() {
    return createButton("btn-outline-danger", "Hapus Buku", "delete", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton("btn-outline-warning", "Belum Selesai dibaca", "undo", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function search() {
    let input, filter, inner, article, h1, i, txtValue;
    input = document.getElementById('inputsearch');
    filter = input.value.toUpperCase();
    inner = document.getElementById("filter");
    article = inner.getElementsByTagName('article');

    for (i = 0; i < article.length; i++) {
        h1 = article[i].getElementsByTagName("h1")[0];
        txtValue = h1.textContent || h1.innerText;
        console.log(h1);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            article[i].style.display = "";
        } else {
            article[i].style.display = "none";
        }
    }

}