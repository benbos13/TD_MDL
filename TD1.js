const fs = require('fs'); // Charge le module fs afin de pouvoir lire par la suite
let rawdata = fs.readFileSync('users.json'); // On lit de manière synchrone c'est-à-dire que l'éxécution du programme est suspendu pendant la lecture du fichier
var user = JSON.parse(rawdata) // Converti la chaine de caractère "rawdata" en objet "user"

let res = {}
let arrRes = []

const input = process.argv[2] //permet de récupérer l'entrée donné en paramètre dans le terminal

function getData(demande) {
    console.log(demande);
    for (i = 0; i < user.length; i++) { 
        var index = user[i][demande] // On récupère le nom du pays ou de l'entreprise
        if (!res[index]) { // Si l'index (nom du pays ou de l'entreprise) n'appartient pas à res,
            res[index] = 1 // On définit l'indice à 1
        }
        else
            res[index]++//on incrémente
    }

    for (let i in res) { // On parcours res
        let t =  {};
        t[demande] = i;
        t["count"] = res[i];
        arrRes.push(t);//on ajoute à arrRes  le pays et son nombre d'occurence
    }
}

if(input === 'country'){ // Si entrée est country, on exécute le code suivant
    getData(input);
}

if(input === 'company'){ //si entrée est company, on exécutele code suivant
    for (i = 0; i < user.length; i++) {
        var nomCompanie = user[i].company//on récupère le nom de la compagnie
        if (!res[nomCompanie]) { //si nomPays n'appartient pas à res,
            res[nomCompanie] = 1//on définit l'indice du pays à 1
        }
        else//sinon
            res[nomCompanie]++//on incrémente
    }


    for (let i in res) {//on parcours
        arrRes.push({ "company": i, "count": res[i] })//on ajoute à arrRes  la compagnie et son nombre d'occurence
    }
}


arrRes.sort((a, b) => b.count - a.count) // On trie de manière décroissante
console.log(arrRes) // Affichage du tableau 