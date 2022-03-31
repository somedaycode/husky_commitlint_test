# 어떻게 커밋룰은 반강제 할 수 있나?

1. githooks 사용
2. husky 및 commitlint 사용

## Proceed typing below commands in terminal

```
yarn add -D husky @commitlint/config-conventional @commitlint/cli

echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

yarn husky install or npx husky install

yarn husky add .husky/commit-msg "yarn commitlint --edit $1"
```

## @commitlint/config-conventional 기본 설정

```js
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

```js
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
            commitFolders.some((folder) => subject?.startsWith(folder)),
            `\n${commitFolders.map(folder => `${folder}\n`).join('')}
위 네 가지 중 한 가지는 반드시 콜론(:) 뒤에 포함되어야 합니다.
ex) feat: [frontend] 마우스 더블클릭 후 스타일 변경`
          ]
        },
      },
    }
  ]
};
```
