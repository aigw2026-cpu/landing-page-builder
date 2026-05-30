// Utility: Sanitize HTML to prevent XSS in user-editable fields
function sanitizeHTML(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Utility: Debounce function to limit rapid re-renders during fast typing
let _previewDebounceTimer = null;
function debouncedUpdatePreview() {
  clearTimeout(_previewDebounceTimer);
  _previewDebounceTimer = setTimeout(() => updatePreview(), 150);
}

// components registry containing default properties, schema fields, and Tailwind render functions
const COMPONENT_REGISTRY = {
  Header_Basic: {
    name: "기본 헤더 (Header_Basic)",
    icon: "🧭",
    defaultProps: {
      logoText: "AutoWork AI",
      navLinks: [
        { label: "기능 소개", url: "#features" },
        { label: "도입 사례", url: "#testimonials" },
        { label: "요금제", url: "#pricing" }
      ],
      ctaButtonText: "무료 체험 신청"
    },
    schema: {
      logoText: { type: "text", label: "로고 텍스트" },
      ctaButtonText: { type: "text", label: "우측 CTA 버튼 텍스트" },
      navLinks: {
        type: "array",
        label: "메뉴 링크 목록",
        itemSchema: {
          label: { type: "text", label: "링크 이름" },
          url: { type: "text", label: "이동 경로 (URL)" }
        }
      }
    },
    render(props) {
      const links = props.navLinks || [];
      const linksHtml = links
        .map(link => `<a href="${link.url}" class="text-slate-600 hover:text-indigo-600 font-medium transition-colors">${link.label}</a>`)
        .join('');

      return `
        <header class="flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
          <div class="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-base">A</span>
            <span>${props.logoText}</span>
          </div>
          <nav class="hidden md:flex items-center space-x-8">
            ${linksHtml}
          </nav>
          <div>
            <button class="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all">${props.ctaButtonText}</button>
          </div>
        </header>
      `;
    }
  },

  Hero_Type_A: {
    name: "기본 히어로 (Hero_Type_A)",
    icon: "⚡",
    defaultProps: {
      title: "단순 반복 업무,\n이제 AI에게 맡기세요",
      subtitle: "팀이 더 가치 있는 일에 집중할 수 있도록 복잡한 비즈니스 로직을 자동화하는 최적의 솔루션을 제공합니다.",
      primaryButtonText: "14일 무료 체험하기",
      secondaryButtonText: "데모 영상 시청",
      bgColor: "bg-indigo-50/40"
    },
    schema: {
      title: { type: "textarea", label: "메인 헤드라인 (줄바꿈 가능)" },
      subtitle: { type: "textarea", label: "서브 타이틀" },
      primaryButtonText: { type: "text", label: "주요 버튼 텍스트" },
      secondaryButtonText: { type: "text", label: "보조 버튼 텍스트" },
      bgColor: {
        type: "select",
        label: "배경색상",
        options: [
          { value: "bg-white", label: "일반 흰색" },
          { value: "bg-slate-50", label: "연한 회색" },
          { value: "bg-indigo-50/40", label: "연한 인디고" },
          { value: "bg-amber-50/30", label: "따뜻한 앰버" }
        ]
      }
    },
    render(props) {
      return `
        <section class="${props.bgColor || 'bg-white'} px-6 py-20 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <!-- Background decorative shapes -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl -z-10"></div>
          
          <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6 whitespace-pre-line tracking-tight">
              ${props.title}
            </h1>
            <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              ${props.subtitle}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button class="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl active:scale-98 transition-all">${props.primaryButtonText}</button>
              <button class="w-full sm:w-auto px-8 py-4 text-base font-bold text-indigo-600 bg-white border border-indigo-100 rounded-2xl hover:bg-indigo-50 active:scale-98 transition-all">${props.secondaryButtonText}</button>
            </div>
          </div>
        </section>
      `;
    }
  },

  Hero_Type_Gradient: {
    name: "그라데이션 히어로 (Hero_Type_Gradient)",
    icon: "🌈",
    defaultProps: {
      title: "성공적인 비즈니스를 위한\n원스톱 AI 오토메이션",
      subtitle: "수작업 데이터 수집, 중복 문서 검토, 리포트 작성을 하나의 파이프라인으로 구축하세요.",
      primaryButtonText: "무료로 시작하기",
      secondaryButtonText: "자세히 알아보기",
      gradientFrom: "from-slate-900",
      gradientTo: "to-indigo-950"
    },
    schema: {
      title: { type: "textarea", label: "메인 헤드라인 (줄바꿈 가능)" },
      subtitle: { type: "textarea", label: "서브 타이틀" },
      primaryButtonText: { type: "text", label: "주요 버튼 텍스트" },
      secondaryButtonText: { type: "text", label: "보조 버튼 텍스트" },
      gradientFrom: {
        type: "select",
        label: "그라데이션 시작색",
        options: [
          { value: "from-slate-900", label: "차콜 블랙" },
          { value: "from-indigo-900", label: "딥 인디고" },
          { value: "from-violet-900", label: "딥 바이올렛" },
          { value: "from-emerald-950", label: "딥 에메랄드" }
        ]
      },
      gradientTo: {
        type: "select",
        label: "그라데이션 종료색",
        options: [
          { value: "to-indigo-950", label: "딥 네이비" },
          { value: "to-purple-950", label: "딥 퍼플" },
          { value: "to-slate-900", label: "차콜 블랙" },
          { value: "to-zinc-950", label: "제트 블랙" }
        ]
      }
    },
    render(props) {
      return `
        <section class="bg-gradient-to-b ${props.gradientFrom || 'from-slate-900'} ${props.gradientTo || 'to-indigo-950'} px-6 py-24 md:py-36 text-center flex flex-col items-center justify-center relative overflow-hidden text-white">
          <!-- Glow grid decoration -->
          <div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div class="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -z-10"></div>
          
          <div class="max-w-4xl mx-auto relative z-10">
            <h1 class="text-4xl md:text-6xl font-extrabold leading-[1.15] mb-6 whitespace-pre-line tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-200">
              ${props.title}
            </h1>
            <p class="text-lg md:text-xl text-indigo-200/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              ${props.subtitle}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button class="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-900 bg-white rounded-2xl shadow-xl hover:bg-indigo-50 active:scale-98 transition-all">${props.primaryButtonText}</button>
              <button class="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 active:scale-98 transition-all">${props.secondaryButtonText}</button>
            </div>
          </div>
        </section>
      `;
    }
  },

  Features_Grid: {
    name: "특징 그리드 (Features_Grid)",
    icon: "💎",
    defaultProps: {
      sectionBadge: "강력한 핵심 기능",
      sectionTitle: "스마트한 인공지능이 업무를 혁신합니다",
      sectionDesc: "더 복잡하고 까다로운 스케줄링 업무도 간단한 워크플로우 드래그를 통해 완벽하게 해결합니다.",
      features: [
        { icon: "⚡", title: "실시간 업무 동기화", desc: "사용 중인 협업 툴(Slack, Jira, Teams)과 플러그인 연동을 통해 이벤트를 실시간 모니터링합니다." },
        { icon: "🤖", title: "지능형 시나리오 구성", desc: "자연어로 원하는 시나리오를 설명하면, AI가 최적의 실행 흐름을 자동 구축합니다." },
        { icon: "📈", title: "자동 시각 분석 보고서", desc: "매주/매월 말에 생성되는 복잡한 업무 성과 데이터를 대시보드 리포트로 즉시 변환합니다." }
      ]
    },
    schema: {
      sectionBadge: { type: "text", label: "상단 배지 설명" },
      sectionTitle: { type: "text", label: "대표 타이틀" },
      sectionDesc: { type: "textarea", label: "대표 설명문" },
      features: {
        type: "array",
        label: "핵심 특징 목록",
        itemSchema: {
          icon: { type: "text", label: "이모지 아이콘" },
          title: { type: "text", label: "특징 제목" },
          desc: { type: "textarea", label: "상세 설명" }
        }
      }
    },
    render(props) {
      const items = props.features || [];
      const gridHtml = items
        .map(item => `
          <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 bg-indigo-50 text-2xl rounded-2xl flex items-center justify-center mb-6 text-indigo-600">${item.icon}</div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">${item.title}</h3>
            <p class="text-slate-600 leading-relaxed text-sm md:text-base">${item.desc}</p>
          </div>
        `).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-slate-50/50" id="features">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-2xl mx-auto mb-16">
              <span class="px-4 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full uppercase tracking-wider">${props.sectionBadge}</span>
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-5 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed">${props.sectionDesc}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              ${gridHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Stats_Banner: {
    name: "주요 실적 배너 (Stats_Banner)",
    icon: "📊",
    defaultProps: {
      bgColor: "bg-indigo-600",
      stats: [
        { value: "99.8%", label: "자동화 성공률" },
        { value: "15,000+", label: "글로벌 협업 팀" },
        { value: "3.2억", label: "누적 절약 시간 (시)" },
        { value: "48%", label: "평균 개발 비용 절감" }
      ]
    },
    schema: {
      bgColor: {
        type: "select",
        label: "배경 테마",
        options: [
          { value: "bg-indigo-600", label: "인디고 블루" },
          { value: "bg-slate-900", label: "다크 차콜" },
          { value: "bg-emerald-600", label: "에메랄드 그린" }
        ]
      },
      stats: {
        type: "array",
        label: "성과 통계 항목 (최대 4개 권장)",
        itemSchema: {
          value: { type: "text", label: "숫자/값 (예: 99.8%)" },
          label: { type: "text", label: "설명 이름 (예: 고객 만족도)" }
        }
      }
    },
    render(props) {
      const items = props.stats || [];
      const statsHtml = items
        .map(stat => `
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">${stat.value}</div>
            <div class="text-indigo-100/80 text-sm md:text-base font-medium">${stat.label}</div>
          </div>
        `).join('');

      return `
        <section class="${props.bgColor || 'bg-indigo-600'} py-16 px-6 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div class="max-w-6xl mx-auto relative z-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              ${statsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Testimonials_Grid: {
    name: "고객 추천 (Testimonials_Grid)",
    icon: "💬",
    defaultProps: {
      sectionTitle: "수많은 기업이 AutoWork와 함께하고 있습니다",
      sectionDesc: "수작업 워크플로우에서 벗어나 업무 속도 향상을 체감한 팀의 생생한 목소리를 확인하세요.",
      testimonials: [
        {
          avatar: "👨‍💻",
          name: "김민재",
          role: "토스 개발 리드",
          quote: "매일 아침 1시간 넘게 걸리던 에러 리포트 수집 및 분류 작업이 AutoWork 도입 후 1분 만에 자동으로 완료됩니다. 삶의 질이 달라졌습니다."
        },
        {
          avatar: "👩‍💼",
          name: "이지은",
          role: "카카오 마케터",
          quote: "주기적인 데이터 백업 및 광고 채널 지표 추출 작업이 자동화되어서, 이제는 순수 크리에이티브 기획에만 에너지를 쏟을 수 있습니다."
        },
        {
          avatar: "🚀",
          name: "David Smith",
          role: "Global Ops Specialist",
          quote: "The seamless integration with multi-language parsing works perfectly. Highly recommend this for multinational scale businesses."
        }
      ]
    },
    schema: {
      sectionTitle: { type: "text", label: "타이틀" },
      sectionDesc: { type: "textarea", label: "상세 설명문" },
      testimonials: {
        type: "array",
        label: "고객 리뷰 목록",
        itemSchema: {
          avatar: { type: "text", label: "아바타 (이모지 또는 이모티콘)" },
          name: { type: "text", label: "고객 성명" },
          role: { type: "text", label: "직책 및 소속" },
          quote: { type: "textarea", label: "리뷰 본문" }
        }
      }
    },
    render(props) {
      const items = props.testimonials || [];
      const cardsHtml = items
        .map(t => `
          <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl">${t.avatar}</div>
              <div>
                <h4 class="font-bold text-slate-900">${t.name}</h4>
                <p class="text-xs text-indigo-600 font-semibold mt-0.5">${t.role}</p>
              </div>
            </div>
            <p class="text-slate-600 italic leading-relaxed text-sm md:text-base">"${t.quote}"</p>
          </div>
        `).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-slate-50/30" id="testimonials">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-2xl mx-auto mb-16">
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed">${props.sectionDesc}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              ${cardsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Pricing_Three_Tier: {
    name: "3단계 요금제 (Pricing_Three_Tier)",
    icon: "💳",
    defaultProps: {
      sectionTitle: "비즈니스 규모에 알맞은 요금제를 선택하세요",
      sectionDesc: "합리적인 가격으로 업무 자동화를 도입하고, 팀의 생산성을 극대화하세요. 모든 플랜은 14일 무료 체험을 제공합니다.",
      plans: [
        {
          name: "스타터 플랜",
          price: "₩29,000",
          period: "월",
          features: "기본 자동화 플로우 10개, 월 실행 횟수 5,000회, 슬랙/디스코드 연동, 1인 관리 담당자",
          buttonText: "스타터 무료 시작",
          isPopular: false
        },
        {
          name: "프로 플랜",
          price: "₩89,000",
          period: "월",
          features: "제한 없는 자동화 플로우, 월 실행 횟수 50,000회, 지연 없는 실행 속도, 연동 툴 전체 지원, 24시간 우선 지원",
          buttonText: "프로 무료 체험 신청",
          isPopular: true
        },
        {
          name: "엔터프라이즈",
          price: "별도 문의",
          period: "연",
          features: "실행 횟수 무제한, 사내망(온프레미스) 구축 가능, 전담 어카운트 매니저 배정, 커스텀 API 통합 설계",
          buttonText: "도입 관련 상담 요청",
          isPopular: false
        }
      ]
    },
    schema: {
      sectionTitle: { type: "text", label: "대타이틀" },
      sectionDesc: { type: "textarea", label: "설명구문" },
      plans: {
        type: "array",
        label: "요금제 목록 (3개 추천)",
        itemSchema: {
          name: { type: "text", label: "플랜 이름" },
          price: { type: "text", label: "플랜 가격" },
          period: { type: "text", label: "청구 단위 (예: 월, 년)" },
          features: { type: "textarea", label: "제공 혜택 (쉼표로 구분)" },
          buttonText: { type: "text", label: "결제/행동유도 버튼 문구" },
          isPopular: { type: "select", label: "인기 플랜 여부", options: [{value: "false", label: "보통"}, {value: "true", label: "인기/추천"}] }
        }
      }
    },
    render(props) {
      const items = props.plans || [];
      const cardsHtml = items.map(p => {
        const isPop = p.isPopular === "true" || p.isPopular === true;
        const featuresList = (p.features || "")
          .split(",")
          .map(f => f.trim())
          .filter(f => f.length > 0)
          .map(f => `
            <li class="flex items-start gap-3 text-slate-600 text-sm md:text-base">
              <svg class="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
              <span>${f}</span>
            </li>
          `).join('');

        return `
          <div class="p-8 rounded-3xl bg-white border ${isPop ? 'border-indigo-600 shadow-xl relative md:-translate-y-4' : 'border-slate-200/80 shadow-sm'} flex flex-col justify-between">
            <div>
              ${isPop ? '<span class="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full tracking-wider">추천 플랜</span>' : ''}
              <h3 class="text-xl font-bold text-slate-900 mb-2">${p.name}</h3>
              <div class="flex items-baseline gap-1 my-6">
                <span class="text-4xl font-extrabold text-slate-900 tracking-tight">${p.price}</span>
                <span class="text-slate-500 font-medium">/${p.period}</span>
              </div>
              <ul class="space-y-4 mb-8">
                ${featuresList}
              </ul>
            </div>
            <button class="w-full py-4 px-6 rounded-2xl font-bold text-center text-sm md:text-base tracking-wide transition-all ${isPop ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg' : 'bg-slate-50 text-indigo-600 hover:bg-indigo-50 border border-indigo-50'} active:scale-98">
              ${p.buttonText}
            </button>
          </div>
        `;
      }).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-white" id="pricing">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-2xl mx-auto mb-16">
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed">${props.sectionDesc}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-6">
              ${cardsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  FAQ_Accordion: {
    name: "자주 묻는 질문 (FAQ_Accordion)",
    icon: "🙋",
    defaultProps: {
      sectionTitle: "자주 묻는 질문",
      faqs: [
        {
          question: "코딩을 전혀 모르는 비개발자도 정말 사용할 수 있나요?",
          answer: "네, 맞습니다! 드래그 앤 드롭 형태의 노코드 시나리오 편집기를 제공하며, 자연어 설명 방식으로 입력하면 AI가 동작 프로세스를 시각적으로 자동 구성해 줍니다."
        },
        {
          question: "보안이 중요한 금융/인사 데이터 전송도 안심할 수 있나요?",
          answer: "AutoWork는 모든 입출력 데이터를 AES-256 방식으로 군용 등급으로 암호화하여 통신합니다. 추가적인 보안 통제가 필요할 시 사내 서버에 바로 배치할 수 있는 온프레미스 엔진(Enterprise 플랜 전용)을 제공합니다."
        },
        {
          question: "무료 체험이 종료된 후에 바로 결제가 진행되나요?",
          answer: "아닙니다! 14일간의 무료 라이선스 사용 기한이 만료되더라도 사전 승인 동의 없이 자동 정기 청구되지 않으니, 안심하고 충분히 검토해 보실 수 있습니다."
        }
      ]
    },
    schema: {
      sectionTitle: { type: "text", label: "대타이틀" },
      faqs: {
        type: "array",
        label: "자주 묻는 질문 목록",
        itemSchema: {
          question: { type: "text", label: "질문 (Question)" },
          answer: { type: "textarea", label: "답변 (Answer)" }
        }
      }
    },
    render(props) {
      const items = props.faqs || [];
      const faqsHtml = items.map((f, i) => `
        <div class="border-b border-slate-200 py-5">
          <button class="faq-toggle w-full flex items-center justify-between text-left focus:outline-none py-2" data-index="${i}">
            <span class="text-base md:text-lg font-bold text-slate-800 hover:text-indigo-600 transition-colors">${f.question}</span>
            <svg class="faq-icon w-5 h-5 text-slate-500 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div class="faq-content hidden mt-3 pr-8">
            <p class="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-line">${f.answer}</p>
          </div>
        </div>
      `).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-slate-50/50">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-extrabold text-slate-900 text-center mb-12 tracking-tight">${props.sectionTitle}</h2>
            <div class="divide-y divide-slate-200">
              ${faqsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  CTA_Banner: {
    name: "행동 유도 배너 (CTA_Banner)",
    icon: "🎯",
    defaultProps: {
      headline: "업무 혁신, 더 이상 망설이지 마세요.",
      subheadline: "불필요한 반복 행위를 정리하고 혁신적인 가치를 만드는 작업에만 에너지를 집중하세요.",
      buttonText: "전문가와 즉시 상담하기",
      bgColor: "bg-indigo-600"
    },
    schema: {
      headline: { type: "text", label: "대표 헤드라인" },
      subheadline: { type: "textarea", label: "보조 상세 설명문" },
      buttonText: { type: "text", label: "중앙 핵심 버튼 문구" },
      bgColor: {
        type: "select",
        label: "배경 테마",
        options: [
          { value: "bg-indigo-600", label: "인디고 블루 그라데이션" },
          { value: "bg-slate-900", label: "다크 차콜 슬레이트" },
          { value: "bg-emerald-600", label: "에메랄드 포레스트" }
        ]
      }
    },
    render(props) {
      let bgClass = "bg-gradient-to-r from-indigo-600 to-violet-600";
      if (props.bgColor === "bg-slate-900") {
        bgClass = "bg-gradient-to-r from-slate-900 to-slate-800";
      } else if (props.bgColor === "bg-emerald-600") {
        bgClass = "bg-gradient-to-r from-emerald-600 to-teal-600";
      }

      return `
        <section class="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div class="max-w-5xl mx-auto ${bgClass} rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
            <!-- Decorative shapes -->
            <div class="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 -translate-y-12"></div>
            <div class="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-12 translate-y-12"></div>
            
            <div class="relative z-10 max-w-2xl mx-auto">
              <h2 class="text-3xl md:text-4xl font-extrabold mb-5 tracking-tight">${props.headline}</h2>
              <p class="text-indigo-100/90 leading-relaxed mb-8 text-sm md:text-base font-light">${props.subheadline}</p>
              <button class="px-8 py-4 text-base font-bold text-indigo-600 bg-white rounded-2xl shadow-lg hover:bg-slate-50 hover:shadow-xl active:scale-98 transition-all">
                ${props.buttonText}
              </button>
            </div>
          </div>
        </section>
      `;
    }
  },

  Footer_Simple: {
    name: "심플 푸터 (Footer_Simple)",
    icon: "📝",
    defaultProps: {
      logoText: "AutoWork AI",
      copyrightText: "© 2026 AutoWork AI Inc. All rights reserved.",
      links: [
        { label: "이용약관", url: "#" },
        { label: "개인정보처리방침", url: "#" },
        { label: "고객지원", url: "#" }
      ]
    },
    schema: {
      logoText: { type: "text", label: "푸터 로고 텍스트" },
      copyrightText: { type: "text", label: "저작권 문구" },
      links: {
        type: "array",
        label: "푸터 메뉴 링크",
        itemSchema: {
          label: { type: "text", label: "이름" },
          url: { type: "text", label: "경로 (URL)" }
        }
      }
    },
    render(props) {
      const items = props.links || [];
      const linksHtml = items
        .map(link => `<li><a href="${link.url}" class="hover:text-white transition-colors">${link.label}</a></li>`)
        .join('');

      return `
        <footer class="bg-slate-900 text-slate-400 py-12 px-6 md:px-12 border-t border-slate-800">
          <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</span>
              <span class="text-white font-bold text-lg">${props.logoText}</span>
            </div>
            <ul class="flex flex-wrap justify-center items-center gap-6 text-sm">
              ${linksHtml}
            </ul>
            <div class="text-xs text-slate-500">${props.copyrightText}</div>
          </div>
        </footer>
      `;
    }
  },

  Hero_Split: {
    name: "좌우 분할 히어로 (Hero_Split)",
    icon: "🌗",
    defaultProps: {
      title: "일하는 방식을\n혁신하는 스마트 AI",
      subtitle: "단순 복사 붙여넣기부터 크롤링, 보고서 작성까지 모든 워크플로우를 알아서 처리하는 최적의 통합 도구입니다.",
      primaryButtonText: "지금 무료 시작하기",
      secondaryButtonText: "기능 문의하기",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    },
    schema: {
      title: { type: "textarea", label: "헤드라인 (줄바꿈 가능)" },
      subtitle: { type: "textarea", label: "보조 서브 설명" },
      primaryButtonText: { type: "text", label: "주요 버튼 문구" },
      secondaryButtonText: { type: "text", label: "보조 버튼 문구" },
      imageSrc: { type: "text", label: "우측 이미지 주소 (URL)" }
    },
    render(props) {
      return `
        <section class="py-20 md:py-28 px-6 bg-slate-50/30 overflow-hidden">
          <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6 whitespace-pre-line tracking-tight">
                ${props.title}
              </h1>
              <p class="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                ${props.subtitle}
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all">${props.primaryButtonText}</button>
                <button class="px-6 py-3.5 text-sm font-semibold text-indigo-600 bg-white border border-indigo-100 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all">${props.secondaryButtonText}</button>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -inset-1 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-[32px] blur-xl opacity-20"></div>
              <img src="${props.imageSrc || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'}" alt="Hero graphics" class="relative rounded-[32px] border border-slate-100 shadow-2xl object-cover w-full h-[350px] md:h-[400px]">
            </div>
          </div>
        </section>
      `;
    }
  },

  Image_Gallery: {
    name: "이미지 갤러리 (Image_Gallery)",
    icon: "🖼️",
    defaultProps: {
      sectionTitle: "스마트 대시보드 화면 갤러리",
      sectionDesc: "AutoWork가 제공하는 직관적이고 강력한 실시간 모니터링 환경을 미리 확인해 보세요.",
      images: [
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", title: "통계 데이터 시각화", desc: "모든 업무 흐름을 차트 및 도표로 변환하여 성과 추이를 직관적으로 확인합니다." },
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop", title: "워크플로우 매니저", desc: "시나리오 트리를 조작하여 누구나 개발자 도움 없이 새 업무 규칙을 생성합니다." }
      ]
    },
    schema: {
      sectionTitle: { type: "text", label: "대타이틀" },
      sectionDesc: { type: "textarea", label: "소개글" },
      images: {
        type: "array",
        label: "갤러리 이미지 카드 목록",
        itemSchema: {
          src: { type: "text", label: "이미지 URL" },
          title: { type: "text", label: "카드 제목" },
          desc: { type: "textarea", label: "카드 설명" }
        }
      }
    },
    render(props) {
      const items = props.images || [];
      const cardsHtml = items.map(img => `
        <div class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <img src="${img.src || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop'}" alt="${img.title}" class="w-full h-48 object-cover border-b border-slate-50">
          <div class="p-6">
            <h4 class="font-bold text-slate-900 text-lg mb-2">${img.title}</h4>
            <p class="text-sm text-slate-600 leading-relaxed">${img.desc}</p>
          </div>
        </div>
      `).join('');

      return `
        <section class="py-20 md:py-24 px-6 bg-white">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <h2 class="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed">${props.sectionDesc}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              ${cardsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Contact_Form: {
    name: "문의 접수 폼 (Contact_Form)",
    icon: "✉️",
    defaultProps: {
      sectionTitle: "무료 상담 및 비즈니스 문의",
      sectionDesc: "AutoWork 도입 및 연동 가능 여부를 확인하기 위해 문의를 주시면 24시간 이내 연락해 드립니다.",
      emailPlaceholder: "이메일 주소를 입력해 주세요 (user@company.com)",
      messagePlaceholder: "문의하실 상세 내용을 편안하게 작성해 주세요.",
      buttonText: "상담 신청하기"
    },
    schema: {
      sectionTitle: { type: "text", label: "대타이틀" },
      sectionDesc: { type: "textarea", label: "소개 설명글" },
      emailPlaceholder: { type: "text", label: "이메일 란 안내문구" },
      messagePlaceholder: { type: "text", label: "메시지 란 안내문구" },
      buttonText: { type: "text", label: "문의 전송 버튼 문구" }
    },
    render(props) {
      return `
        <section class="py-20 md:py-24 px-6 bg-slate-50/50">
          <div class="max-w-xl mx-auto bg-white border border-slate-100 p-8 md:p-12 rounded-[32px] shadow-xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full translate-x-10 -translate-y-10"></div>
            
            <div class="relative z-10">
              <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 text-center mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-sm text-slate-600 text-center mb-8 leading-relaxed">${props.sectionDesc}</p>
              
              <form class="space-y-4" onsubmit="event.preventDefault(); alert('문의가 성공적으로 전송되었습니다! 담당 팀이 빠르게 연락드리겠습니다.');">
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">이메일 주소</label>
                  <input type="email" required placeholder="${props.emailPlaceholder}" class="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl p-3 text-slate-900 text-sm outline-none transition-all">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">문의 사항</label>
                  <textarea required rows="4" placeholder="${props.messagePlaceholder}" class="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl p-3 text-slate-900 text-sm outline-none transition-all resize-none"></textarea>
                </div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-4 rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all text-sm tracking-wide">
                  ${props.buttonText}
                </button>
              </form>
            </div>
          </div>
        </section>
      `;
    }
  },

  Logo_Carousel: {
    name: "파트너 로고 캐러셀 (Logo_Carousel)",
    icon: "🏢",
    defaultProps: {
      sectionLabel: "신뢰할 수 있는 파트너사와 함께합니다",
      logos: [
        { name: "Samsung", emoji: "🔵" },
        { name: "Naver", emoji: "🟢" },
        { name: "Kakao", emoji: "🟡" },
        { name: "Toss", emoji: "🔷" },
        { name: "LINE", emoji: "🟩" },
        { name: "Coupang", emoji: "🟠" },
        { name: "Hyundai", emoji: "🔹" },
        { name: "SK", emoji: "🔴" }
      ],
      bgColor: "bg-white"
    },
    schema: {
      sectionLabel: { type: "text", label: "상단 안내 문구" },
      bgColor: {
        type: "select",
        label: "배경색",
        options: [
          { value: "bg-white", label: "흰색" },
          { value: "bg-slate-50", label: "연한 회색" },
          { value: "bg-slate-900", label: "다크 모드" }
        ]
      },
      logos: {
        type: "array",
        label: "파트너사 목록",
        itemSchema: {
          name: { type: "text", label: "회사 이름" },
          emoji: { type: "text", label: "이모지 아이콘" }
        }
      }
    },
    render(props) {
      const isDark = props.bgColor === "bg-slate-900";
      const textColor = isDark ? "text-slate-400" : "text-slate-400";
      const logoColor = isDark ? "text-slate-300" : "text-slate-600";
      const items = props.logos || [];
      const logosHtml = items.map(l => `
        <div class="flex-shrink-0 flex items-center gap-3 px-8 py-4 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50/80'} rounded-2xl border ${isDark ? 'border-slate-700' : 'border-slate-100'} hover:scale-105 transition-transform duration-300">
          <span class="text-2xl">${l.emoji}</span>
          <span class="font-bold ${logoColor} text-sm tracking-wide">${l.name}</span>
        </div>
      `).join('');

      // Duplicate for infinite scroll effect
      return `
        <section class="${props.bgColor || 'bg-white'} py-12 px-6 overflow-hidden">
          <div class="max-w-6xl mx-auto">
            <p class="text-center text-xs font-semibold ${textColor} uppercase tracking-[0.2em] mb-8">${props.sectionLabel}</p>
            <div class="relative">
              <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${isDark ? 'from-slate-900' : 'from-white'} to-transparent z-10"></div>
              <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${isDark ? 'from-slate-900' : 'from-white'} to-transparent z-10"></div>
              <div class="flex gap-6 animate-marquee">
                ${logosHtml}
                ${logosHtml}
              </div>
            </div>
          </div>
          <style>
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-marquee { animation: marquee 25s linear infinite; width: max-content; }
            .animate-marquee:hover { animation-play-state: paused; }
          </style>
        </section>
      `;
    }
  },

  Social_Proof: {
    name: "소셜 증거 배너 (Social_Proof)",
    icon: "⭐",
    defaultProps: {
      rating: "4.9",
      reviewCount: "2,847",
      reviewSource: "G2 & Capterra 인증 평가",
      badges: [
        { icon: "🏆", label: "2026 올해의 SaaS 혁신상" },
        { icon: "🛡️", label: "ISO 27001 인증 보안" },
        { icon: "⚡", label: "99.99% 가동률 보장" },
        { icon: "🌏", label: "48개국 글로벌 서비스" }
      ]
    },
    schema: {
      rating: { type: "text", label: "평균 평점 (예: 4.9)" },
      reviewCount: { type: "text", label: "리뷰 건수 (예: 2,847)" },
      reviewSource: { type: "text", label: "리뷰 출처 설명" },
      badges: {
        type: "array",
        label: "신뢰 배지 목록",
        itemSchema: {
          icon: { type: "text", label: "이모지 아이콘" },
          label: { type: "text", label: "배지 설명" }
        }
      }
    },
    render(props) {
      const stars = "★".repeat(Math.floor(parseFloat(props.rating || "5")));
      const items = props.badges || [];
      const badgesHtml = items.map(b => `
        <div class="flex items-center gap-3 px-5 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
          <span class="text-lg">${b.icon}</span>
          <span class="text-sm font-semibold text-slate-700">${b.label}</span>
        </div>
      `).join('');

      return `
        <section class="py-14 px-6 bg-gradient-to-b from-amber-50/60 to-white border-y border-amber-100/50">
          <div class="max-w-5xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
              <div class="flex items-center gap-3">
                <span class="text-3xl font-extrabold text-slate-900">${props.rating}</span>
                <div>
                  <div class="text-amber-400 text-lg tracking-wider">${stars}</div>
                  <p class="text-xs text-slate-500 font-medium">${props.reviewCount}개 리뷰 기반</p>
                </div>
              </div>
              <div class="hidden md:block w-px h-10 bg-slate-200"></div>
              <p class="text-sm text-slate-500 font-medium">${props.reviewSource}</p>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
              ${badgesHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Before_After: {
    name: "비포/애프터 비교 (Before_After)",
    icon: "🔄",
    defaultProps: {
      sectionTitle: "AutoWork 도입 전/후, 이렇게 달라집니다",
      sectionDesc: "실제 기업 고객 데이터 기반으로 측정된 업무 혁신의 결과를 직접 확인하세요.",
      beforeTitle: "도입 전 ❌",
      afterTitle: "도입 후 ✅",
      comparisons: [
        { before: "매일 반복되는 수동 데이터 입력 3시간", after: "AI 자동 수집으로 3분 완료" },
        { before: "주간 보고서 엑셀 수작업 6시간", after: "실시간 대시보드 자동 생성" },
        { before: "인사/급여 정산 실수로 인한 분쟁", after: "100% 정확도 자동 계산 시스템" },
        { before: "고객 문의 응대 평균 24시간 대기", after: "AI 챗봇 즉시 응답 + 에스컬레이션" }
      ]
    },
    schema: {
      sectionTitle: { type: "text", label: "섹션 타이틀" },
      sectionDesc: { type: "textarea", label: "서브 설명" },
      beforeTitle: { type: "text", label: "도입 전 라벨" },
      afterTitle: { type: "text", label: "도입 후 라벨" },
      comparisons: {
        type: "array",
        label: "비교 항목 목록",
        itemSchema: {
          before: { type: "text", label: "도입 전 상황" },
          after: { type: "text", label: "도입 후 변화" }
        }
      }
    },
    render(props) {
      const items = props.comparisons || [];
      const rowsHtml = items.map(c => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div class="p-5 bg-red-50/60 border-b border-r border-red-100 flex items-start gap-3">
            <span class="text-red-400 font-bold text-sm mt-0.5">✕</span>
            <span class="text-slate-700 text-sm leading-relaxed">${c.before}</span>
          </div>
          <div class="p-5 bg-emerald-50/60 border-b border-emerald-100 flex items-start gap-3">
            <span class="text-emerald-500 font-bold text-sm mt-0.5">✓</span>
            <span class="text-slate-700 text-sm leading-relaxed font-medium">${c.after}</span>
          </div>
        </div>
      `).join('');

      return `
        <section class="py-20 md:py-24 px-6 bg-white">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed max-w-2xl mx-auto">${props.sectionDesc}</p>
            </div>
            <div class="rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
              <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="p-4 bg-red-100/70 text-center border-b border-r border-red-200">
                  <span class="font-bold text-red-600 text-sm uppercase tracking-wider">${props.beforeTitle}</span>
                </div>
                <div class="p-4 bg-emerald-100/70 text-center border-b border-emerald-200">
                  <span class="font-bold text-emerald-600 text-sm uppercase tracking-wider">${props.afterTitle}</span>
                </div>
              </div>
              ${rowsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Newsletter_CTA: {
    name: "뉴스레터 구독 CTA (Newsletter_CTA)",
    icon: "📬",
    defaultProps: {
      headline: "업무 자동화 트렌드를 가장 먼저 받아보세요",
      subtitle: "매주 업계 최신 AI 자동화 인사이트, 활용 팁, 무료 템플릿을 이메일로 전달해 드립니다. 3만 명의 구독자와 함께하세요.",
      inputPlaceholder: "work@company.com",
      buttonText: "무료 구독 시작하기",
      privacyNote: "스팸은 절대 보내지 않습니다. 언제든 구독 취소가 가능합니다."
    },
    schema: {
      headline: { type: "text", label: "대타이틀" },
      subtitle: { type: "textarea", label: "설명글" },
      inputPlaceholder: { type: "text", label: "이메일 입력 안내문" },
      buttonText: { type: "text", label: "구독 버튼 텍스트" },
      privacyNote: { type: "text", label: "하단 개인정보 안내문" }
    },
    render(props) {
      return `
        <section class="py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
          <!-- Animated gradient orbs -->
          <div class="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/15 rounded-full blur-[80px] animate-pulse"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s;"></div>
          
          <div class="max-w-2xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-indigo-200 mb-6 backdrop-blur-sm">
              <span>📬</span> 뉴스레터
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-5 tracking-tight leading-tight">${props.headline}</h2>
            <p class="text-indigo-200/70 leading-relaxed mb-8 text-sm md:text-base font-light">${props.subtitle}</p>
            
            <form class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onsubmit="event.preventDefault(); alert('구독이 완료되었습니다! 🎉 환영합니다!');">
              <input type="email" required placeholder="${props.inputPlaceholder}" class="flex-1 px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder-indigo-300/50 text-sm outline-none focus:border-indigo-400 focus:bg-white/15 backdrop-blur-sm transition-all">
              <button type="submit" class="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 hover:shadow-xl active:scale-98 transition-all text-sm whitespace-nowrap">
                ${props.buttonText}
              </button>
            </form>
            
            <p class="text-xs text-indigo-300/40 mt-5 font-medium">${props.privacyNote}</p>
          </div>
        </section>
      `;
    }
  },

  Card_News_Carousel: {
    name: "카드뉴스 캐러셀 (Card_News_Carousel)",
    icon: "📰",
    defaultProps: {
      sectionBadge: "왜 AutoWork인가?",
      sectionTitle: "이런 불편함, 더 이상 겪지 마세요",
      sectionDesc: "많은 팀들이 겪고 있는 업무 비효율의 원인과 해결책을 카드뉴스로 확인하세요.",
      autoPlaySpeed: 5000,
      ctaUrl: "#pricing",
      cards: [
        {
          painIcon: "😩",
          painTitle: "매일 같은 복사-붙여넣기 반복",
          painDesc: "엑셀에서 데이터 복사하고, 이메일 보내고, 보고서에 다시 붙여넣고... 하루의 절반이 단순 반복 작업에 사라집니다.",
          solveIcon: "🤖",
          solveTitle: "AI가 자동으로 처리합니다",
          solveDesc: "데이터 수집 → 가공 → 전달까지 원클릭 자동화. 3시간 걸리던 작업이 3분으로 단축됩니다.",
          ctaText: "자동화 체험하기 →",
          gradient: "from-rose-500 to-orange-400"
        },
        {
          painIcon: "📊",
          painTitle: "보고서를 만드는 데만 반나절",
          painDesc: "여러 부서의 데이터를 모아서 차트를 그리고 포맷을 맞추는 데 매주 6시간 이상 소비하고 있다면?",
          solveIcon: "📈",
          solveTitle: "실시간 대시보드 자동 생성",
          solveDesc: "연동된 데이터 소스에서 자동으로 시각화 리포트가 생성됩니다. 항상 최신 상태, 클릭 한 번으로 공유.",
          ctaText: "대시보드 데모 보기 →",
          gradient: "from-blue-500 to-cyan-400"
        },
        {
          painIcon: "🤯",
          painTitle: "팀원마다 다른 방식, 실수 반복",
          painDesc: "인수인계가 안 되고, 매번 사람마다 다르게 처리하다 실수와 누락이 반복됩니다. 표준화가 절실합니다.",
          solveIcon: "✅",
          solveTitle: "워크플로우 표준화 완성",
          solveDesc: "드래그 앤 드롭으로 표준 업무 프로세스를 설계하세요. 누가 해도 동일한 품질과 속도로 처리됩니다.",
          ctaText: "프로세스 설계 시작 →",
          gradient: "from-violet-500 to-purple-400"
        },
        {
          painIcon: "⏰",
          painTitle: "고객 응대가 항상 늦어요",
          painDesc: "고객 문의가 밀리고, 응대 시간이 길어지면서 고객 만족도와 재구매율이 계속 떨어집니다.",
          solveIcon: "⚡",
          solveTitle: "AI 챗봇 즉시 응답 시스템",
          solveDesc: "24시간 AI가 즉시 응답하고, 복잡한 건만 담당자에게 자동 에스컬레이션. 응대 만족도 95% 달성.",
          ctaText: "AI 챗봇 도입하기 →",
          gradient: "from-emerald-500 to-teal-400"
        },
        {
          painIcon: "💸",
          painTitle: "마케팅 예산, 어디로 새는 거죠?",
          painDesc: "광고비를 쓰고 있지만 어떤 채널이 효과적인지 모르겠고, ROI 측정은 항상 후순위입니다.",
          solveIcon: "🎯",
          solveTitle: "채널별 ROAS 실시간 추적",
          solveDesc: "모든 마케팅 터치포인트의 성과를 실시간 추적하고, AI가 예산 재분배를 자동으로 추천합니다.",
          ctaText: "ROAS 분석 시작 →",
          gradient: "from-amber-500 to-yellow-400"
        }
      ]
    },
    schema: {
      sectionBadge: { type: "text", label: "배지 텍스트" },
      sectionTitle: { type: "text", label: "섹션 타이틀" },
      sectionDesc: { type: "textarea", label: "섹션 설명" },
      autoPlaySpeed: { type: "text", label: "자동 재생 속도 (ms)" },
      ctaUrl: { type: "text", label: "CTA 버튼 링크" },
      cards: {
        type: "array",
        label: "카드 목록",
        itemSchema: {
          painIcon: { type: "text", label: "문제 이모지" },
          painTitle: { type: "text", label: "문제 제목" },
          painDesc: { type: "textarea", label: "문제 설명" },
          solveIcon: { type: "text", label: "해결 이모지" },
          solveTitle: { type: "text", label: "해결 제목" },
          solveDesc: { type: "textarea", label: "해결 설명" },
          ctaText: { type: "text", label: "CTA 버튼 텍스트" },
          gradient: { type: "text", label: "그라데이션 (from-색상 to-색상)" }
        }
      }
    },
    render(props) {
      const uid = 'cn_' + Math.random().toString(36).substr(2, 6);
      const cards = props.cards || [];
      const speed = parseInt(props.autoPlaySpeed) || 5000;

      const cardsHtml = cards.map((c, i) => `
        <div class="cn-card flex-shrink-0 w-full px-4" data-index="${i}" style="min-width:100%;">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-shadow duration-300" style="max-width:800px; margin:0 auto;">
            <!-- Pain Point Section -->
            <div class="bg-gradient-to-r ${c.gradient} p-8 md:p-10 text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-sm">😫 불편함 #${i+1}</span>
                </div>
                <div class="text-4xl mb-4">${c.painIcon}</div>
                <h3 class="text-xl md:text-2xl font-extrabold mb-3 leading-tight">${c.painTitle}</h3>
                <p class="text-white/85 text-sm md:text-base leading-relaxed font-light">${c.painDesc}</p>
              </div>
            </div>
            <!-- Arrow Divider -->
            <div class="flex justify-center -mt-4 relative z-20">
              <div class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-slate-100">
                <span class="text-lg">⬇️</span>
              </div>
            </div>
            <!-- Solution Section -->
            <div class="p-8 md:p-10 -mt-4">
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">✅ 해결</span>
              </div>
              <div class="text-4xl mb-4">${c.solveIcon}</div>
              <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 leading-tight">${c.solveTitle}</h3>
              <p class="text-slate-600 text-sm md:text-base leading-relaxed mb-6">${c.solveDesc}</p>
              <a href="${props.ctaUrl || '#'}" class="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r ${c.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-200 text-sm">
                ${c.ctaText}
              </a>
            </div>
          </div>
        </div>
      `).join('');

      const dotsHtml = cards.map((_, i) => `
        <button class="cn-dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-indigo-500 w-8' : 'bg-slate-300 hover:bg-slate-400'}" data-slide="${i}" onclick="document.getElementById('${uid}').dataset.goto='${i}'; (${uid}_go)(${i});"></button>
      `).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" id="${uid}-section">
          <!-- Background decoration -->
          <div class="absolute top-20 left-10 w-64 h-64 bg-indigo-100/40 rounded-full blur-[80px]"></div>
          <div class="absolute bottom-20 right-10 w-80 h-80 bg-violet-100/30 rounded-full blur-[100px]"></div>

          <div class="max-w-6xl mx-auto relative z-10">
            <div class="text-center mb-14">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-600 mb-5">📰 ${props.sectionBadge}</span>
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">${props.sectionTitle}</h2>
              <p class="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">${props.sectionDesc}</p>
            </div>

            <!-- Carousel Container -->
            <div class="relative" id="${uid}">
              <div class="overflow-hidden rounded-2xl">
                <div class="cn-track flex transition-transform duration-500 ease-out" id="${uid}-track" style="transform: translateX(0%);">
                  ${cardsHtml}
                </div>
              </div>

              <!-- Navigation Arrows -->
              <button onclick="(${uid}_go)((parseInt(document.getElementById('${uid}').dataset.current||'0')-1+${cards.length})%${cards.length})" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-indigo-600 hover:scale-110 transition-all border border-slate-100 z-20">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onclick="(${uid}_go)((parseInt(document.getElementById('${uid}').dataset.current||'0')+1)%${cards.length})" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-indigo-600 hover:scale-110 transition-all border border-slate-100 z-20">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              </button>

              <!-- Dots + Counter -->
              <div class="flex items-center justify-center gap-3 mt-8">
                <div class="flex items-center gap-2" id="${uid}-dots">
                  ${dotsHtml}
                </div>
                <span class="text-xs font-semibold text-slate-400 ml-2" id="${uid}-counter">1 / ${cards.length}</span>
              </div>
            </div>
          </div>

          <script>
            (function() {
              var current = 0;
              var total = ${cards.length};
              var el = document.getElementById('${uid}');
              if (!el) return;
              el.dataset.current = '0';

              window.${uid}_go = function(idx) {
                current = ((idx % total) + total) % total;
                el.dataset.current = current;
                var track = document.getElementById('${uid}-track');
                if (track) track.style.transform = 'translateX(-' + (current * 100) + '%)';
                var dots = document.querySelectorAll('#${uid}-dots .cn-dot');
                dots.forEach(function(d, i) {
                  if (i === current) { d.className = 'cn-dot w-8 h-2.5 rounded-full transition-all duration-300 bg-indigo-500'; }
                  else { d.className = 'cn-dot w-2.5 h-2.5 rounded-full transition-all duration-300 bg-slate-300 hover:bg-slate-400'; }
                });
                var counter = document.getElementById('${uid}-counter');
                if (counter) counter.textContent = (current + 1) + ' / ' + total;
              };

              var autoTimer = setInterval(function() {
                ${uid}_go(current + 1);
              }, ${speed});

              el.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
              el.addEventListener('mouseleave', function() {
                autoTimer = setInterval(function() { ${uid}_go(current + 1); }, ${speed});
              });
            })();
          </script>
        </section>
      `;
    }
  },

  How_It_Works: {
    name: "도입 프로세스 3단계 (How_It_Works)",
    icon: "🪜",
    defaultProps: {
      sectionBadge: "시작은 간단합니다",
      sectionTitle: "3단계로 업무 자동화를 시작하세요",
      sectionDesc: "복잡한 설정 없이, 누구나 10분 안에 첫 자동화를 만들 수 있습니다.",
      steps: [
        {
          number: "01",
          title: "무료 계정 생성",
          desc: "이메일 하나로 30초 만에 가입하세요. 신용카드 없이 14일 무료 체험이 바로 시작됩니다.",
          icon: "📝",
          color: "from-blue-500 to-cyan-400"
        },
        {
          number: "02",
          title: "워크플로우 설계",
          desc: "드래그 앤 드롭으로 자동화 시나리오를 만들거나, AI에게 자연어로 설명하면 자동 생성됩니다.",
          icon: "⚙️",
          color: "from-violet-500 to-purple-400"
        },
        {
          number: "03",
          title: "자동화 실행 & 모니터링",
          desc: "실행 버튼 하나로 24/7 자동화가 시작됩니다. 실시간 대시보드에서 성과를 확인하세요.",
          icon: "🚀",
          color: "from-emerald-500 to-teal-400"
        }
      ]
    },
    schema: {
      sectionBadge: { type: "text", label: "배지 텍스트" },
      sectionTitle: { type: "text", label: "섹션 타이틀" },
      sectionDesc: { type: "textarea", label: "섹션 설명" },
      steps: {
        type: "array",
        label: "단계 목록",
        itemSchema: {
          number: { type: "text", label: "단계 번호 (01, 02 등)" },
          title: { type: "text", label: "단계 제목" },
          desc: { type: "textarea", label: "단계 설명" },
          icon: { type: "text", label: "이모지 아이콘" },
          color: { type: "text", label: "그라데이션 (from-색상 to-색상)" }
        }
      }
    },
    render(props) {
      const steps = props.steps || [];
      const stepsHtml = steps.map((s, i) => `
        <div class="relative flex flex-col items-center text-center group">
          <!-- Connector line -->
          ${i < steps.length - 1 ? `<div class="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r ${s.color} opacity-20"></div>` : ''}
          
          <div class="w-24 h-24 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 mb-6 relative">
            ${s.icon}
            <span class="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-extrabold text-slate-700 border-2 border-slate-100">${s.number}</span>
          </div>
          <h3 class="text-xl font-extrabold text-slate-900 mb-3">${s.title}</h3>
          <p class="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">${s.desc}</p>
        </div>
      `).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-white">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-2xl mx-auto mb-16">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-bold text-emerald-600 mb-5">${props.sectionBadge}</span>
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed">${props.sectionDesc}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              ${stepsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  ROI_Calculator: {
    name: "ROI 절감 계산기 (ROI_Calculator)",
    icon: "🧮",
    defaultProps: {
      sectionTitle: "우리 팀의 절감 효과를 직접 계산해 보세요",
      sectionDesc: "현재 업무 시간과 인건비를 입력하면, AutoWork 도입 시 예상 절감액을 실시간으로 확인할 수 있습니다.",
      hourlyRate: 35000,
      automationRate: 78,
      weeklyHours: 20,
      ctaText: "무료 체험으로 절감 시작하기 →",
      ctaUrl: "#pricing"
    },
    schema: {
      sectionTitle: { type: "text", label: "섹션 타이틀" },
      sectionDesc: { type: "textarea", label: "섹션 설명" },
      hourlyRate: { type: "text", label: "기본 시급 (원)" },
      automationRate: { type: "text", label: "자동화 절감 비율 (%)" },
      weeklyHours: { type: "text", label: "기본 주간 반복 업무 시간" },
      ctaText: { type: "text", label: "CTA 버튼 텍스트" },
      ctaUrl: { type: "text", label: "CTA 링크" }
    },
    render(props) {
      const uid = 'roi_' + Math.random().toString(36).substr(2, 6);
      const rate = parseInt(props.hourlyRate) || 35000;
      const autoRate = parseInt(props.automationRate) || 78;
      const defaultHours = parseInt(props.weeklyHours) || 20;

      return `
        <section class="py-20 md:py-28 px-6 bg-gradient-to-b from-slate-50 to-white">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed max-w-2xl mx-auto">${props.sectionDesc}</p>
            </div>

            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div class="p-8 md:p-10">
                <!-- Input Sliders -->
                <div class="space-y-8 mb-10">
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <label class="text-sm font-bold text-slate-700">주간 반복 업무 시간</label>
                      <span class="text-lg font-extrabold text-indigo-600" id="${uid}-hours-val">${defaultHours}시간</span>
                    </div>
                    <input type="range" min="5" max="80" value="${defaultHours}" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" id="${uid}-hours"
                      oninput="document.getElementById('${uid}-hours-val').textContent=this.value+'시간'; ${uid}_calc();">
                    <div class="flex justify-between text-xs text-slate-400 mt-1"><span>5시간</span><span>80시간</span></div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <label class="text-sm font-bold text-slate-700">팀 인원 수</label>
                      <span class="text-lg font-extrabold text-indigo-600" id="${uid}-people-val">5명</span>
                    </div>
                    <input type="range" min="1" max="50" value="5" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" id="${uid}-people"
                      oninput="document.getElementById('${uid}-people-val').textContent=this.value+'명'; ${uid}_calc();">
                    <div class="flex justify-between text-xs text-slate-400 mt-1"><span>1명</span><span>50명</span></div>
                  </div>
                </div>
              </div>

              <!-- Results Banner -->
              <div class="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 md:p-10 text-white relative overflow-hidden">
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px]"></div>
                <div class="relative z-10">
                  <p class="text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-4">예상 월간 절감 효과</p>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div class="text-center">
                      <div class="text-3xl md:text-4xl font-extrabold" id="${uid}-saved-hours">${Math.round(defaultHours * 5 * 4 * autoRate / 100)}시간</div>
                      <div class="text-indigo-200 text-sm mt-1">월간 절약 시간</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl md:text-4xl font-extrabold" id="${uid}-saved-money">₩${(Math.round(defaultHours * 5 * 4 * autoRate / 100 * rate / 10000)).toLocaleString()}만</div>
                      <div class="text-indigo-200 text-sm mt-1">월간 비용 절감</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl md:text-4xl font-extrabold" id="${uid}-saved-yearly">₩${(Math.round(defaultHours * 5 * 4 * autoRate / 100 * rate * 12 / 10000)).toLocaleString()}만</div>
                      <div class="text-indigo-200 text-sm mt-1">연간 비용 절감</div>
                    </div>
                  </div>
                  <div class="text-center">
                    <a href="${props.ctaUrl || '#'}" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl shadow-lg hover:bg-indigo-50 hover:shadow-xl hover:scale-105 active:scale-100 transition-all text-sm">
                      ${props.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <script>
            window.${uid}_calc = function() {
              var h = parseInt(document.getElementById('${uid}-hours').value) || ${defaultHours};
              var p = parseInt(document.getElementById('${uid}-people').value) || 5;
              var savedH = Math.round(h * p * 4 * ${autoRate} / 100);
              var savedM = Math.round(savedH * ${rate} / 10000);
              var savedY = savedM * 12;
              document.getElementById('${uid}-saved-hours').textContent = savedH.toLocaleString() + '시간';
              document.getElementById('${uid}-saved-money').textContent = '₩' + savedM.toLocaleString() + '만';
              document.getElementById('${uid}-saved-yearly').textContent = '₩' + savedY.toLocaleString() + '만';
            };
          </script>
        </section>
      `;
    }
  },

  Comparison_Table: {
    name: "경쟁사 비교표 (Comparison_Table)",
    icon: "⚔️",
    defaultProps: {
      sectionTitle: "왜 AutoWork를 선택해야 할까요?",
      sectionDesc: "주요 업무 자동화 플랫폼과의 객관적인 기능 비교표입니다.",
      brandName: "AutoWork AI",
      competitors: ["Z사 자동화", "M사 플로우"],
      features: [
        { name: "AI 자연어 워크플로우 설계", us: "✅", them: ["❌", "❌"] },
        { name: "노코드 드래그 앤 드롭 편집기", us: "✅", them: ["✅", "⚠️"] },
        { name: "실시간 대시보드 & 리포팅", us: "✅", them: ["⚠️", "✅"] },
        { name: "200+ 앱 네이티브 연동", us: "✅", them: ["✅", "❌"] },
        { name: "온프레미스 구축 옵션", us: "✅", them: ["❌", "❌"] },
        { name: "24/7 한국어 기술 지원", us: "✅", them: ["❌", "⚠️"] },
        { name: "14일 무료 체험 (카드 불필요)", us: "✅", them: ["❌", "✅"] },
        { name: "월 시작 가격", us: "₩29,000", them: ["$49/mo", "$35/mo"] }
      ]
    },
    schema: {
      sectionTitle: { type: "text", label: "섹션 타이틀" },
      sectionDesc: { type: "textarea", label: "섹션 설명" },
      brandName: { type: "text", label: "자사 브랜드 이름" },
      competitors: {
        type: "array",
        label: "경쟁사 이름 목록",
        itemSchema: {
          _value: { type: "text", label: "경쟁사 이름" }
        }
      },
      features: {
        type: "array",
        label: "비교 항목 목록",
        itemSchema: {
          name: { type: "text", label: "기능 이름" },
          us: { type: "text", label: "자사 (✅/❌/⚠️/텍스트)" }
        }
      }
    },
    render(props) {
      const comps = props.competitors || [];
      const feats = props.features || [];
      const compNames = comps.map(c => typeof c === 'string' ? c : c._value || '');

      const headerCells = compNames.map(n => `
        <th class="px-4 py-4 text-center text-sm font-semibold text-slate-500 whitespace-nowrap">${n}</th>
      `).join('');

      const rows = feats.map((f, i) => {
        const themCells = (f.them || []).map(v => `
          <td class="px-4 py-4 text-center text-sm ${v === '✅' ? 'text-emerald-500' : v === '❌' ? 'text-slate-300' : v === '⚠️' ? 'text-amber-400' : 'text-slate-600'}">${v}</td>
        `).join('');

        return `
          <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-indigo-50/30 transition-colors">
            <td class="px-6 py-4 text-sm font-medium text-slate-700">${f.name}</td>
            <td class="px-4 py-4 text-center text-sm font-bold ${f.us === '✅' ? 'text-emerald-500 text-lg' : 'text-indigo-600'}">${f.us}</td>
            ${themCells}
          </tr>
        `;
      }).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-slate-50/30">
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed max-w-2xl mx-auto">${props.sectionDesc}</p>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-x-auto">
              <table class="w-full min-w-[600px]">
                <thead>
                  <tr class="border-b-2 border-slate-100">
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">기능 비교</th>
                    <th class="px-4 py-4 text-center">
                      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full">
                        <span class="w-5 h-5 rounded bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold">A</span>
                        <span class="text-sm font-bold text-indigo-700">${props.brandName}</span>
                      </div>
                    </th>
                    ${headerCells}
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      `;
    }
  },

  Urgency_Banner: {
    name: "긴급 프로모션 배너 (Urgency_Banner)",
    icon: "⏰",
    defaultProps: {
      preText: "🔥 기간 한정 프로모션",
      headline: "지금 가입하면 첫 3개월 50% 할인",
      subText: "프로모션 종료까지 남은 시간",
      ctaText: "할인가로 시작하기 →",
      ctaUrl: "#pricing",
      endDate: "2026-06-30T23:59:59",
      bgGradient: "from-rose-600 via-pink-600 to-violet-600"
    },
    schema: {
      preText: { type: "text", label: "상단 텍스트 (이모지 포함)" },
      headline: { type: "text", label: "프로모션 헤드라인" },
      subText: { type: "text", label: "카운트다운 안내 문구" },
      ctaText: { type: "text", label: "CTA 버튼 텍스트" },
      ctaUrl: { type: "text", label: "CTA 링크" },
      endDate: { type: "text", label: "종료 일시 (YYYY-MM-DDTHH:mm:ss)" },
      bgGradient: {
        type: "select",
        label: "배경 그라데이션",
        options: [
          { value: "from-rose-600 via-pink-600 to-violet-600", label: "로즈 → 바이올렛" },
          { value: "from-amber-500 via-orange-500 to-red-500", label: "앰버 → 레드" },
          { value: "from-indigo-600 via-blue-600 to-cyan-500", label: "인디고 → 시안" }
        ]
      }
    },
    render(props) {
      const uid = 'urg_' + Math.random().toString(36).substr(2, 6);
      return `
        <section class="py-10 px-6 bg-gradient-to-r ${props.bgGradient} relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div class="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
          <div class="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16 animate-pulse" style="animation-delay:1s"></div>

          <div class="max-w-4xl mx-auto text-center relative z-10">
            <p class="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">${props.preText}</p>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">${props.headline}</h2>
            
            <p class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">${props.subText}</p>
            <div class="flex justify-center gap-3 mb-6" id="${uid}-countdown">
              <div class="bg-white/15 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
                <div class="text-2xl font-extrabold text-white" id="${uid}-d">00</div>
                <div class="text-[10px] text-white/60 font-semibold uppercase">일</div>
              </div>
              <div class="bg-white/15 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
                <div class="text-2xl font-extrabold text-white" id="${uid}-h">00</div>
                <div class="text-[10px] text-white/60 font-semibold uppercase">시간</div>
              </div>
              <div class="bg-white/15 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
                <div class="text-2xl font-extrabold text-white" id="${uid}-m">00</div>
                <div class="text-[10px] text-white/60 font-semibold uppercase">분</div>
              </div>
              <div class="bg-white/15 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
                <div class="text-2xl font-extrabold text-white" id="${uid}-s">00</div>
                <div class="text-[10px] text-white/60 font-semibold uppercase">초</div>
              </div>
            </div>
            
            <a href="${props.ctaUrl || '#'}" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-bold rounded-2xl shadow-xl hover:bg-pink-50 hover:shadow-2xl hover:scale-105 active:scale-100 transition-all text-sm">
              ${props.ctaText}
            </a>
          </div>

          <script>
            (function() {
              var end = new Date('${props.endDate || '2026-06-30T23:59:59'}').getTime();
              function tick() {
                var now = Date.now();
                var diff = Math.max(0, end - now);
                var d = Math.floor(diff / 86400000);
                var h = Math.floor((diff % 86400000) / 3600000);
                var m = Math.floor((diff % 3600000) / 60000);
                var s = Math.floor((diff % 60000) / 1000);
                var el_d = document.getElementById('${uid}-d');
                if (el_d) el_d.textContent = String(d).padStart(2, '0');
                var el_h = document.getElementById('${uid}-h');
                if (el_h) el_h.textContent = String(h).padStart(2, '0');
                var el_m = document.getElementById('${uid}-m');
                if (el_m) el_m.textContent = String(m).padStart(2, '0');
                var el_s = document.getElementById('${uid}-s');
                if (el_s) el_s.textContent = String(s).padStart(2, '0');
              }
              tick();
              setInterval(tick, 1000);
            })();
          </script>
        </section>
      `;
    }
  },

  Floating_CTA: {
    name: "플로팅 CTA 바 (Floating_CTA)",
    icon: "📌",
    defaultProps: {
      message: "지금 시작하면 14일 무료 체험 + 온보딩 지원까지 무료!",
      buttonText: "무료 체험 시작하기",
      buttonUrl: "#pricing",
      bgColor: "bg-slate-900"
    },
    schema: {
      message: { type: "text", label: "안내 메시지" },
      buttonText: { type: "text", label: "CTA 버튼 텍스트" },
      buttonUrl: { type: "text", label: "CTA 링크" },
      bgColor: {
        type: "select",
        label: "배경색",
        options: [
          { value: "bg-slate-900", label: "다크" },
          { value: "bg-indigo-600", label: "인디고" },
          { value: "bg-gradient-to-r from-indigo-600 to-violet-600", label: "그라데이션" }
        ]
      }
    },
    render(props) {
      return `
        <div class="fixed bottom-0 left-0 right-0 ${props.bgColor || 'bg-slate-900'} border-t border-white/10 py-3 px-6 z-50 shadow-2xl backdrop-blur-md">
          <div class="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <p class="text-white text-sm font-medium hidden sm:block">${props.message}</p>
            <p class="text-white text-xs font-medium sm:hidden">${props.message}</p>
            <a href="${props.buttonUrl || '#'}" class="flex-shrink-0 px-6 py-2.5 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 hover:scale-105 active:scale-100 transition-all text-sm whitespace-nowrap">
              ${props.buttonText}
            </a>
          </div>
        </div>
      `;
    }
  },

  Bento_Features: {
    name: "벤토 그리드 기능 (Bento_Features)",
    icon: "🧩",
    defaultProps: {
      sectionBadge: "핵심 기능",
      sectionTitle: "모든 것이 하나로 연결됩니다",
      sectionDesc: "복잡한 업무 흐름을 단순하게. 하나의 플랫폼에서 모든 것을 해결하세요.",
      features: [
        { title: "AI 자동화 엔진", desc: "자연어로 말하면 AI가 워크플로우를 자동 생성합니다. 200개 이상의 앱과 즉시 연동.", icon: "🤖", size: "large", gradient: "from-indigo-500 to-violet-500" },
        { title: "실시간 대시보드", desc: "모든 KPI를 한눈에. 경영진 보고서도 자동 생성.", icon: "📊", size: "normal", gradient: "from-emerald-500 to-teal-400" },
        { title: "팀 협업 허브", desc: "실시간 공동 편집, 코멘트, 알림까지 원스톱.", icon: "👥", size: "normal", gradient: "from-amber-500 to-orange-400" },
        { title: "엔터프라이즈 보안", desc: "ISO 27001, SOC 2 인증. AES-256 암호화. 온프레미스 옵션.", icon: "🛡️", size: "normal", gradient: "from-rose-500 to-pink-400" },
        { title: "글로벌 CDN", desc: "전 세계 48개 엣지에서 0.1초 이내 응답.", icon: "🌐", size: "normal", gradient: "from-blue-500 to-cyan-400" }
      ]
    },
    schema: {
      sectionBadge: { type: "text", label: "배지 텍스트" },
      sectionTitle: { type: "text", label: "섹션 타이틀" },
      sectionDesc: { type: "textarea", label: "섹션 설명" },
      features: {
        type: "array",
        label: "기능 카드 목록",
        itemSchema: {
          title: { type: "text", label: "기능 제목" },
          desc: { type: "textarea", label: "기능 설명" },
          icon: { type: "text", label: "이모지 아이콘" },
          size: { type: "select", label: "카드 크기", options: [{ value: "large", label: "대형 (2칸)" }, { value: "normal", label: "일반 (1칸)" }] },
          gradient: { type: "text", label: "그라데이션" }
        }
      }
    },
    render(props) {
      const items = props.features || [];
      const cardsHtml = items.map((f, i) => {
        const isLarge = f.size === "large";
        return `
          <div class="${isLarge ? 'md:col-span-2 md:row-span-2' : ''} group relative bg-white border border-slate-200/80 rounded-3xl p-8 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.gradient} opacity-5 rounded-full translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform">${f.icon}</div>
              <h3 class="text-${isLarge ? '2xl' : 'lg'} font-extrabold text-slate-900 mb-3">${f.title}</h3>
              <p class="text-slate-600 text-sm leading-relaxed ${isLarge ? 'max-w-md' : ''}">${f.desc}</p>
            </div>
          </div>
        `;
      }).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-slate-50/30" id="features">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-2xl mx-auto mb-16">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-600 mb-5">🧩 ${props.sectionBadge}</span>
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed">${props.sectionDesc}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
              ${cardsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Live_Activity_Feed: {
    name: "실시간 활동 피드 (Live_Activity_Feed)",
    icon: "📡",
    defaultProps: {
      bgColor: "bg-slate-900",
      headline: "지금 이 순간에도 수많은 팀이 AutoWork를 사용하고 있습니다",
      activities: [
        { emoji: "🚀", text: "서울의 마케팅 팀이 새로운 캠페인 자동화를 생성했습니다", time: "방금 전" },
        { emoji: "📊", text: "부산의 스타트업이 주간 보고서를 자동 발송했습니다", time: "2분 전" },
        { emoji: "⚡", text: "대전의 개발팀이 CI/CD 파이프라인을 연동했습니다", time: "3분 전" },
        { emoji: "🎯", text: "인천의 영업팀이 CRM 자동 동기화를 설정했습니다", time: "5분 전" },
        { emoji: "💰", text: "제주의 이커머스 기업이 주문 처리 자동화를 도입했습니다", time: "7분 전" },
        { emoji: "📈", text: "강남의 VC가 포트폴리오 보고서 자동화를 시작했습니다", time: "10분 전" }
      ],
      stats: [
        { value: "47,392", label: "오늘 실행된 자동화" },
        { value: "2,847", label: "활성 기업 수" },
        { value: "98.7%", label: "실시간 성공률" }
      ]
    },
    schema: {
      bgColor: { type: "select", label: "배경색", options: [{ value: "bg-slate-900", label: "다크" }, { value: "bg-indigo-900", label: "인디고 다크" }] },
      headline: { type: "text", label: "헤드라인" },
      activities: {
        type: "array",
        label: "활동 피드 항목",
        itemSchema: {
          emoji: { type: "text", label: "이모지" },
          text: { type: "text", label: "활동 내용" },
          time: { type: "text", label: "시간 (예: 방금 전)" }
        }
      },
      stats: {
        type: "array",
        label: "실시간 통계",
        itemSchema: {
          value: { type: "text", label: "숫자" },
          label: { type: "text", label: "설명" }
        }
      }
    },
    render(props) {
      const uid = 'laf_' + Math.random().toString(36).substr(2, 6);
      const acts = props.activities || [];
      const stats = props.stats || [];

      const feedHtml = acts.map((a, i) => `
        <div class="flex items-center gap-4 px-5 py-3.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all whitespace-nowrap flex-shrink-0">
          <span class="text-lg">${a.emoji}</span>
          <span class="text-white/80 text-sm font-medium">${a.text}</span>
          <span class="text-white/30 text-xs font-semibold ml-auto">${a.time}</span>
        </div>
      `).join('');

      const statsHtml = stats.map(s => `
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-extrabold text-white">${s.value}</div>
          <div class="text-white/40 text-xs font-semibold mt-1">${s.label}</div>
        </div>
      `).join('');

      return `
        <section class="${props.bgColor || 'bg-slate-900'} py-14 px-6 relative overflow-hidden">
          <div class="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div class="max-w-6xl mx-auto relative z-10">
            <div class="flex items-center justify-center gap-3 mb-6">
              <span class="relative flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
              <p class="text-white/60 text-xs font-bold uppercase tracking-widest">${props.headline}</p>
            </div>
            
            <div class="relative mb-8">
              <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${props.bgColor === 'bg-indigo-900' ? 'from-indigo-900' : 'from-slate-900'} to-transparent z-10"></div>
              <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${props.bgColor === 'bg-indigo-900' ? 'from-indigo-900' : 'from-slate-900'} to-transparent z-10"></div>
              <div class="flex gap-4 animate-marquee">
                ${feedHtml}
                ${feedHtml}
              </div>
            </div>

            <div class="flex justify-center gap-12 md:gap-20 pt-4 border-t border-white/10">
              ${statsHtml}
            </div>
          </div>
        </section>
      `;
    }
  },

  Pricing_Toggle: {
    name: "가격 토글 (Pricing_Toggle)",
    icon: "💎",
    defaultProps: {
      sectionTitle: "단순하고 투명한 요금제",
      sectionDesc: "숨겨진 비용 없이, 필요한 만큼만 지불하세요.",
      annualDiscount: 20,
      plans: [
        {
          name: "스타터",
          monthlyPrice: "29,000",
          features: "자동화 10개|월 5,000회 실행|기본 연동 (Slack, Discord)|이메일 지원|기본 대시보드",
          buttonText: "무료 체험 시작 →",
          isPopular: false,
          icon: "🌱"
        },
        {
          name: "프로",
          monthlyPrice: "89,000",
          features: "무제한 자동화|월 50,000회 실행|200+ 앱 전체 연동|AI 자연어 설계|24시간 우선 지원|고급 ROI 대시보드|팀 협업 기능",
          buttonText: "가장 인기 있는 플랜 →",
          isPopular: true,
          icon: "⚡"
        },
        {
          name: "엔터프라이즈",
          monthlyPrice: "별도 문의",
          features: "실행 횟수 무제한|온프레미스 구축|전담 어카운트 매니저|커스텀 API 통합|SLA 99.99%|보안 감사 리포트|MSA 계약",
          buttonText: "도입 상담 요청 →",
          isPopular: false,
          icon: "🏢"
        }
      ],
      guarantee: "30일 환불 보장 · 언제든 해지 가능 · 신용카드 없이 시작"
    },
    schema: {
      sectionTitle: { type: "text", label: "섹션 타이틀" },
      sectionDesc: { type: "textarea", label: "섹션 설명" },
      annualDiscount: { type: "text", label: "연간 결제 할인율 (%)" },
      guarantee: { type: "text", label: "하단 보증 문구" },
      plans: {
        type: "array",
        label: "요금제 목록",
        itemSchema: {
          name: { type: "text", label: "플랜 이름" },
          monthlyPrice: { type: "text", label: "월간 가격 (원, 숫자만)" },
          features: { type: "textarea", label: "기능 목록 (|로 구분)" },
          buttonText: { type: "text", label: "버튼 텍스트" },
          isPopular: { type: "select", label: "추천 플랜", options: [{ value: "false", label: "보통" }, { value: "true", label: "추천" }] },
          icon: { type: "text", label: "이모지 아이콘" }
        }
      }
    },
    render(props) {
      const uid = 'pt_' + Math.random().toString(36).substr(2, 6);
      const disc = parseInt(props.annualDiscount) || 20;
      const plans = props.plans || [];

      const cardsHtml = plans.map(p => {
        const isPop = p.isPopular === "true" || p.isPopular === true;
        const isCustom = isNaN(parseInt(p.monthlyPrice?.replace(/,/g, '')));
        const monthNum = parseInt(p.monthlyPrice?.replace(/,/g, '')) || 0;
        const annualMonthly = Math.round(monthNum * (100 - disc) / 100);
        const savings = monthNum > 0 ? (monthNum - annualMonthly) * 12 : 0;

        const featuresList = (p.features || "").split("|").map(f => f.trim()).filter(f => f).map(f => `
          <li class="flex items-start gap-3 py-1.5">
            <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
            <span class="text-slate-600 text-sm">${f}</span>
          </li>
        `).join('');

        return `
          <div class="relative bg-white rounded-3xl border-2 ${isPop ? 'border-indigo-600 shadow-xl shadow-indigo-100/50 md:-translate-y-4' : 'border-slate-200 shadow-sm'} p-8 flex flex-col">
            ${isPop ? `<div class="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-full shadow-lg">가장 인기 · 추천 플랜</div>` : ''}
            
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">${p.icon || '📦'}</span>
              <h3 class="text-xl font-bold text-slate-900">${p.name}</h3>
            </div>
            
            <div class="mb-6">
              ${isCustom ? `
                <div class="text-3xl font-extrabold text-slate-900">${p.monthlyPrice}</div>
              ` : `
                <div class="${uid}-monthly">
                  <span class="text-4xl font-extrabold text-slate-900">₩${p.monthlyPrice}</span>
                  <span class="text-slate-500 text-sm font-medium">/월</span>
                </div>
                <div class="${uid}-annual" style="display:none;">
                  <span class="text-4xl font-extrabold text-slate-900">₩${annualMonthly.toLocaleString()}</span>
                  <span class="text-slate-500 text-sm font-medium">/월</span>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs line-through text-slate-400">₩${p.monthlyPrice}/월</span>
                    <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">연 ₩${savings.toLocaleString()} 절약</span>
                  </div>
                </div>
              `}
            </div>

            <ul class="space-y-1 mb-8 flex-grow">
              ${featuresList}
            </ul>

            <button class="w-full py-4 px-6 rounded-2xl font-bold text-center text-sm transition-all ${isPop ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-200 hover:scale-[1.02]' : 'bg-slate-50 text-indigo-600 hover:bg-indigo-50 border border-slate-200'} active:scale-98">
              ${p.buttonText}
            </button>
          </div>
        `;
      }).join('');

      return `
        <section class="py-20 md:py-28 px-6 bg-white" id="pricing">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-2xl mx-auto mb-8">
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">${props.sectionTitle}</h2>
              <p class="text-slate-600 leading-relaxed mb-8">${props.sectionDesc}</p>
              
              <!-- Toggle -->
              <div class="inline-flex items-center gap-4 p-1.5 bg-slate-100 rounded-2xl" id="${uid}-toggle">
                <button class="${uid}-toggle-btn active px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-white text-slate-900 shadow-sm" data-period="monthly" onclick="${uid}_switch('monthly')">월간 결제</button>
                <button class="${uid}-toggle-btn px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-500 hover:text-slate-700" data-period="annual" onclick="${uid}_switch('annual')">
                  연간 결제 <span class="ml-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded-full">${disc}% 할인</span>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-10">
              ${cardsHtml}
            </div>
            
            <p class="text-center text-sm text-slate-400 mt-10 flex items-center justify-center gap-2">
              <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              ${props.guarantee}
            </p>
          </div>

          <script>
            window.${uid}_switch = function(period) {
              var btns = document.querySelectorAll('.${uid}-toggle-btn');
              btns.forEach(function(b) {
                if (b.dataset.period === period) {
                  b.classList.add('active');
                  b.className = b.className.replace('text-slate-500', 'text-slate-900').replace('hover:text-slate-700', '');
                  b.style.background = 'white';
                  b.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                } else {
                  b.classList.remove('active');
                  b.style.background = 'transparent';
                  b.style.boxShadow = 'none';
                }
              });
              var monthlies = document.querySelectorAll('.${uid}-monthly');
              var annuals = document.querySelectorAll('.${uid}-annual');
              monthlies.forEach(function(m) { m.style.display = period === 'monthly' ? 'block' : 'none'; });
              annuals.forEach(function(a) { a.style.display = period === 'annual' ? 'block' : 'none'; });
            };
          </script>
        </section>
      `;
    }
  }
};

const PRESET_TEMPLATES = {
  autowork: {
    name: "💰 AutoWork AI 수익형",
    desc: "실제 전환과 매출을 만드는 16블록 최적화 구성",
    blocks: [
      {
        component: "Urgency_Banner",
        props: {
          preText: "🔥 론칭 기념 한정 프로모션",
          headline: "지금 가입하면 첫 3개월 50% 할인 + 전담 온보딩 무료",
          subText: "프로모션 종료까지 남은 시간",
          ctaText: "할인가로 시작하기 →",
          ctaUrl: "#pricing",
          endDate: "2026-06-30T23:59:59",
          bgGradient: "from-rose-600 via-pink-600 to-violet-600"
        }
      },
      {
        component: "Header_Basic",
        props: {
          logoText: "AutoWork AI",
          navLinks: [
            { label: "도입 효과", url: "#roi" },
            { label: "기능", url: "#features" },
            { label: "고객 후기", url: "#testimonials" },
            { label: "요금제", url: "#pricing" }
          ],
          ctaButtonText: "14일 무료 체험"
        }
      },
      {
        component: "Hero_Type_Gradient",
        props: {
          title: "반복 업무에 쓰는 하루 3시간,\nAI가 3분으로 줄여드립니다",
          subtitle: "국내 1,200개 기업이 선택한 No.1 업무 자동화 플랫폼. 코딩 없이 5분 만에 첫 자동화를 만들고, 팀 생산성을 즉시 78% 향상시키세요.",
          primaryButtonText: "14일 무료 체험 시작 →",
          secondaryButtonText: "3분 데모 영상 보기",
          gradientFrom: "from-slate-900",
          gradientTo: "to-indigo-950"
        }
      },
      {
        component: "Logo_Carousel",
        props: {
          sectionLabel: "1,200+ 기업이 신뢰하는 업무 자동화 파트너",
          logos: [
            { name: "삼성전자", emoji: "🔵" },
            { name: "네이버", emoji: "🟢" },
            { name: "카카오", emoji: "🟡" },
            { name: "토스", emoji: "🔷" },
            { name: "라인", emoji: "🟩" },
            { name: "쿠팡", emoji: "🟠" },
            { name: "현대", emoji: "🔹" },
            { name: "SK", emoji: "🔴" }
          ],
          bgColor: "bg-white"
        }
      },
      {
        component: "Social_Proof",
        props: {
          rating: "4.9",
          reviewCount: "2,847",
          reviewSource: "G2 & Capterra 인증 리뷰 기반",
          badges: [
            { icon: "🏆", label: "2026 SaaS 혁신상" },
            { icon: "🛡️", label: "ISO 27001 / SOC2" },
            { icon: "⚡", label: "99.99% 가동률" },
            { icon: "🌏", label: "48개국 서비스" }
          ]
        }
      },
      {
        component: "Stats_Banner",
        props: {
          bgColor: "bg-indigo-600",
          stats: [
            { value: "78%", label: "업무 시간 절감" },
            { value: "1,200+", label: "도입 기업 수" },
            { value: "₩340억", label: "고객 누적 절감액" },
            { value: "4.9/5", label: "고객 만족도" }
          ]
        }
      },
      {
        component: "How_It_Works",
        props: {
          sectionBadge: "시작은 간단합니다",
          sectionTitle: "3단계로 업무 자동화를 시작하세요",
          sectionDesc: "복잡한 설정 없이, 누구나 10분 안에 첫 자동화를 만들 수 있습니다.",
          steps: [
            { number: "01", title: "30초 무료 가입", desc: "이메일 하나로 바로 시작. 신용카드 없이 14일간 모든 기능을 무료로 사용하세요.", icon: "📝", color: "from-blue-500 to-cyan-400" },
            { number: "02", title: "AI로 워크플로우 설계", desc: "드래그 앤 드롭 또는 AI에게 자연어로 설명하면 자동화 시나리오가 즉시 생성됩니다.", icon: "⚙️", color: "from-violet-500 to-purple-400" },
            { number: "03", title: "실행 & 성과 확인", desc: "실행 버튼 하나로 24/7 자동화 시작. 실시간 대시보드에서 절감 효과를 확인하세요.", icon: "🚀", color: "from-emerald-500 to-teal-400" }
          ]
        }
      },
      {
        component: "Features_Grid",
        props: {
          sectionBadge: "강력한 핵심 기능",
          sectionTitle: "경쟁사가 따라올 수 없는 AI 자동화 기술",
          sectionDesc: "200개 이상의 앱과 네이티브 연동, 국내 유일 AI 자연어 워크플로우 설계 기술.",
          features: [
            { icon: "🤖", title: "AI 자연어 자동화 설계", desc: "'매주 월요일 매출 보고서 만들어줘'라고 말하면 AI가 전체 워크플로우를 자동 생성합니다." },
            { icon: "⚡", title: "0.1초 초고속 실행", desc: "이벤트 발생 즉시 0.1초 이내 자동화 실행. 실시간 동기화로 지연 없는 처리." },
            { icon: "📊", title: "실시간 ROI 대시보드", desc: "절감 시간, 비용, ROI를 실시간 추적. 경영진 보고용 리포트 자동 생성." }
          ]
        }
      },
      {
        component: "ROI_Calculator",
        props: {
          sectionTitle: "우리 팀의 절감 효과를 직접 계산해 보세요",
          sectionDesc: "슬라이더를 조절하면 AutoWork 도입 시 예상 절감액이 실시간으로 계산됩니다.",
          hourlyRate: 35000,
          automationRate: 78,
          weeklyHours: 20,
          ctaText: "이 금액을 절감하러 가기 →",
          ctaUrl: "#pricing"
        }
      },
      {
        component: "Before_After",
        props: {
          sectionTitle: "도입 전/후, 이렇게 달라집니다",
          sectionDesc: "1,200개 기업의 실제 데이터 기반 업무 혁신 결과입니다.",
          beforeTitle: "도입 전 ❌",
          afterTitle: "도입 후 ✅",
          comparisons: [
            { before: "수동 데이터 입력 3시간/일", after: "AI 자동 수집 3분 완료 (-98%)" },
            { before: "주간 보고서 엑셀 6시간", after: "실시간 대시보드 자동 생성 (0분)" },
            { before: "정산 실수 → 분쟁 월 2건", after: "자동 계산으로 분쟁 0건" },
            { before: "고객 문의 평균 24시간 대기", after: "AI 챗봇 즉시 응답 (3초)" }
          ]
        }
      },
      {
        component: "Comparison_Table",
        props: {
          sectionTitle: "왜 AutoWork를 선택해야 할까요?",
          sectionDesc: "주요 업무 자동화 플랫폼과의 객관적 기능 비교.",
          brandName: "AutoWork AI",
          competitors: ["Z사 자동화", "M사 플로우"],
          features: [
            { name: "AI 자연어 워크플로우 설계", us: "✅", them: ["❌", "❌"] },
            { name: "노코드 드래그 앤 드롭", us: "✅", them: ["✅", "⚠️"] },
            { name: "실시간 ROI 대시보드", us: "✅", them: ["⚠️", "❌"] },
            { name: "200+ 앱 네이티브 연동", us: "✅", them: ["✅", "❌"] },
            { name: "한국어 24/7 기술지원", us: "✅", them: ["❌", "⚠️"] },
            { name: "온프레미스 구축 옵션", us: "✅", them: ["❌", "❌"] },
            { name: "14일 무료 (카드 불필요)", us: "✅", them: ["❌", "✅"] },
            { name: "월 시작가", us: "₩29,000", them: ["$49", "$35"] }
          ]
        }
      },
      {
        component: "Testimonials_Grid",
        props: {
          sectionTitle: "1,200개 기업이 증명한 실제 성과",
          sectionDesc: "AutoWork 도입 후 업무 생산성이 평균 78% 향상된 기업들의 생생한 후기.",
          testimonials: [
            { avatar: "👩‍💻", name: "김민재", role: "토스 개발 리드", quote: "매일 1시간 걸리던 리포트가 1분에 자동 완료. 연간 절감액만 약 2,400만 원입니다." },
            { avatar: "👨‍💼", name: "최우식", role: "라인 운영 총괄", quote: "도입 3일 만에 전체 연동 완료. 운영 인력 3명을 핵심 프로젝트에 재배치했습니다." },
            { avatar: "💎", name: "윤아름", role: "스타트업 CEO", quote: "5명으로 월 매출 5억 달성. AutoWork 없이는 최소 15명이 필요한 규모입니다." }
          ]
        }
      },
      {
        component: "Pricing_Three_Tier",
        props: {
          sectionTitle: "투자 대비 10배 이상의 ROI를 보장합니다",
          sectionDesc: "모든 플랜 14일 무료 체험. 신용카드 불필요. 론칭 기념 첫 3개월 50% 할인 중!",
          plans: [
            { name: "스타터", price: "₩29,000", period: "월", features: "자동화 10개, 월 5,000회 실행, Slack·Discord 연동, 이메일 지원, 기본 대시보드", buttonText: "무료 체험 시작 →", isPopular: false },
            { name: "프로 (추천)", price: "₩89,000", period: "월", features: "무제한 자동화, 월 50,000회, 200+ 앱 전체 연동, AI 자연어 설계, 24시간 우선 지원, 고급 ROI 대시보드", buttonText: "가장 인기 있는 플랜 →", isPopular: true },
            { name: "엔터프라이즈", price: "별도 문의", period: "연", features: "실행 무제한, 온프레미스 구축, 전담 매니저, 커스텀 API, SLA 99.99%, 보안 감사 리포트", buttonText: "맞춤 상담 요청 →", isPopular: false }
          ]
        }
      },
      {
        component: "FAQ_Accordion",
        props: {
          sectionTitle: "자주 묻는 질문",
          faqs: [
            { question: "비개발자도 사용할 수 있나요?", answer: "네! 노코드 드래그 앤 드롭과 AI 자연어 설계로 코딩 없이 사용 가능합니다. 평균 첫 자동화 완성 10분." },
            { question: "기존 툴과 연동이 되나요?", answer: "Slack, Jira, Notion, Google Workspace, Salesforce, HubSpot 등 200개 이상 네이티브 연동." },
            { question: "보안은 안전한가요?", answer: "ISO 27001, SOC 2 Type II 인증. AES-256 암호화. 엔터프라이즈는 온프레미스 가능." },
            { question: "무료 체험 후 자동 결제되나요?", answer: "아닙니다. 카드 등록 없이 시작하며 자동 결제 절대 없습니다." },
            { question: "해지는 어떻게 하나요?", answer: "설정에서 클릭 한 번으로 즉시 해지. 위약금·숨은 수수료 없습니다." }
          ]
        }
      },
      {
        component: "CTA_Banner",
        props: {
          headline: "매달 ₩89,000으로 직원 3명 분의 업무를 자동화하세요",
          subheadline: "14일 무료 체험 · 카드 불필요 · 10분 만에 첫 자동화 · 언제든 해지 가능",
          buttonText: "지금 무료로 시작하기 →",
          bgColor: "bg-indigo-600"
        }
      },
      {
        component: "Footer_Simple",
        props: {
          logoText: "AutoWork AI",
          copyrightText: "© 2026 AutoWork AI Inc. All rights reserved. 사업자등록번호: 123-45-67890",
          links: [
            { label: "이용약관", url: "#" },
            { label: "개인정보처리방침", url: "#" },
            { label: "고객센터 (1600-0000)", url: "#" }
          ]
        }
      }
    ]
  },
  saas: {
    name: "☁️ CloudFlow SaaS 수익형",
    desc: "SaaS 비즈니스 특화 전환 퍼널 구성",
    blocks: [
      { component: "Header_Basic", props: { logoText: "CloudFlow AI", navLinks: [{ label: "기능", url: "#features" }, { label: "ROI 계산", url: "#roi" }, { label: "요금제", url: "#pricing" }], ctaButtonText: "무료 시작하기" } },
      { component: "Hero_Type_Gradient", props: { title: "비즈니스 프로세스를\n하나의 파이프라인으로 통합", subtitle: "수작업 데이터 수집, 문서 검토, 리포트 작성을 AI가 자동화합니다. 15,000개 팀이 도입했습니다.", primaryButtonText: "무료로 시작하기 →", secondaryButtonText: "자세히 알아보기", gradientFrom: "from-slate-900", gradientTo: "to-indigo-950" } },
      { component: "Stats_Banner", props: { bgColor: "bg-indigo-600", stats: [{ value: "99.8%", label: "자동화 성공률" }, { value: "15,000+", label: "글로벌 도입 팀" }, { value: "₩3,200억", label: "누적 절약 비용" }, { value: "48%", label: "평균 비용 절감" }] } },
      { component: "How_It_Works", props: { sectionBadge: "빠른 시작", sectionTitle: "5분 만에 첫 자동화를 만드세요", sectionDesc: "기술 지식 없이도 누구나 시작할 수 있습니다.", steps: [{ number: "01", title: "무료 가입", desc: "이메일 → 30초 가입. 카드 없이 즉시 시작.", icon: "✨", color: "from-blue-500 to-cyan-400" }, { number: "02", title: "AI 설계", desc: "AI에게 '이것 자동화해줘'라고 말하면 즉시 완성.", icon: "🤖", color: "from-violet-500 to-purple-400" }, { number: "03", title: "성과 확인", desc: "절감 시간·비용을 실시간 대시보드에서 확인.", icon: "📈", color: "from-emerald-500 to-teal-400" }] } },
      { component: "Features_Grid", props: { sectionBadge: "핵심 기능", sectionTitle: "속도, 신뢰성, 보안성을 갖춘 플랫폼", sectionDesc: "엔터프라이즈급 보안과 개인 사용자 편의성을 동시에.", features: [{ icon: "🛡️", title: "군용급 보안", desc: "AES-256 암호화, SOC 2 인증으로 금융·의료 데이터도 안심." }, { icon: "⚡", title: "0.1초 실행 속도", desc: "트리거 발생 즉시 자동화 실행. 지연 없는 고속 엔진." }, { icon: "💡", title: "직관적 대시보드", desc: "드래그 앤 드롭으로 업무 흐름 설계, 성과를 한눈에." }] } },
      { component: "ROI_Calculator", props: { sectionTitle: "도입 효과를 직접 계산하세요", sectionDesc: "우리 팀에 맞는 절감 효과를 슬라이더로 확인.", hourlyRate: 40000, automationRate: 72, weeklyHours: 25, ctaText: "절감 효과 체험 →", ctaUrl: "#pricing" } },
      { component: "Testimonials_Grid", props: { sectionTitle: "실제 고객 성과 후기", sectionDesc: "CloudFlow로 업무를 혁신한 기업들.", testimonials: [{ avatar: "👩‍💻", name: "김민재", role: "토스 개발 리드", quote: "매일 1시간 → 1분 자동 완료. 연간 2,400만 원 절감." }, { avatar: "👨‍💼", name: "최우식", role: "라인 운영 총괄", quote: "3일 만에 전체 연동 완료. 운영 인력 3명 재배치." }, { avatar: "💎", name: "윤아름", role: "스타트업 CEO", quote: "5명으로 월 5억 매출. CloudFlow 없이는 15명 필요." }] } },
      { component: "Pricing_Three_Tier", props: { sectionTitle: "합리적 가격, 확실한 ROI", sectionDesc: "모든 플랜 14일 무료. 카드 불필요.", plans: [{ name: "스타터", price: "₩29,000", period: "월", features: "자동화 10개, 월 5,000회, Slack·Discord, 이메일 지원", buttonText: "무료 체험 →", isPopular: false }, { name: "프로", price: "₩89,000", period: "월", features: "무제한 자동화, 월 50,000회, 전체 연동, AI 설계, 24시간 지원", buttonText: "가장 인기 →", isPopular: true }, { name: "엔터프라이즈", price: "별도 문의", period: "연", features: "무제한 실행, 온프레미스, 전담 매니저, API, SLA 99.99%", buttonText: "상담 요청 →", isPopular: false }] } },
      { component: "FAQ_Accordion", props: { sectionTitle: "자주 묻는 질문", faqs: [{ question: "비개발자도 사용 가능?", answer: "네, 노코드 편집기와 AI 자연어 설계로 코딩 없이 가능." }, { question: "무료 체험 후 자동 결제?", answer: "아닙니다. 카드 등록 없이 시작, 자동 결제 없음." }, { question: "해지 복잡한가요?", answer: "클릭 한 번 즉시 해지. 위약금·숨은 수수료 없음." }] } },
      { component: "Footer_Simple", props: { logoText: "CloudFlow AI", copyrightText: "© 2026 CloudFlow AI Inc. All rights reserved.", links: [{ label: "이용약관", url: "#" }, { label: "개인정보보호", url: "#" }, { label: "고객센터", url: "#" }] } }
    ]
  },
  marketing: {
    name: "🚀 마케팅 풀스택 수익형",
    desc: "17블록 전환율 극대화 + 카드뉴스 + ROI + 플로팅CTA",
    blocks: [
      { component: "Urgency_Banner", props: { preText: "⚡ 얼리버드 특별 할인", headline: "첫 100팀 한정 — 연간 플랜 40% 할인 + 1:1 온보딩 무료", subText: "할인 마감까지", ctaText: "얼리버드 혜택 받기 →", ctaUrl: "#pricing", endDate: "2026-06-15T23:59:59", bgGradient: "from-amber-500 via-orange-500 to-red-500" } },
      { component: "Header_Basic", props: { logoText: "GrowthEngine AI", navLinks: [{ label: "기능", url: "#features" }, { label: "ROI 계산", url: "#roi" }, { label: "후기", url: "#reviews" }, { label: "요금제", url: "#pricing" }], ctaButtonText: "무료 체험 시작" } },
      { component: "Hero_Type_Gradient", props: { title: "마케팅 ROI를 340% 올리는\nAI 자동화 플랫폼", subtitle: "고객 획득부터 유지까지 전체 퍼널을 AI가 최적화. 500개 기업이 평균 ROAS 340%를 달성했습니다.", primaryButtonText: "14일 무료 체험 →", secondaryButtonText: "성공 사례 보기", gradientFrom: "from-violet-950", gradientTo: "to-slate-900" } },
      { component: "Logo_Carousel", props: { sectionLabel: "500+ 기업이 신뢰하는 마케팅 파트너", logos: [{ name: "삼성전자", emoji: "🔵" }, { name: "네이버", emoji: "🟢" }, { name: "카카오", emoji: "🟡" }, { name: "토스", emoji: "🔷" }, { name: "라인", emoji: "🟩" }, { name: "쿠팡", emoji: "🟠" }], bgColor: "bg-white" } },
      { component: "Social_Proof", props: { rating: "4.9", reviewCount: "3,247", reviewSource: "G2, Capterra, ProductHunt 인증 평가", badges: [{ icon: "🏆", label: "2026 마케팅 SaaS 대상" }, { icon: "🛡️", label: "SOC 2 Type II" }, { icon: "⚡", label: "평균 ROAS 340%" }, { icon: "🌏", label: "48개국 서비스" }] } },
      { component: "Card_News_Carousel", props: { sectionBadge: "왜 GrowthEngine인가?", sectionTitle: "이런 불편함, 더 이상 겪지 마세요", sectionDesc: "마케팅 팀이 겪는 비효율의 원인과 해결책을 확인하세요.", autoPlaySpeed: 5000, ctaUrl: "#pricing", cards: [{ painIcon: "😩", painTitle: "캠페인 기획에만 2주", painDesc: "타겟 설정, 크리에이티브, 채널 배분에 너무 많은 시간이 소모됩니다.", solveIcon: "🚀", solveTitle: "AI가 15분 만에 완성", solveDesc: "목표만 입력하면 타겟·메시지·채널까지 자동 추천하고 실행.", ctaText: "캠페인 자동화 →", gradient: "from-rose-500 to-orange-400" }, { painIcon: "📊", painTitle: "어떤 광고가 효과적인지 모름", painDesc: "광고비는 나가는데 어떤 채널이 매출로 이어지는지 파악 불가.", solveIcon: "🎯", solveTitle: "실시간 ROAS 추적", solveDesc: "모든 터치포인트 성과를 실시간 추적, AI가 예산 재분배 자동 추천.", ctaText: "ROAS 대시보드 →", gradient: "from-blue-500 to-cyan-400" }, { painIcon: "💸", painTitle: "개인화 메시지 보낼 인력 부족", painDesc: "수천 명 고객에게 맞춤 메시지를 보내야 하지만 인력이 없습니다.", solveIcon: "🤖", solveTitle: "AI 초개인화 메시징", solveDesc: "행동 데이터 기반 1:1 맞춤 메시지를 자동 생성, 최적 시점 발송.", ctaText: "개인화 체험 →", gradient: "from-violet-500 to-purple-400" }] } },
      { component: "Stats_Banner", props: { bgColor: "bg-slate-900", stats: [{ value: "340%", label: "평균 ROAS 상승" }, { value: "2.1x", label: "전환율 향상" }, { value: "68%", label: "마케팅 비용 절감" }, { value: "15분", label: "캠페인 셋업" }] } },
      { component: "Features_Grid", props: { sectionBadge: "핵심 마케팅 기능", sectionTitle: "전환율을 끌어올리는 AI 엔진", sectionDesc: "데이터 기반 스마트 마케팅 자동화.", features: [{ icon: "🎯", title: "AI 타겟팅 최적화", desc: "머신러닝 기반 고가치 고객 세그먼트 자동 식별, 맞춤 메시지 전달." }, { icon: "📊", title: "실시간 대시보드", desc: "모든 채널 캠페인 성과를 한눈에 파악, 즉시 의사결정." }, { icon: "🔄", title: "옴니채널 자동화", desc: "이메일, SMS, 푸시, 카카오톡까지 하나의 워크플로우로 통합." }] } },
      { component: "ROI_Calculator", props: { sectionTitle: "마케팅 절감 효과를 직접 계산하세요", sectionDesc: "슬라이더로 우리 팀의 절감 효과를 확인.", hourlyRate: 45000, automationRate: 68, weeklyHours: 30, ctaText: "이 금액을 절감하러 가기 →", ctaUrl: "#pricing" } },
      { component: "Before_After", props: { sectionTitle: "도입 전/후가 이렇게 다릅니다", sectionDesc: "500개 기업 실제 데이터 기반.", beforeTitle: "도입 전 ❌", afterTitle: "도입 후 ✅", comparisons: [{ before: "캠페인 기획~실행 2주", after: "AI 추천 15분 런칭" }, { before: "고객 이탈률 월 15%", after: "예측 모델로 3% 이하" }, { before: "ROI 측정 불가", after: "실시간 ROAS 추적" }, { before: "수동 A/B 테스트 2주", after: "AI 멀티 실험 실시간" }] } },
      { component: "Testimonials_Grid", props: { sectionTitle: "고객사의 실제 성과", sectionDesc: "GrowthEngine으로 마케팅을 혁신한 기업들.", testimonials: [{ avatar: "👩‍💻", name: "박서연", role: "토스 마케팅 리드", quote: "캠페인 셋업 90% 단축, ROAS 3배 상승." }, { avatar: "👨‍💼", name: "이준호", role: "무신사 그로스 매니저", quote: "개인화 메시지 전환율 5배 상승." }, { avatar: "💎", name: "한소희", role: "스타트업 CMO", quote: "마케팅 2명으로 월 매출 3억 달성." }] } },
      { component: "Pricing_Three_Tier", props: { sectionTitle: "투자 대비 10배 ROI 보장", sectionDesc: "14일 무료 · 카드 불필요 · 얼리버드 40% 할인 중!", plans: [{ name: "그로스 스타터", price: "₩49,000", period: "월", features: "AI 캠페인 5개, 월 10,000건, 이메일+카카오톡, 기본 대시보드", buttonText: "무료 체험 →", isPopular: false }, { name: "프로 마케터", price: "₩149,000", period: "월", features: "무제한 캠페인, 월 100,000건, 옴니채널(SMS), A/B, 우선 지원", buttonText: "가장 인기 →", isPopular: true }, { name: "엔터프라이즈", price: "맞춤 견적", period: "연", features: "발송 무제한, 전담 매니저, 커스텀 API, 온프레미스, SLA 99.99%", buttonText: "상담 요청 →", isPopular: false }] } },
      { component: "FAQ_Accordion", props: { sectionTitle: "자주 묻는 질문", faqs: [{ question: "기존 툴과 연동 가능?", answer: "GA, HubSpot, Mailchimp, 카카오 비즈메시지 등 200개 이상 즉시 연동." }, { question: "무료 체험 후 자동 결제?", answer: "아닙니다. 카드 등록 없이 시작, 자동 결제 절대 없음." }, { question: "데이터 보안은?", answer: "SOC 2 Type II, AES-256 암호화로 모든 데이터 보호." }] } },
      { component: "Newsletter_CTA", props: { headline: "마케팅 인사이트를 가장 먼저 받아보세요", subtitle: "매주 AI 마케팅 트렌드, 성공 사례, 무료 템플릿을 이메일로 전달.", inputPlaceholder: "marketing@company.com", buttonText: "무료 구독하기", privacyNote: "스팸 없음 · 언제든 구독 취소" } },
      { component: "Footer_Simple", props: { logoText: "GrowthEngine AI", copyrightText: "© 2026 GrowthEngine AI Inc. All rights reserved.", links: [{ label: "이용약관", url: "#" }, { label: "개인정보보호", url: "#" }, { label: "고객센터", url: "#" }] } },
      { component: "Floating_CTA", props: { message: "⚡ 지금 시작하면 14일 무료 + 1:1 온보딩 무료!", buttonText: "무료 체험 시작 →", buttonUrl: "#pricing", bgColor: "bg-gradient-to-r from-indigo-600 to-violet-600" } }
    ]
  }
};

// Application State
const state = {
  jsonDesign: JSON.parse(JSON.stringify(PRESET_TEMPLATES.autowork)), // deep copy default
  selectedBlockIndex: null,
  activeTab: "visual", // "visual" | "json"
  viewport: "desktop" // "desktop" | "mobile"
};

// DOM Elements
const templateSelector = document.getElementById("template-selector");
const blockListContainer = document.getElementById("block-list-container");
const addBlockSelect = document.getElementById("add-block-select");
const btnAddBlock = document.getElementById("btn-add-block");
const btnExportJson = document.getElementById("btn-export-json");
const btnExportHtml = document.getElementById("btn-export-html");
const previewIframe = document.getElementById("preview-iframe");
const previewViewportBox = document.getElementById("preview-viewport-box");
const viewportDesktop = document.getElementById("viewport-desktop");
const viewportMobile = document.getElementById("viewport-mobile");
const previewStatusText = document.getElementById("preview-status-text");
const globalThemeSelect = document.getElementById("global-theme-select");

const tabVisual = document.getElementById("tab-visual");
const tabJson = document.getElementById("tab-json");
const tabContentVisual = document.getElementById("tab-content-visual");
const tabContentJson = document.getElementById("tab-content-json");
const jsonEditorTextarea = document.getElementById("json-editor-textarea");
const btnApplyJson = document.getElementById("btn-apply-json");
const visualEditorContainer = document.getElementById("visual-editor-container");

const exportModal = document.getElementById("export-modal");
const exportModalTitle = document.getElementById("export-modal-title");
const exportCodeTextarea = document.getElementById("export-code-textarea");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnCopyCode = document.getElementById("btn-copy-code");
const btnDownloadCode = document.getElementById("btn-download-code");
const toastMessage = document.getElementById("toast-message");

let activeModalType = "html"; // "html" | "json"

// Initial Setup
function init() {
  renderTemplatesList();
  renderBlocksList();
  syncThemeSelector();
  updatePreview();
  setupEventListeners();
}

function syncThemeSelector() {
  if (globalThemeSelect && state.jsonDesign) {
    globalThemeSelect.value = state.jsonDesign.globalTheme?.accentColor || "indigo";
  }
}

// 1. Render Template Selection Options
function renderTemplatesList() {
  templateSelector.innerHTML = "";
  Object.keys(PRESET_TEMPLATES).forEach(key => {
    const template = PRESET_TEMPLATES[key];
    const isSelected = key === "autowork"; // Default selected template name is autowork
    
    const card = document.createElement("button");
    card.className = `template-card ${isSelected ? 'active' : ''}`;
    card.setAttribute("data-key", key);
    card.innerHTML = `
      <div class="template-name">${template.name}</div>
      <div class="template-desc">${template.desc}</div>
    `;
    card.addEventListener("click", () => {
      // Toggle Active style
      document.querySelectorAll(".template-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      
      // Load preset design
      state.jsonDesign = JSON.parse(JSON.stringify(PRESET_TEMPLATES[key]));
      state.selectedBlockIndex = null;
      
      // Update view
      renderBlocksList();
      syncThemeSelector();
      updatePreview();
      renderVisualPropertyForm();
      showToast("템플릿이 로드되었습니다.");
    });
    templateSelector.appendChild(card);
  });
}

// 2. Render Left Sidebar Blocks List
function renderBlocksList() {
  blockListContainer.innerHTML = "";
  
  if (state.jsonDesign.blocks.length === 0) {
    blockListContainer.innerHTML = `
      <div class="empty-state" style="padding: 10px; height: auto;">
        <p style="font-size: 12px;">배치된 블록이 없습니다. 아래 메뉴에서 새 블록을 생성하세요.</p>
      </div>
    `;
    return;
  }

  state.jsonDesign.blocks.forEach((block, index) => {
    const regInfo = COMPONENT_REGISTRY[block.component];
    if (!regInfo) return;

    const blockItem = document.createElement("div");
    blockItem.className = `block-item ${state.selectedBlockIndex === index ? 'active' : ''}`;
    blockItem.setAttribute("data-index", index);
    
    // Make draggable for block sorting
    blockItem.draggable = true;
    
    blockItem.innerHTML = `
      <div class="block-info">
        <span class="block-icon">${regInfo.icon}</span>
        <span class="block-title">${regInfo.name}</span>
      </div>
      <div class="block-actions">
        <button class="block-action-btn move-up" title="위로 이동" onclick="event.stopPropagation(); moveBlock(${index}, -1)">▲</button>
        <button class="block-action-btn move-down" title="아래로 이동" onclick="event.stopPropagation(); moveBlock(${index}, 1)">▼</button>
        <button class="block-action-btn delete" title="삭제" onclick="event.stopPropagation(); deleteBlock(${index})">✕</button>
      </div>
    `;

    // Click block to edit properties
    blockItem.addEventListener("click", () => {
      selectBlock(index);
    });

    // Drag-and-drop sort events
    blockItem.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
      blockItem.style.opacity = "0.5";
    });
    blockItem.addEventListener("dragend", () => {
      blockItem.style.opacity = "1";
      document.querySelectorAll(".block-item").forEach(b => b.classList.remove("block-item-dragover"));
    });
    blockItem.addEventListener("dragover", (e) => {
      e.preventDefault();
      blockItem.classList.add("block-item-dragover");
    });
    blockItem.addEventListener("dragleave", () => {
      blockItem.classList.remove("block-item-dragover");
    });
    blockItem.addEventListener("drop", (e) => {
      e.preventDefault();
      const originIndex = parseInt(e.dataTransfer.getData("text/plain"));
      const targetIndex = index;
      
      if (originIndex !== targetIndex) {
        // Move element in state array
        const temp = state.jsonDesign.blocks.splice(originIndex, 1)[0];
        state.jsonDesign.blocks.splice(targetIndex, 0, temp);
        
        // Retain selected block index correctly
        if (state.selectedBlockIndex === originIndex) {
          state.selectedBlockIndex = targetIndex;
        } else if (state.selectedBlockIndex > originIndex && state.selectedBlockIndex <= targetIndex) {
          state.selectedBlockIndex--;
        } else if (state.selectedBlockIndex < originIndex && state.selectedBlockIndex >= targetIndex) {
          state.selectedBlockIndex++;
        }
        
        renderBlocksList();
        updatePreview();
        renderVisualPropertyForm();
      }
    });

    blockListContainer.appendChild(blockItem);
  });
}

// 3. Selection of block
function selectBlock(index) {
  state.selectedBlockIndex = index;
  renderBlocksList();
  renderVisualPropertyForm();
  
  // Highlight visually inside the iframe preview if selected
  const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
  if (iframeDoc) {
    const iframeSections = iframeDoc.querySelectorAll("header, section, footer");
    iframeSections.forEach((sec, sIdx) => {
      if (sIdx === index) {
        sec.style.outline = "3px solid #6366f1";
        sec.style.outlineOffset = "-3px";
        sec.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        sec.style.outline = "none";
      }
    });
  }
}

// 4. Update the iframe live preview content
function updatePreview() {
  previewStatusText.textContent = "적용하는 중...";
  
  let blocksHtml = "";
  state.jsonDesign.blocks.forEach((block) => {
    const registryItem = COMPONENT_REGISTRY[block.component];
    if (registryItem) {
      blocksHtml += registryItem.render(block.props);
    }
  });

  const accentColor = state.jsonDesign.globalTheme?.accentColor || "indigo";
  if (accentColor !== "indigo") {
    blocksHtml = blocksHtml.replace(/indigo/g, accentColor);
  }

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>프리뷰</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', 'Outfit', sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Outfit', 'Inter', sans-serif;
        }
      </style>
    </head>
    <body class="bg-white">
      ${blocksHtml}
      
      <!-- Accordion Script for FAQ toggles -->
      <script>
        document.querySelectorAll('.faq-toggle').forEach(btn => {
          btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            content.classList.toggle('hidden');
            const icon = btn.querySelector('.faq-icon');
            if (icon) {
              icon.classList.toggle('rotate-180');
            }
          });
        });
      </script>
    </body>
    </html>
  `;

  // Write content to iframe
  const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(fullHTML);
  iframeDoc.close();

  // Highlight selected block inside iframe after load
  setTimeout(() => {
    if (state.selectedBlockIndex !== null) {
      const liveDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
      const sections = liveDoc.querySelectorAll("header, section, footer");
      if (sections[state.selectedBlockIndex]) {
        sections[state.selectedBlockIndex].style.outline = "3px solid #6366f1";
        sections[state.selectedBlockIndex].style.outlineOffset = "-3px";
      }
    }
  }, 100);

  // Sync to JSON textarea if not currently editing in JSON tab
  if (jsonEditorTextarea) {
    jsonEditorTextarea.value = JSON.stringify(state.jsonDesign, null, 2);
  }

  previewStatusText.textContent = "저장됨 (실시간 렌더링 중)";
}

// 5. Generate visual editor form fields in Sidebar based on Selected Block Schema
function renderVisualPropertyForm() {
  visualEditorContainer.innerHTML = "";

  if (state.selectedBlockIndex === null || !state.jsonDesign.blocks[state.selectedBlockIndex]) {
    visualEditorContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👈</div>
        <p>레이아웃 구조에서 편집할 블록을 클릭하여 선택해 주세요.</p>
      </div>
    `;
    return;
  }

  const block = state.jsonDesign.blocks[state.selectedBlockIndex];
  const schema = COMPONENT_REGISTRY[block.component].schema;
  const props = block.props;

  // Title of the Block properties editor
  const headerDiv = document.createElement("div");
  headerDiv.style.marginBottom = "20px";
  headerDiv.style.borderBottom = "1px solid var(--border-color)";
  headerDiv.style.paddingBottom = "10px";
  headerDiv.innerHTML = `
    <h4 style="font-family: var(--font-title); font-size: 15px; font-weight: 700; margin-bottom: 4px;">
      ${COMPONENT_REGISTRY[block.component].name} 속성
    </h4>
    <p style="font-size: 11px; color: var(--text-dark);">
      실시간으로 변경 내역이 프리뷰 창에 반영됩니다.
    </p>
  `;
  visualEditorContainer.appendChild(headerDiv);

  // Loop through schema and build fields
  Object.keys(schema).forEach(key => {
    const field = schema[key];
    const val = props[key];

    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    const label = document.createElement("label");
    label.className = "form-label";
    label.textContent = field.label;
    formGroup.appendChild(label);

    if (field.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "form-input";
      input.value = val || "";
      input.addEventListener("input", (e) => {
        props[key] = e.target.value;
        debouncedUpdatePreview();
      });
      formGroup.appendChild(input);
    } 
    else if (field.type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.className = "form-textarea";
      textarea.value = val || "";
      textarea.addEventListener("input", (e) => {
        props[key] = e.target.value;
        debouncedUpdatePreview();
      });
      formGroup.appendChild(textarea);
    } 
    else if (field.type === "select") {
      const select = document.createElement("select");
      select.className = "form-select";
      field.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.label;
        if (opt.value === val) option.selected = true;
        select.appendChild(option);
      });
      select.addEventListener("change", (e) => {
        props[key] = e.target.value;
        updatePreview();
      });
      formGroup.appendChild(select);
    } 
    else if (field.type === "array") {
      // List array of elements
      const listContainer = document.createElement("div");
      listContainer.style.marginTop = "8px";

      const arrItems = val || [];
      arrItems.forEach((item, itemIdx) => {
        const card = document.createElement("div");
        card.className = "subform-card";
        card.innerHTML = `<div class="subform-card-title">항목 #${itemIdx + 1}</div>`;

        const removeBtn = document.createElement("button");
        removeBtn.className = "subform-remove-btn";
        removeBtn.innerHTML = "✕ 삭제";
        removeBtn.addEventListener("click", () => {
          arrItems.splice(itemIdx, 1);
          updatePreview();
          renderVisualPropertyForm(); // Regenerate form
        });
        card.appendChild(removeBtn);

        // Render sub-inputs for array elements
        Object.keys(field.itemSchema).forEach(sKey => {
          const subField = field.itemSchema[sKey];
          const subVal = item[sKey];

          const subGroup = document.createElement("div");
          subGroup.style.marginBottom = "8px";

          const subLabel = document.createElement("label");
          subLabel.className = "form-label";
          subLabel.style.fontSize = "10px";
          subLabel.textContent = subField.label;
          subGroup.appendChild(subLabel);

          if (subField.type === "text") {
            const subInput = document.createElement("input");
            subInput.type = "text";
            subInput.className = "form-input";
            subInput.style.padding = "6px 8px";
            subInput.style.fontSize = "12px";
            subInput.value = subVal || "";
            subInput.addEventListener("input", (e) => {
              item[sKey] = e.target.value;
              debouncedUpdatePreview();
            });
            subGroup.appendChild(subInput);
          } else if (subField.type === "textarea") {
            const subTextarea = document.createElement("textarea");
            subTextarea.className = "form-textarea";
            subTextarea.style.padding = "6px 8px";
            subTextarea.style.fontSize = "12px";
            subTextarea.style.minHeight = "50px";
            subTextarea.value = subVal || "";
            subTextarea.addEventListener("input", (e) => {
              item[sKey] = e.target.value;
              debouncedUpdatePreview();
            });
            subGroup.appendChild(subTextarea);
          } else if (subField.type === "select") {
            const subSelect = document.createElement("select");
            subSelect.className = "form-select";
            subSelect.style.padding = "6px 8px";
            subSelect.style.fontSize = "12px";
            subField.options.forEach(opt => {
              const option = document.createElement("option");
              option.value = opt.value;
              option.textContent = opt.label;
              if (opt.value === subVal) option.selected = true;
              subSelect.appendChild(option);
            });
            subSelect.addEventListener("change", (e) => {
              item[sKey] = e.target.value;
              updatePreview();
            });
            subGroup.appendChild(subSelect);
          }

          card.appendChild(subGroup);
        });

        listContainer.appendChild(card);
      });

      // Button to add new element to array
      const addBtn = document.createElement("button");
      addBtn.className = "btn";
      addBtn.style.width = "100%";
      addBtn.style.justifyContent = "center";
      addBtn.style.padding = "6px 12px";
      addBtn.style.fontSize = "11px";
      addBtn.innerHTML = `+ 새 항목 추가`;
      addBtn.addEventListener("click", () => {
        // Construct new item using defaults from itemSchema
        const newItem = {};
        Object.keys(field.itemSchema).forEach(sKey => {
          newItem[sKey] = field.itemSchema[sKey].type === "select" ? field.itemSchema[sKey].options[0].value : "";
        });
        arrItems.push(newItem);
        updatePreview();
        renderVisualPropertyForm(); // Regenerate form
      });

      formGroup.appendChild(listContainer);
      formGroup.appendChild(addBtn);
    }

    visualEditorContainer.appendChild(formGroup);
  });
}

// 6. Action Functions
function moveBlock(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= state.jsonDesign.blocks.length) return;

  const temp = state.jsonDesign.blocks[index];
  state.jsonDesign.blocks[index] = state.jsonDesign.blocks[targetIndex];
  state.jsonDesign.blocks[targetIndex] = temp;

  // Track selection selection index
  if (state.selectedBlockIndex === index) {
    state.selectedBlockIndex = targetIndex;
  } else if (state.selectedBlockIndex === targetIndex) {
    state.selectedBlockIndex = index;
  }

  renderBlocksList();
  updatePreview();
  renderVisualPropertyForm();
  showToast("블록 정렬 순서가 조절되었습니다.");
}

function deleteBlock(index) {
  if (confirm("정말 이 블록을 레이아웃에서 삭제하시겠습니까?")) {
    state.jsonDesign.blocks.splice(index, 1);
    
    // Clear/adjust selection
    if (state.selectedBlockIndex === index) {
      state.selectedBlockIndex = null;
    } else if (state.selectedBlockIndex > index) {
      state.selectedBlockIndex--;
    }
    
    renderBlocksList();
    updatePreview();
    renderVisualPropertyForm();
    showToast("블록이 삭제되었습니다.");
  }
}

function showToast(message) {
  toastMessage.textContent = message;
  toastMessage.classList.add("active");
  setTimeout(() => {
    toastMessage.classList.remove("active");
  }, 2500);
}

// Setup Interaction Handlers
function setupEventListeners() {
  // Add Block click event
  btnAddBlock.addEventListener("click", () => {
    const selectedType = addBlockSelect.value;
    if (!selectedType) {
      alert("추가할 블록 종류를 선택해 주세요!");
      return;
    }

    const reg = COMPONENT_REGISTRY[selectedType];
    // deep copy defaults
    const newBlock = {
      component: selectedType,
      props: JSON.parse(JSON.stringify(reg.defaultProps))
    };

    state.jsonDesign.blocks.push(newBlock);
    state.selectedBlockIndex = state.jsonDesign.blocks.length - 1;

    addBlockSelect.selectedIndex = 0; // Reset select
    renderBlocksList();
    updatePreview();
    renderVisualPropertyForm();
    showToast("새 블록이 하단에 추가되었습니다!");
  });

  // Tab View Controls (Visual vs JSON)
  tabVisual.addEventListener("click", () => {
    tabVisual.classList.add("active");
    tabJson.classList.remove("active");
    tabContentVisual.classList.add("active");
    tabContentJson.classList.remove("active");
    state.activeTab = "visual";
  });

  tabJson.addEventListener("click", () => {
    tabJson.classList.add("active");
    tabVisual.classList.remove("active");
    tabContentJson.classList.add("active");
    tabContentVisual.classList.remove("active");
    state.activeTab = "json";
    // Ensure text is synced
    jsonEditorTextarea.value = JSON.stringify(state.jsonDesign, null, 2);
  });

  // Apply manual JSON input
  btnApplyJson.addEventListener("click", () => {
    try {
      const parsed = JSON.parse(jsonEditorTextarea.value);
      if (!parsed.blocks || !Array.isArray(parsed.blocks)) {
        throw new Error("JSON 설계도의 최상위에 'blocks' 배열 필드가 포함되어야 합니다.");
      }
      state.jsonDesign = parsed;
      state.selectedBlockIndex = null;
      
      renderBlocksList();
      syncThemeSelector();
      updatePreview();
      renderVisualPropertyForm();
      showToast("JSON 설계도 수정이 적용되었습니다.");
    } catch (e) {
      alert(`JSON 구문 오류: ${e.message}\n올바른 형식의 JSON인지 확인해 주세요.`);
    }
  });

  // Screen Viewport resizing toggles
  viewportDesktop.addEventListener("click", () => {
    viewportDesktop.classList.add("active");
    viewportMobile.classList.remove("active");
    previewViewportBox.classList.remove("mobile");
    state.viewport = "desktop";
  });

  viewportMobile.addEventListener("click", () => {
    viewportMobile.classList.add("active");
    viewportDesktop.classList.remove("active");
    previewViewportBox.classList.add("mobile");
    state.viewport = "mobile";
  });

  // Global Theme Color selector change listener
  globalThemeSelect.addEventListener("change", (e) => {
    if (!state.jsonDesign.globalTheme) {
      state.jsonDesign.globalTheme = {};
    }
    state.jsonDesign.globalTheme.accentColor = e.target.value;
    updatePreview();
    showToast(`테마 색상이 ${e.target.value}(으)로 변경되었습니다.`);
  });

  // Modal actions
  btnExportJson.addEventListener("click", () => {
    activeModalType = "json";
    exportModalTitle.textContent = "설계도 JSON 데이터 복사";
    exportCodeTextarea.value = JSON.stringify(state.jsonDesign, null, 2);
    exportModal.classList.add("active");
  });

  btnExportHtml.addEventListener("click", () => {
    activeModalType = "html";
    exportModalTitle.textContent = "HTML 소스코드 다운로드 & 복사";
    
    // Generate code without preview outlines
    let blocksHtml = "";
    state.jsonDesign.blocks.forEach((block) => {
      const registryItem = COMPONENT_REGISTRY[block.component];
      if (registryItem) {
        blocksHtml += registryItem.render(block.props);
      }
    });

    const accentColor = state.jsonDesign.globalTheme?.accentColor || "indigo";
    if (accentColor !== "indigo") {
      blocksHtml = blocksHtml.replace(/indigo/g, accentColor);
    }

    const outputHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.jsonDesign.blocks[0]?.props?.logoText || 'AutoWork AI'} 랜딩페이지</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', 'Outfit', sans-serif; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', 'Inter', sans-serif; }
  </style>
</head>
<body class="font-sans antialiased bg-white">
  ${blocksHtml.trim().replace(/\n\s*\n/g, '\n')}
  
  <script>
    // FAQ accordion controls
    document.querySelectorAll('.faq-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.classList.toggle('hidden');
        const icon = btn.querySelector('.faq-icon');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }
      });
    });
  <\/script>

  <!-- Viral Growth Footer -->
  <div style="text-align:center; padding:16px; background:#f8fafc; border-top:1px solid #e2e8f0;">
    <a href="https://aigw2026-cpu.github.io/landing-page-builder/" target="_blank" style="color:#6366f1; font-size:12px; text-decoration:none; font-family:system-ui; display:inline-flex; align-items:center; gap:6px;">
      ⚡ Built with <strong>AutoWork Landing Builder</strong> — 무료로 나만의 랜딩페이지 만들기
    </a>
  </div>
</body>
</html>`;

    exportCodeTextarea.value = outputHTML;
    exportModal.classList.add("active");
  });

  btnCloseModal.addEventListener("click", () => {
    exportModal.classList.remove("active");
  });

  // Close modal when clicking dark overlay
  exportModal.addEventListener("click", (e) => {
    if (e.target === exportModal) {
      exportModal.classList.remove("active");
    }
  });

  // Copy code from Modal
  btnCopyCode.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(exportCodeTextarea.value);
      showToast("클립보드에 복사되었습니다!");
    } catch {
      exportCodeTextarea.select();
      document.execCommand("copy");
      showToast("클립보드에 복사되었습니다!");
    }
  });

  // Download code as file
  btnDownloadCode.addEventListener("click", () => {
    const code = exportCodeTextarea.value;
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const extension = activeModalType === "html" ? "html" : "json";
    const filename = activeModalType === "html" ? "index.html" : "landing_design.json";
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("다운로드가 시작되었습니다.");
  });
}

// Global exposure for event callbacks inside block items
window.moveBlock = moveBlock;
window.deleteBlock = deleteBlock;

// Start app
window.addEventListener("DOMContentLoaded", init);
