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
  }
};

// Preset Templates list
const PRESET_TEMPLATES = {
  autowork: {
    name: "AutoWork AI 기본",
    desc: "AI 기반 업무 자동화 랜딩 페이지",
    blocks: [
      {
        component: "Header_Basic",
        props: {
          logoText: "AutoWork AI",
          navLinks: [
            { label: "기능 소개", url: "#features" },
            { label: "도입 사례", url: "#testimonials" },
            { label: "요금제", url: "#pricing" }
          ],
          ctaButtonText: "무료 상담 신청"
        }
      },
      {
        component: "Hero_Type_A",
        props: {
          title: "단순 반복 업무,\n이제 AI에게 맡기세요",
          subtitle: "팀이 더 가치 있는 일에 집중할 수 있도록 복잡한 비즈니스 로직을 자동화하는 최적의 솔루션을 제공합니다.",
          primaryButtonText: "14일 무료 체험하기",
          secondaryButtonText: "데모 영상 보기",
          bgColor: "bg-indigo-50/40"
        }
      },
      {
        component: "Features_Grid",
        props: {
          sectionBadge: "강력한 핵심 기능",
          sectionTitle: "스마트한 인공지능이 업무를 혁신합니다",
          sectionDesc: "더 복잡하고 까다로운 스케줄링 업무도 간단한 워크플로우 드래그를 통해 완벽하게 해결합니다.",
          features: [
            { icon: "⚡", title: "실시간 업무 동기화", desc: "사용 중인 협업 툴(Slack, Jira, Teams)과 플러그인 연동을 통해 이벤트를 실시간 모니터링합니다." },
            { icon: "🤖", title: "지능형 시나리오 구성", desc: "자연어로 원하는 시나리오를 설명하면, AI가 최적의 실행 흐름을 자동 구축합니다." },
            { icon: "📈", title: "자동 시각 분석 보고서", desc: "매주/매월 말에 생성되는 복잡한 업무 성과 데이터를 대시보드 리포트로 즉시 변환합니다." }
          ]
        }
      },
      {
        component: "CTA_Banner",
        props: {
          headline: "업무 혁신, 더 이상 미루지 마세요.",
          subheadline: "불필요한 반복 행위를 정리하고 혁신적인 가치를 만드는 작업에만 에너지를 집중하세요.",
          buttonText: "전문가와 도입 상담하기",
          bgColor: "bg-indigo-600"
        }
      },
      {
        component: "Footer_Simple",
        props: {
          logoText: "AutoWork AI",
          copyrightText: "© 2026 AutoWork AI Inc. All rights reserved.",
          links: [
            { label: "이용약관", url: "#" },
            { label: "개인정보처리방침", url: "#" },
            { label: "고객지원", url: "#" }
          ]
        }
      }
    ]
  },
  saas: {
    name: "SaaS 스타트업",
    desc: "고도화된 8개 블록으로 이루어진 세일즈용 템플릿",
    blocks: [
      {
        component: "Header_Basic",
        props: {
          logoText: "CloudFlow AI",
          navLinks: [
            { label: "특장점", url: "#features" },
            { label: "요금 안내", url: "#pricing" }
          ],
          ctaButtonText: "지금 가입하기"
        }
      },
      {
        component: "Hero_Type_Gradient",
        props: {
          title: "성공적인 비즈니스를 위한\n원스톱 AI 오토메이션",
          subtitle: "수작업 데이터 수집, 중복 문서 검토, 리포트 작성을 하나의 파이프라인으로 구축하세요.",
          primaryButtonText: "무료로 시작하기",
          secondaryButtonText: "자세히 알아보기",
          gradientFrom: "from-slate-900",
          gradientTo: "to-indigo-950"
        }
      },
      {
        component: "Stats_Banner",
        props: {
          bgColor: "bg-indigo-600",
          stats: [
            { value: "99.8%", label: "자동화 성공률" },
            { value: "15,000+", label: "글로벌 협업 팀" },
            { value: "3.2억", label: "누적 절약 시간 (시)" },
            { value: "48%", label: "평균 개발 비용 절감" }
          ]
        }
      },
      {
        component: "Features_Grid",
        props: {
          sectionBadge: "핵심 요약 기능",
          sectionTitle: "속도, 신뢰성 그리고 뛰어난 보안성",
          sectionDesc: "비즈니스에 필수적인 핵심 기능을 완벽하게 지원합니다.",
          features: [
            { icon: "🛡️", title: "군용 급 보안 솔루션", desc: "모든 정보가 암호화 프로토콜을 통과하여, 중요 내부 핵심 보안 문서도 완벽하게 수호됩니다." },
            { icon: "⚡", title: "초고속 동기화 스피드", desc: "지연 시간이 없는 고속 엔진을 통해 0.1초 이내에 트리거 실행이 이루어집니다." },
            { icon: "💡", title: "쉬운 대시보드 관리", desc: "드래그 앤 드롭 편집기로 직관적인 프로세스 확인과 운영 현황이 한눈에 파악됩니다." }
          ]
        }
      },
      {
        component: "Testimonials_Grid",
        props: {
          sectionTitle: "실제 고객들의 추천 이야기",
          sectionDesc: "더 이상 단순 노가다 작업에 시간 낭비하지 않는 비즈니스 오피스의 생생한 후기.",
          testimonials: [
            { avatar: "👩‍💻", name: "김민재", role: "토스 개발 리드", quote: "매일 아침 1시간 넘게 걸리던 에러 리포트 수집 및 분류 작업이 AutoWork 도입 후 1분 만에 자동으로 완료됩니다." },
            { avatar: "👨‍💼", name: "최우식", role: "라인 운영 총괄", quote: "연동 플러그인이 풍부해서 도입 3일 만에 기존 인프라 전체 연동이 가능했습니다. 완벽해요." },
            { avatar: "💎", name: "윤아름", role: "스타트업 CEO", quote: "업무 생산성 향상 비율이 약 300% 이상 뛰었습니다. 필수 소프트웨어입니다." }
          ]
        }
      },
      {
        component: "Pricing_Three_Tier",
        props: {
          sectionTitle: "합리적인 가격 구성",
          sectionDesc: "비즈니스의 규모와 용량에 맞춰 최적의 비용 플랜을 만나보세요.",
          plans: [
            { name: "스타터 플랜", price: "₩29,000", period: "월", features: "기본 자동화 플로우 10개, 월 실행 횟수 5,000회, 슬랙/디스코드 연동, 1인 관리 담당자", buttonText: "스타터 무료 시작", isPopular: false },
            { name: "프로 플랜", price: "₩89,000", period: "월", features: "제한 없는 자동화 플로우, 월 실행 횟수 50,000회, 지연 없는 실행 속도, 연동 툴 전체 지원, 24시간 우선 지원", buttonText: "프로 무료 체험 신청", isPopular: true },
            { name: "엔터프라이즈", price: "별도 문의", period: "연", features: "실행 횟수 무제한, 사내망(온프레미스) 구축 가능, 전담 어카운트 매니저 배정, 커스텀 API 통합 설계", buttonText: "도입 관련 상담 요청", isPopular: false }
          ]
        }
      },
      {
        component: "FAQ_Accordion",
        props: {
          sectionTitle: "자주 묻는 질문",
          faqs: [
            { question: "코딩을 전혀 모르는 비개발자도 정말 사용할 수 있나요?", answer: "코딩을 몰라도 자연어 설명 방식으로 프로세스를 완벽 설계 가능합니다." },
            { question: "결제 취소 절차는 어떻게 되나요?", answer: "설정 창에서 한 번의 클릭만으로 언제든 취소 및 해지가 가능합니다." }
          ]
        }
      },
      {
        component: "Footer_Simple",
        props: {
          logoText: "CloudFlow AI",
          copyrightText: "© 2026 CloudFlow AI Inc. All rights reserved.",
          links: [
            { label: "개인정보보호", url: "#" },
            { label: "도움말", url: "#" }
          ]
        }
      }
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
        updatePreview();
      });
      formGroup.appendChild(input);
    } 
    else if (field.type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.className = "form-textarea";
      textarea.value = val || "";
      textarea.addEventListener("input", (e) => {
        props[key] = e.target.value;
        updatePreview();
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
              updatePreview();
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
              updatePreview();
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
  btnCopyCode.addEventListener("click", () => {
    exportCodeTextarea.select();
    document.execCommand("copy");
    showToast("클립보드에 복사되었습니다!");
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
