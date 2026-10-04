const fs = require('node:fs')
const path = require('node:path')

const sourceBundlePath = path.join(
  __dirname,
  '..',
  'public',
  'recovery',
  'todayly-app.js',
)
const outputBundlePath = path.join(
  __dirname,
  '..',
  'public',
  'recovery',
  'todayly-app-v2.js',
)

const previousName = 'L\u1ecbch Tr\u00ecnh H\u00f4m Nay'
const previousLogo =
  'https://lh3.googleusercontent.com/aida/AEtjO1X_cckjQ8sSo8_p6k11-pYDIHbPNhBvTWaKfI89wKBNKV8sbBOCOyj9ZA0p5SlzhxUDnYe0MhEuQQOp-i__sVVV7INsNsCNUbpv4Xpn2CgkB9FIbw3Amk9NXwpK5UiaU_pigK7A0TsM1aXlIlFg_oaAtc1Ma1ZUnXRjbkceKnr__Qs3OKQLtbH9G3xH8izHZFZXmRRzOweKCobLGAvFDHWkbljacwDDP-yCqpdhNG1ox4p7r37-VVO5nvQ'

const source = fs.readFileSync(sourceBundlePath, 'utf8')
const updated = source
  .replaceAll(previousName, 'Todayly')
  .replace(previousLogo, '/todayly-logo.png')
  .replace(
    'className:`p-2 rounded-full hover:bg-surface-container 2xl:hidden text-on-surface`,"aria-label":`Menu`',
    'className:`todayly-mobile-menu p-2 rounded-full hover:bg-surface-container 2xl:hidden text-on-surface`,"aria-label":`Menu`',
  )

if (updated === source) {
  throw new Error('No matching recovered-brand strings were found')
}

if (updated.includes(previousName) || updated.includes(previousLogo)) {
  throw new Error('Recovered-brand replacement was incomplete')
}

if (!updated.includes('todayly-mobile-menu')) {
  throw new Error('Mobile menu marker was not added')
}

fs.writeFileSync(outputBundlePath, updated)

