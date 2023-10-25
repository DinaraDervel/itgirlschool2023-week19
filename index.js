const URL = 'https://jsonplaceholder.typicode.com/posts'
const posts = document.querySelector('#posts');//parent element for posts
const newPost = document.querySelector('#newPost');//parent element for new post
const render = (post, postParentElement) => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>`;
    postParentElement.append(postElement);
}; // fuction for rendering post in DOM inside parent element


//1
const getRequest = (url) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => data.forEach(post => render(post, posts)))
        .catch(err => console.log(err))
}; //function for GET request

getRequest(URL);


//2
const postRequest = (url, body) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(body),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            };
            return response.json();
        })
        .then(post => render(post, newPost))
        .catch(err => console.log(err))
}; //function for POST request

const body = {
    title: '',
    body: ''
}; //body for the POST request

const postTitle = document.getElementById('postTitle');
const onTitleChange = postTitle.addEventListener('change', () => {
    body.title = postTitle.value;
});

const postText = document.getElementById('postText');
const onTextChange = postText.addEventListener('change', () => {
    body.body = postText.value;
});

const addPostButton = document.getElementById('addPostButton');
const addPost = addPostButton.addEventListener('click', () => {
    postRequest(URL, body);
    postTitle.value = '';
    postText.value = '';
})
