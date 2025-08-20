/**
 * @openapi
 * components:
 *   parameters:
 *     GuQuery:
 *       in: query
 *       name: gu
 *       required: true
 *       schema: { type: string }
 *       description: 자치구명 (예: 마포구)
 *       example: 마포구
 *     DongQuery:
 *       in: query
 *       name: dong
 *       required: true
 *       schema: { type: string }
 *       description: 행정동명 (예: 도화동)
 *       example: 도화동
 *     NameQuery:
 *       in: query
 *       name: name
 *       required: true
 *       schema: { type: string }
 *       description: 상권명(TRDAR_CD_NM)
 *       example: 마포역2번출구
 *
 *   schemas:
 *     Grade_Pop:
 *       type: object
 *       properties:
 *         float:    { type: string, enum: [유리, 적정, 불리, 측정불가] }
 *         company:  { type: string, enum: [유리, 적정, 불리, 측정불가] }
 *         resident: { type: string, enum: [유리, 적정, 불리, 측정불가] }
 *       required: [float, company, resident]
 * 
 *     Grade_Income:
 *       type:object
 *       properties:
 *          income: { type: string, enum: [유리, 적정, 불리, 측정불가] }
 *       required: [income]
 *      
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         code:  { type: string, example: "BAD_REQUEST" }
 *         error: { type: string, example: "Missing required query params: gu,dong,name" }
 *       required: [code, error]
 *
 *   responses:
 *     BadRequest:
 *       description: 잘못된 요청(필수 파라미터 누락/형식 오류)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           examples:
 *             missingParams:
 *               value:
 *                 code: "BAD_REQUEST"
 *                 error: "gu|dong|name required"
 *
 *     NotFound:
 *       description: 요청한 리소스를 찾을 수 없음(예: 상권명 미존재)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           examples:
 *             notFound:
 *               value:
 *                 code: "NOT_FOUND"
 *                 error: "No matching commercial district"
 *
 *     UnprocessableEntity:
 *       description: 파라미터는 문법적으로 맞지만 의미적으로 처리 불가
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           examples:
 *             invalidCombo:
 *               value:
 *                 code: "UNPROCESSABLE_ENTITY"
 *                 error: "Invalid gu/dong/name combination"
 *
 *     InternalError:
 *       description: 서버 내부 오류
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           examples:
 *             internal:
 *               value:
 *                 code: "INTERNAL_ERROR"
 *                 error: "등급 판정 중 서버 오류가 발생했습니다."
 */