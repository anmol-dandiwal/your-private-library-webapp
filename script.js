let myLib = [];
let deleteId;

function Book(title, author, numPages, status, idNum){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
    this.idNum = idNum;
}

const book1 = new Book("Book1", "Someone", 69, "Read", makeId());
const book2 = new Book("Book2", "Someone LOL", 420, "Unread", makeId());
const book3 = new Book("Book3", "Me", 2000, "In Progress", makeId());

myLib.push(book1);
myLib.push(book3);
myLib.push(book2);

render(myLib);

const addForm = document.getElementById("addButtonForm");
const searchForm = document.getElementById("searchButtonForm");
function addBook(){
    if (addForm.elements[3].checked){
        myLib.push(new Book(addForm.elements[0].value, addForm.elements[1].value, addForm.elements[2].value, "Read", makeId()));
    } else if (addForm.elements[4].checked){
        myLib.push(new Book(addForm.elements[0].value, addForm.elements[1].value, addForm.elements[2].value, "Unread", makeId()));
    } else {
        myLib.push(new Book(addForm.elements[0].value, addForm.elements[1].value, addForm.elements[2].value, "In Progress", makeId()));
    }
    render(myLib);
    clearForm(addForm);
    return false;
}

function searchBooks(){
    let newLib;
    console.log(searchForm.elements[0].value)
    if (searchForm.elements[1].checked){
        myLib.forEach((book) => {
            if (book.title.toLowerCase() == searchForm.elements[0].value.toLowerCase()){
                newLib.push(book);
            }
        })
    } else {
        myLib.forEach((book) => {
            if (book.author.toLowerCase() == searchForm.elements[0].value.toLowerCase()){
                newLib.push(book);
            }
        })
    }
    render(newLib);
}

function clearForm(form){
    for (let i = 0; i < 3; i++){
        form.elements[i].value = "";
    }
}

function deleteBook(elem){
    deleteId = elem;
    myLib = myLib.filter(checkId);
    render(myLib);
}

function checkId(book){
    return book.idNum != deleteId;
}

function makeId(){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < 7; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }   
    return result;
 }

function changeStatus(elem){
    const toolButtons = document.querySelectorAll(`#${elem}Dropdown > button`);
    const dropdownButton = document.getElementById(`${elem}toolsButton`);
    const toolsMenu = document.getElementById(`${elem}Dropdown`);
    toolButtons.forEach((button) =>{
        button.addEventListener("click", (e) =>{
            switch (e.target.innerHTML){
                case "Unread":
                    dropdownButton.innerHTML = "Unread";
                    toolsMenu.innerHTML = ` <button>Read</button>
                                            <button>In Progress</button>`;
                    break;
                case "Read":
                    dropdownButton.innerHTML = "Read";
                    toolsMenu.innerHTML = ` <button>Unread</button>
                                            <button>In Progress</button>`;
                    break;
                case "In Progress":
                    dropdownButton.innerHTML = "In Progress";
                    toolsMenu.innerHTML = ` <button>Read</button>
                                            <button>Unread</button>`;
                    break;
            }
        })
    })
}

function sort(cond){
    switch(cond){
        case "titleSortButton":
            myLib = myLib.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
            break;
        case "authorSortButton":
            myLib = myLib.sort((a, b) => a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1);
            break;
        case "pagesSortButton":
            myLib = myLib.sort((a, b) => a.numPages > b.numPages ? 1 : -1);
            break;
    }
    showDropdown("sortButton");
    render(myLib);
}

function filter(cond){
    let newLib;
    switch(cond){
        case "readFilterButton":
            newLib = myLib.filter(filtRead);
            break;
        case "unreadFilterButton":
            newLib = myLib.filter(filtUnread);
            break; 
        case "inProgressFilterButton":
            newLib = myLib.filter(filtInp);
            break;
    }
    showDropdown("filterButton");
    render(newLib);
}

function filtRead(book){
    return book.status == "Read";
}

function filtUnread(book){
    return book.status == "Unread";
}

function filtInp(book){
    return book.status == "In Progress";
}

function render(lib){
    const library = document.getElementById("library");
    library.innerHTML = " ";
    if (lib.length == 0){
        library.innerHTML = `<h1 style="text-align: center;">Add a new book to get started</h1>`
    }
    lib.forEach((book) => {
        switch (book.status){
            case "Unread":
                library.innerHTML += `  <div id="${book.idNum}" class="book">
                                            <p>${book.title}</p>
                                            <p>By: <span class="author">${book.author}</span></p>
                                            <p><span class="numPages">${book.numPages}</span> pages</p>
                                            <div id="${book.idNum}Tools" class="bookTools">
                                                <button onclick="deleteBook(this.parentNode.parentNode.id) "class="deleteButton">X</button>
                                                <button onclick="showDropdown(this.parentNode.parentNode.id); changeStatus(this.parentNode.parentNode.id);" 
                                                                id="${book.idNum}toolsButton" class="toolsButton">Unread</button>
                                                <div id="${book.idNum}Dropdown" class="toolsDropdown">     
                                                    <button>Read</button>
                                                    <button>In Progress</button>
                                                </div>
                                            </div>
                                        </div>`
                break;
            case "Read":
                library.innerHTML += `  <div id="${book.idNum}" class="book">
                                            <p>${book.title}</p>
                                            <p>By: <span class="author">${book.author}</span></p>
                                            <p><span class="numPages">${book.numPages}</span> pages</p>
                                            <div id="${book.idNum}Tools" class="bookTools">
                                                <button onclick="deleteBook(this.parentNode.parentNode.id) "class="deleteButton">X</button>
                                                <button onclick="showDropdown(this.parentNode.parentNode.id); changeStatus(this.parentNode.parentNode.id);" 
                                                                id="${book.idNum}toolsButton" class="toolsButton">Read</button>
                                                <div id="${book.idNum}Dropdown" class="toolsDropdown">     
                                                    <button>Unread</button>
                                                    <button>In Progress</button>
                                                </div>
                                            </div>
                                        </div>`
                break;
            case "In Progress":
                library.innerHTML += `  <div id="${book.idNum}" class="book">
                                            <p>${book.title}</p>
                                            <p>By: <span class="author">${book.author}</span></p>
                                            <p><span class="numPages">${book.numPages}</span> pages</p>
                                            <div id="${book.idNum}Tools" class="bookTools">
                                                <button onclick="deleteBook(this.parentNode.parentNode.id) "class="deleteButton">X</button>
                                                <button onclick="showDropdown(this.parentNode.parentNode.id); changeStatus(this.parentNode.parentNode.id);" 
                                                                id="${book.idNum}toolsButton" class="toolsButton">In Progress</button>
                                                <div id="${book.idNum}Dropdown" class="toolsDropdown">     
                                                    <button>Read</button>
                                                    <button>Unread</button>
                                                </div>
                                            </div>
                                        </div>`
                break;
        }
    })
}

function showDropdown(elem){
    document.getElementById(`${elem}Dropdown`).classList.toggle("show");
    document.querySelector("#navBarDropdowns").childNodes.forEach((dropdown) =>{
        if (dropdown.nodeType == 1 && dropdown.classList.contains("show") && !dropdown.isSameNode(document.getElementById(`${elem}Dropdown`))){
            dropdown.classList.remove("show");
        }
    })
}

//Hide Dropdown on click outside of menu
window.onclick = function(event){
    if (!event.target.matches('.toolsButton')){
        let dropdowns = document.querySelectorAll(".toolsDropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
}