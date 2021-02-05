export const joinPath = (...paths) => paths.map(it=> it.replace(/^\/|\/$/g, '')).join('/')

export const base_url = 'https://apisandbox.openbankproject.com'
