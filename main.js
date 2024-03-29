import './style.scss'
import axios from 'axios'

const MIN_ORBIT_SPEED = 30
const MAX_ORBIT_SPEED = 60
const NUM_OF_STARS = 250
const ASTRONAUT_ORBIT_MIN = 250
const ASTRONAUT_ORBIT_MAX = 500 
const ASTRONAUT_API_ENDPOINT = 'https://c6pp1xpxw9.execute-api.ap-southeast-2.amazonaws.com/'

export async function fetchAstronauts () {
    try {
        console.log('fetching astronauts...')
        const result = await axios.get(ASTRONAUT_API_ENDPOINT)
        return result.data
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
    const pos = getRandomNumber(0, 360) + 'deg'

    return `
        <div class="center" style="transform: rotate(${pos})">
            <div class="astronaut-container" style="width: ${size}; height: ${size}; animation-duration: ${speed};">
                <div style="transform: rotate(-${pos})">
                    <div class="astronaut" style="animation-duration: ${speed}"></div>
                    <div class="astronaut-details hidden" style="animation-duration: ${speed}">
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
    return `
        <div class="star" style="top: ${posY}%; left: ${posX}%"></div>
    `
}

function setAstronautHoverEvent () {
    const astronautEls = document.querySelectorAll('.astronaut')
    const astronautDetailEls = document.querySelectorAll('.astronaut-details')
    // astronautEls.forEach((astronaut, index) => {
    //   astronaut.addEventListener('mouseenter', () => {
    //     astronautDetailEls[index].classList.remove('hidden')
    //   })

    //   astronaut.addEventListener('mouseleave', () => {
    //     astronautDetailEls[index].classList.add('hidden')
    //   })
    // })
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
    for (let i = 0; i < NUM_OF_STARS; i++) {
        starsContainerEl.innerHTML += generateStar()
    }

    setAstronautHoverEvent()
}

init()