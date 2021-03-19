// import { salir, verAutenticacion} from './configFirebase.js';

export const home = `
<div id='home-mobile' class='me-mobile'>
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
            <ul><li><a>Cerrar sesión</a></li></ul>
        </nav>
        <img class='logo-home' src='../assets/coffehouseletras-01.png' alt='Logo Coffee House'>
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
        <div class='container-img'>
            <img class='img-post' src='../assets/cafeImg.jpg'>
        </div>
        <div class='container-icons-post'>
            <div class='icon-left'>
                <span class='counter' id='counter'>200</span>
                <button class='btn-icons'> <img id='icon-likes' class='icons-posts' src='../assets/Groupcuplike2.png'> </button>
                <button class='btn-icons'> <img id='icon-comments' class='icons-posts' src='../assets/comment-icon.png'> </button>
            </div>
            <div class='icon-right'>
                <button class='btn-icons'> <img id='icon-trash' class='icons-posts' src='../assets/trash-icon.png'> </button>
                <button class='btn-icons'> <img id='icon-edit' class='icons-posts' src='../assets/write-icon.png'> </button>
                <button class='btn-icons'> <img class='icons-posts' src='../assets/favorite-icon.png'> </button>
            </div>
        </div>
        <section class='section-posts' id='section-post-home'>
        </section>
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
            <img  id='calendar' class='icon-home' src='../assets/calendar.png' alt='icon-muro'>
            <img class='icon-home' src='../assets/friends.png' alt='icon-friends'>
            <img class='icon-home' src='../assets/popular.png' alt='icon-popular'>
            <img id='me' class='icon-home' src='../assets/me.png' alt='icon-me'>
        </div>
    </footer>
</div>
`;

// document.addEventListener('click', (e) =>{
//     if(e.target.matches('.logOut')){
//         salir();
//     }
// })

// window.onload = function(){
//     console.log('aquí estoy');
//     verAutenticacion();
// }