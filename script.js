
const inputEl = document.querySelector('.input')
const infoText = document.querySelector('.info-text')
const meaningContainer = document.querySelector('.meaning-container')
const titleEl = document.querySelector('.title')
const meaningEl = document.querySelector('.meaning')
const audioEl = document.querySelector('#audio')
const btnEl = document.querySelector('.btn')


async function fetchAPI(word) {

    meaningContainer.style.display = 'none'

    try {
        infoText.style.display = 'block';
        meaningContainer.style.display = 'none'

        infoText.innerHTML = `Searching for meaning of the word ${word}`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json())
        if (result.title) {
            meaningContainer.style.display = 'block'
            infoText.style.display = 'none'
            titleEl.innerText = word
            meaningEl.innerText = 'N/A'
            audioEl.style.display = 'none'
        } else {
            infoText.style.display = 'none'
            meaningContainer.style.display = 'block'
            audioEl.style.display = 'inline-flex'
            titleEl.innerText = word
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition
            audioEl.src = result[0].phonetics[1].audio
        }
    } catch (error) {
        console.log('error, cannot fetch')
    }


}


btnEl.addEventListener('click', (event) => {
    fetchAPI(inputEl.value)
}) 