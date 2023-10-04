class Personne {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

const x = () =>{
  console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
}

// Utilisation de la classe Personne
const personne1 = new Personne("Alice", 30);
const personne2 = new Personne("Bob", 25);

personne1.direBonjour(); // Affiche : Bonjour, je m'appelle Alice et j'ai 30 ans.
personne2.direBonjour(); // Affiche : Bonjour, je m'appelle Bob et j'ai 25 ans.

function c(wer) {
  wer();
}

c( personne1.direBonjour); // Affiche : Bonjour, je m'appelle Alice et j'ai 

