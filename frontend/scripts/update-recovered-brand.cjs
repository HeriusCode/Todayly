const fs = require('node:fs')
const path = require('node:path')

const bundlePath = path.join(
  __dirname,
  '..',
  'public',
  'recovery',
  'todayly-app-readable.js',
)

const previousName = 'L\u1ecbch Tr\u00ecnh H\u00f4m Nay'
const previousLogo =
  'https://lh3.googleusercontent.com/aida/AEtjO1X_cckjQ8sSo8_p6k11-pYDIHbPNhBvTWaKfI89wKBNKV8sbBOCOyj9ZA0p5SlzhxUDnYe0MhEuQQOp-i__sVVV7INsNsCNUbpv4Xpn2CgkB9FIbw3Amk9NXwpK5UiaU_pigK7A0TsM1aXlIlFg_oaAtc1Ma1ZUnXRjbkceKnr__Qs3OKQLtbH9G3xH8izHZFZXmRRzOweKCobLGAvFDHWkbljacwDDP-yCqpdhNG1ox4p7r37-VVO5nvQ'

const source = fs.readFileSync(bundlePath, 'utf8')
const updated = source
  .replaceAll(previousName, 'Todayly')
  .replace(previousLogo, '/todayly-logo.png')

if (updated === source) {
  throw new Error('No matching recovered-brand strings were found')
}

if (updated.includes(previousName) || updated.includes(previousLogo)) {
  throw new Error('Recovered-brand replacement was incomplete')
}

fs.writeFileSync(bundlePath, updated)

