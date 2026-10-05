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
  'todayly-app-v3.js',
)

const previousName = 'L\u1ecbch Tr\u00ecnh H\u00f4m Nay'
const previousLogo =
  'https://lh3.googleusercontent.com/aida/AEtjO1X_cckjQ8sSo8_p6k11-pYDIHbPNhBvTWaKfI89wKBNKV8sbBOCOyj9ZA0p5SlzhxUDnYe0MhEuQQOp-i__sVVV7INsNsCNUbpv4Xpn2CgkB9FIbw3Amk9NXwpK5UiaU_pigK7A0TsM1aXlIlFg_oaAtc1Ma1ZUnXRjbkceKnr__Qs3OKQLtbH9G3xH8izHZFZXmRRzOweKCobLGAvFDHWkbljacwDDP-yCqpdhNG1ox4p7r37-VVO5nvQ'

const source = fs.readFileSync(sourceBundlePath, 'utf8')
let updated = source
  .replaceAll(previousName, 'Todayly')
  .replace(previousLogo, '/todayly-logo.png')
  .replace(
    'className:`p-2 rounded-full hover:bg-surface-container 2xl:hidden text-on-surface`,"aria-label":`Menu`',
    'className:`todayly-mobile-menu p-2 rounded-full hover:bg-surface-container 2xl:hidden text-on-surface`,"aria-label":`Menu`',
  )

const hardcodedTasksStart = updated.indexOf('var ts=[')
const tasksComponentMarker = ';function rs(){'
const hardcodedTasksEnd = updated.indexOf(tasksComponentMarker, hardcodedTasksStart)

if (hardcodedTasksStart < 0 || hardcodedTasksEnd < 0) {
  throw new Error('Could not locate the hardcoded task dataset')
}

const databaseTaskService =
  'var ns={getAll:async()=>{return(await Lo.get(`/tasks`)).data},create:async e=>{return(await Lo.post(`/tasks`,e)).data},update:async(e,t)=>{return(await Lo.put(`/tasks/${e}`,t)).data},toggleComplete:async(e,t)=>{return(await Lo.patch(`/tasks/${e}/toggle`,{completed:t})).data},delete:async e=>{return(await Lo.delete(`/tasks/${e}`)).data}};function rs(){'

updated =
  updated.slice(0, hardcodedTasksStart) +
  databaseTaskService +
  updated.slice(hardcodedTasksEnd + tasksComponentMarker.length)

const loadTasksOriginal =
  '(0,v.useEffect)(()=>{(async()=>{let e=await ns.getAll();t(e)})()},[]);'
const loadTasksFromDatabase =
  '(0,v.useEffect)(()=>{ns.getAll().then(t).catch(e=>{console.error(e),t([])})},[]);'

if (!updated.includes(loadTasksOriginal)) {
  throw new Error('Could not locate the task loading effect')
}
updated = updated.replace(loadTasksOriginal, loadTasksFromDatabase)

const taskHandlersStart = updated.indexOf('let c=async', updated.indexOf('function rs(){'))
const taskFiltersMarker = ',d=e.filter'
const taskHandlersEnd = updated.indexOf(taskFiltersMarker, taskHandlersStart)

if (taskHandlersStart < 0 || taskHandlersEnd < 0) {
  throw new Error('Could not locate the task mutation handlers')
}

const databaseTaskHandlers =
  'let c=async(e,n)=>{try{let r=await ns.toggleComplete(e,n);t(t=>t.map(t=>t.id===e?r:t))}catch(e){alert(e.response?.data?.message||`Không thể cập nhật công việc.`)}},l=async e=>{try{await ns.delete(e),t(t=>t.filter(t=>t.id!==e))}catch(e){alert(e.response?.data?.message||`Không thể xóa công việc.`)}},u=async e=>{if(e.preventDefault(),!o.title)return;try{let n=await ns.create(o);t(e=>[n,...e]),a(!1),s({title:``,time:`14:00 – 15:30`,category:`Công việc`,priority:`high`,matrixQuadrant:`important_urgent`,location:``,note:``,pomodoroTarget:2})}catch(e){alert(e.response?.data?.message||`Không thể lưu công việc vào database.`)}}'

updated =
  updated.slice(0, taskHandlersStart) +
  databaseTaskHandlers +
  updated.slice(taskHandlersEnd)

const plannerStart = updated.indexOf('function gs(){')
const plannerHandlersStart = updated.indexOf(',o=e=>', plannerStart)
const plannerReturn = updated.indexOf(';return(0,R.jsxs)', plannerHandlersStart)

if (plannerStart < 0 || plannerHandlersStart < 0 || plannerReturn < 0) {
  throw new Error('Could not locate the planner state handlers')
}

const plannerState = updated
  .slice(plannerStart, plannerHandlersStart)
  .replace('(Ro.timeline)', '([])')
const databasePlannerHandlers =
  ';(0,v.useEffect)(()=>{ns.getAll().then(t).catch(e=>{console.error(e),t([])})},[]);let o=async n=>{let r=e.find(e=>e.id===n);if(!r)return;try{let i=await ns.toggleComplete(n,r.status!==`completed`);t(e=>e.map(e=>e.id===n?i:e))}catch(e){alert(e.response?.data?.message||`Không thể cập nhật lịch trình.`)}},s=async e=>{try{await ns.delete(e),t(t=>t.filter(t=>t.id!==e))}catch(e){alert(e.response?.data?.message||`Không thể xóa hoạt động.`)}}'

updated =
  updated.slice(0, plannerStart) +
  plannerState +
  databasePlannerHandlers +
  updated.slice(plannerReturn)

const plannerSubmitStart = updated.indexOf('onSubmit:e=>{', plannerStart)
const plannerSubmitEnd = updated.indexOf('},className:`flex flex-col gap-4`', plannerSubmitStart)

if (plannerSubmitStart < 0 || plannerSubmitEnd < 0) {
  throw new Error('Could not locate the planner submit handler')
}

const databasePlannerSubmit =
  'onSubmit:async e=>{if(e.preventDefault(),!i.title)return;try{let n=await ns.create({...i,activityType:i.type,category:i.type===`food`?`Ăn uống`:i.type===`place`?`Thư giãn`:`Công việc`,priority:`medium`,matrixQuadrant:`important_not_urgent`});t(e=>[...e,n]),r(!1),a({title:``,time:`15:00 – 16:30`,location:``,note:``,type:`task`,badge:`Tự chọn`})}catch(e){alert(e.response?.data?.message||`Không thể thêm hoạt động vào database.`)}}'

updated =
  updated.slice(0, plannerSubmitStart) +
  databasePlannerSubmit +
  updated.slice(plannerSubmitEnd + 1)

const hardcodedActivityCount = 'children:`5 hoạt động`'
if (!updated.includes(hardcodedActivityCount)) {
  throw new Error('Could not locate the hardcoded planner activity count')
}
updated = updated.replace(hardcodedActivityCount, 'children:[e.length,` hoạt động`]')

if (updated === source) {
  throw new Error('No matching recovered-brand strings were found')
}

if (updated.includes(previousName) || updated.includes(previousLogo)) {
  throw new Error('Recovered-brand replacement was incomplete')
}

if (!updated.includes('todayly-mobile-menu')) {
  throw new Error('Mobile menu marker was not added')
}

if (updated.includes('var ts=[') || updated.includes('return ts')) {
  throw new Error('Hardcoded task fallback still exists in the runtime bundle')
}

fs.writeFileSync(outputBundlePath, updated)

