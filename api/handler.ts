import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
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
    let body: Astronaut[] = []

    try {
        const result = await fetch(ASTROS_ENDPOINT)
        const data: AstronautApiResponse = await result.json()

        if (data.message === MessageResult.Success) {
            body = data.people || []
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
