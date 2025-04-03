import path from 'node:path'
import { generateFullTsConfig, generateLibTsConfig } from './index'

// TODO: migrate to commander
const libTsConfigPath = path.resolve(process.cwd(), './tsconfig.lib.json')
generateLibTsConfig(libTsConfigPath)

const fullTsConfigPath = path.resolve(process.cwd(), './tsconfig.full.json')
generateFullTsConfig(fullTsConfigPath)