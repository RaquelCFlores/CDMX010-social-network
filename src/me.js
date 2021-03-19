import {
  dataBase,
  salir,
  activeUser,
  verAutenticacion,
} from './configFirebase.js';
import { onNavigate } from './routes.js';

export const me = `
<div id='me-mobile' class='me-mobile'>
  <header class='container-home-head'>
    <button class='btn-burger burger'><hr><hr><hr></button>
    <nav class='nav-mobile disabled-menu' id='nav-mobile'>
      <ul><li>Angela Gomez</li></ul>
      <ul><li>Ver tu perfil</li></ul>
      <ul><li>Buscar amigos</li></ul>
      <ul><li>Guardado</li></ul>
      <ul><li>Cafeterias cerca</li></ul>
      <ul><li>Ayuda y soporte técnico</li></ul>
      <ul><li>Configuracion</li></ul>
      <ul><li><a class='logOut'>Cerrar sesión</a></li></ul>
    </nav>
    <img id='logo'class='logo-home' src='../assets/coffehouseletras-01.png' alt='Logo Coffee House'>
    <div class='div-search-head'>
      <img class='icon-home-head' src='../assets/search.png' alt='buscar'>
    </div>
  </header>
  <main class='container-me-main'>
    <section class='container-posts'>
      <div class='div-photo-profile'>
        <img id='img-profile' src='../assets/withoutProfile.png'>
        <h3 id='name-user'> </h3>
      </div>
      <form class='my-posts' id='my-posts-mobile'>
        <input id='input-post-mobile' class='input-post-mobile' placeholder='Compartir algo' required>
        <div class='icons-myPosts'>
          <img class='here-icon icons-posts' src='../assets/here-icon.png'>
          <img class='img-icon icons-posts' src='../assets/image-icon.png'>
          <button id='send-icon-mobile' class='btn-icons'> <img class='send-icon icons-posts' src='../assets/send-icon.png'></button>
        </div>
      </form>
      <div class='container-img'>
        <img class='img-post' src='../assets/cafeImg.jpg'>
      </div>
      <div class='container-icons-post'>
        <div class='icon-left'>
          <span class='counter1' id='counter1'>200</span>
          <button class='btn-icons'> <img id='icon-likes' class='icons-posts' src='../assets/cup-dislike.png'> </button>
          <button class='btn-icons'> <img id='icon-comments' class='icons-posts' src='../assets/comment-icon.png'> </button>
        </div>
        <div class='icon-right'>
          <button class='btn-icons'> <img id='icon-trash' class='icons-posts' src='../assets/trash-icon.png'> </button>
          <button class='btn-icons'> <img id='icon-edit' class='icons-posts' src='../assets/write-icon.png'> </button>
          <button class='btn-icons'> <img class='icons-posts' src='../assets/favorite-icon.png'> </button>
        </div>
      </div>
      <section class='section-posts' id='section-post-mobile'></section>
      <section class='section-posts-second'>
        <div class='div-comments'>
          <img class='photo-friend' src='../assets/withoutProfile.png'>
          <div class='comments-mobile'><p></p></div>
        </div>
        <div class='div-comments'>
          <img class='photo-friend' src='../assets/withoutProfile.png'>
          <div class='comments-mobile'><p></p></div>
        </div>
        <div class='container-counter'>
          <p class='counter-comments'>60 comentarios</p>
          <form class='form-comments'>
            <input class='post-comment' placeholder='Comenta algo'>
            <button id='send-comment' class='btn-icons'> <img class='icons-posts' src='../assets/send-icon.png'> </button>
          </form>
        </div>
      </section>
    </section>
  </main>
  <footer class='footer-mobile'>
    <div class='container-navigation'>
      <img id='calendar' class='icon-home' src='../assets/calendar.png' alt='icon-muro'>
      <img class='icon-home' src='../assets/friends.png' alt='icon-friends'>
      <img class='icon-home' src='../assets/popular.png' alt='icon-popular'>
      <img id='me' class='icon-home' src='../assets/me.png' alt='icon-me'>
    </div>
  </footer>
</div>
`;

// --------Mobile--------- //

let editStatus = false;
let idMob = '';

// GUARDAR POST //
const savePost = (inputPostMob, likes) => {
  dataBase.collection('posts').doc().set({
    inputPostMob,
    likes,
  });
};

const getPost = (id) => dataBase.collection('posts').doc(id).get();
const onGetPosts = (callback) => dataBase.collection('posts').onSnapshot(callback);
const deletePost = (id) => dataBase.collection('posts').doc(id).delete();
const updatePost = (id, updatedPost) => dataBase.collection('posts').doc(id).update(updatedPost);

// document.addEventListener('DOMContentLoaded', async (e)=>{
export async function agregapost() {
  const sectionPostMob = document.getElementById('section-post-mobile');
  onGetPosts((querySnapshot) => {
    sectionPostMob.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const publicationMob = doc.data();
      const numLikes = publicationMob.likes;
      console.log(publicationMob);
      publicationMob.id = doc.id;
      console.log(publicationMob.id);
      sectionPostMob.innerHTML += `
      <div class='myPost' id='imagen'>
        <p>${publicationMob.inputPostMob}</p>
      </div>
      <div class='icon-right'>
        <button class='btn-icons icon-trash-mobile'><img data-id='${publicationMob.id}' class='icons-posts' src='../assets/trash-icon.png'></button>
        <button class='btn-icons icon-edit-mobile'> <img data-id='${publicationMob.id}' class='icons-posts' src='../assets/write-icon.png'> </button>
        <button class='btn-icons icon-likes' id='icon-likes'> <img id='color' data-id='${publicationMob.id}' class='icons-posts' src='../assets/cupLike-01.png'></button>
        <span class='counter' id='counter' data-id='${publicationMob.id}'>${numLikes.length}</span>
      </div>
      `;

      const btnLike = document.querySelectorAll('.icon-likes');
      const user = activeUser();
      btnLike.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const id = e.target.dataset.id;
          const docMob = await getPost(id);
          const postMob = docMob.data();
          if (postMob.likes.includes(user.email)) {
            const filteredEmails = postMob.likes.filter((email) => email !== user.email);
            const updates = { likes: filteredEmails };
            await updatePost(id, updates);
          } else {
            postMob.likes.push(user.email);
            const updates = { likes: postMob.likes };
            await updatePost(id, updates);
            // document.getElementById('color').style.backgroundColor = 'brown';
            // sectionPostMob['icon-likes'].innerHTML = ` 
            // <img data-id='${publicationMob.id}' class='icons-posts' src='../assets/cup-like.png'>
            // `;
          }
        });
      });

      const btnsTrashMob = document.querySelectorAll('.icon-trash-mobile');
      btnsTrashMob.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const mnjConfirm = confirm('¿Deseas borrar el post?');
          if (mnjConfirm === true) {
            await deletePost(e.target.dataset.id);
          }
        });
      });

      const myPostMob = document.getElementById('my-posts-mobile');
      const btnsEditMob = document.querySelectorAll('.icon-edit-mobile');
      btnsEditMob.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          if (confirm('¿Deseas editar el post?')) {
            const docMob = await getPost(e.target.dataset.id);
            const postMob = docMob.data();
            editStatus = true;
            idMob = docMob.id;
            myPostMob['input-post-mobile'].value = postMob.inputPostMob;
            myPostMob['send-icon-mobile'].innerHTML = ` 
            <button class='btn-icons icon-edit-mobile'> <img class='icons-posts' src='../assets/write-icon.png'> </button>
            `;
          }
        });
      });
    });
  });
}

export function meVista(container) {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = me;
  agregapost();
}

// CAPTURANDO EVENTOS DE FORM //
document.addEventListener('submit', async (e) => {
  if (e.target.matches('#my-posts-mobile')) {
    const myPostMob = document.getElementById('my-posts-mobile');
    e.preventDefault();
    const inputPostMob = myPostMob['input-post-mobile'];
    console.log(inputPostMob);
    if (!editStatus) {
      await savePost(inputPostMob.value, []);
      setTimeout(() => {
        alert('Tu post se ha publicado');
      }, 1000);
    } else {
      await updatePost(idMob, {
        inputPostMob: inputPostMob.value,
      });
      editStatus = false;
      idMob = '';
      myPostMob['send-icon-mobile'].innerHTML = ` 
      <button id='send-icon-mobile' class='btn-icons'> <img class='send-icon icons-posts' src='../assets/send-icon.png'></button>
      `;
    }
    myPostMob.reset();
    inputPostMob.focus();
  }
});

function showMenu() {
  const menu = document.getElementById('nav-mobile');
  if (menu.classList.contains('disabled-menu')) {
    menu.classList.remove('disabled-menu');
    menu.classList.add('enabled-menu');
  } else {
    menu.classList.remove('enabled-menu');
    menu.classList.add('disabled-menu');
  }
}

document.addEventListener('click', (e) => {
  if (e.target.matches('#calendar')) {
    console.log('Estas en home');
    e.preventDefault();
    onNavigate('/home');
  }
  if (e.target.matches('#me')) {
    console.log('Estas en me');
    e.preventDefault();
    onNavigate('/me');
  }
  if (e.target.matches('.burger')) {
    console.log('Burger');
    showMenu();
    e.preventDefault();
  }
  if (e.target.matches('.logOut')) {
    salir();
    e.preventDefault();
    console('botón salir');
  }
  if (e.target.matches('#icon-likes')) {
    console.log('Me gusta');
  }
});

window.onload = function () {
  console.log('aquí estoy');
  verAutenticacion();
};
