async function chargerDonnees() {
  try {
  // collect data 
  const response = await fetch("data.json");
  if (!response.ok) throw new Error("Error JSON file can't be load");
  const donnees = await response.json();

const filtres = {
      free_user: { el: document.getElementById("free_user"), key: "access", value: "free_end_user" },
      free_publisher: { el: document.getElementById("free_publisher"), key: "access", value: "free_publisher" },
      multidisciplinary: { el: document.getElementById("multidisciplinary"), key: "scope", value: "multidisciplinary" },
      ssh: { el: document.getElementById("ssh"), key: "scope", value: "ssh" },
      stm: { el: document.getElementById("stm"), key: "scope", value: "stm" }
  };

  console.log(filtres);

  const resultats = document.getElementById("resultats");

    function filtrerDonnees() {
      return donnees.filter(d =>
        Object.values(filtres).every(f =>
          !f.el.checked || d[f.key].includes(f.value)
        )
      );
    }

    function afficherResultats() {
      // On vide les résultats sans relancer de reflow inutile
      resultats.innerHTML = "";

      // On récupère les données filtrées
      const donnesFiltrees = filtrerDonnees();

      // Cas "aucun résultat"
      if (donnesFiltrees.length === 0) {
        resultats.innerHTML = "<li>No indexes found</li>";
        return;
      }

      // On utilise un fragment pour limiter les réinsertions dans le DOM
      const fragment = document.createDocumentFragment();

      donnesFiltrees.forEach(d => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${d.titre}</strong><br>
          <span>Access: ${d.access}</span><br>
          <span>Scope: ${d.scope}</span><br>
          <a href="${d.lienGit}" target="_blank">Index Github link</a><br>
          <a href="${d.lien}" target="_blank">Index website link</a>
        `;
        fragment.appendChild(li);
      });

      // Insertion en une seule opération → bien plus rapide si beaucoup d’éléments
      resultats.appendChild(fragment);
    }

    // Ajout des listeners dynamiquement
    Object.values(filtres).forEach(f => f.el.addEventListener("change", afficherResultats));

    // Premier affichage
    afficherResultats();

  } catch (error) {
    console.error("Erreur :", error);
    document.getElementById("resultats").innerHTML = `<li style="color:red;">Impossible de charger les données.</li>`;
  }
}

// lancement du script
chargerDonnees();

// generate_accordion_item(id, title, desc){

// }