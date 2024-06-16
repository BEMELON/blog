import { QuartzTransformerPlugin } from "../types"
import rehypePrettyCode, { Options as CodeOptions, Theme as CodeTheme } from "rehype-pretty-code"
import { transformerNotationDiff } from "shikiji-transformers"
import { ShikijiTransformer } from 'shikiji';

interface Theme extends Record<string, CodeTheme> {
  light: CodeTheme
  dark: CodeTheme
}

interface Options {
  theme?: Theme
  keepBackground?: boolean
  transformers?: any[]
}

const defaultOptions: Options = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
  transformers: [transformerNotationDiff()],
}

export const SyntaxHighlighting: QuartzTransformerPlugin<Options> = (
  userOpts?: Partial<Options>,
) => {
  const opts: Partial<CodeOptions> = { ...defaultOptions, ...userOpts }

  return {
    name: "SyntaxHighlighting",
    htmlPlugins() {
      return [[rehypePrettyCode, opts]]
    },
  }
}
