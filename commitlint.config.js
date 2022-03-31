module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'develop-rule': ({subject}) => {
      const commitFolders = ['[frontend]', '[backend]', '[domain]', '[root]'];
      return [
        commitFolders.some((folder) => folder === subject),
        `${commitFolders.forEach(folder => console.log(`${folder}\n`))}
        위 네 가지가 콜론 뒤에 포함되어야 합니다.
        `
      ]
    }
  }
};