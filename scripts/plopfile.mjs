import { resolve } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname

// upload-img -> UploadImg
function toPascalCase(hyphenStr) {
    return hyphenStr
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  }
  
  // upload-img -> uploadImg
  function toCamelCase(hyphenStr) {
    const parts = hyphenStr.split('-');
    const camelCaseStr = parts.map((part, index) => {
      if (index === 0) {
        return part.toLowerCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })

    return camelCaseStr.join('');
  }

export default function (plop) {
  plop.setHelper('camelCase', toCamelCase)

  plop.setHelper('pascalCase', toPascalCase)

  plop.setGenerator('component', {
    description: 'create a new component package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component? (Format: text)',
        validate: function (value) {
          if (!/^[a-z-]+$/.test(value)) {
            return 'Component name must be in the format component-name (e.g., text)'
          }
          return true
        },
      },
    ],
    actions: (data) => {
      const actions = []
      console.log(resolve(__dirname, './.template'))
      actions.push({
        type: 'addMany',
        skipIfExists: true,
        destination: resolve(__dirname, `../packages/${data.name}`),
        templateFiles: `./.template/**/*.hbs`,
        verbose: true,
      })

      return actions
    },
  })
}
