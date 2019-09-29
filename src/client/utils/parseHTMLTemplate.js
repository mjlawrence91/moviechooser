export const parseTemplate = (template, selector) => {
  if (!template) {
    console.error('Please provide a template.')
    return
  }

  if (!selector) {
    console.error('Please provide a template ID.')
    return
  }

  const domParser = new DOMParser()
  const parsedTemplate = domParser.parseFromString(template, 'text/html')
  const element = parsedTemplate.querySelector(selector)

  if (element) {
    return element.innerHTML
  } else {
    console.error('No template found that matches the provided ID.')
  }
}
