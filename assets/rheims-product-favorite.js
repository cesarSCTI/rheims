class RheimsProductFavorite extends HTMLElement {
  connectedCallback() {
    this.button = this.querySelector('button');
    if (!this.button) return;
    this.key = `rheims:favorite:${this.dataset.productId}`;
    try {
      this.button.setAttribute('aria-pressed', String(localStorage.getItem(this.key) === 'true'));
      this.button.hidden = false;
    } catch { return; }
    this.button.addEventListener('click', this.toggle);
  }
  disconnectedCallback() { this.button?.removeEventListener('click', this.toggle); }
  toggle = () => {
    const saved = this.button.getAttribute('aria-pressed') !== 'true';
    try {
      if (saved) localStorage.setItem(this.key, 'true');
      else localStorage.removeItem(this.key);
      this.button.setAttribute('aria-pressed', String(saved));
    } catch { /* Keep the previous state if storage is unavailable. */ }
  };
}
if (!customElements.get('rheims-product-favorite')) customElements.define('rheims-product-favorite', RheimsProductFavorite);
