/* 이 파일에서 프로필, 프로젝트, 노트를 관리합니다. 외부 라이브러리가 필요 없습니다. */
window.PORTFOLIO = {
  profile: {
    name: 'Eoram Kim', koreanName: '', affiliation: 'Inha University · Aerospace Engineering',
    email: '', github: '', // 확인된 이메일과 GitHub URL을 넣으면 연락처가 나타납니다.
    interests: ['Model Predictive Control', 'Learning-based Dynamics', 'Guidance & Navigation'],
    intro: '비행 동역학을 이해하고, 모델과 제어기를 구현하며, 시뮬레이션으로 검증합니다. 항공우주 시스템의 유도·항법·제어와 데이터 기반 동역학 모델링에 관심이 있습니다.'
  },
  projects: [
    {id:'qendy-mpc', number:'01', type:'DYNAMICS & CONTROL', title:'Learning dynamics. Comparing controllers.', koreanTitle:'QENDy 기반 모델링과 선형화 MPC', tags:['QENDy','MPC','ROS 2'], description:'학습한 동역학 모델과 선형화 모델을 제어 관점에서 비교하는 연구. 모델 학습, 제어기, 실제 동역학 시뮬레이션을 분리해 같은 조건에서 비교할 수 있는 구조를 구성합니다.', focus:['비선형 드론 동역학과 선형화 모델','위치 추종 비용을 사용하는 QP / OSQP 구현','ROS 2 Humble · Gazebo Harmonic 연동 및 로그 분석'], note:'결과를 비교할 때는 예측 정확도와 폐루프 추종 성능을 함께 확인합니다.', figure:'dynamics'},
    {id:'collision', number:'02', type:'COOPERATIVE COLLISION AVOIDANCE', title:'A safer way to pass.', koreanTitle:'정면 접근 상황의 협력적 충돌회피', tags:['Optimization','MPC','Safety'], description:'두 무인체가 정면으로 접근하는 상황에서 종방향 속도제어와 횡방향 회피 기동을 함께 고려합니다. 안전거리 제약의 근사와 예측 지평선이 기동에 미치는 영향을 살펴봅니다.', focus:['횡방향 상태·가속도를 이용한 예측 제어','충돌 영역에 대한 분리 평면 기반 제약','종말 비용·제약과 솔버 수렴성 분석'], note:'회피 경로 그림은 아이디어를 설명하는 개념도이며 실험 결과가 아닙니다.', figure:'collision'},
    {id:'edl', number:'03', type:'SIMULATION & VERIFICATION', title:'From sensor signals to flight behavior.', koreanTitle:'화성 EDL 시연체 통합 시뮬레이션', tags:['Simulation','MATLAB','GNC'], description:'MATLAB / Simulink에서 센서, 추진, 항법, 제어 모듈을 통합하고 비정상적인 비행 거동의 원인을 분리해 확인합니다.', focus:['LiDAR·IMU 측정과 노이즈 모델','INS 고도·수직속도와 제어 응답 비교','지면 접촉 처리와 좌표계 일관성 점검'], note:'센서와 상태 추정, 제어 입력을 같은 시간축에서 비교하는 검증 과정에 집중합니다.', figure:'simulation'}
  ],
  notes: [
    {slug:'mpc-to-qp', category:'Control', title:'MPC를 QP로 만드는 과정', summary:'예측 모델과 추종 비용, 입력 제약을 하나의 최적화 문제로 정리하기.', tags:['MPC','QP','OSQP'], read:'5 min', status:'정리 초안', sections:[
      {heading:'먼저 모델과 변수를 정한다', text:'선형 이산 모델 xₖ₊₁ = A xₖ + B uₖ를 사용하면 예측 상태는 초기 상태와 입력의 선형 결합으로 표현된다. 상태와 입력을 모두 최적화 변수로 둘 수도 있고, 상태를 소거해 입력만 변수로 둘 수도 있다.'},
      {heading:'비용은 추종 오차와 제어 노력을 함께 본다', text:'위치 추종 오차의 제곱합과 입력의 제곱합은 양의 준정부호 가중치에서 볼록 이차 비용이 된다. 입력 변화량 비용을 추가하면 직전 입력 u₋₁도 문제의 데이터로 넣어야 한다.', formula:'J = Σₖ₌₀ᴺ⁻¹ [(xₖ − rₖ)ᵀQ(xₖ − rₖ) + uₖᵀRuₖ] + (xᴺ − rᴺ)ᵀP(xᴺ − rᴺ)'},
      {heading:'제약의 형태가 솔버를 결정한다', text:'선형 동역학, 상태·입력의 선형 부등식, 볼록 이차 비용으로 구성하면 QP로 다룰 수 있다. 비선형 충돌 제약이나 자세 오차를 그대로 추가하면 같은 QP 형태가 유지되는지 다시 확인해야 한다.'},
      {heading:'구현에서 확인할 것', list:['첫 상태를 현재 추정 상태와 일치시켰는가?','참조 궤적의 시간과 상태 순서가 일치하는가?','입력 단위와 포화 범위가 실제 모델과 같은가?','실패 시 이전 입력을 그대로 쓰는 것이 안전한가?','예측 지평선의 길이와 제어 주기를 따로 기록했는가?']}
    ]},
    {slug:'qendy-and-feedback', category:'Learning', title:'QENDy와 폐루프 동역학을 구분하기', summary:'학습한 상태 변화율 모델과 피드백 정책은 각각 무엇을 제공할까?', tags:['QENDy','Dynamics','Feedback'], read:'4 min', status:'정리 초안', sections:[
      {heading:'모델을 학습하는 것과 제어기를 학습하는 것', text:'상태 변화율을 근사하는 모델은 주어진 상태에서 시스템이 어떻게 움직이는지를 설명한다. 제어 정책은 그 상태에서 어떤 입력을 선택할지를 정한다. 동역학 모델을 빠르게 평가할 수 있다는 사실만으로 최적 입력이 바로 계산되는 것은 아니다.'},
      {heading:'피드백으로 닫으면 자율계가 될 수 있다', text:'입력 u = π(x)를 고정된 상태 피드백으로 정하면 ẋ = f(x, π(x))가 된다. 정책과 환경이 시간에 직접 의존하지 않고 상태가 충분히 정의되어 있다면 이 폐루프는 자율계로 볼 수 있다.', formula:'ẋ = f(x, u),   u = π(x)   →   ẋ = f(x, π(x))'},
      {heading:'학습한 흐름을 쓸 때의 한계', text:'폐루프 궤적을 학습한 모델은 그 정책 아래의 상태 흐름을 근사한다. 새로운 목표, 시간에 따라 바뀌는 참조, 다른 제약 조건에서 동일한 최적성이 보장되지는 않는다. 정책을 출력하려면 입력 복원 또는 별도 정책 표현도 필요하다.'},
      {heading:'비교 실험의 기준', list:['동일한 초기 상태와 기준 궤적을 사용한다.','학습 구간 밖의 초기 상태도 확인한다.','단일 스텝 예측과 장시간 rollout 오차를 분리한다.','위치 추종 오차, 제약 위반, 계산 시간을 함께 기록한다.','학습 데이터 생성에 사용한 피드백을 명시한다.']}
    ]},
    {slug:'collision-halfspace', category:'Optimization', title:'충돌회피 제약과 분리 평면', summary:'원 바깥 조건을 선형 제약으로 근사할 때 놓치기 쉬운 점.', tags:['MPC','Safety','Convexification'], read:'4 min', status:'정리 초안', sections:[
      {heading:'안전거리 조건은 비볼록이다', text:'두 위치의 상대 벡터 r = p₂ − p₁에 대해 ‖r‖₂ ≥ d_safe는 원 또는 구의 바깥을 요구한다. 바깥 영역 전체는 볼록 집합이 아니기 때문에 일반적인 볼록 QP에 그대로 넣을 수 없다.'},
      {heading:'하나의 안전한 반공간을 고른다', text:'단위 법선 n을 미리 정하고 nᵀr ≥ d_safe를 사용하면 안전 영역의 일부를 선형 제약으로 표현할 수 있다. 실제 적용에서는 반경의 정의가 단일 기체 반경인지, 두 기체를 합친 안전거리인지 명확히 해야 한다.', formula:'‖n‖₂ = 1,   nᵀ(p₂ − p₁) ≥ d_safe'},
      {heading:'근사 방향은 기동 가능성을 바꾼다', text:'잘못 선택한 분리 방향은 원래 가능한 회피 기동까지 막을 수 있다. 이전 예측 궤적을 기준으로 법선을 갱신할 때는 방향이 갑자기 뒤집히지 않는지, 초기 상태가 제약과 양립하는지 확인해야 한다.'},
      {heading:'예측점과 연속 시간은 다르다', text:'샘플 시각에서 거리가 충분하더라도 그 사이의 실제 궤적이 안전하다는 보장은 별도 검토가 필요하다. 시뮬레이션에서는 더 작은 시간 간격으로 최소 거리를 계산하고, 지연과 모델 오차를 고려한 여유 거리도 함께 점검한다.'}
    ]},
    {slug:'simulation-debugging', category:'Simulation', title:'시뮬레이션 이상 거동을 추적하는 순서', summary:'좌표계, 시간, 센서, 제어기를 분리해 원인을 좁히는 체크리스트.', tags:['ROS 2','Gazebo','GNC'], read:'3 min', status:'정리 초안', sections:[
      {heading:'좌표계와 단위를 먼저 확인한다', text:'NED / ENU와 FRD / FLU처럼 같은 물리량도 좌표계에 따라 부호가 달라진다. 위치, 속도, 자세, 힘에 적용한 변환을 각각 확인한다. 자세 쿼터니언의 성분 순서와 각속도의 기준 좌표계도 기록한다.'},
      {heading:'동일한 시간축에서 비교한다', text:'시뮬레이션 시간과 실제 경과 시간, 센서 발행 주기와 제어 주기가 뒤섞이면 지연처럼 보이는 현상이 생긴다. 메시지 타임스탬프와 실제 입력이 적용된 시점을 함께 남긴다.'},
      {heading:'모듈을 단계적으로 연결한다', list:['고정 입력으로 실제 동역학이 예상대로 움직이는지 확인한다.','참 상태와 센서 측정, 추정 상태를 비교한다.','참 상태를 제어기에 넣어 추정기 영향과 제어기 영향을 분리한다.','제어 입력의 포화와 부호, 중력 보상 여부를 확인한다.','접촉·착륙·모드 전환 순간의 상태를 별도로 기록한다.']},
      {heading:'실험 조건도 결과의 일부다', text:'모델 버전, 솔버 설정, 초기 상태, 참조 궤적, 난수 seed, 실행 명령을 결과와 함께 저장한다. 궤적 그림 하나보다 다른 사람이 다시 실행할 수 있는 실험 기록이 더 오래 유용하다.'}
    ]}
  ]
};
