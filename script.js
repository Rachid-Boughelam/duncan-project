// Liste des jours à exclure (format ISO)
const joursExclus = [
    "2025-05-16",
    "2025-05-30",
    "2025-06-13"
];

// Affiche la date du jour (facultatif si tu veux la réintégrer quelque part)
function afficherDateDuJour() {
    const aujourdHui = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    console.log(`Aujourd'hui : ${aujourdHui.toLocaleDateString('fr-FR', options)}`);
}

// Compte à rebours classique (jours, heures, minutes, secondes)
function afficherCompteARebours() {
    const aujourdHui = new Date();
    const dateFin = new Date('2025-06-20T00:00:00');
    const diffTemps = dateFin - aujourdHui;

    if (diffTemps <= 0) {
        document.getElementById('compte-a-rebours').textContent = 'Le compte à rebours est terminé ! 🎉';
    } else {
        const jours = Math.floor(diffTemps / (1000 * 60 * 60 * 24));
        const heures = Math.floor((diffTemps % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTemps % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((diffTemps % (1000 * 60)) / 1000);

        document.getElementById('compte-a-rebours').textContent =
            `Il reste ${jours} jours, ${heures} heures, ${minutes} minutes et ${secondes} secondes avant le 20 juin 2025.`;
    }
}

// Compte à rebours en jours ouvrés (hors week-ends et jours exclus)
function afficherCompteAReboursOuvres() {
    const aujourdHui = new Date();
    const dateFin = new Date('2025-06-20');
    let joursOuvres = 0;
    let date = new Date(aujourdHui);

    while (date <= dateFin) {
        const jourSemaine = date.getDay(); // 0 = dimanche, 6 = samedi
        const dateISO = date.toISOString().split('T')[0];
        const estJourOuvre = jourSemaine >= 1 && jourSemaine <= 5;
        const estJourExclu = joursExclus.includes(dateISO);

        if (estJourOuvre && !estJourExclu) {
            joursOuvres++;
        }

        date.setDate(date.getDate() + 1);
    }

        document.getElementById('compte-a-rebours-ouvres-pour-enfants').textContent =
        `Temps restant avant que l'année scolaire soit finie : ${joursOuvres} jours d'école avant le 20 juin 2025.`;
}



// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    afficherDateDuJour();
    afficherCompteARebours();
    afficherCompteAReboursOuvres();
    setInterval(afficherCompteARebours, 1000);
});
