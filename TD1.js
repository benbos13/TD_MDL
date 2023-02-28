// Initialisation des variables et paramètres
const fs = require('fs'); // Charge le module fs afin de pouvoir lire par la suite
let rawdata = fs.readFileSync('users.json'); // On lit de manière synchrone c'est-à-dire que l'éxécution du programme est suspendu pendant la lecture du fichier
var user = JSON.parse(rawdata) // Converti la chaine de caractère "rawdata" en objet "user"
let res = {}
let arrRes = []
//const input = process.argv[2] // Permet de récupérer l'entrée donné en paramètre dans le terminal

function printMenu(){
    console.log("--------------------------------");
    console.log("1. Country");
    console.log("2. Company");
    console.log("3. Quitter");
    console.log("--------------------------------");
    let readlineSync = require('readline-sync');
    let readline = readlineSync.question('Faites votre choix');
    return readline;
}

/**
 * Fonction qui récupère les informations demander dans le fichier
 * @param {string} request input récupérer dans la console
 */
function getData(request) {
    for (i = 0; i < user.length; i++) { 
        var index = user[i][request] // On récupère le nom du pays ou de l'entreprise
        if (!res[index]) { // Si l'index (nom du pays ou de l'entreprise) n'appartient pas à res,
            res[index] = 1 // On définit l'indice à 1
        }
        else
            res[index]++ // On incrémente
    }

    for (let i in res) { // On parcours res
        let t =  {}; // Création d'un tableau
        t[request] = i; // Met le nom du pays ou de l'entreprise dans le tableau
        t["count"] = res[i]; // Met le nombres d'occurence dans le tableau
        arrRes.push(t); // On ajoute le tableau dans la variable arrRes (qui l'affichera plus tard)
    }
}

/**
 * Affichage des données
 */
function printData(){
    arrRes.sort((a, b) => b.count - a.count) // On trie de manière décroissante
    console.log(arrRes) // Affichage du tableau
} 

/**
 * Fonction principale
 */
function main(){
    let choice = printMenu();
    if(choice === 1){ // Si entrée est country
        getData('country');
    }
    
    else if(choice === 2){ // Si entrée est company
        getData('company');
    }

    else if(choice === 3){} // Si entrée est quitter
    
    printData();
}

main();

