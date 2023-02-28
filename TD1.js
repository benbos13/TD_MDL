const fs = require('fs');
let rawdata = fs.readFileSync('users.json');//on lit de manière asynchrone le fichier users.json
//(lire de manière synchrone peut peut-être fonctionner aussi)

let user = JSON.parse(rawdata)//crée un objet contenant les lignes lues (je suppose)

let res = {}
let arrRes = []


const input = process.argv[2] //permet de récupérer l'entrée donné en paramètre dans le terminal

if(input === 'country'){ //si entrée est country, on exécute le code suivant

    for (i = 0; i < user.length; i++) {
        var nomPays = user[i].country//on récupère le nom du pays
        if (!res[nomPays]) { //si nomPays n'appartient pas à res,
            res[nomPays] = 1//on définit l'indice du pays à 1
        }
        else//sinon
            res[nomPays]++//on incrémente
    }


    for (let i in res) {//on parcours res
        arrRes.push({ "country": i, "count": res[i] })//on ajoute à arrRes  le pays et son nombre d'occurence
    }
}

if(input === 'company'){//si entrée est company, on exécutele code suivant
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


arrRes.sort((a, b) => b.count - a.count) //on trie de manière décroissante
console.log(arrRes) //on affiche le tableau