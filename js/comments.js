const commentWrapper = document.querySelector('.comment__wrapper');

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

function getComments(id, email, name) {
    const commentsMenu = document.createElement('div');
    commentsMenu.className = 'comments__menu';

    const titleId = document.createElement('h6')
    titleId.textContent = `ID:${id}`
    titleId.className = 'tods-id';

    const cardName = document.createElement('h3');
    cardName.textContent = `${name}`
    cardName.className = 'commentName';

    const cardEmail = document.createElement('h3');
    cardEmail.innerHTML = `Email: <a href='milto:'>${email}</a>`
    cardEmail.className = 'cardEmail';

    commentsMenu.append(titleId, cardEmail, cardName);
    return commentsMenu
}

function getCommentsdata() {
    let userId = (localStorage.getItem('id'));
    console.log(userId);
    getData(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`, (comments) => {
        comments.map((comment) => {
            commentWrapper.append(getComments(comment.id, comment.email, comment.name));
        })
    })
}
getCommentsdata()