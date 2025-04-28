import path from 'node:path'
import { defineCommand, runMain } from 'citty'
import { generateFullTsConfig, generateLibTsConfig } from './index'
import { version } from '../package.json'

const cmd = defineCommand({
  meta: {
    version,
    description: 'Initialize "tsconfig.json" from the https://www.totaltypescript.com/tsconfig-cheat-sheet',
  },
  args: {
    type: {
      // TODO: should use enum, but citty doesn't release it yet
      // type: "enum",
      type: "string",
      default: 'lib',
      description: 'Project type',
    }
  },
  run({ args}) {
    switch (args.type) {
      case 'lib': {
        const filepath = path.resolve(process.cwd(), './tsconfig.lib.json')
        generateLibTsConfig(filepath)
        break
      }
      case 'full': {
        const filepath = path.resolve(process.cwd(), './tsconfig.full.json')
        generateFullTsConfig(filepath)
        break
      }
      default: throw new Error('Invalid type. Use "lib" or "full".')
    }
  }
})

runMain(cmd)

// TODO: migrate to commander
// const libTsConfigPath = path.resolve(process.cwd(), './tsconfig.lib.json')
// generateLibTsConfig(libTsConfigPath)

// const fullTsConfigPath = path.resolve(process.cwd(), './tsconfig.full.json')
// generateFullTsConfig(fullTsConfigPath)