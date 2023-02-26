export default function (container) {
  container.innerHTML = `
    <h1>Acorta tus enlaces</h1>
    <form class="shorten-form">
      <div>
        <input
          placeholder="facebook.net/749247892"
          id="shorten-entry"
          required
          autocomplete="off"
        />
      </div>
      <button>Acortarlo</button>
    </form>
  `
}