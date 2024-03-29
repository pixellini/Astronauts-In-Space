export interface Astronaut {
    name: string
    craft: string
}

export interface AstronautApiResponse {
    message: string
    people: Astronaut[]
    number: number
}