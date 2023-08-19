const photosWrapper = document.querySelector('.photos__wrapper');

function getData(url, callback) {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let resJson = xhr.response;
            let res = JSON.parse(resJson);
            let id = localStorage.getItem('id')
            callback?.(res.slice(+id * 10 - 10, +id * 10));
            console.log(res.slice(+id - 1, +id + 10));
        } else if (xhr.readyState === 4) {
            console.log(xhr.statusText);
        }
    }
    xhr.open('get', url)
    xhr.send();
}

function getPhotos(id, title) {

    const photosMenu = document.createElement('div');
    photosMenu.className = 'photos__menu';

    const titleId = document.createElement('h6')
    titleId.textContent = `ID:${id}`
    titleId.className = 'tods-id';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = `Title: ${title}`;
    titleSpan.className = 'tods__span'

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Photos';
    commentBtn.className = 'cardBtn'
    commentBtn.addEventListener('click', () => {
        localStorage.setItem('id', id);
        window.location.href = '../images.html'
    })

    photosMenu.append(titleId, titleSpan, commentBtn);
    return photosMenu
}

function getPhotosdata() {
    let userId = (localStorage.getItem('id'));
    console.log(userId);
    getData('https://jsonplaceholder.typicode.com/photos', (photos) => {
        photos.map((photo) => {
            photosWrapper.append(getPhotos(photo.id, photo.title, photo.commentBtn));
        })
    })
}
getPhotosdata()