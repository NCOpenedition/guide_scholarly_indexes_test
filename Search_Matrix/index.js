async function chargerDonnees() {
  const response = await fetch("data.json");
  const donnees = await response.json();

  const disciplineSelect = document.getElementById("discipline");
  const anneeSelect = document.getElementById("annee");
  const rechercheInput = document.getElementById("recherche");
  const resultats = document.getElementById("resultats");

  function afficherResultats() {
    const filtreDiscipline = disciplineSelect.value;
    const filtreAnnee = anneeSelect.value;
    const filtreTexte = rechercheInput.value.toLowerCase();

    resultats.innerHTML = "";

    donnees
      .filter(d => !filtreDiscipline || d.discipline === filtreDiscipline)
      .filter(d => !filtreAnnee || d.annee.toString() === filtreAnnee)
      .filter(d =>
        d.titre.toLowerCase().includes(filtreTexte) ||
        d.auteurs.some(a => a.toLowerCase().includes(filtreTexte))
      )
      .forEach(d => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${d.titre}</strong> (${d.annee})<br>
          <em>${d.auteurs.join(", ")}</em><br>
          <span>${d.discipline}</span><br>
          <a href="${d.lien}" target="_blank">Lien vers l'article</a>
        `;
        resultats.appendChild(li);
      });
  }

  disciplineSelect.addEventListener("change", afficherResultats);
  anneeSelect.addEventListener("change", afficherResultats);
  rechercheInput.addEventListener("input", afficherResultats);

  afficherResultats();
}

chargerDonnees();
