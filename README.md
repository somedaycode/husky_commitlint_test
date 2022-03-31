# 어떻게 커밋룰은 반강제 할 수 있나?

githooks

husky 및 commitlint 사용


`yarn add -D husky @commitlint/config-conventional @commitlint/cli`

`npx husky install`

`yarn husky add .husky/commit-msg "yarn commitlint --edit $1"`
