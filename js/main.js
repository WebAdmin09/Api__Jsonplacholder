const cardsWrapper = document.querySelector('.cards__wrapper');

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

function getUsersCard({ id, name, username, email, address, phone, }) {

    let { city } = address
    const cardMenu = document.createElement('div');
    cardMenu.className = 'card__menu';

    const cardBtn = document.createElement('div');
    cardBtn.className = 'card__btn'

    const cardId = document.createElement('h6')
    cardId.textContent = `ID:${id}`
    cardId.className = 'card-id';

    const cardName = document.createElement('h3');
    cardName.textContent = `${name}`
    cardName.className = 'cardName';

    const cardUsername = document.createElement('h3')
    cardUsername.textContent = `${username}`;
    cardUsername.className = 'cardUsername';

    const cardEmail = document.createElement('h3');
    cardEmail.innerHTML = `Email: <a href='milto:'>${email}</a>`
    cardEmail.className = 'cardEmail';

    const cardAdress = document.createElement('h2');
    cardAdress.textContent = `Adress: ${city}`;
    cardAdress.className = 'cardAdress';

    const cardPhone = document.createElement('h2');
    cardPhone.textContent = `Phone:${phone}`;
    cardPhone.className = 'cardPhone';

    const cardTodosBtn = document.createElement('button');
    cardTodosBtn.innerHTML = 'Todos'
    cardTodosBtn.className = 'cardBtn'
    cardTodosBtn.addEventListener('click', () => {
        localStorage.setItem('id', id)
        window.location.href = '../todos.html'
    })
    const cardPostBtn = document.createElement('button');
    cardPostBtn.innerHTML = 'Post'
    cardPostBtn.className = 'cardBtn'
    cardPostBtn.addEventListener('click', () =>{
        localStorage.setItem('id', id);
        window.location.href = '../posts.html'
    })

    const cardAlbomsBtn = document.createElement('button');
    cardAlbomsBtn.innerHTML = 'Alboms'
    cardAlbomsBtn.className = 'cardBtn'
    cardAlbomsBtn.addEventListener('click', () =>{
        localStorage.setItem('id', id);
        window.location.href = '../photos.html'
    })

    cardBtn.append(cardTodosBtn, cardPostBtn, cardAlbomsBtn)
    cardMenu.append(
        cardId, cardName, cardUsername,
        cardEmail, cardAdress, cardPhone,
        cardBtn
    )
    return cardMenu
}


getData('https://jsonplaceholder.typicode.com/users', (users) => {
    // cardsWrapper.innerHTML = '';
    users.map((user) => {
        cardsWrapper.append(getUsersCard(user));
    })
})
