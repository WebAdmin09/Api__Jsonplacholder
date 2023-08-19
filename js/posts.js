const postsWrapper = document.querySelector('.posts__wrapper');

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

function getPosts(id, title, body) {
    const postsMenu = document.createElement('div');
    postsMenu.className = 'posts__menu';

    const titleId = document.createElement('h6')
    titleId.textContent = `ID:${id}`
    titleId.className = 'tods-id';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = `Title: ${title}`;
    titleSpan.className = 'tods__span'

    const todosbody = document.createElement('h3');
    todosbody.textContent = `${body}`
    todosbody.className = 'cardUsername'

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Comment';
    commentBtn.className = 'cardBtn'
    commentBtn.addEventListener('click', () => {
        localStorage.setItem('id', id);
        window.location.href = '../comments.html'
    })

    postsMenu.append(titleId, titleSpan, todosbody, commentBtn);
    return postsMenu
}

function getPostsdata() {
    let userId = (localStorage.getItem('id'));
    getData(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, (posts) => {
        posts.map((post) => {
            postsWrapper.append(getPosts(post.id, post.title, post.body));
        })
    })
}
getPostsdata()