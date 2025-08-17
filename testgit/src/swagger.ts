// src/docs/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3000";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "상권분석 API",
      version: "1.0.0",
      description: "인구/매출/임대료 등 상권 분석용 API",
    },
    servers: [{ url: PUBLIC_URL }],
    components: {
      // 인증이 필요하면 securitySchemes/ security 사용
      // securitySchemes: { BearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
      parameters: {
        GuQuery: {
          in: "query",
          name: "gu",
          required: true,
          schema: { type: "string", example: "종로구" },
          description: "자치구 이름(또는 코드)",
        },
        DongQuery: {
          in: "query",
          name: "dong",
          required: true,
          schema: { type: "string", example: "부암동" },
          description: "행정동 이름(또는 코드)",
        },
        NameQuery: {
          in: "query",
          name: "name",
          required: true,
          schema: { type: "string", example: "자하문터널" },
          description: "상권 이름(TRDAR_CD_NM)",
        },
      },
      schemas: {
        // 공통 에러
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "gu|dong|name required" },
            code: { type: "string", example: "E_PARAM" },
          },
          required: ["error"],
        },

        // /common 응답 (간단 등급)
        Grade: {
          type: "object",
          properties: {
            float:   { type: "string", enum: ["유리","적정","불리"], example: "불리" },
            company: { type: "string", enum: ["유리","적정","불리"], example: "불리" },
            resident:{ type: "string", enum: ["유리","적정","불리"], example: "불리" },
          },
          required: ["float","company","resident"],
        },

        // 디버그: 임대료 항목(필수 필드만)
        SeoulStorePrice: {
          type: "object",
          properties: {
            CGG_CD: { type: "string" },
            CGG_NM: { type: "string" },
            RENT_AREA: { type: "number", description: "㎡" },
            RTFE: { type: "number", description: "임대료(만원)" },
            CTRT_DAY: { type: "string" },
            BLDG_NM: { type: "string" },
          },
          required: ["CGG_CD","RENT_AREA","RTFE"],
        },
        StorePriceListResponse: {
          type: "object",
          properties: {
            message: { type: "array", items: { $ref: "#/components/schemas/SeoulStorePrice" } },
          },
          required: ["message"],
        },

        // 디버그: 자치구 추정매출(필수 필드만)
        SeoulEstimateIncomeDistrict: {
          type: "object",
          properties: {
            SIGNGU_CD: { type: "string" },
            SIGNGU_CD_NM: { type: "string" },
            THSMON_SELNG_AMT: { type: "number" },
          },
          required: ["SIGNGU_CD","SIGNGU_CD_NM","THSMON_SELNG_AMT"],
        },
        EstimateIncomeDistrictListResponse: {
          type: "object",
          properties: {
            message: { type: "array", items: { $ref: "#/components/schemas/SeoulEstimateIncomeDistrict" } },
          },
          required: ["message"],
        },
      },
    },
    tags: [
      { name: "Common", description: "공통 지표/등급" },
      { name: "Meta", description: "상태/테스트" },
      { name: "Debug", description: "원천 데이터 확인" },
    ],
    // 전역 인증 필요 시:
    // security: [{ BearerAuth: [] }],
  },
  // 라우터/컨트롤러 주석을 전부 스캔
  apis: ["./src/**/*.ts"],
});

export default swaggerSpec;
