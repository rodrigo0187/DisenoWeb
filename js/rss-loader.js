// rss-loader.js

// URL del feed RSS (IGN All News como ejemplo)
const RSS_URL = "https://feeds.ign.com/ign/all";

// Proxy para evitar problemas de CORS
const PROXY1 = "https://api.allorigins.win/get?url=";

async function loadRSS() {
  try {
    // Petición al feed usando proxy
    const response = await fetch(PROXY1 + encodeURIComponent(RSS_URL));
    const data = await response.json();

    // Parsear el XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "application/xml");

    // Seleccionar items (noticias)
    const items = xml.querySelectorAll("item");
    const newsContainer = document.getElementById("news-container");

    // Limpiar contenido previo (si hubiera)
    newsContainer.innerHTML = "";

    let count = 0;
    items.forEach(item => {
      if (count >= 6) return; // limitar a 6 noticias

      const title = item.querySelector("title")?.textContent || "Sin título";
      const link = item.querySelector("link")?.textContent || "#";
      const description = item.querySelector("description")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const source = item.querySelector("source")?.textContent || "Fuente externa";

      // Formatear fecha (opcional)
      const dateObj = pubDate ? new Date(pubDate) : null;
      const dateFormatted = dateObj
        ? dateObj.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
        : "Fecha desconocida";

      // Crear artículo
      const article = document.createElement("article");
      article.classList.add("news-item", "mb-4", "p-3", "border", "rounded");

      article.innerHTML = `
        <h2 class="h5">
          <a href="${link}" class="news-link" target="_blank" rel="noopener noreferrer">${title}</a>
        </h2>
        <p class="meta text-muted small">
          Publicado: <time datetime="${pubDate}">${dateFormatted}</time> • Fuente: <span class="source">${source}</span>
        </p>
        <p class="excerpt">${description.substring(0, 150)}...</p>
        <a href="${link}" target="_blank" rel="noopener noreferrer" class="read-more">Leer más →</a>
      `;

      newsContainer.appendChild(article);
      count++;
    });

  } catch (error) {
    console.error("Error cargando el feed RSS:", error);

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = `<p class="text-danger">No se pudieron cargar las noticias en este momento.</p>`;
  }
}

// Ejecutar al cargar
loadRSS();

// rss-loader.js

// Lista de feeds gamer (puedes agregar o quitar)
const RSS_FEEDS = [
  "https://feeds.ign.com/ign/all",              // IGN - Noticias generales
  "https://www.levelup.com/rss/news",           // LevelUp - Noticias de videojuegos
  "https://kotaku.com/rss",                     // Kotaku
  "https://www.3djuegos.com/feeds/rss",         // 3DJuegos
  "https://www.eurogamer.net/feed"              // Eurogamer
];

const PROXY = "https://api.allorigins.win/get?url=";

// Función principal
async function loadMultipleRSS() {
  const allItems = [];

  // 1. Recorrer todos los feeds
  for (const url of RSS_FEEDS) {
    try {
      const response = await fetch(PROXY + encodeURIComponent(url));
      const data = await response.json();

      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "application/xml");
      const items = xml.querySelectorAll("item");

      items.forEach(item => {
        const title = item.querySelector("title")?.textContent || "Sin título";
        const link = item.querySelector("link")?.textContent || "#";
        const description = item.querySelector("description")?.textContent || "";
        const pubDate = item.querySelector("pubDate")?.textContent || "";
        const source = (new URL(url)).hostname.replace("www.", "");

        const dateObj = pubDate ? new Date(pubDate) : null;

        allItems.push({
          title,
          link,
          description,
          pubDate,
          date: dateObj ? dateObj.getTime() : 0, // timestamp para ordenar
          source
        });
      });

    } catch (error) {
      console.error("Error cargando feed:", url, error);
    }
  }

  // 2. Ordenar noticias por fecha descendente (más recientes primero)
  allItems.sort((a, b) => b.date - a.date);

  // 3. Insertar en el HTML
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  allItems.slice(0, 10).forEach(item => {
    const dateFormatted = item.pubDate
      ? new Date(item.pubDate).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
      : "Fecha desconocida";

    const article = document.createElement("article");
    article.classList.add("news-item", "mb-4", "p-3", "border", "rounded");

    article.innerHTML = `
      <h2 class="h5">
        <a href="${item.link}" class="news-link" target="_blank" rel="noopener noreferrer">${item.title}</a>
      </h2>
      <p class="meta text-muted small">
        Publicado: <time datetime="${item.pubDate}">${dateFormatted}</time> • Fuente: <span class="source">${item.source}</span>
      </p>
      <p class="excerpt">${item.description.substring(0, 150)}...</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="read-more">Leer más →</a>
    `;

    newsContainer.appendChild(article);
  });
}

// Ejecutar al cargar
loadMultipleRSS();

