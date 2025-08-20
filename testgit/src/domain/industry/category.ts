
export type Category = {
    category : string,
    items : string[]
}

//업종 대분류
export const categoryMap : Record<string, string[]> = {
    "외식·음식 서비스": ["한식음식점","중식음식점","일식음식점","양식음식점","제과점","패스트푸드점","치킨전문점","분식전문점","호프-간이주점","커피-음료"],
    "교육·학원" : ["일반교습학원","외국어학원","예술학원","스포츠 강습","독서실","통번역 서비스"],
    "의료·보건" : ["일반의원","치과의원","한의원","동물병원","의약품","의료기기"],
    "법률·세무·전문서비스" : ["변호사사무소","변리사사무소","기타법무서비스","세무사사무소","건축물청소","통번역서비스","여행사","인테리어"],
    "오락·여가·스포츠" : ["당구장","골프연습장","볼링장","PC방","기타오락장","노래방","스포츠클럽"],
    "미용·생활 서비스" : ["미용실","네일숍","세탁소","피부관리실","녹음실","사진관","의류임대","가정용품임대","애완동물"],
    "숙박·부동산":["여관","게스트하우스","부동산중개업"],
    "도소매·판매" : ["슈퍼마켓","편의점","주류도매","미곡판매","육류판매","수산물판매","청과상","반찬가게",
"일반의류","한복점","유아의류","신발","가방","안경","시계및귀속금","화장품","미용재료","운동/경기용품","핸드폰","서적","문구","자전거 및 기타운송장비","완구","섬유제품","화초",
"중고가구","가구","철물점","조명용품","예술품"],
    "자동차·기계 관련" : ["자동차미용","통신기기수리","모터사이클수리","가전제품수리","전자상거래업","중고차판매",
"자동차부품","컴퓨터및주변장치판매",]
}

//대분류 해놓은 업종 중, 어느 업종이 있는지 반환하는 함수
// 문자열 정규화 함수 (공백/기호 제거 등)
function normalize(str: string): string {
  return str.replace(/[\s·\-]/g, "").toLowerCase();
}

// 대분류 입력 시 세부 업종 반환 ->json형태로 반환
export async function getCategory(job: string): Promise<Category> {
  const normalizedJob = normalize(job);
  let tmp : Category = {
    category : "",
    items : []
  }

  // 부분 매칭 (예: "외식 서비스" → "외식·음식 서비스")
  for (const key of Object.keys(categoryMap)) {
    if (normalize(key).includes(normalizedJob) || normalizedJob.includes(normalize(key))) {
        tmp = {
            category : key,
            items : categoryMap[key]
        }
        return tmp
      }
    }

  // 없으면 null
  return tmp;
}