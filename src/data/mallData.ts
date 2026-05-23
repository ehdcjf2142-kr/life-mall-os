export type FloorId = '4F' | '3F' | '2F' | '1F' | 'B1'

export type ShopTheme = 'vault' | 'study' | 'popup' | 'gallery' | 'terminal' | 'lounge' | 'default'

export type Category = {
  name: string
  slug: string
  description: string
  theme: ShopTheme
  /** Floor plan position (grid area name) */
  plot: string
}

export type FloorSection = {
  id: FloorId
  title: string
  subtitle: string
  tagline: string
  categories: Category[]
}

export type LifeRecord = {
  id: string
  title: string
  content: string
  floor: FloorId
  tagCategory: string
  createdAt: string
  isInbox: boolean
}

export const FLOOR_SECTIONS: FloorSection[] = [
  {
    id: '4F',
    title: 'VIP 비전 라운지',
    subtitle: '미래 / 전략',
    tagline: '최상층 전망대에서 인생 로드맵을 설계합니다',
    categories: [
      { name: '시스템 통합 정기 회고록', slug: 'review', description: '큰 흐름 점검과 회고', theme: 'study', plot: 'a' },
      { name: '나의 계획', slug: 'plans', description: '장단기 실행 계획', theme: 'lounge', plot: 'b' },
      { name: '성장 스킬 트리', slug: 'skills', description: '역량 성장 로드맵', theme: 'study', plot: 'c' },
      { name: '나의 버킷리스트', slug: 'bucket', description: '꼭 해보고 싶은 일', theme: 'gallery', plot: 'd' },
    ],
  },
  {
    id: '3F',
    title: '북카페 & 감성 문화관',
    subtitle: '지식 / 영감',
    tagline: '조용한 복도에서 영감을 수집합니다',
    categories: [
      { name: '나의 일기', slug: 'diary', description: '감정과 하루 기록', theme: 'gallery', plot: 'a' },
      { name: '나의 아이디어', slug: 'ideas', description: '번뜩이는 생각 보관', theme: 'popup', plot: 'b' },
      { name: '나의 취미 창고', slug: 'hobby', description: '취미 활동 아카이브', theme: 'gallery', plot: 'c' },
      { name: '미디어 소비 대기열', slug: 'media', description: '보고 듣고 읽을 목록', theme: 'lounge', plot: 'd' },
      { name: '황금 문장 수집함', slug: 'quotes', description: '인상적인 문장 모음', theme: 'study', plot: 'e' },
      { name: '멘탈 앵커', slug: 'anchor', description: '마음 중심을 잡는 메모', theme: 'lounge', plot: 'f' },
    ],
  },
  {
    id: '2F',
    title: '프리미엄 금융관',
    subtitle: '자산 / 장비',
    tagline: '대리석 홀과 금고 통로가 이어집니다',
    categories: [
      { name: '자산/시스템 투자', slug: 'assets', description: '재무와 투자 운영', theme: 'vault', plot: 'a' },
      { name: '구독/고정지출', slug: 'subs', description: '매월 반복 지출 관리', theme: 'vault', plot: 'b' },
      { name: '인맥 관리', slug: 'network', description: '관계와 네트워크 기록', theme: 'lounge', plot: 'c' },
      { name: '소유 장비', slug: 'gear', description: '보유 장비 목록과 상태', theme: 'default', plot: 'd' },
      { name: '경조사 렛저', slug: 'events', description: '경조사 내역 정리', theme: 'vault', plot: 'e' },
      { name: '중요 문서 금고', slug: 'docs', description: '핵심 문서 메모', theme: 'vault', plot: 'f' },
      { name: '패션 드레스룸', slug: 'fashion', description: '착장 및 아이템 정리', theme: 'gallery', plot: 'g' },
    ],
  },
  {
    id: '1F',
    title: '메인 아트리움',
    subtitle: '실시간 실행',
    tagline: '광장과 팝업 스토어가 펼쳐집니다',
    categories: [
      { name: '나의 프로젝트', slug: 'projects', description: '진행 중 프로젝트 현황', theme: 'popup', plot: 'a' },
      { name: '나의 일정', slug: 'schedule', description: '일정과 할 일 관리', theme: 'default', plot: 'b' },
      { name: '건강/루틴', slug: 'health', description: '건강 습관 체크', theme: 'default', plot: 'c' },
      { name: '식단/영양 로그', slug: 'nutrition', description: '먹은 것과 컨디션 추적', theme: 'default', plot: 'd' },
      { name: '출장/여행 패킹', slug: 'packing', description: '이동 준비 체크리스트', theme: 'popup', plot: 'e' },
    ],
  },
  {
    id: 'B1',
    title: '기계실 & 창고',
    subtitle: '인프라 / 유지보수',
    tagline: '물류 통로와 보관 랙이 깔려 있습니다',
    categories: [
      { name: '실패 창고(오답노트)', slug: 'failures', description: '실패에서 얻은 교훈', theme: 'terminal', plot: 'a' },
      { name: 'AI 프롬프트', slug: 'prompts', description: '자주 쓰는 프롬프트 저장', theme: 'terminal', plot: 'b' },
      { name: '루틴 SOP', slug: 'sop', description: '반복 작업 표준화', theme: 'terminal', plot: 'c' },
      { name: '장비 정기 점검', slug: 'maintenance', description: '정기 유지보수 내역', theme: 'default', plot: 'd' },
      { name: '네이밍 가이드', slug: 'naming', description: '명명 규칙 모음', theme: 'default', plot: 'e' },
      { name: '개발 아카이브', slug: 'dev-archive', description: '개발 기록과 레퍼런스', theme: 'terminal', plot: 'f' },
      { name: '리빙 인벤토리', slug: 'inventory', description: '생활 비품 관리', theme: 'default', plot: 'g' },
    ],
  },
]

export const ALL_CATEGORIES = FLOOR_SECTIONS.flatMap((floor) =>
  floor.categories.map((category) => ({
    floor: floor.id,
    floorTitle: floor.title,
    floorTagline: floor.tagline,
    ...category,
  })),
)

export function getFloor(floorId: string): FloorSection | undefined {
  return FLOOR_SECTIONS.find((floor) => floor.id === floorId)
}

export function getCategory(floorId: string, slug: string) {
  const floor = getFloor(floorId)
  return floor?.categories.find((category) => category.slug === slug)
}

export const SEED_RECORDS: LifeRecord[] = [
  {
    id: 'rec-1',
    title: '읽고 싶은 책 메모',
    content: '도서관 가기 전에 읽을 목록부터 정리하기.',
    floor: '3F',
    tagCategory: '',
    createdAt: '2026-05-22 08:30',
    isInbox: true,
  },
  {
    id: 'rec-2',
    title: '다음주 운동 루틴 실험',
    content: '월/수/금 근력, 화/목 가벼운 러닝으로 조정.',
    floor: '1F',
    tagCategory: '',
    createdAt: '2026-05-22 09:10',
    isInbox: true,
  },
  {
    id: 'rec-3',
    title: '분기별 회고 초안',
    content: '이번 분기 핵심 성과와 병목 요인을 정리했다.',
    floor: '4F',
    tagCategory: '시스템 통합 정기 회고록',
    createdAt: '2026-05-18 21:30',
    isInbox: false,
  },
  {
    id: 'rec-4',
    title: '신규 사이드 프로젝트 아이디어',
    content: '개인 지식 그래프 기반 추천 서비스 가능성 검토.',
    floor: '1F',
    tagCategory: '나의 프로젝트',
    createdAt: '2026-05-19 14:10',
    isInbox: false,
  },
  {
    id: 'rec-5',
    title: '정기 구독 점검',
    content: '사용하지 않는 SaaS 2개는 다음달 해지 예정.',
    floor: '2F',
    tagCategory: '구독/고정지출',
    createdAt: '2026-05-20 10:00',
    isInbox: false,
  },
  {
    id: 'rec-6',
    title: '여행 짐 싸기 체크',
    content: '여권, 보조배터리, 세면도구 파우치.',
    floor: '1F',
    tagCategory: '출장/여행 패킹',
    createdAt: '2026-05-21 16:40',
    isInbox: false,
  },
]

export const THEME_LABELS: Record<ShopTheme, string> = {
  vault: '중앙 금고',
  study: '심야 서재',
  popup: '팝업 스토어',
  gallery: '갤러리 홀',
  terminal: '기계실 터미널',
  lounge: '라운지',
  default: '스탠다드 샵',
}
