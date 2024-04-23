// Sélectionne l'élément HTML avec la classe "cp"
const inputCP = document.querySelector(".cp");
// Sélectionne l'élément HTML avec la classe "ville"
const selectVille = document.querySelector(".ville");

document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne l'élément HTML avec la classe "cp"
    const inputCP = document.querySelector(".cp");
    // Sélectionne l'élément HTML avec la classe "ville"
    const selectVille = document.querySelector(".ville");

    // Fonction pour centrer la carte sur la ville sélectionnée
    function centerMapOnSelectedCity() {
        // Récupère le nom de la ville sélectionnée
        let selectedCityName = selectVille.options[selectVille.selectedIndex].text;
        console.log("Ville sélectionnée:", selectedCityName); // Débogage

        // Effectue une requête fetch vers l'API Nominatim pour obtenir les coordonnées géographiques de la ville sélectionnée
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedCityName}`)
        // Convertit la réponse en format JSON
        .then((response) => response.json())
        // Une fois que les données JSON sont disponibles
        .then((data) => {
            // Vérifie si la réponse contient les données attendues
            if (data && data.length > 0) {
                // Récupère les coordonnées géographiques de la ville
                var latitude = data[0].lat;
                var longitude = data[0].lon;
                // Centre la carte sur les coordonnées de la ville avec un niveau de zoom de 13
                map.setView([latitude, longitude], 13);

                   // Ajoute un marqueur à la position de la ville
                    L.marker([latitude, longitude]).addTo(map)
                    .bindPopup(selectedCityName)
                    .openPopup();
            } else {
                console.error("Les coordonnées de la ville sélectionnée sont manquantes ou incorrectes.");
            }
        })
        .catch((error) => {
            // Affiche une erreur en cas de problème lors de la récupération des données
            console.error("Erreur lors de la récupération des données:", error);
        });
    }

    // Ajoute un écouteur d'événement "input" au champ de code postal
    inputCP.addEventListener("input", () => {
        // Récupère la valeur entrée dans le champ de code postal
        let value = inputCP.value;
        // Vide le contenu actuel de la liste de sélection des villes
        selectVille.innerHTML = "";

        // Effectue une requête fetch vers l'API de géolocalisation avec le code postal saisi
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,codePostaux,codeRegion&format=json&geometry=centre`)
        // Convertit la réponse en format JSON
        .then((response) => response.json())
        // Une fois que les données JSON sont disponibles
        .then((data) => {
            // Parcourt chaque objet "ville" dans les données récupérées
            data.forEach((city) => {
                // Crée un nouvel élément d'option HTML
                let option = document.createElement("option");
                // Définit la valeur de l'option comme le code de la ville
                option.value = city.code;
                // Définit le texte affiché de l'option comme le nom de la ville
                option.innerHTML = city.nom;
                // Ajoute l'option à la liste de sélection des villes
                selectVille.appendChild(option);
            });
        })
        .catch((error) => {
            // Affiche une erreur en cas de problème lors de la récupération des données
            console.error("Erreur lors de la récupération des données:", error);
        });
    });

    // Ajoute un écouteur d'événement "change" à la liste de sélection des villes
    selectVille.addEventListener("change", () => {
        // Appel de la fonction pour centrer la carte sur la ville sélectionnée
        centerMapOnSelectedCity();
    });
});


// Initialise votre carte Leaflet
var map = L.map('map').setView([51.505, -0.09], 13);

// Ajoute une couche de tuiles OpenStreetMap à la carte
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Ajoute un marqueur à la position [51.5, -0.09] à la carte
var marker = L.marker([51.5, -0.09]).addTo(map);

// Ajoute un cercle à la position [51.508, -0.11] avec des propriétés spécifiées à la carte
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

// Ajoute un polygone avec les points spécifiés à la carte
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// Lie un popup au marqueur avec un contenu spécifique et l'ouvre par défaut
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// Lie un popup au cercle
circle.bindPopup("I am a circle.");

// Lie un popup au polygone
polygon.bindPopup("I am a polygon.");

// Crée un popup autonome et l'ouvre à la position [51.513, -0.09]
var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

// Fonction appelée lorsque la carte est cliquée, affiche une alerte avec les coordonnées du clic
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

// Associe l'événement 'click' de la carte à la fonction onMapClick
map.on('click', onMapClick);

// Crée un popup vide
var popup = L.popup();

// Fonction appelée lorsque la carte est cliquée, affiche un popup avec les coordonnées du clic
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

// Associe l'événement 'click' de la carte à la nouvelle fonction onMapClick
map.on('click', onMapClick);



// // sélectionne l'élément HTML avec la classe "cp"
// const inputCP = document.querySelector(".cp")
// // sélectionne l'élément HTML avec la classe "ville"
// const selectVille = document.querySelector(".ville")

// // Ajoute un écouteur d'évenement "input" au champ
// inputCP.addEventListener("input", () => {
//     // Récupère la valeur entrée dans le champ de code postal
//     let value = inputCP.value
//     //vide le contenu actuel de la liste de sélection de ville
//     selectVille.innerText = null
//     //effectue une requete fetch vers l'API de géolocalisation avec le code postal saisi
//     fetch('https://geo.api.gouv.fr/commune?codePostal=${value}&fields=region,nom,code,codePostaux,codeRegion&format=json&geometry=centre')
//     //convertit la réponse en format JSON
//     .then((response) => response.json())
//     //une fois que les données JSON sont disponibles
//     .then((data) => {
//         //affiche les données dans la console (pour debug si besoin)
//         console.log(data)
//         //parcours chaque objet "ville" dans les données récupérées
//         data.forEach((ville) => {
//             //créer un nouvelle élément d'option HTML
//             let option = document.createElement("option")
//             //definit la valeur de l'option comme le code de la ville 
//             option.value = '${ville.code}'
//             //definit le texte affiché de l'option comme le nom de la ville
//             option.innerHTML = '${ville.nom}'
//             //ajoute l'option à la liste de sélection des villes 
//             selectVille.appendChild(option)
//         })
//     })
// })

