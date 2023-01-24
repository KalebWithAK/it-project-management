const url = "json/articles.json"
let articles = []



const all_articles = document.querySelector("div.all-articles")
const homepage = document.querySelector("span.homepage-flag") // only add previews on homepage

const form = document.querySelector("form")
const search_input = document.querySelector("input.search")

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
      appendPreview(article, all_articles)
    })
  }
})

function appendPreview(article, container) {
  const section = document.createElement("section")
  section.className = "article-preview"

  section.innerHTML = `
    <h3>${article.title}</h3>
    <img src="./images/${article.img}">
    <p>${article.content}</p>
    <a href="${article.url}" target="_blank">Read more</a>
    <p>Author: ${article.author}</p>
  </section>
  `

  container.append(section)
}

function searchArticles(search_string, articles) {
  let results = []

  // search titles
  results = articles.filter(article => article.title.toLowerCase().includes(search_string))

  // search content
  if (!results.length) {
    results = articles.filter(article => article.content.toLowerCase().includes(search_string))
  }
  
  console.log({ search_string, results })

  // display results or no results found
  const h3 = document.querySelector("h3.search-results")
  const container = document.querySelector("div.search-results")
  container.innerHTML = ''

  if (results.length) {
    h3.textContent = `Articles related to "${search_string}"`
    results.forEach(article => appendPreview(article, container))
  }
  else {
    h3.textContent = `No articles found related to "${search_string}". Please check your spelling and try again.`
  }
}