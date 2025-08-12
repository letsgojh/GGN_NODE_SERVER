import swaggerJsDoc, { Options } from "swagger-jsdoc";

const options: Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Agent Server",
            description: "Express 기반 Agentica API SERVER"
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`
            }
        ]
    },
    apis: ["./src/routes/*.ts"] // TypeScript 파일을 읽도록 경로 수정
};

const specs = swaggerJsDoc(options);

export default specs;