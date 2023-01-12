const randomWord = ()=>{
    return fetch('https://random-word-api.herokuapp.com/word?number=1') //fetching from the api that generate random word every time
    .then(res=>res.json()) // turning the result of fetching to json  
}
randomWord().then(x) // I told the brwoser here to wait until the fetching is done then invok the function
let words; //a variable to store the random word 
let letterarr;  // a variable to store array for the letters of the random word   
let livesnum = 5; // this is the number of lives when the game will start
function x(random){    // this is the main function
  words = random.toString();       // here I turned the result of fetching to be string
  console.log(words)
  letterarr = words.split('')    // here I made an array of the letters of the string that we got frome the fetching
  console.log(letterarr)     
  // here I applayed forEach method on the array of letters
  letterarr.forEach((letter,index)=>{       
    let input = document.createElement('div')      // this line to create an element for each letter in the array so if we have word of 5 letters it will make 5 divs
    input.setAttribute('id',`letter-${letter}`)     // giving an Id to each element we create(the id will be letter-(the letter in the array))
    input.classList.add('boxes')                  // giving a class for each div I create so we can design easly in the css
    input.innerHTML = `<span id =${index}>_ </span>`       //creating to hold the space that will be letter then and give it an Id of the index 
    document.getElementById('holder').appendChild(input)  // appending the dives we create to the main div which called holder(check the html to understand better)
  })
  //after I finished of creating the elements that I will use now I will start working on making events to the letter buttons so if the user clicked the right letter it will appear in the blanks we made for before(spans)
  let spans = document.querySelectorAll('.boxes span') // getting all the spans that will hold the letters of the word 
  document.addEventListener('click',e=>{     // this event Listener for all the buttons
    e.preventDefault();  
    if(e.target.className === 'letter-btn'){   // this if statmente to make the event listen for the letters buttons only
       let status = false     // this variable for check if the letter is true or false(this one will help us on setting the lives and drawing the hangman if the letter is false )
        e.target.classList.add('clicked') // adding new class for the buttons that we clicked so we can design them after the clicking
        let clickedLetter = e.target.value  //getting the value of the clicked letter which is the letter it self
        letterarr.forEach((letter,letterIndex) => {   // looping in the array of the random word letters to see if the clicked letter is in the word or not
        
          if(clickedLetter==letter){          //checking if the clicked letter equal any letter of the array
           let sound1=document.getElementById('sound1')
           sound1.play()                      //playing the sound when the letter is in the word
           status =true;                      //so if the letter user click is right no lives will be descreased
           spans.forEach((span,spanIndex)=>{   // if the statment is true I will loop on the array of spans to change the inner text of the span
             if(spanIndex === letterIndex){    // when the place of the span equal the place of the letter
               span.innerHTML = clickedLetter  // change this span inner text to be the letter it self
              }
            })
          } 
        });
       if(status === false){ livesnum--;       // each time the  user clicking the false letter then the statuse will be fauls and the lives number will be descreased by 1
         let sound2=document.getElementById('sound2')
         sound2.play()                  // the sound2 will be played when the letter user clicked is false
         if(livesnum>4){lives.innerText = `You Have ${livesnum} lives`}  
         else  if(livesnum===4){lives.innerText = `You Have ${livesnum} lives`, img.innerHTML = `<img id="img2" src="images/the stand.png" alt="hanging stand">`} // for first mistake show me the first picture 
         else  if(livesnum===3){lives.innerText = `You Have ${livesnum} lives`, img.innerHTML = `<img id="img2" src="images/the head.png" alt="hanging stand">`} // for second mistake show me the second picture
         else  if(livesnum===2){lives.innerText = `You Have ${livesnum} lives`, img.innerHTML = `<img id="img2" src="images/the hand.png" alt="hanging stand">`} // for third mistake show me the third picture
         else if(livesnum === 1){lives.innerText = `This is your last chance`, img.innerHTML = `<img id="img2" src="images/the legs.png" alt="hanging stand">`}  // for forth mistake show me the forth picture
         else if(livesnum < 1){lives.innerHTML = `Game over<br>good luck next time ♥`,   //if the lives number is smaller than 1 this meane that the game is over and all the letter-btn will not work any more
          img.innerHTML = `<img id="img2" src="images/lastphase.png" alt="hanging stand">`, //showing the last image
          btns = document.querySelectorAll('.letter-btn'),btns.forEach(btn=>btn.classList.add('clicked'))}  //when the game is over deleting all the letter buttons so the player can't play anymore
        };
        
        
      }
  })
  
  let lives = document.createElement('p')  //creating the paragraph of counting lives
  document.getElementById('counter').appendChild(lives)  // adding the paragraph to the counter div
  lives.innerText = `You Have 5 lives`   //assigning the default massege for the counting lives

  let img = document.getElementById('img-container') //calling the images countainer
  
  let rest = document.getElementById('reset')   // calling the play again button
  rest.addEventListener('click',e=>{          // setting event listener to the button
    e.preventDefault()
    let x =document.querySelectorAll('.letter-btn');  //calling all the letter buttons
    x.forEach(ele=>{
      ele.classList.remove('clicked')            //deleting all the clicked class name that we add before so the player can press the buttons again
    }) ;
    img.innerHTML = '' ;                        //the img element will be empty again
    livesnum=5 ;                               // the lives number will be 5 again 
    lives.innerText = `You Have 5 lives`;      // the massege that will show on the page
    spans.forEach(span=>{                      // the spans that we had before will be empty again
      span.innerText = '_'
    });   
  });
  
   
}






function createWelcomePage(){                      //this function is to create new page which I called it the welcome page
  let welcomePage = document.createElement('div')   //creating new div  
  let welcome = document.createElement('h1')         // creating a header
  let start = document.createElement('button')       // creating start button
  welcome.innerText = 'Welcome To Hangman Game'      // assigning innertext to the header 
  welcomePage.classList.add('welcome-page')          // assigning class name to the welcome page
  start.classList.add('start-btn')                   //assigning class name to the start button
  start.innerText = 'start'
  document.querySelector('body').append(welcomePage) // appending everything to the body
  welcomePage.appendChild(welcome)
  welcomePage.appendChild(start)
  let author = document.createElement('div')        // creating new div for the authors of the game
  author.classList.add('authors')
  welcomePage.appendChild(author)
  author.innerHTML = `<div><a href='https://www.facebook.com/ahmmhd.mhd' class='author'></a><br><p>Ahmad Al-Hariri</p></div>     
  <div><a href='https://www.facebook.com/ahmmhd.mhd' class='author1'></a><br><p> Sara Sallat</p></div>
  <div><a href='https://www.facebook.com/ahmmhd.mhd' class='author2'></a><br><p> Nour Maleh</p></div>
  <div><a href='https://www.facebook.com/ahmmhd.mhd' class='author3'></a><br><p> Selvi Ece Dugan</p></div>`  // assigning innner html to the authosrs
  start.addEventListener('click',e=>{               // adding event to the start button
    e.preventDefault()
    let videoDiv = document.createElement('div')    // when the start button is pressed the sound of an video will be played in the background(this sound must be like a hint for the word but because we don't know what the word is I choosed a sound represent our team)
    videoDiv.innerHTML = `<video id='video' src='videos/v.mp4' controls>`
    welcomePage.appendChild(videoDiv) 
    let video = document.getElementById('video')
    video.play().then( welcomePage.style.display = 'none',   //will the sound playing the welcome page will be hidden
    document.getElementById('container').style.display = 'block') // the main page will show now by changing the css of her from none to block
  })
}
createWelcomePage();    



