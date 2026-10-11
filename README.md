# Eoram Kim — Personal website

항공우주 제어 연구, 프로젝트, CV와 학습 기록을 담은 개인 사이트입니다.
HTML / CSS / JavaScript로 구성되어 별도의 설치나 빌드가 필요 없습니다.

## GitHub Pages 자동 배포

- 배포 워크플로: [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
- 배포할 사이트: [`eoram-personal-site/dist/`](eoram-personal-site/dist/)
- 배포 조건: `main` 브랜치에 push하거나 Actions에서 수동 실행
- 사이트 주소: Pages 활성화 및 첫 배포 성공 후 <https://eoramkim-lab.github.io/eoram-personal-site/>

저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
GitHub Free에서 GitHub Pages를 사용하려면 저장소가 공개 상태여야 합니다.
비공개 저장소는 GitHub Pages를 지원하는 유료 요금제가 필요합니다.
자세한 내용은 [GitHub 공식 안내](https://docs.github.com/ko/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)를 참고하세요.

설정 후 변경 사항을 GitHub에 올리면 자동 배포됩니다. 로컬 파일을 저장한 것만으로는 배포되지 않습니다.

```powershell
git add eoram-personal-site/dist
git commit -m "Update personal site"
git push origin main
```

**Actions → Deploy personal site to GitHub Pages**에서 진행 상황을 확인할 수 있습니다.
배포가 완료되기까지 몇 분 걸릴 수 있습니다.

## 수정할 파일

| 파일 | 수정 내용 |
| --- | --- |
| `eoram-personal-site/dist/assets/content.js` | 프로필, 연구 프로젝트, 학습 노트 |
| `eoram-personal-site/dist/assets/app.js` | 메뉴, 화면 전환, CV 화면 |
| `eoram-personal-site/dist/assets/style.css` | 디자인과 반응형 레이아웃 |
| `eoram-personal-site/dist/index.html` | 사이트 기본 구조 |
| `eoram-personal-site/dist/cv.html` | 인쇄 및 PDF 저장용 CV |

## 로컬에서 확인하기

저장소 최상위 폴더에서 실행합니다.

```powershell
py -m http.server 8000 --directory eoram-personal-site/dist
```

브라우저에서 <http://localhost:8000>을 엽니다.
콘텐츠 편집 방법은 [사이트 설명서](eoram-personal-site/README.md)를 참고하세요.
