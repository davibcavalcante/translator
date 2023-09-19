const replaceBtn = document.querySelector('#replace-btn')
const selFrom = document.querySelector('#language-from')
const selTo = document.querySelector('#language-to')

const textFrom = document.querySelector('#text-from')
const textTo = document.querySelector('#translation')
const translateBtn = document.querySelector('#translate-btn')

const copyBtn = document.querySelector('#copy-btn')

translateBtn.addEventListener('click', () => {
    translate(textFrom, textTo)
})

selFrom.addEventListener('change', () => {
    translate(textFrom, textTo)
})

selTo.addEventListener('change', () => {
    translate(textFrom, textTo)
})

replaceBtn.addEventListener('click', () => {
    let fromValue = selFrom.value
    let toValue = selTo.value
    setTimeout(() => {
        selFrom.value = toValue
        selTo.value = fromValue
        fromValue = null
        toValue = null
        translate(textFrom, textTo) 
    }, 1)
})

copyBtn.addEventListener('click', () => {
    const textRange = document.createRange()
    textRange.selectNode(textTo)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(textRange)

    document.execCommand('copy')

    selection.removeAllRanges()
})

async function translate(from,  to) {
    const request = await fetch(`https://api.mymemory.translated.net/get?q=${from.value}&langpair=${selFrom.value}|${selTo.value}`)
    
    const requestConverted = await request.json()
    const textTranslation = await requestConverted.responseData.translatedText
    
    if (requestConverted.responseStatus === 200) {
        to.innerText = textTranslation
    } else {
        to.innerText = 'Translation'
    }
}