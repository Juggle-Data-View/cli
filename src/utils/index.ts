import {readFileSync, writeFileSync} from 'node:fs'
import {basePath} from './constant'

const getFileAsString = (dirPath: string, filename: string) => {
  return readFileSync(`${dirPath}/${filename}`).toString()
}

const setObjectToFile = (info: any, dirPath: string, filename: string) => {
  const content = JSON.stringify(info, null, 2)
  return writeFileSync(`${dirPath}/${filename}`, content)
}

export const getProjectPackageJson = (path = basePath): PackageJson => {
  try {
    return JSON.parse(getFileAsString(path, 'package.json'))
  } catch {
    throw new Error('Project package.json is invalid ')
  }
}

export const setProjectPackageJson = (info: any, path = basePath) => {
  try {
    return setObjectToFile(info, path, 'package.json')
  } catch {
    throw new Error('Fail to update package.json')
  }
}

export const setComponentsJson = (info: any, path = basePath) => {
  try {
    return setObjectToFile(info, path, 'components.json')
  } catch {
    throw new Error('Fail to update components.json')
  }
}

export const getComponentsJson = (
  path = basePath,
): {
  author: string;
  createTime: number;
  components: { name: string; version: string }[];
} => {
  try {
    const content = getFileAsString(path, 'components.json')

    return JSON.parse(content)
  } catch (error) {
    console.log(error)
    throw new Error('Project components.json is invalid')
  }
}
