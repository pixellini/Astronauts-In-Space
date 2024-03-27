import './style.scss'
import axios from 'axios'

const MIN_ORBIT_SPEED = 100
const MAX_ORBIT_SPEED = 200
const SAMPLE_DATA = {
    "message": "success",
    "people": [
        {
            "name": "Jasmin Moghbeli",
            "craft": "ISS"
        },
        {
            "name": "Andreas Mogensen",
            "craft": "ISS"
        },
        {
            "name": "Satoshi Furukawa",
            "craft": "ISS"
        },
        {
            "name": "Konstantin Borisov",
            "craft": "ISS"
        },
        {
            "name": "Oleg Kononenko",
            "craft": "ISS"
        },
        {
            "name": "Nikolai Chub",
            "craft": "ISS"
        },
        {
            "name": "Loral O'Hara",
            "craft": "ISS"
        }
    ],
    "number": 7
}

export async function fetchAstronauts () {

    try {
        // console.log('fetching astronauts...')
        // const result = await axios.get('http://api.open-notify.org/astros.json', {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // })
        return SAMPLE_DATA
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
  const size = getRandomNumber(250, 500) + 'px'
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

  const appEl = document.getElementById('app')
  astronauts.people.forEach(astronaut => {
    const { name, craft } = astronaut
    if (name && craft) {
      appEl.innerHTML += generateAstronautElement(name, craft)
    }
  })

  for (let i = 0; i < 50; i++) {
    appEl.innerHTML += generateStar()
  }

  setAstronautHoverEvent()
}

init()