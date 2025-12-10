import 'dotenv/config'
import { z } from 'zod'

class EnvError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvError'
  }
}

const zStrVar = z.string().min(1)
const zEnv = z.object({
  MICROCMS_API_KEY: zStrVar,
  MICROCMS_SERVICE_DOMAIN: zStrVar,
})

try {
  zEnv.parse(process.env)
} catch (err) {
  if (err instanceof z.ZodError) {
    throw new EnvError(
      `env type is invalid\n${err.issues.map((v) => `${v.message}: env.${String(v.path[0])}`).join('\n')}`,
    )
  }
  throw err
}

declare module 'bun' {
  interface Env extends z.infer<typeof zEnv> {}
}
