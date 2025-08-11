import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const option={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            version:"1.0.0",
            title:"Agent Server",
            description:"Express 기반 Agentica API SERVER"
        },
        servers:[
            {
                url:`http://localhost:${3000}`
            }
        ]
    },
    apis:["./src/routes/*.js"]
}
const specs = swaggerJsDoc(option)

export default specs;