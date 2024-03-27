import './style.scss'
import axios from 'axios'

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
        console.log('astronauts', SAMPLE_DATA)
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

function generateAstronautElement () {
  const size = getRandomNumber(220, 400)
  const speed = getRandomNumber(150, 250)
  const pos = getRandomNumber(0, 360)

  return `
    <div class="center" style="transform: rotate(${pos}deg);">
      <div class="astronaut-container" style="width: ${size}px; height: ${size}px; animation: rotate ${speed}s linear infinite">
        <div class="astronaut"></div>
      </div>
    </div>
  `
}

const STAR_SIZE = 20 //px
function generateStar () {
  const posX = getRandomNumber(0, window.innerWidth - STAR_SIZE)
  const posY = getRandomNumber(0, window.innerHeight - STAR_SIZE)
  return `
    <div class="star" style="top: ${posY}px; left: ${posX}px"></div>
  `
}

async function init () {
  const astronauts = await fetchAstronauts()

  const appEl = document.getElementById('app')
  astronauts.people.forEach(asronaut => {
    appEl.innerHTML += generateAstronautElement()
  })

  for (let i = 0; i < 50; i++) {
    appEl.innerHTML += generateStar()
  }
}

init()