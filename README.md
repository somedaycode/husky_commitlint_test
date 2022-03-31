# 프로젝트에 커밋룰 적용하기

방법 1: githooks 사용

방법 2: husky과 commitlint을 섞어 사용

## Proceed typing below commands in terminal

---

```
yarn add -D husky @commitlint/config-conventional @commitlint/cli

echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

yarn husky install or npx husky install

yarn husky add .husky/commit-msg "yarn commitlint --edit $1"
```


## 기본 커밋 규칙

---


```js
// @commitlint/config-conventional 기본 설정

module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [
      1,
      'always'
    ],
    'body-max-line-length': [
      2,
      'always',
      100
    ],
    'footer-leading-blank': [
      1,
      'always'
    ],
    'footer-max-line-length': [
      2,
      'always',
      100
    ],
    'header-max-length': [
      2,
      'always',
      100
    ],
    'subject-case': [
      2,
      'never',
      [
        'sentence-case',
        'start-case',
        'pascal-case',
        'upper-case'
      ]
    ],
    'subject-empty': [
      2,
      'never'
    ],
    'subject-full-stop': [
      2,
      'never',
      '.'
    ],
    'type-case': [
      2,
      'always',
      'lower-case'
    ],
    'type-empty': [
      2,
      'never'
    ],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
}
```

## Custom Rule 설정하기

---

```js
// custom rules 추가

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'develop-rule': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'develop-rule': ({subject}) => {
          const commitFolders = ['[frontend]', '[backend]', '[domain]', '[root]'];
          return [
            commitFolders.some((folder) => subject?.startsWith(folder) !== subject?.endsWith(folder)),
            `\n${commitFolders.map(folder => `${folder}\n`).join('')}
위 네 가지 중 한 가지는 반드시 콜론(:) 뒤에 포함되어야 합니다.
[name] 뒤에 메시지 입력은 필수입니다.

ex) feat: [frontend] 마우스 더블클릭 후 스타일 변경`
          ]
        },
      },
    }
  ]
};

```

### TEST

```
// fail
git commit -m 'docs: README.md'

or

git commit -m 'docs:[frontend]
```

![image](https://user-images.githubusercontent.com/71962505/161019591-eec57f34-924d-482c-8186-25236258d8f3.png)

![image](https://user-images.githubusercontent.com/71962505/161019121-931049f2-7570-4569-80c5-bc11c0300a27.png)


```
//success
git commit -m 'docs: [frontend] README.md'
```