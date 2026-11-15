import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Next 16 removed `next lint`; this is the flat config its docs prescribe.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // next/image is disabled (images.unoptimized, no optimizer on the Cloudflare worker), so plain <img> is the intended element.
      '@next/next/no-img-element': 'off',
    },
  },
  globalIgnores(['.next/**', '.open-next/**', 'out/**', 'build/**', 'next-env.d.ts', 'cloudflare-env.d.ts']),
])
