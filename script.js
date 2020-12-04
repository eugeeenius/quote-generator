const $quote = document.getElementById('quote')
const $author = document.getElementById('author')
const $container = document.getElementById('quote-container')
const nextBtn = document.getElementById('next')
const twitterBtn = document.getElementById('twitter')
const loader = document.getElementById('loader')
let quotes = []

async function getQuote() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    quotes = await response.json()  
    const randomQuote = randomize(quotes)
    
    $quote.innerText = randomQuote.text
    $author.innerText = randomQuote.author || 'Unknown'

    completed()
  } catch(error) {
    console.log(error)
  }
}

function randomize(arr) {
  const quote = arr[Math.floor(Math.random() * arr.length)]
  return quote
}

function loading() {
  loader.classList.remove('hidden')
  $container.hidden = true
}

function completed() {
  if(!loader.hidden) {
    loader.classList.add('hidden')
    $container.hidden = false
  }
}

function postOnTweeter() {
  const quote = $quote.innerText
  const author = $author.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')
}

twitterBtn.addEventListener('click', postOnTweeter)
nextBtn.addEventListener('click', getQuote)

getQuote()