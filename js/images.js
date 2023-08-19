const imagesWrapper = document.querySelector('.images__wrapper');

function getData(url, callback) {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let resJson = xhr.response;
            let res = JSON.parse(resJson);
            let id = localStorage.getItem('id')
            callback?.(res.slice(+id * 10 - 10, +id * 10));
        } else if (xhr.readyState === 4) {
            console.log(xhr.statusText);
        }
    }
    xhr.open('get', url)
    xhr.send();
}
function getImages(url) {
    const imagesMenu = document.createElement('div');
    imagesMenu.className = 'comments__menu';

    const images = document.createElement('img');
    images.src = url
    images.className = 'images'
    

    imagesMenu.append(images);
    return imagesMenu
}

function getCommentsdata() {
    let userId = (localStorage.getItem('id'));
    getData(`https://jsonplaceholder.typicode.com/photos?userid=${userId}`, (images) => {
        images.map((image) => {
            imagesWrapper.append(getImages(image.url));
        })
    })
}
getCommentsdata()