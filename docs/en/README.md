<div style="text-align: right; margin-bottom: 1em;">
  <label for="lang-select" style="font-weight:bold; margin-right:0.5em;">🌐 Langue :</label>
  <select id="lang-select" onchange="switchLanguage(this.value)">
    <option value="">-- Choisir --</option>
    <option value="{{ book.basePath }}/fr/">Français</option>
    <option value="{{ book.basePath }}/en/">English</option>
    <option value="{{ book.basePath }}/">Accueil</option>
  </select>
</div>

<script>
function switchLanguage(url) {
  if(url) {
    window.location.href = url;
  }
}
</script>

