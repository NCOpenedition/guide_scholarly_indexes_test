<div id="language-switcher" align="left">
  🌐 
  <span style="cursor:pointer; text-decoration:underline;" data-url="{{ book.basePath }}/fr/">Français</span> | 
  <span style="cursor:pointer; text-decoration:underline;" data-url="{{ book.basePath }}/en/">English</span>
</div>

<script>
  document.querySelectorAll('#language-switcher [data-url]').forEach(function(el) {
    el.addEventListener('click', function() {
      const url = el.getAttribute('data-url');
      if(url){
        window.location.href = url;
      }
    });
  });
</script>


