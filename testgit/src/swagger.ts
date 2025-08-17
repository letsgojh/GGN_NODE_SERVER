// src/docs/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "상권분석 API",
      version: "1.0.0",
      description: "인구/매출/임대료 등 상권 분석 지표 API",
    },
    servers: [{ url: PUBLIC_URL }],
    components: {
      securitySchemes: {
        // 인증 쓰면 주석 해제: 전역 security도 아래에 추가 가능
        // BearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      parameters: {
        GuQuery: {
          in: "query",
          name: "gu",
          required: true,
          schema: { type: "string", example: "종로구" },
          description: "자치구 이름(또는 코드명)",
        },
        DongQuery: {
          in: "query",
          name: "dong",
          required: true,
          schema: { type: "string", example: "청운효자동" },
          description: "행정동 이름(또는 코드명)",
        },
        NameQuery: {
          in: "query",
          name: "name",
          required: true,
          schema: { type: "string", example: "종로5가" },
          description: "상권 이름(TRDAR_CD_NM)",
        },
      },
      schemas: {
        // 공통 에러 응답
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "gu_required" },
            code: { type: "string", example: "E_PARAM" },
          },
          required: ["error"],
        },

        // /common (등급) 응답
        Grade: {
          type: "object",
          properties: {
            float:   { type: "string", enum: ["유리", "적정", "불리"], example: "유리" },
            company: { type: "string", enum: ["유리", "적정", "불리"], example: "적정" },
            resident:{ type: "string", enum: ["유리", "적정", "불리"], example: "불리" },
          },
          required: ["float", "company", "resident"],
        },

        SeoulStorePrice: {
          type: "object",
          properties: {
            RCPT_YR: { type: "string" },
            CGG_CD: { type: "string" },
            CGG_NM: { type: "string" },
            STDG_CD: { type: "string" },
            STDG_NM: { type: "string" },
            LOTNO_SE: { type: "string" },
            LOTNO_SE_NM: { type: "string" },
            MNO: { type: "string" },
            SNO: { type: "string" },
            FLR: { type: "number" },
            CTRT_DAY: { type: "string" },
            RENT_SE: { type: "string" },
            RENT_AREA: { type: "number", description: "㎡" },
            GRFE: { type: "number", description: "보증금(만원)" },
            RTFE: { type: "number", description: "임대료(만원)" },
            BLDG_NM: { type: "string" },
            ARCH_YR: { type: "string" },
            BLDG_USG: { type: "string" },
            CTRT_PRD: { type: "string" },
            NEW_UPDT_YN: { type: "string" },
            CTRT_UPDT_USE_YN: { type: "string" },
            BFR_GRFE: { type: "string" },
            BFR_RTFE: { type: "string" },
          },
          required: ["CGG_CD", "RENT_AREA", "RTFE"],
        },

        SeoulEstimateIncomeDistrict: {
          type: "object",
          properties: {
            STDR_YYQU_CD: { type: "string" },
            SIGNGU_CD: { type: "string" },
            SIGNGU_CD_NM: { type: "string" },
            SVC_INDUTY_CD: { type: "string" },
            SVC_INDUTY_CD_NM: { type: "string" },
            THSMON_SELNG_AMT: { type: "number" },
            THSMON_SELNG_CO: { type: "number" },
          },
          required: ["SIGNGU_CD", "SIGNGU_CD_NM", "THSMON_SELNG_AMT"],
        },
        StorePriceListResponse: {
          type: "object",
          properties: {
            message: {
              type: "array",
              items: { $ref: "#/components/schemas/SeoulStorePrice" },
            },
          },
          required: ["message"],
        },
        EstimateIncomeDistrictListResponse: {
          type: "object",
          properties: {
            message: {
              type: "array",
              items: { $ref: "#/components/schemas/SeoulEstimateIncomeDistrict" },
            },
          },
          required: ["message"],
        },
      },
    },
    tags: [
      { name: "Meta", description: "상태/테스트" },
      { name: "Common", description: "공통 지표/등급" },
      { name: "Debug", description: "원천 데이터 확인용" },
    ],
  },
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
