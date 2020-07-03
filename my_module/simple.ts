import { Module } from '@nuxt/types'

interface Options {
  a: boolean
  b: number
  c: string
}

const SimpleModule: Module<Options> = function (moduleOptions) {
  // Use this, this.options, this.nuxt
  // Use moduleOptions
}

export default SimpleModule
