const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


getNewUser();
$("button").onclick = () => getNewUser();

function getNewUser() {

    fetch("https://randomuser.me/api/")
        .then(raw => raw.json())
        .then(data => {

            console.log(data.results[0])
            const {name, gender, email, picture, phone } = data.results[0];
            const fullName = name.first + " " + name.last;
        
        
            $(".details").innerHTML += `<div class="card bg-zinc-800 rounded-xl p-3 text-white overflow-hidden">
                                            <div class="h-20 w-20 bg-zinc-600 rounded-lg p-1.5">
                                                <img class="h-full w-full object-cover rounded-lg" src=${picture.large} alt="">
                                            </div>
                                            <h1 class="text-xl font-semibold mt-1">${name.first}</h1>
                                            <h2 class="text-sm font-semibold opacity-80">${gender}</h2>
                                            <h3 class="text-xs opacity-40 font-semibold mt-.5">${email}</h3>
                                            <p class="text-xs font-semibold mt-3">Ph- ${phone}</p>
                                            <div class="glow" />
                                        </div>`;
        })
        .then(() => cardHover())
}




function cardHover() {
    const cards = $$(".card");
    let bounds;

    cards.forEach(card => {
        function rotateToMouse(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

            card.style.transform = `
                scale3d(1.07, 1.07, 1.07)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance) * 2}deg
                )
            `;

            card.querySelector('.glow').style.backgroundImage = `
                radial-gradient(
                    circle at
                    ${center.x * 2 + bounds.width / 2}px
                    ${center.y * 2 + bounds.height / 2}px,
                    #ffffff55,
                    #0000000f
                )
            `;
        }

        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            document.addEventListener('mousemove', rotateToMouse);
        });

        card.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', rotateToMouse);
            card.style.transform = '';
            card.querySelector('.glow').style.background = '';
        });
    });
}