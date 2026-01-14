<div id="language-switcher">
  <a data-url="/fr/">Français</a> |
  <a data-url="/en/">English</a>
</div>

<script>
  document.querySelectorAll('#language-switcher a').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.dataset.url;
      window.location.href = url;
    });
  });
</script>


