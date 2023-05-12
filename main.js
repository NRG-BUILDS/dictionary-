/*search = () => { 
    let wordInput = document.getElementById('search').value;
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`)
    .then(response => response.json())
    .then(data => showData(data))
    .catch(err => showError(err))
    
}*/
async function search() {
    let wordInput = document.getElementById('search').value;
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    showData(data)
  } catch (error) {
    showError(error);
  }
}

showData = (data) => { 
    console.log(data);
    document.getElementById('title').innerHTML = data[0].word;
    document.querySelector('.welcome').style.display = "none";
    document.getElementById('wordAudio').src = data[0].phonetics[0].audio;
    document.querySelector('.playWord').style.display = "block"
    if (data[0].phonetic != undefined) { 
        document.getElementById('phonetic').innerHTML = data[0].phonetic
    }
    
    const contentContainer = document.querySelector('.wordContentContainer');
    let text = ''
    for (let i = 0; i < data[0].meanings.length; i++) { 
        text += `<span class="partOfSpeech header-sm">${data[0].meanings[i].partOfSpeech}</span>
           <hr>
           <span class="light">Meaning</span>
           <ul>
               ${getMeanings(data[0].meanings[i].definitions)}
           </ul>
           <p>${getSynonyms(data[0]. meanings[i].synonyms)}</p>`
    }
    contentContainer.innerHTML = text;
    for (i of data[0].meanings) { 
        createSynLinks(i.synonyms.length)
    }
}

getMeanings = (def) => { 
    let text = "";
    for (i = 0; i < def.length; i++) { 
        text += `<li>${def[i]. definition}</li>`
    }
    return text
}
getSynonyms = (syn) => { 
    let text = '';
    if (syn.length === 0) {
        return text
    } else { 
        text += `Synonyms:  `
        for (i = 0; i < syn.length; i++) { 
            text += `<a href='javascript:void(0)' class='synonym link'>${syn[i]}</a>  `
        }
        return text
    }
}

function createSynLinks(numOfSyn) { 
    let synBtn = document.querySelectorAll('.synonym')
    for (let i = 0; i < numOfSyn; i++) { 
        synBtn[i].addEventListener('click', function() { 
            let word = synBtn[i].innerHTML
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => showData(data))
        })
    }
    
    
    
}

switchTheme = () =>  { 
    document.body.classList.toggle('darkmode');
}
playWord = () => { 
    document.getElementById('wordAudio').play()
}
showError = (err) => { 
    const contentContainer = document.querySelector('.wordContentContainer');
    errText = `<div class='errMessage'>
                    <h1>${err}</h1>
                        <p class='light'>Sorry pal, we couldn't find what you were looking for. Please check the spelling and try again or search the <a class='link' href='www.google.com'>web.</a></p></div>`
    contentContainer.innerHTML = errText;
}
const fontPick = () => {
    let switcher = document.querySelector('.fontPicker');
    let font = document.querySelector('.allContent')
    console.log(switcher.value)
    if (switcher.value == 'serif') {
        font.style.fontFamily = "'Times New Roman', Times, serif"
    } else {
        font.style.fontFamily = "'Arial', sans-serif"
    }
}