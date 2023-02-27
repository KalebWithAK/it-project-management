const url = "json/articles.json"
let articles = []

const all_articles = document.querySelector("div.all-articles")
const homepage = document.querySelector("span.homepage-flag") // only add cards on homepage

const form = document.querySelector("form")
const search_input = document.querySelector("input.search")

const button_close_search = document.querySelector('button.close-search-results')
button_close_search.addEventListener("click", (e => closeSearchResults(e)))
button_close_search.classList.add('hidden')

form.onsubmit = (e) => {
  e.preventDefault() // don't reload page

  searchArticles(search_input.value, articles)
}


// load article data from json
fetch(url)
.then(res => res.json())
.then(data => {
  articles = data

  all_articles.innerHTML = ''

  if (homepage) {
    articles.forEach(article => {
      appendCard(article, all_articles)
    })
  }
})

function appendCard(article, container) {
  const card = document.createElement("a")
  card.setAttribute(href, article.url)
  card.className = "article-card"

  card.innerHTML = `
    <img src="./images/${article.img}">
    <h3>${article.title}</h3>
    <p class="author">By: ${article.author}</p>
  `

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
  const h2 = document.querySelector("h2.search-results")
  const container = document.querySelector("div.search-results")
  container.innerHTML = ''

  if (results.length) {
    h2.textContent = `Articles related to "${search_string}"`
    results.forEach(article => appendCard(article, container))
    button_close_search.classList.remove('hidden')
  }
  else {
    h3.textContent = `No articles found related to "${search_string}". Please check your spelling and try again.`
  }
}

function closeSearchResults(e) {
  e.preventDefault()
  button_close_search.classList.add('hidden')

  const h2 = document.querySelector("h2.search-results")
  const container = document.querySelector("div.search-results")

  h2.textContent = ''
  container.innerHTML = ''
}