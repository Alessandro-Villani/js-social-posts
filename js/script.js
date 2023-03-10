/*--------------------------------------TRACCIA-------------------------------------------

Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
# Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore (potrebbe mancare a qualcuno),
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali, inventatele*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=3)*
#Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
#Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
# ****BONUS**
 1. Formattare le date in formato italiano (gg/mm/aaaa)
 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola  => LF).
 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

----------------------------------------------------------------------------------------*/

//Create post array

const posts = [
    {
        id: 1,
        name: 'Phil Mangione',
        profilePicture: 'https://unsplash.it/300/300?image=15',
        date: new Date('12-23-2022'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        picture: 'https://unsplash.it/600/300?image=171',
        likes: 80
    },
    {
        id: 2,
        name: 'Alessandro Villani',
        date: new Date('04-23-2022'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        likes: 52
    },
    {
        id: 3,
        name: 'Giuseppe Marino',
        profilePicture: 'https://unsplash.it/300/300?image=17',
        date: new Date('07-15-2021'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        picture: 'https://unsplash.it/600/300?image=158',
        likes: 63
    },
    {
        id: 4,
        name: 'Mario Rossi',
        date: new Date('09-17-2019'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        picture: 'https://unsplash.it/600/300?image=174',
        likes: 256
    },
    {
        id: 5,
        name: 'Paolo Bianchi',
        profilePicture: 'https://unsplash.it/300/300?image=25',
        date: new Date('07-15-2021'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        likes: 72
    },
    {
        id: 6,
        name: 'Elena Di Giovanni',
        date: new Date('07-15-2021'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        likes: 47
    },

    

]

console.log(posts);

//pick target from DOM
const targetPostList = document.getElementById('container');

console.log(targetPostList);

//# FUNCTIONS

//Function to convert date
const convertDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return `${day}/${month}/${year}`
}

//Function to create posts

const createPost = (item) => {

     //Check if there is profile picture
    let profilePicture = `<img class="profile-pic" src="${item.profilePicture}" alt="${item.name}" />`;
    if (!item.profilePicture){
        const nameSurname = item.name.split(' ');
        console.table(nameSurname);
        let initials = ''
        nameSurname.forEach((word) => {
            initials += word.charAt(0);
        })
        console.log(initials);
        profilePicture = `<div class="profile-pic-default"><span>${initials}</span></div>`;
    }

    //Check if there is post picture
    let picture = item.picture ? `<div class="post__image">
    <img src="${item.picture}" alt="" />
    </div>` : '';

    //Convert date
    const date = convertDate(item.date);

    const post = `
    <div class="post">
        <div class="post__header">
          <div class="post-meta">
            <div class="post-meta__icon">
            ${profilePicture}
            </div>
            <div class="post-meta__data">
              <div class="post-meta__author">${item.name}</div>
              <div class="post-meta__time">${date}</div>
            </div>
          </div>
        </div>
        <div class="post__text">
          ${item.content}
        </div>
        <div class="post__image">
          ${picture}
        </div>
        <div class="post__footer">
          <div class="likes js-likes">
            <div class="likes__cta">
              <button class="like-button js-like-button" href="#" data-postid="1">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
              </button>
            </div>
            <div class="likes__counter">Piace a <b id="like-counter-${item.id}" class="js-likes-counter">${item.likes}</b> persone</div>
          </div>
        </div>
      </div>
    `;
   return post
}


//Function to add post in page

const addPosts = array => {

    let posts = ''
    array.forEach((post) => {
        posts += createPost(post);
    });

    return posts
}

//Print posts in page

targetPostList.innerHTML = addPosts(posts);

//Pick all like buttons

const likeButtons = document.querySelectorAll('.like-button');

//add event listener to button
likeButtons.forEach( (button, i) => {
    button.addEventListener('click', () => {
        //Toggle liked class
        button.classList.toggle('like-button--liked');
        
        //Increment or decrement likes
        if (button.classList.contains('like-button--liked')){
            posts[i].likes++;
        } else {
            posts[i].likes--; 
        }

        //Update likes number
        const likeTarget = document.getElementById(`like-counter-${i+1}`);
        likeTarget.innerText = posts[i].likes;
    })
});