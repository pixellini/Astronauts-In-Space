import './style.scss'

const MIN_ORBIT_SPEED = 50
const MAX_ORBIT_SPEED = 200
const STAR_COUNT = 500
const STAR_SIZES = ['medium', 'large'] // small is default
const STAR_COLORS = ['yellow', 'blue'] // white is default
const ASTRONAUT_ORBIT_MIN = 200
const ASTRONAUT_ORBIT_MAX = 500 
const ASTRONAUT_API_ENDPOINT = 'https://c6pp1xpxw9.execute-api.ap-southeast-2.amazonaws.com/'

export async function fetchAstronauts () {
    try {
        const result = await fetch(ASTRONAUT_API_ENDPOINT)
        return result.json() || []
    }
    catch(error) {
        // TODO: Handle error
        console.error(error)
    }
}

function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAstronautElement (name, craft) {
    const size = getRandomNumber(ASTRONAUT_ORBIT_MIN, ASTRONAUT_ORBIT_MAX) + 'px'
    const speed = getRandomNumber(MIN_ORBIT_SPEED, MAX_ORBIT_SPEED) + 's'
    const orbitPos = getRandomNumber(0, 360) + 'deg'
    const astronautPosX = (getRandomNumber(0, 1) * 100) + '%'
    const astronautPosY = (getRandomNumber(0, 100)) + '%'
    const namePosX = `calc(${astronautPosX} - 40px)`
    const namePosY = `calc(${astronautPosY} - 40px)`

    return `
        <div class="center" style="transform: rotate(${orbitPos})">
            <div class="astronaut-container loading" style="width: ${size}; height: ${size}; animation-duration: ${speed};">
                <div style="width: ${size}; height: ${size}; transform: rotate(-${orbitPos})">
                    <div class="astronaut" style="animation-duration: ${speed}; top: ${astronautPosY}; left: ${astronautPosX}"></div>
                    <div class="astronaut-details hidden" style="animation-duration: ${speed}; top: ${namePosY}; left: ${namePosX}"">
                        <span>${name}</span>
                    </div>
                </div>
            </div>
        </div>
    `
}

function generateStar () {
    const posX = getRandomNumber(0, 100)
    const posY = getRandomNumber(0, 100)
    const starSize = STAR_SIZES[getRandomNumber(1, 3) - 1] || ''
    const starColor = STAR_COLORS[getRandomNumber(1, 3) - 1] || ''
    const animationDuration = getRandomNumber(2,10)
    const animationDelay = getRandomNumber(0, 10)
    const rotation = getRandomNumber(0, 360)

    return `
        <div class="star ${starSize} ${starColor}" style="top: ${posY}%; left: ${posX}%; animation-duration: ${animationDuration}s; animation-delay: ${animationDelay}s; transform: rotate(${rotation}deg);"></div>
    `
}

function setAstronautHoverEvent () {
    const astronautEls = document.querySelectorAll('.astronaut')
    const astronautDetailEls = document.querySelectorAll('.astronaut-details')
    astronautEls.forEach((astronaut, index) => {
        astronaut.addEventListener('mouseover', () => {
            astronautDetailEls[index].classList.remove('hidden')
        })

        astronaut.addEventListener('mouseleave', () => {
            astronautDetailEls[index].classList.add('hidden')
        })
    })
}

async function init () {
    const astronauts = await fetchAstronauts()

    const astronautContainerEl = document.getElementById('astronauts')
    astronauts.forEach(astronaut => {
        const { name, craft } = astronaut
        if (name && craft) {
            astronautContainerEl.innerHTML += generateAstronautElement(name, craft)
        }
    })

    const starsContainerEl = document.getElementById('stars')
    for (let i = 0; i < STAR_COUNT; i++) {
        starsContainerEl.innerHTML += generateStar()
    }

    setAstronautHoverEvent()
}

document.addEventListener("DOMContentLoaded", async () => {
    await init()
    
    // This timeout allows for the transition to proceed after everything has loaded.
    const appEl = document.querySelector('body')
    setTimeout(() => {
        appEl.classList.remove('loading')
    }, 0)
    
    setTimeout(() => {
        const astronautEls = document.querySelectorAll('.astronaut-container')
        astronautEls.forEach((astronaut, index) => {
            setTimeout(() => {
                astronaut.classList.remove('loading')
            }, index * 100)
        })
    }, 500)
});