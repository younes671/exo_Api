// sélectionne l'élément HTML avec la classe "cp"
const inputCP = document.querySelector(".cp");
// sélectionne l'élément HTML avec la classe "ville"
const selectVille = document.querySelector(".ville");

// Ajoute un écouteur d'évenement "input" au champ
inputCP.addEventListener("input", () => {
    // Récupère la valeur entrée dans le champ de code postal
    let value = inputCP.value;
    // vide le contenu actuel de la liste de sélection de ville
    selectVille.innerHTML = "";

    // effectue une requete fetch vers l'API de géolocalisation avec le code postal saisi
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,codePostaux,codeRegion&format=json&geometry=centre`)
    // convertit la réponse en format JSON
    .then((response) => response.json())
    // une fois que les données JSON sont disponibles
    .then((data) => {
        // affiche les données dans la console (pour debug si besoin)
        console.log(data);
        // parcours chaque objet "ville" dans les données récupérées
        data.forEach((ville) => {
            // créer un nouvelle élément d'option HTML
            let option = document.createElement("option");
            // définit la valeur de l'option comme le code de la ville 
            option.value = ville.code;
            // définit le texte affiché de l'option comme le nom de la ville
            option.innerHTML = ville.nom;
            // ajoute l'option à la liste de sélection des villes 
            selectVille.appendChild(option);
        });
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
    });
});


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

