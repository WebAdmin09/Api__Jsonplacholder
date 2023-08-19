const titleWrapper = document.querySelector('.title__wrapper');

function getData(url, callback) {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let resJson = xhr.response;
            let res = JSON.parse(resJson);
            callback?.(res);
        } else if (xhr.readyState === 4) {
            console.log(xhr.statusText);
        }
    }
    xhr.open('get', url)
    xhr.send();
}

function getTodos(id, title) {
    const titleMenu = document.createElement('div');
    titleMenu.className = 'title__menu';

    const titleId = document.createElement('h6')
    titleId.textContent = `ID:${id}`
    titleId.className = 'tods-id';

    const titleSpan = document.createElement('span');
    titleSpan.textContent =  `Title: ${title}`;
    titleSpan.className = 'tods__span'

    titleMenu.append(titleId, titleSpan);
    return titleMenu
}

function getTodosdata() {
    let userId = (localStorage.getItem('id'));
    getData(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, (todos) => {
        todos.map((todo) => {
            titleWrapper.append(getTodos(todo.id, todo.title));
        })
    })
}
getTodosdata()