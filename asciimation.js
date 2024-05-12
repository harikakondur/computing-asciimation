import { introduction, eniac,ada_lovelace,grace_hopper, hedy_lamarr, eniac2, clerical, money, rosie, gamer, decline, computer, factors, conclusion, orgs } from './frames.js';
function animateText(text, elementId, textType) {

    let index = 0;
    let currentText = '';
    let element = document.createElement(textType);
    elementId.appendChild(element);

    return new Promise(resolve => {
        function addLetter() {
            currentText += text[index];
            element.innerHTML = currentText;
            index++;
            if (index < text.length) {
                setTimeout(addLetter, 75); // Typing speed
            } else {
                resolve();
            }
        }

        addLetter();
    });
}

// Function to display a frame
function displayFrame(frame, asciiDiv) {
    asciiDiv.innerHTML = frame;
}


async function welcome() {
    let element = document.getElementById('welcome');

    await animateText("women in computing : an asciimation timeline", element, 'h1');
    await animateText(".           by harika kondur", element, 'h3');

    // Delay the removal of the element
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    element.remove();
} 

async function startAnimation(asciiFrames, captionText, timing) {
    let framesDiv = document.createElement('div');
    framesDiv.id = 'frames';
    framesDiv.style.display = 'flex'; 


    let asciiDiv = document.createElement('div');
    asciiDiv.id = 'ascii'; 

    let pre = document.createElement('pre');
    pre.appendChild(asciiDiv);
    framesDiv.appendChild(pre);

    let captionDiv = document.createElement('div');
    captionDiv.id = 'caption';
    framesDiv.appendChild(captionDiv);

    document.body.appendChild(framesDiv);

    // Display the first frame
    displayFrame(asciiFrames[0], asciiDiv, captionDiv);

    // Start the text animation
    let textAnimationPromise = animateText(captionText, captionDiv, 'p');

    // Start the frame animation
    let index = 0;
    let frameAnimation = setInterval(() => {
        index = (index + 1) % asciiFrames.length; // Loop back to the first frame
        displayFrame(asciiFrames[index], asciiDiv);
    }, 500);

    // Wait for the text animation to finish
    await textAnimationPromise;

    // Wait for the timeout to occur
    await new Promise(r => setTimeout(r, timing));

    // Stop the frame animation
    clearInterval(frameAnimation);

    // clear canvas
    document.body.removeChild(framesDiv);
}

async function start() {
    await welcome();
    await startAnimation(introduction,"Computer programming once had much better gender balance than it does today. What went wrong?        History says women pioneered the field. Then men pushed them out of it.",2000)
    await startAnimation(eniac,"Let's take a closer look…    ",1500);
    await startAnimation(ada_lovelace, "In 1843, Ada Lovelace became the first computer programmer by designing the first computer algorithm, and explained how it would work on Charles Babbage's proposed Analytical Engine.", 1000);
    await startAnimation(hedy_lamarr,"During World War II, in 1942, Hedy Lamarr invented frequency-hopping technology that would later allow the invention of wireless signals like Wi-Fi and Bluetooth.",1000);
    await startAnimation(eniac,"In 1945-46, Jean Bartik and five other women developed and codified many of the foundations of software programming while working on ENIAC. ",1000);
    await startAnimation(eniac2,"The six women, whose software work was crucial to its operation and success, were not credited for the completion of the ENIAC.",1500);
    await startAnimation(grace_hopper, "In 1952, Rear Admiral Grace Hopper created one of the world's first compilers (in her spare time). She envisioned code to use English language-based instructions, and created COBOL, a language used to this day.", 2000);
    await startAnimation(rosie,"These are such groundbreaking accomplishments…      So what happened to women in computing?",2000);
    await startAnimation(clerical,"Moving into the post war era and the 1960's, software engineering was considered “women's work” because it was thought of as clerical. Hardware was the difficult job, i.e. “for men”.",600);
    await startAnimation(money,"Starting in the late 1960's, men realized programming was actually hard, and thus, prestigious. That meant it was lucrative and (some) men didn't want women enjoying all the benefits of that. ",1000);
    await startAnimation(orgs,"This newfound prestige led to efforts like biased aptitude tests and professional organizations that discouraged women from entering the field",1000);
    await startAnimation(gamer,"Pop culture reinforced this push by portraying programmers as awkward male nerds in movies and marketed video games primarily as toys for boys.",1000);
    await startAnimation(decline,"However, the dramatic drop in the 1980s suggests a more nuanced story. ",2000);
    await startAnimation(computer,"Were women simply not interested anymore?    ",2000);
    await startAnimation(factors,"The decline of women in computer science resulted from a plethora of factors, including active discouragement, gendered stereotypes, workplace bias, and broader societal shifts",1000);
    await startAnimation(conclusion,"The good news?      These factors explain the decline of women in computer science, NOT women's lack of interest. Women have always been drawn to this field, and their potential remains vast!",4000);

}

start();