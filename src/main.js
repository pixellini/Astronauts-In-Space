import './main.scss'
import { isDateOlderThanOneDay, getRandomNumber } from './utils'

const MIN_ORBIT_SPEED = 50 // seconds
const MAX_ORBIT_SPEED = 200 // seconds
const STAR_COUNT = 500
const STAR_SIZES = ['medium', 'large'] // small is default
const STAR_COLORS = ['yellow', 'blue'] // white is default
const ASTRONAUT_ORBIT_MIN = 200 // px (width)
const ASTRONAUT_ORBIT_MAX = 500 // px (width)
const ASTRONAUT_API_ENDPOINT = 'https://c6pp1xpxw9.execute-api.ap-southeast-2.amazonaws.com/'
const CLASS_HIDDEN = 'hidden'
const CLASS_LOADING = 'loading'
const CLASS_STAR = 'star'
const CLASS_ASTRONAUT = 'astronaut'
const CLASS_ASTRONAUT_DETAILS = 'astronaut-details'
const CLASS_ASTRONAUT_CONTAINER = 'astronaut-container'
const ELEMENT_ID_ASTRONAUTS = 'astronauts'
const ELEMENT_ID_STARS = 'stars'
const STORAGE_KEY_DATA = 'astronaut_data'
const STORAGE_KEY_TIME = 'astronaut_data_time'
const GENERIC_API_ERROR = 'Something went wrong loading the astronaut data. Please try again later.'

export async function fetchAstronauts () {
    
    try {
        // Caching mechanism to prevent multiple calls to the API.
        // The Astronauts don't change much so we can limit the requests.
        const { astronautData, canUseStorageData } = getAstronautStorage()
        if (canUseStorageData) {
            return astronautData
        }

        const result = await fetch(ASTRONAUT_API_ENDPOINT)
        const parsedResult = await result.json() || []

        setAstronautStorage(parsedResult)

        return parsedResult
    }
    catch(error) {
        console.error(error)
        alert(GENERIC_API_ERROR)
        return []
    }
}

/** STORAGE **/
function getAstronautStorage () {
    const data = localStorage.getItem(STORAGE_KEY_DATA)
    const previousFetchDate = localStorage.getItem(STORAGE_KEY_TIME)

    return {
        astronautData: data ? JSON.parse(data) : [],
        canUseStorageData: data && previousFetchDate && !isDateOlderThanOneDay(+previousFetchDate)
    }
}

function setAstronautStorage (parsedAstronautData) {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(parsedAstronautData))
    localStorage.setItem(STORAGE_KEY_TIME, Date.now())
}

/** ELEMENT RENDERING **/
function generateAstronautElement (name, _craft) {
    const size = getRandomNumber(ASTRONAUT_ORBIT_MIN, ASTRONAUT_ORBIT_MAX) + 'px'
    const speed = getRandomNumber(MIN_ORBIT_SPEED, MAX_ORBIT_SPEED) + 's'
    const orbitPos = getRandomNumber(0, 360) + 'deg'
    const astronautPosX = (getRandomNumber(0, 1) * 100) + '%'
    const astronautPosY = (getRandomNumber(0, 100)) + '%'
    const namePosX = `calc(${astronautPosX} - 40px)`
    const namePosY = `calc(${astronautPosY} - 40px)`

    return `
        <div class="center" style="transform: rotate(${orbitPos})">
            <div class="${CLASS_ASTRONAUT_CONTAINER} ${CLASS_LOADING}" style="width: ${size}; height: ${size}; animation-duration: ${speed};">
                <div style="width: ${size}; height: ${size}; transform: rotate(-${orbitPos})">
                    <div class="${CLASS_ASTRONAUT}" style="animation-duration: ${speed}; top: ${astronautPosY}; left: ${astronautPosX}"></div>
                    <div class="${CLASS_ASTRONAUT_DETAILS} ${CLASS_HIDDEN}" style="animation-duration: ${speed}; top: ${namePosY}; left: ${namePosX}"">
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
        <div class="${CLASS_STAR} ${starSize} ${starColor}" style="top: ${posY}%; left: ${posX}%; animation-duration: ${animationDuration}s; animation-delay: ${animationDelay}s; transform: rotate(${rotation}deg);"></div>
    `
}

/** EVENTS **/
function setAstronautHoverEvent () {
    const astronautEls = document.querySelectorAll('.' + CLASS_ASTRONAUT)
    const astronautDetailEls = document.querySelectorAll('.' + CLASS_ASTRONAUT_DETAILS)
    astronautEls.forEach((astronaut, index) => {
        astronaut.addEventListener('mouseover', () => {
            astronautDetailEls[index].classList.remove(CLASS_HIDDEN)
        })

        astronaut.addEventListener('mouseleave', () => {
            astronautDetailEls[index].classList.add(CLASS_HIDDEN)
        })
    })
}

/** MAIN FUNCTIONS **/
async function init () {
    const astronauts = await fetchAstronauts()

    const astronautContainerEl = document.getElementById(ELEMENT_ID_ASTRONAUTS)
    astronauts.forEach(astronaut => {
        const { name, craft } = astronaut
        if (name && craft) {
            astronautContainerEl.innerHTML += generateAstronautElement(name, craft)
        }
    })

    const starsContainerEl = document.getElementById(ELEMENT_ID_STARS)
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
        appEl.classList.remove(CLASS_LOADING)
    }, 0)
    
    setTimeout(() => {
        const astronautEls = document.querySelectorAll('.' + CLASS_ASTRONAUT_CONTAINER)
        astronautEls.forEach((astronaut, index) => {
            setTimeout(() => {
                astronaut.classList.remove(CLASS_LOADING)
            }, index * 100)
        })
    }, 500)
});