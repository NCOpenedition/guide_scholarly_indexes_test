<div align="left">
  🌐 
  <a href="{{ book.basePath }}/fr/" onclick="switchLanguage('{{ book.basePath }}/fr/'); return false;">Français</a> | 
  <a href="{{ book.basePath }}/en/" onclick="switchLanguage('{{ book.basePath }}/en/'); return false;">English</a>
</div>

<script>
  function switchLanguage(url){
    if(url){
      window.location.href = url;
    }
  }
</script>
