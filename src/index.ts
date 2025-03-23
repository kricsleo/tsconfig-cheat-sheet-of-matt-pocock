import fs from 'node:fs/promises'
import { load } from 'cheerio'

const URL = 'https://www.totaltypescript.com/tsconfig-cheat-sheet'

sync()

async function sync() {
  const tsConfig = await grab()
  await fs.writeFile('tsconfig.cheat-sheet.json', tsConfig)
}

export async function grab() {
  const html = await (await fetch(URL)).text()
  const $ = load(html)
  const tsConfig = $($('pre > code')[0]!).text()
  return tsConfig
}