# Eoram Kim — Aerospace & Control

항공우주 제어 연구, CV, 프로젝트, 학습 기록을 모아 둔 개인 사이트입니다.
HTML / CSS / JavaScript만 사용하며 별도 설치나 빌드가 필요 없습니다.

## 구성

| 파일 | 역할 |
| --- | --- |
| `dist/index.html` | 사이트 기본 구조 |
| `dist/assets/content.js` | 프로필, 연구 프로젝트, 학습 노트 내용 |
| `dist/assets/app.js` | 화면 전환, 검색, 분류 필터 |
| `dist/assets/style.css` | 반응형 디자인 |
| `dist/cv.html` | 인쇄와 PDF 저장을 위한 CV |
| `.github/workflows/pages.yml` | GitHub Pages 자동 배포 |

메뉴는 Overview / Research / Study notes / CV로 나뉩니다.
학습 기록은 제목·요약·본문·태그로 검색할 수 있습니다.
해시 링크를 사용하므로 GitHub Pages에서도 상세 페이지 새로고침이 동작합니다.
모든 정적 파일 경로가 상대 경로라서 `username.github.io`와 프로젝트 저장소 주소 모두 지원합니다.

## 로컬에서 보기

압축을 푼 폴더에서 아래 명령을 실행하고 `http://localhost:8000`을 엽니다.

```bash
python3 -m http.server 8000 --directory dist
```

Windows에서 Python 명령이 `py`라면:

```powershell
py -m http.server 8000 --directory dist
```

간단히 `dist/index.html`을 브라우저에서 직접 열어도 주요 기능을 사용할 수 있습니다.
CV 메뉴의 `Printable CV` 버튼을 누른 다음 `인쇄 / PDF로 저장`에서 PDF로 저장합니다.
인쇄 설정에서 용지를 A4로 선택하고 브라우저의 머리글·바닥글을 끄면 깔끔합니다.

## GitHub Pages에 올리기

1. GitHub에 새 저장소를 만듭니다. 개인 홈페이지 주소를 쓰려면 이름을 `내아이디.github.io`로 정합니다. 일반 저장소 이름도 가능합니다.
2. 압축을 푼 **폴더 내부의 파일들**을 저장소 최상위에 올립니다. `dist/`, `.github/`, `README.md`가 저장소 최상위에 있어야 합니다. `.github/` 폴더도 포함하세요.
3. 저장소의 기본 브랜치를 `main`으로 사용합니다. 다른 브랜치를 쓴다면 `pages.yml`의 `branches` 값을 바꿉니다.
4. 저장소에서 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
5. **Actions → Deploy personal site to GitHub Pages → Run workflow**로 실행합니다. 이후 `main`에 변경 사항을 push하면 자동 배포됩니다.
6. 성공하면 **Settings → Pages**에 실제 사이트 주소가 표시됩니다.

터미널로 처음 올리는 경우, `내아이디`와 저장소 이름을 실제 값으로 바꿉니다.
기존 Git 저장소에서 작업하고 있다면 아래 `git init`과 `remote add`는 생략합니다.

```bash
git init
git add .
git commit -m "Create personal portfolio and study archive"
git branch -M main
git remote add origin https://github.com/내아이디/내아이디.github.io.git
git push -u origin main
```

GitHub 로그인은 VS Code 또는 GitHub의 인증 안내에 따라 진행합니다.

공식 안내:
- [GitHub Pages 게시 소스 구성](https://docs.github.com/ko/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages 사용자 지정 워크플로](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## 내용 수정하기

### 프로필과 연락처

`dist/assets/content.js`의 `profile`을 수정합니다.
`github`에 확인된 HTTPS 주소를 넣으면 사이트 하단과 CV 화면에 GitHub 링크가 표시됩니다.
`email`에 이메일을 넣으면 CV에 연락처가 표시됩니다. 비어 있으면 표시하지 않습니다.
CV의 학력·연구 기간·자격 취득일·상세 경험은 `app.js`의 `cv()`와 `cv.html`에도 맞춰 수정합니다.

### 연구 프로젝트

`content.js`의 `projects`에 항목을 추가합니다.
`id`는 중복되지 않는 영문 이름을 쓰고, `title`, `koreanTitle`, `description`, `focus`, `tags`를 수정합니다.
도식은 개념을 설명하기 위한 그림이며 실제 측정 결과가 아닙니다.
코드 주소와 실험 결과는 확인된 자료를 준비한 뒤 추가하세요.

### 학습 노트

`content.js`의 `notes` 배열에 아래 형태의 항목을 추가합니다. 문장 안의 작은따옴표는 이스케이프하거나 바깥 문자열을 큰따옴표로 작성합니다.

```javascript
{
  slug: 'new-study-note',
  category: 'Control',
  title: '새로운 공부 기록',
  summary: '한 줄 요약',
  tags: ['MPC', 'Dynamics'],
  read: '3 min',
  status: '정리 초안',
  sections: [
    { heading: '핵심 개념', text: '설명 문장' },
    { heading: '수식', formula: 'x_next = A x + B u' },
    { heading: '확인할 점', list: ['첫 번째 항목', '두 번째 항목'] }
  ]
}
```

HTML을 직접 넣는 방식이 아닌 일반 텍스트를 사용합니다.
새 `category`는 필터에 자동으로 추가됩니다.

## 콘텐츠 초안 안내

CV와 연구 소개는 대화에서 공유된 경험을 바탕으로 작성했습니다.
정확한 재학·졸업 상태, 활동 기간, 연락처와 공개 가능한 과제 설명을 확인해 최종 내용을 채워 주세요.
학습 노트 4편은 공부한 주제를 바탕으로 작성한 정리 초안입니다.
발표·논문 실적, 성과 수치, 저장소 주소와 날짜는 임의로 추가하지 않았습니다.
