// get quotes from API
let apiData = [];
let isAPI = true;
let debugMode = true;
const quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById('quotes');
let authorText = document.getElementById('authors');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


//show new quote
function apiQuote(){
    // pick a random quote from api array
    const quote = apiData[Math.floor(Math.random() * apiData.length)];
    if(debugMode){
        console.log(quote.text);
        console.log(quote.author)
    }
    // check for an author or is the author Unknown
    if(!quote.author) {
        authorText.textContent = "Unknown";
    } else{
        authorText.textContent = quote.author;
    }
    //check quote length to Determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //draw quotes
    quoteText.textContent = quote.text;

}

//Tweet the quote
function tweet(){
    const twitterAPI = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterAPI, '_blank')
}



function backupQuote(){
    const bQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    if(debugMode){
        console.log(bQuote.text);
        console.log(bQuote.author)
    }

    if(!bQuote.author)
    {
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = bQuote.author;
    }


    quoteText.textContent = bQuote.text;
}

function setQuoteType(){

    if(isAPI){
        apiQuote();
        if(debugMode){
            console.log(isAPI)
        }
    }
    else{
        backupQuote();
        if(debugMode){
            console.log(isAPI)
        }
    }

}

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';

    try{
       const response = await fetch(apiUrl);
        apiData = await response.json();
        isAPI = true;
        setQuoteType();
    }
    catch (error) {
        // handle error
        isAPI = false;
        setQuoteType();
        if(debugMode){
            alert(error + isAPI.toString());
        }


    }
}


// Event Listener
newQuoteBtn.addEventListener('click', setQuoteType);
twitterBtn.addEventListener('click',tweet)


//on Load
getQuotes();
