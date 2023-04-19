
let articles = []


const all_articles = document.querySelector("div.all-articles")
const homepage = document.querySelector("span.homepage-flag") // only add cards on homepage

const url = homepage ? "json/articles.json" : "../json/articles.json"

const form = document.querySelector("form")
const search_input = document.querySelector("input.search")

const button_close_search = document.querySelector('button.close-search-results')
button_close_search.addEventListener("click", (e => closeSearchResults(e)))
button_close_search.classList.add('hidden')

//DARK MODE
const toggleSwitch = document.getElementById("toggle-switch");

const divs = document.querySelector('div');

toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    document.body.className = 'dark';
    if (homepage) {
      document.querySelector('.article-card').classList.add('dark');
    }
  } else {
    document.body.className = '';
    if (homepage) {
      document.querySelector('.article-card').classList.remove('dark');
    }
  }
});

form.onsubmit = (e) => {
  e.preventDefault() // don't reload page

  searchArticles(search_input.value, articles)
}


// load article data from json
fetch(url)
  .then(res => res.json())
  .then(data => {
    articles = data

    if (homepage) {
      all_articles.innerHTML = ''
      articles.forEach(article => {
        appendCard(article, all_articles)
      })
    }
  })

function appendCard(article, container) {
  const card = document.createElement("div")
  card.className = "article-card"

  if (!article.url) {
    card.innerHTML = '<div></div>'
  } 
  else {
    card.innerHTML = `
      <a href="${article.url}">
        <img src="${homepage ? './' : '../'}images/${article.img}">
        <h3>${article.title}</h3>
        <p class="author">By: ${article.author}</p>
      </a>
    `
  }

  // TODO: User can navigate to homepage and dropdown menu to any article based on category

  container.append(card)
}

function searchArticles(search_string, articles) {
  let results = []

  // search titles
  results = articles.filter(article => article.title.toLowerCase().includes(search_string))

  // search content
  if (!results.length) {
    results = articles.filter(article => article.content.toLowerCase().includes(search_string))
  }

  // display results or no results found
  const h3 = document.querySelector("h3.search-results")
  const container = document.querySelector("div.search-results")
  container.innerHTML = ''

  button_close_search.classList.remove('hidden')
  if (results.length) {
    h3.textContent = `Articles related to "${search_string}"`
    results.forEach(article => appendCard(article, container))
  }
  else {
    h3.textContent = `No articles found related to "${search_string}". Please check your spelling and try again.`
  }
}

function closeSearchResults(e) {
  e.preventDefault()
  button_close_search.classList.add('hidden')

  const h3 = document.querySelector("h3.search-results")
  const container = document.querySelector("div.search-results")

  h3.textContent = ''
  container.innerHTML = ''
}