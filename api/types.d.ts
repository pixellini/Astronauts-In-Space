export interface Astronaut {
    name: string
    craft: string
}

export interface AstronautApiResponse {
    data: {
        message: string
        people: Astronaut[]
        number: number
    }
}