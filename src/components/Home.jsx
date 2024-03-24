import './Home.scss';

function Home() {
    return (
        <div className='presentation'>
            <h1>Projet ReignWish</h1>
            <p>Un projet de test pour React, basé sur le jeu <a href="https://store.steampowered.com/app/474750/Reigns/?l=french">Reigns</a> (en très allégé, et beaucoup moins aboutit)</p>
            <p>Un jeu basé sur une interface inspirée de Tinder</p>
            <p>Dirigez un état en prenant des décisions basées sur des requetes de PNJs</p>
            <p>Pour prendre une décision swipez l'image vers la gauche ou la droite</p>
            <p>Chaque décision va favoriser ou affaiblir une des 4 forces en présence représentées par 4 jauges se remplissant/vidant selon leur influence actuelle (Religion, Peuple, Armée, Economie)</p>
            <p>La partie se termine lorsque l'une d'elle est completement vide ou completement pleine</p>
            <p>Il y a 8 fins disponibles</p>
            <p>Vous pouvez vous créer un "profil" pour acceder aux trophés</p>
            <p>Les PNJs ont été réalisé via stable diffusion</p>
            <p>La logique js du swipe vient de <a href="https://codepen.io/suez/pen/MaeVBy/">Nikolay Talanov</a></p>
            <p>Le projet manque de finition et de contenu mais c'est plus une occasion de tester certains types d'interface et de comportement de React</p>
        </div>
    )
}

export default Home;