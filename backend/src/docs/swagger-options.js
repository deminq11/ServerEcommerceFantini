import * as path from "path"
import swaggerJsDoc from "swagger-jsdoc"
const swaggerOptions ={
    definition:{
        openapi:"3.0.1",
        info:{
            title: "Platypus API",
            version: "1.0.0",
            description: `Platypus API documentation.
                <br><br>
                <b>Authentication Notice:</b>
                <br>
                This API requires authentication via a cookie. Please manually add a cookie with the following details:
                <br><br>
                <b>Name:</b> <code>token</code>
                <br>
                <b>Value:</b> <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc2ZGNmM2IxOWUzY2EwOTY1MGI0MDMyIiwiaWF0IjoxNzQxNDY5Mjk0LCJleHAiOjE3NDIwNzQwOTR9.nH8vL-npVqS5Viuzr2WVVyjwEvEvuPuTrZ5NrEvDwTY</code>
                <br><br>
                After adding the cookie, you can use the "Try it out" feature on endpoints with User and Admin authentication.`
        }
    },
    apis: [path.resolve("./src/docs/**/*.yaml")]
}
export const spec = swaggerJsDoc(swaggerOptions)