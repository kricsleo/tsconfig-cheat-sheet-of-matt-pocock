import fs from 'node:fs/promises'
import { load } from 'cheerio'
import stripJsonComments from 'strip-json-comments'

const URL = 'https://www.totaltypescript.com/tsconfig-cheat-sheet'

sync()

async function sync() {
  const tsConfig = await grab()
  await fs.writeFile('tsconfig.full.json', tsConfig)

  const libTsConfig = toLibConfig(tsConfig)
  await fs.writeFile('tsconfig.lib.json', libTsConfig)
}

function toLibConfig(tsConfig: string) {
  const lines: string[] = []

  let shouldSkip = false
  for(const line of tsConfig.split('\n')) {
    if(
        line.includes('If transpiling with') 
        || line.includes('If your code doesn\'t run in the DOM')
    ) {
        shouldSkip = true
    }
    if(
        line.includes('If NOT transpiling') 
        || line.includes('If your code runs in the DOM') 
        || line.startsWith('  }')
    ) {
        shouldSkip = false
    }
    if(
        shouldSkip
        || line.includes('/* ')
        || line.trim() === ''
    ) {
        continue
    }
    lines.push(line)
  }

  return lines.join('\n')
}

export async function grab() {
  const html = await (await fetch(URL)).text()
  const $ = load(html)
  const tsConfig = $($('pre > code')[0]!).text()
  return tsConfig
}