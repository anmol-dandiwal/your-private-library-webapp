let myLib = [];

function Book(title, author, numPages, status){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
}

const book1 = new Book("Book1", "Someone", 69, "Read");
const book2 = new Book("Book2", "Someone LOL", 420, "Unread");
const book3 = new Book("Book3", "Me", 2000, "In Progress");

myLib.push(book1);
myLib.push(book2);
myLib.push(book3);
render();

const form = document.getElementById("addButtonForm");
function addBook(){
    if (form.elements[3].checked){
        myLib.push(new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value, "Read"));
    } else if (form.elements[4].checked){
        myLib.push(new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value, "Unread"));
    } else {
        myLib.push(new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value, "In Progress"));
    }
    render();
    clearForm();
    return false;
}

function clearForm(){
    for (let i = 0; i < 3; i++){
        form.elements[i].value = "";
    }
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


function render(){
    const library = document.getElementById("library");
    library.innerHTML = " ";
    myLib.forEach((book) => {
        switch (book.status){
            case "Unread":
                library.innerHTML += `  <div id="${book.title}" class="book">
                                            <p>${book.title}</p>
                                            <p>By: <span class="author">${book.author}</span></p>
                                            <p><span class="numPages">${book.numPages}</span> pages</p>
                                            <div id="${book.title}Tools" class="bookTools">
                                                <button class="deleteButton">X</button>
                                                <button onclick="showDropdown(this.parentNode.parentNode.id); changeStatus(this.parentNode.parentNode.id);" 
                                                                id="${book.title}toolsButton" class="toolsButton">Unread</button>
                                                <div id="${book.title}Dropdown" class="toolsDropdown">     
                                                    <button>Read</button>
                                                    <button>In Progress</button>
                                                </div>
                                            </div>
                                        </div>`
                break;
            case "Read":
                library.innerHTML += `  <div id="${book.title}" class="book">
                                            <p>${book.title}</p>
                                            <p>By: <span class="author">${book.author}</span></p>
                                            <p><span class="numPages">${book.numPages}</span> pages</p>
                                            <div id="${book.title}Tools" class="bookTools">
                                                <button class="deleteButton">X</button>
                                                <button onclick="showDropdown(this.parentNode.parentNode.id); changeStatus(this.parentNode.parentNode.id);" 
                                                                id="${book.title}toolsButton" class="toolsButton">Read</button>
                                                <div id="${book.title}Dropdown" class="toolsDropdown">     
                                                    <button>Unread</button>
                                                    <button>In Progress</button>
                                                </div>
                                            </div>
                                        </div>`
                break;
            case "In Progress":
                library.innerHTML += `  <div id="${book.title}" class="book">
                                            <p>${book.title}</p>
                                            <p>By: <span class="author">${book.author}</span></p>
                                            <p><span class="numPages">${book.numPages}</span> pages</p>
                                            <div id="${book.title}Tools" class="bookTools">
                                                <button class="deleteButton">X</button>
                                                <button onclick="showDropdown(this.parentNode.parentNode.id); changeStatus(this.parentNode.parentNode.id);" 
                                                                id="${book.title}toolsButton" class="toolsButton">In Progress</button>
                                                <div id="${book.title}Dropdown" class="toolsDropdown">     
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