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
