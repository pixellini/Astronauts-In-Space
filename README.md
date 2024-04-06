# Who's in Space?
I created this project for fun, inspired by the free Open Notify astronaut API. I decided against using any frameworks, opting for pure JavaScript to get back in touch with the basics. It was also a chance to practice my pixel art, a long-held interest of mine.
I hope you enjoy it! 

See it live: [Who's in Space?](https://fun.pixellini.com/astronauts)

## To Do List
- [ ] Display something funny or interesting when no astronauts are currently in space
- [ ] Introduce pixel art representations of the International Space Station (ISS):
    - [ ] Craft and integrate a pixel art design of the ISS
    - [ ] Dynamically position the ISS around Earth, mirroring its real-time coordinates obtained from the Open Notify API
- [ ] Improve the Serverless backend:
    - [ ] Enhance error handling for more robust application performance
    - [ ] Develop a new Serverless function specifically for fetching ISS coordinates, ensuring accurate and timely data presentation

## Notes
### Open Notify API
Due to Cross-Origin Resource Sharing (CORS) restrictions, direct browser calls to the Open Notify API are not feasible. To navigate this, a Serverless API was implemented to facilitate the requests, which you can find in the `./api` directory.

### Pixel Art Assets
If you use or have [Aseprite](https://www.aseprite.org/), you're welcome to open any pixel art asset file in the `./assets` folder. Have a look around!