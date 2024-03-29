import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import axios from 'axios'
import type { Astronaut, AstronautApiResponse } from './types'

const ASTROS_ENDPOINT = 'http://api.open-notify.org/astros.json'

enum MessageResult {
    Success = 'success'
}

enum Status {
    Success = 200,
    Error = 400
}

export async function astronaut (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let statusCode = Status.Success
    let body = {}

    try {
        const result: AstronautApiResponse = await axios.get(ASTROS_ENDPOINT)
        
        if (result.data.message === MessageResult.Success) {
            const astronauts: Astronaut[] = result.data.people || []
    
            body = astronauts
        }
        else {
            //TODO: Throw exception
        }
    } catch (error) {
        console.error(error)

        statusCode = Status.Error
    }

    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body)
    }
}
