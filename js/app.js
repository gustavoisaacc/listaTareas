//variables
const formulario = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let tweets = [];

//addeventListener
eventListeners();
function eventListeners (){
  clearTweets();
  //agregando tweets
  formulario.addEventListener('submit', agregarTweets);

  //cuando el dom este listo
  document.addEventListener('DOMContentLoaded', ()=>{
    tweets = JSON.parse(localStorage.getItem('tweet')) || [];
   
    printTweets()
  })
}

//funciones
function agregarTweets (e){
  clearTweets();
  e.preventDefault();
  const tweet = document.querySelector('#tweet').value;
  if(tweet === ''){
    messageError('Ingresar mensaje');
    return; //evita que siga ejecutando la linea de codigo
  }
  const tweetObj = {
    id: Date.now(),
    tweet
  }

  tweets = [...tweets, tweetObj]
  printTweets();

  //reiniciar el formulario
  formulario.reset();
}

function messageError (mensaje){
  const error = document.createElement('div');
  error.classList.add('error', 'alerta');
  error.textContent = mensaje;

  listTweets.appendChild(error)
}

function printTweets (){
  if(tweets.length > 0){
    
    tweets.forEach( (tweet)=>{
      
      const btnDelete = document.createElement('a');
      btnDelete.classList.add('borrar-tweet');
      btnDelete.innerText = 'X';
      btnDelete.onclick = ()=> {
        borrarTweets(tweet.id)
      }

      const ul = document.createElement('li');
      ul.textContent = `${tweet.tweet}`;

      ul.appendChild(btnDelete);
      listTweets.appendChild(ul);
    })
  }

  sincronizarStorage();
}

function sincronizarStorage (){
  localStorage.setItem('tweet', JSON.stringify(tweets))
}

function borrarTweets (id){
  clearTweets();
  tweets = tweets.filter( tweet => tweet.id !== id)
  console.log(tweets)
  printTweets()
}


function clearTweets(){
  //forma lenda de limpiar el html
  // contentCarrito.innerHTML = '';

  while(listTweets.firstChild){
    listTweets.removeChild(listTweets.firstChild)
  }
 
}
