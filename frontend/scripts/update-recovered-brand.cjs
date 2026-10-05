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

const replaceRange = (input, startMarker, endMarker, replacement, label) => {
  const start = input.indexOf(startMarker)
  const end = input.indexOf(endMarker, start + startMarker.length)
  if (start < 0 || end < 0) throw new Error(`Could not locate ${label}`)
  return input.slice(0, start) + replacement + input.slice(end)
}

// Authentication must never create a fake user or a fake token when the API fails.
const fakeAuthStart = updated.indexOf(',zo={')
const fakeAuthEnd = updated.indexOf(',Vo=o(', fakeAuthStart)
if (fakeAuthStart < 0 || fakeAuthEnd < 0) {
  throw new Error('Could not locate the recovered fake authentication service')
}
const databaseAuthService =
  ',Bo={login:async e=>{let t=await Lo.post(`/auth/login`,e);return t.data?.token&&(localStorage.setItem(`todayly_token`,t.data.token),localStorage.setItem(`todayly_user`,JSON.stringify(t.data.user))),t.data},register:async e=>{let t=await Lo.post(`/auth/register`,e);return t.data?.token&&(localStorage.setItem(`todayly_token`,t.data.token),localStorage.setItem(`todayly_user`,JSON.stringify(t.data.user))),t.data},getCurrentUser:async()=>{let e=await Lo.get(`/auth/me`);return localStorage.setItem(`todayly_user`,JSON.stringify(e.data)),e.data},updatePreferences:async e=>{let t=await Lo.put(`/auth/preferences`,e);return localStorage.setItem(`todayly_user`,JSON.stringify(t.data)),t.data},logout:()=>{localStorage.removeItem(`todayly_token`),localStorage.removeItem(`todayly_user`)}}'
updated =
  updated.slice(0, fakeAuthStart) +
  databaseAuthService +
  updated.slice(fakeAuthEnd)

const recoveredDataStart = updated.indexOf('var Ro={')
const recoveredDataEnd = updated.indexOf(',Bo={', recoveredDataStart)
if (recoveredDataStart < 0 || recoveredDataEnd < 0) {
  throw new Error('Could not locate recovered hardcoded homepage data')
}
updated =
  updated.slice(0, recoveredDataStart) +
  'var Ro={timeline:[],stats:{activeHours:`—`,estimatedCost:`—`,targetSteps:`—`,completionRate:`—`}}' +
  updated.slice(recoveredDataEnd)

const authProviderStart = updated.indexOf('Uo=({children:e})=>')
const authProviderEnd = updated.indexOf(',Wo=()=>(0,v.useContext)(Ho)', authProviderStart)
if (authProviderStart < 0 || authProviderEnd < 0) {
  throw new Error('Could not locate the recovered authentication provider')
}
const databaseAuthProvider =
  'Uo=({children:e})=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(()=>localStorage.getItem(`todayly_token`)),[a,o]=(0,v.useState)(!0);return(0,v.useEffect)(()=>{let e=localStorage.getItem(`todayly_token`);e&&e.split(`.`).length===3?Bo.getCurrentUser().then(n).catch(()=>{Bo.logout(),n(null),i(null)}).finally(()=>o(!1)):(Bo.logout(),n(null),i(null),o(!1))},[]),(0,R.jsx)(Ho.Provider,{value:{user:t,token:r,isAuthenticated:!!r&&!!t,login:async e=>{let t=await Bo.login(e);return n(t.user),i(t.token),t},register:async e=>{let t=await Bo.register(e);return n(t.user),i(t.token),t},updateUserPreferences:async e=>{let t=await Bo.updatePreferences(e);return n(t),t},logout:()=>{Bo.logout(),n(null),i(null)},loading:a,setUser:n},children:e})}'
updated =
  updated.slice(0, authProviderStart) +
  databaseAuthProvider +
  updated.slice(authProviderEnd)

const profileStart = updated.indexOf('function xs(){')
const profileEnd = updated.indexOf('function Ss(){', profileStart)
if (profileStart < 0 || profileEnd < 0) {
  throw new Error('Could not locate recovered profile component')
}
let profileView = updated.slice(profileStart, profileEnd)
profileView = profileView
  .replace('{user:e,setUser:t}=Wo()', '{user:e,setUser:t,updateUserPreferences:q}=Wo()')
  .replace('name:e?.name||`Mai Linh`,email:e?.email||`mailinh@todayly.vn`,bio:e?.bio||`Yêu thích lối sống tối giản, thảnh thơi và tích cực mỗi ngày.`,city:e?.city||`Đà Nẵng`', 'name:e?.name||``,email:e?.email||``,bio:e?.bio||``,city:e?.city||``')
  .replace('onSubmit:r=>{r.preventDefault(),t({...e,...n}),localStorage.setItem(`todayly_user`,JSON.stringify({...e,...n})),a(!0),setTimeout(()=>a(!1),3e3)}', 'onSubmit:async e=>{e.preventDefault();try{let e=await q(n);t(e),a(!0),setTimeout(()=>a(!1),3e3)}catch(e){alert(e.response?.data?.message||`Không thể lưu hồ sơ vào database.`)}}')
updated = updated.slice(0, profileStart) + profileView + updated.slice(profileEnd)

updated = updated
  .replace('(0,v.useState)(`mailinh@todayly.vn`)', '(0,v.useState)(``)')
  .replace('(0,v.useState)(`123456`)', '(0,v.useState)(``)')
  .replace('placeholder:`mailinh@todayly.vn`', 'placeholder:`ban@example.com`')
  .replace('e?.name||`Mai Linh`', 'e?.name||`bạn`')

// Live weather and local time. Geolocation is requested by the browser and can be retried.
const liveWeatherComponent = 'function Go(){let[e,t]=(0,v.useState)(null),[n,r]=(0,v.useState)(`Đang xin quyền vị trí...`),[i,a]=(0,v.useState)(new Date),o=()=>{r(`Đang lấy vị trí hiện tại...`),navigator.geolocation?navigator.geolocation.getCurrentPosition(async n=>{try{let i=await Lo.get(`/weather/current`,{params:{lat:n.coords.latitude,lon:n.coords.longitude}});t(i.data),r(``)}catch(e){r(e.response?.data?.message||`Không thể lấy dữ liệu thời tiết.`)}},e=>{r(e.code===1?`Bạn chưa cho phép truy cập vị trí.`:`Không thể xác định vị trí hiện tại.`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:3e5}):r(`Trình duyệt không hỗ trợ định vị.`)};return(0,v.useEffect)(()=>{o();let e=setInterval(()=>a(new Date),1e3);return()=>clearInterval(e)},[]),(0,R.jsxs)(`div`,{className:`rounded-2xl bg-surface-container-low p-5 sm:p-6 flex flex-col gap-4 shadow-sm`,children:[(0,R.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,R.jsxs)(`div`,{className:`flex flex-col`,children:[(0,R.jsx)(`span`,{className:`font-label-md text-label-md text-on-surface-variant`,children:new Intl.DateTimeFormat(`vi-VN`,{weekday:`long`,day:`2-digit`,month:`long`,year:`numeric`}).format(i)}),(0,R.jsx)(`span`,{className:`font-headline-sm text-headline-sm text-primary font-bold`,children:new Intl.DateTimeFormat(`vi-VN`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}).format(i)}),(0,R.jsxs)(`span`,{className:`font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-1.5`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-secondary text-[18px]`,children:`location_on`}),e?.location||n]})]}),(0,R.jsx)(`button`,{type:`button`,onClick:o,title:`Lấy lại vị trí`,className:`w-12 h-12 rounded-2xl bg-secondary-fixed/50 flex items-center justify-center text-secondary cursor-pointer`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[28px]`,children:e?.weatherCode>=51?`rainy`:`wb_sunny`})})]}),e?(0,R.jsxs)(v.Fragment,{children:[(0,R.jsxs)(`div`,{className:`flex items-baseline gap-3`,children:[(0,R.jsx)(`span`,{className:`font-display-lg text-display-lg text-on-surface font-extrabold`,children:[e.temperature,`°C`]}),(0,R.jsxs)(`span`,{className:`font-label-lg text-label-lg text-secondary font-medium`,children:[e.condition,` • Cảm giác `,e.apparentTemperature,`°C`]})]}),(0,R.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 pt-2`,children:[(0,R.jsxs)(`div`,{className:`flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-primary text-[20px]`,children:`humidity_mid`}),(0,R.jsxs)(`div`,{className:`flex flex-col`,children:[(0,R.jsx)(`span`,{className:`font-label-sm text-label-sm text-outline`,children:`Độ ẩm`}),(0,R.jsx)(`span`,{className:`font-label-md text-label-md text-on-surface font-semibold`,children:e.humidity})]})]}),(0,R.jsxs)(`div`,{className:`flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-tertiary text-[20px]`,children:`air`}),(0,R.jsxs)(`div`,{className:`flex flex-col`,children:[(0,R.jsx)(`span`,{className:`font-label-sm text-label-sm text-outline`,children:`Không khí`}),(0,R.jsx)(`span`,{className:`font-label-md text-label-md text-tertiary font-semibold`,children:e.airQuality})]})]})]})]}):(0,R.jsx)(`button`,{type:`button`,onClick:o,className:`w-fit px-4 py-2 rounded-full bg-primary text-on-primary font-semibold cursor-pointer`,children:`Bật vị trí / Thử lại`})]})}'
updated = replaceRange(
  updated,
  'function Go({weather:',
  'function Ko()',
  liveWeatherComponent,
  'weather card component',
)

const homeTimelineStart = updated.indexOf('function Yo({onOpenAddModal:e})')
const homeTimelineStyle = updated.indexOf(',o=e=>', homeTimelineStart)
if (homeTimelineStart < 0 || homeTimelineStyle < 0) {
  throw new Error('Could not locate the hardcoded homepage timeline')
}
const databaseHomeTimeline = 'function Yo({onOpenAddModal:e}){let[t,n]=(0,v.useState)(`today`),[r,i]=(0,v.useState)([]),a=async e=>{let t=r.find(t=>t.id===e);if(!t)return;try{let n=await ns.toggleComplete(e,t.status!==`completed`);i(e=>e.map(e=>e.id===n.id?n:e))}catch(e){alert(e.response?.data?.message||`Không thể cập nhật hoạt động.`)}};(0,v.useEffect)(()=>{let e=()=>ns.getAll().then(i).catch(()=>i([]));return e(),window.addEventListener(`todayly:tasks-changed`,e),()=>window.removeEventListener(`todayly:tasks-changed`,e)},[])'
updated =
  updated.slice(0, homeTimelineStart) +
  databaseHomeTimeline +
  updated.slice(homeTimelineStyle)

const homeStart = updated.indexOf('function Zo(){')
const homeSubmitStart = updated.indexOf('onSubmit:e=>{', homeStart)
const homeSubmitEnd = updated.indexOf('},className:`flex flex-col gap-4`', homeSubmitStart)
if (homeSubmitStart < 0 || homeSubmitEnd < 0) {
  throw new Error('Could not locate the homepage quick-add handler')
}
const databaseHomeSubmit = 'onSubmit:async e=>{if(e.preventDefault(),!r.title)return;try{await ns.create({...r,activityType:r.type,category:r.type===`food`?`Ăn uống`:r.type===`place`?`Thư giãn`:`Công việc`,priority:`medium`,matrixQuadrant:`important_not_urgent`}),window.dispatchEvent(new Event(`todayly:tasks-changed`)),n(!1),i({title:``,time:`10:00 – 11:30`,location:``,type:`task`})}catch(e){alert(e.response?.data?.message||`Không thể lưu hoạt động vào database.`)}}'
updated =
  updated.slice(0, homeSubmitStart) +
  databaseHomeSubmit +
  updated.slice(homeSubmitEnd + 1)

const hardcodedTasksStart = updated.indexOf('var ts=[')
const tasksComponentMarker = ';function rs(){'
const hardcodedTasksEnd = updated.indexOf(tasksComponentMarker, hardcodedTasksStart)

if (hardcodedTasksStart < 0 || hardcodedTasksEnd < 0) {
  throw new Error('Could not locate the hardcoded task dataset')
}

const databaseTaskService =
  'var ns={getAll:async(e={})=>{let t=localStorage.getItem(`todayly_token`);if(!t||t.split(`.`).length!==3)return[];return(await Lo.get(`/tasks`,{params:e})).data},create:async e=>{return(await Lo.post(`/tasks`,e)).data},update:async(e,t)=>{return(await Lo.put(`/tasks/${e}`,t)).data},toggleComplete:async(e,t)=>{return(await Lo.patch(`/tasks/${e}/toggle`,{completed:t})).data},delete:async e=>{return(await Lo.delete(`/tasks/${e}`)).data}};function rs(){'

updated =
  updated.slice(0, hardcodedTasksStart) +
  databaseTaskService +
  updated.slice(hardcodedTasksEnd + tasksComponentMarker.length)

const editableTaskCard = 'function es({task:e,onToggleComplete:t,onDelete:n,onUpdate:r}){let i=e.completed,a={important_urgent:`Quan trọng & Khẩn cấp`,important_not_urgent:`Quan trọng, không khẩn cấp`,not_important_urgent:`Không quan trọng, khẩn cấp`,not_important_not_urgent:`Không quan trọng, không khẩn cấp`};return(0,R.jsxs)(`div`,{className:`p-4 sm:p-5 rounded-2xl shadow-sm transition-all duration-200 border flex flex-col gap-4 ${i?`bg-surface-container-low border-outline-variant/30 opacity-75`:`bg-surface-container-lowest border-outline-variant/20 hover:shadow-md`}`,children:[(0,R.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,R.jsx)(`button`,{type:`button`,onClick:()=>t(e.id,!i),className:`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${i?`bg-primary text-on-primary`:`bg-surface-container-high text-outline hover:bg-primary hover:text-on-primary`}`,title:i?`Đánh dấu chưa hoàn thành`:`Đánh dấu hoàn thành`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[16px] ${i?`opacity-100`:`opacity-0 hover:opacity-100`}`,children:`check`})}),(0,R.jsxs)(`div`,{className:`min-w-0 flex-1 flex flex-col gap-1.5`,children:[(0,R.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,R.jsx)(`span`,{className:`font-label-md text-label-md text-on-surface-variant`,children:e.time||[e.startTime,e.endTime].filter(Boolean).join(` – `)}),(0,R.jsx)(`span`,{className:`px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-xs font-medium`,children:e.category||`Công việc`})]}),(0,R.jsx)(`h3`,{className:`font-headline-sm text-headline-sm text-on-surface font-semibold ${i?`line-through text-outline`:``}`,children:e.title}),(0,R.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant text-xs`,children:[e.location&&(0,R.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[14px]`,children:`location_on`}),e.location]}),e.note&&(0,R.jsx)(`span`,{children:e.note}),e.scheduledDate&&(0,R.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[14px]`,children:`event`}),e.scheduledDate]})]})]}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>n(e.id),className:`p-2 rounded-full hover:bg-surface-container-highest text-outline hover:text-error transition-colors cursor-pointer`,title:`Xóa công việc`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[18px]`,children:`delete`})})]}),(0,R.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-10`,children:[(0,R.jsxs)(`label`,{className:`flex flex-col gap-1 text-xs font-semibold text-on-surface-variant`,children:[`Mức độ ưu tiên`,(0,R.jsxs)(`select`,{value:e.priority||`medium`,onChange:t=>r(e.id,{priority:t.target.value}),className:`w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary cursor-pointer`,children:[(0,R.jsx)(`option`,{value:`high`,children:`Cao`}),(0,R.jsx)(`option`,{value:`medium`,children:`Trung bình`}),(0,R.jsx)(`option`,{value:`low`,children:`Thấp`})]})]}),(0,R.jsxs)(`label`,{className:`flex flex-col gap-1 text-xs font-semibold text-on-surface-variant`,children:[`Ma trận Eisenhower`,(0,R.jsxs)(`select`,{value:e.matrixQuadrant||`important_not_urgent`,onChange:t=>r(e.id,{matrixQuadrant:t.target.value}),className:`w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary cursor-pointer`,title:a[e.matrixQuadrant],children:[(0,R.jsx)(`option`,{value:`important_urgent`,children:a.important_urgent}),(0,R.jsx)(`option`,{value:`important_not_urgent`,children:a.important_not_urgent}),(0,R.jsx)(`option`,{value:`not_important_urgent`,children:a.not_important_urgent}),(0,R.jsx)(`option`,{value:`not_important_not_urgent`,children:a.not_important_not_urgent})]})]})]})]})}'
updated = replaceRange(
  updated,
  'function es({task:',
  'var ns={',
  editableTaskCard,
  'task card priority editor',
)

const loadTasksOriginal =
  '(0,v.useEffect)(()=>{(async()=>{let e=await ns.getAll();t(e)})()},[]);'
const loadTasksFromDatabase =
  '(0,v.useEffect)(()=>{ns.getAll().then(t).catch(e=>{console.error(e),t([])})},[]);'

if (!updated.includes(loadTasksOriginal)) {
  throw new Error('Could not locate the task loading effect')
}
updated = updated.replace(loadTasksOriginal, loadTasksFromDatabase)

const runtimeTaskComponentStart = updated.indexOf('function rs(){', updated.indexOf('var ns={'))
const taskHandlersStart = updated.indexOf('let c=async', runtimeTaskComponentStart)
const taskFiltersMarker = ',d=e.filter'
const taskHandlersEnd = updated.indexOf(taskFiltersMarker, taskHandlersStart)

if (taskHandlersStart < 0 || taskHandlersEnd < 0) {
  throw new Error('Could not locate the task mutation handlers')
}

const databaseTaskHandlers =
  'let c=async(e,n)=>{try{let r=await ns.toggleComplete(e,n);t(t=>t.map(t=>t.id===e?r:t))}catch(e){alert(e.response?.data?.message||`Không thể cập nhật công việc.`)}},l=async e=>{try{await ns.delete(e),t(t=>t.filter(t=>t.id!==e))}catch(e){alert(e.response?.data?.message||`Không thể xóa công việc.`)}},u=async e=>{if(e.preventDefault(),!o.title)return;try{let n=await ns.create(o);t(e=>[n,...e]),a(!1),s({title:``,time:`14:00 – 15:30`,category:`Công việc`,priority:`high`,matrixQuadrant:`important_urgent`,location:``,note:``,pomodoroTarget:2})}catch(e){alert(e.response?.data?.message||`Không thể lưu công việc vào database.`)}},h=async(e,n)=>{try{let r=await ns.update(e,n);t(t=>t.map(t=>t.id===e?r:t))}catch(e){alert(e.response?.data?.message||`Không thể lưu mức độ ưu tiên.`)}}'

updated =
  updated.slice(0, taskHandlersStart) +
  databaseTaskHandlers +
  updated.slice(taskHandlersEnd)

const dynamicTimeblock = 'function Qo({tasks:e=[]}){return(0,R.jsx)(`section`,{className:`w-full`,children:(0,R.jsxs)(`div`,{className:`bg-surface-container-lowest p-5 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col gap-3`,children:[(0,R.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-primary text-[20px]`,children:`view_timeline`}),(0,R.jsx)(`h2`,{className:`font-headline-sm text-headline-sm font-bold text-on-surface`,children:`Dòng Chảy Thời Gian`}),(0,R.jsxs)(`span`,{className:`font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium`,children:[e.length,` hoạt động từ database`]})]}),e.length?(0,R.jsx)(`div`,{className:`w-full min-h-10 bg-surface-container-low rounded-xl overflow-hidden flex p-1 gap-1 shadow-inner`,children:e.map(t=>(0,R.jsx)(`div`,{className:`min-w-0 h-8 rounded-lg flex-1 px-2 flex items-center justify-center truncate font-label-sm text-label-sm ${t.activityType===`food`?`bg-secondary-fixed text-on-secondary-fixed`:t.activityType===`place`?`bg-tertiary-fixed text-on-tertiary-fixed`:`bg-primary text-on-primary`}`,title:[t.time,t.title].filter(Boolean).join(`: `),children:t.title},t.id))}):(0,R.jsx)(`div`,{className:`p-4 rounded-xl bg-surface-container-low text-on-surface-variant text-sm text-center`,children:`Chưa có hoạt động nào hôm nay. Hãy thêm ở Lịch trình hoặc Hôm nay làm gì.`})]})})}'
updated = replaceRange(
  updated,
  'function Qo(){',
  'function V(){',
  dynamicTimeblock,
  'hardcoded task timeblock',
)

const pomodoroStart = 'function V(){let[e,t]=(0,v.useState)(1500),[n,r]=(0,v.useState)(!1),[i,a]=(0,v.useState)(2);'
const pomodoroReplacement = 'function V({tasks:m=[]}){let[e,t]=(0,v.useState)(1500),[n,r]=(0,v.useState)(!1),[i,a]=(0,v.useState)(0);(0,v.useEffect)(()=>{a(m.reduce((e,t)=>e+(Number(t.pomodoroCompleted)||0),0))},[m]);'
if (!updated.includes(pomodoroStart)) {
  throw new Error('Could not locate the hardcoded Pomodoro session count')
}
updated = updated.replace(pomodoroStart, pomodoroReplacement)

const tasksViewStart = updated.indexOf('function rs(){', updated.indexOf('var ns={'))
const tasksViewEnd = updated.indexOf('function cs()', tasksViewStart)
if (tasksViewStart < 0 || tasksViewEnd < 0) {
  throw new Error('Could not locate the tasks view for dynamic UI cleanup')
}
let tasksView = updated.slice(tasksViewStart, tasksViewEnd)
tasksView = tasksView
  .replace('(0,R.jsx)(Qo,{})', '(0,R.jsx)(Qo,{tasks:e})')
  .replace('(0,R.jsx)(V,{})', '(0,R.jsx)(V,{tasks:e})')
  .replace('onToggleComplete:c,onDelete:l', 'onToggleComplete:c,onDelete:l,onUpdate:h')
  .replace('children:`3h 45m`', 'children:[e.reduce((n,t)=>n+(Number(t.pomodoroCompleted)||0),0),` phiên`]')
  .replace('children:`Khoảng trống`', 'children:`Hoạt động hôm nay`')
  .replace('children:`2 Slots (2h15)`', 'children:[e.length,` hoạt động`]')
  .replace('`Thứ Ba, 24 Tháng 10`', 'new Intl.DateTimeFormat(`vi-VN`,{weekday:`long`,day:`2-digit`,month:`long`}).format(new Date)')

const tasksCalendarText = tasksView.indexOf('children:`Đồng bộ Google Calendar`')
const tasksCalendarButtonStart = tasksView.lastIndexOf('(0,R.jsxs)(`button`,', tasksCalendarText)
const tasksAddButtonStart = tasksView.indexOf('(0,R.jsxs)(`button`,{onClick:()=>a(!0)', tasksCalendarText)
if (tasksCalendarText < 0 || tasksCalendarButtonStart < 0 || tasksAddButtonStart < 0) {
  throw new Error('Could not move the Google Calendar button out of Tasks')
}
tasksView =
  tasksView.slice(0, tasksCalendarButtonStart) + tasksView.slice(tasksAddButtonStart)
updated = updated.slice(0, tasksViewStart) + tasksView + updated.slice(tasksViewEnd)

const dynamicPlannerComponent = [
  'function gs(){',
  'let[e,t]=(0,v.useState)([]),[n,r]=(0,v.useState)(!1),[i,a]=(0,v.useState)({title:``,scheduledDate:``,time:`15:00 – 16:30`,location:``,note:``,type:`task`,badge:`Tự chọn`,priority:`medium`,matrixQuadrant:`important_not_urgent`}),[o,s]=(0,v.useState)(`today`),[c,l]=(0,v.useState)(null),[u,d]=(0,v.useState)(!1);',
  'let f=e=>{let t=new Date(Date.now()+864e5*e);return t.toLocaleDateString(`sv-SE`,{timeZone:`Asia/Bangkok`})},q=()=>{let e=new Intl.DateTimeFormat(`en-US`,{timeZone:`Asia/Bangkok`,weekday:`short`}).format(new Date),t={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}[e]??0;return{from:f(-t),to:f(6-t)}},p=async e=>{d(!0);let n=e===`tomorrow`?{date:f(1)}:e===`week`?q():{date:f(0)};try{t(await ns.getAll(n))}catch(e){console.error(e),t([])}finally{d(!1)}};',
  '(0,v.useEffect)(()=>{p(o)},[o]);',
  'let m=async n=>{let r=e.find(e=>e.id===n);if(!r)return;try{let i=await ns.toggleComplete(n,!r.completed);t(e=>e.map(e=>e.id===n?i:e))}catch(e){alert(e.response?.data?.message||`Không thể cập nhật lịch trình.`)}},',
  'g=async e=>{if(!confirm(`Xóa hoạt động này khỏi lịch trình?`))return;try{await ns.delete(e),t(t=>t.filter(t=>t.id!==e))}catch(e){alert(e.response?.data?.message||`Không thể xóa hoạt động.`)}},',
  'h=()=>{l(null),a({title:``,scheduledDate:o===`tomorrow`?f(1):f(0),time:`15:00 – 16:30`,location:``,note:``,type:`task`,badge:`Tự chọn`,priority:`medium`,matrixQuadrant:`important_not_urgent`}),r(!0)},',
  'y=e=>{l(e),a({title:e.title||``,scheduledDate:e.scheduledDate||f(0),time:e.time||[e.startTime,e.endTime].filter(Boolean).join(` – `),location:e.location||``,note:e.note||``,type:e.activityType||e.type||`task`,badge:e.badge||`Tự chọn`,priority:e.priority||`medium`,matrixQuadrant:e.matrixQuadrant||`important_not_urgent`}),r(!0)},',
  'b=async e=>{if(e.preventDefault(),!i.title.trim())return;let n={...i,activityType:i.type,category:i.type===`food`?`Ăn uống`:i.type===`place`?`Thư giãn`:`Công việc`};try{c?await ns.update(c.id,n):await ns.create(n),r(!1),l(null),await p(o),window.dispatchEvent(new Event(`todayly:tasks-changed`))}catch(e){alert(e.response?.data?.message||`Không thể lưu hoạt động vào database.`)}};',
  'let x=o===`today`?`Hôm nay`:o===`tomorrow`?`Ngày mai`:`Tuần này`,w=o===`today`?f(0):o===`tomorrow`?f(1):`${q().from} – ${q().to}`;',
  'return(0,R.jsxs)(`div`,{className:`w-full`,children:[',
  '(0,R.jsxs)(`div`,{className:`w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-6`,children:[',
  '(0,R.jsxs)(`div`,{className:`flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5`,children:[',
  '(0,R.jsxs)(`div`,{className:`flex flex-col gap-3 max-w-2xl`,children:[',
  '(0,R.jsxs)(`div`,{className:`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-label-md w-fit font-semibold`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[16px]`,children:`calendar_today`}),(0,R.jsx)(`span`,{children:`Lịch Trình Chi Tiết • Dữ liệu đồng bộ`})]}),',
  '(0,R.jsxs)(`h1`,{className:`font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold`,children:[`Kế Hoạch `,x,` 🗓️`]}),',
  '(0,R.jsx)(`p`,{className:`font-body-lg text-body-lg text-on-surface-variant`,children:`Công việc tạo tại đây cũng xuất hiện trong Hôm nay làm gì? để bạn tiếp tục phân loại ưu tiên và ma trận Eisenhower.`})]}),',
  '(0,R.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[',
  '(0,R.jsxs)(`button`,{type:`button`,onClick:()=>alert(`Nút đồng bộ đã được chuyển sang Lịch trình. Cần cấu hình Google OAuth để kết nối Calendar thật.`),className:`flex items-center gap-2 px-4 py-3 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold border border-outline-variant/30 shadow-sm cursor-pointer`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[19px] text-tertiary`,children:`sync`}),(0,R.jsx)(`span`,{children:`Đồng bộ Google Calendar`})]}),',
  '(0,R.jsxs)(`button`,{type:`button`,onClick:h,className:`flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-all shadow-md cursor-pointer`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[20px]`,children:`add`}),(0,R.jsx)(`span`,{children:`Thêm vào lịch trình`})]})]})]}),',
  '(0,R.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-container-lowest p-2 shadow-sm border border-outline-variant/20`,children:[',
  '(0,R.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[[`today`,`Hôm nay`],[`tomorrow`,`Ngày mai`],[`week`,`Lịch tuần`]].map(e=>(0,R.jsx)(`button`,{type:`button`,onClick:()=>s(e[0]),className:`px-4 py-2 rounded-xl font-label-md text-sm font-semibold transition-all cursor-pointer ${o===e[0]?`bg-primary text-on-primary shadow-sm`:`text-on-surface-variant hover:bg-surface-container`}`,children:e[1]},e[0]))}),',
  '(0,R.jsxs)(`span`,{className:`px-3 text-sm text-on-surface-variant`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[16px] align-middle mr-1`,children:`date_range`}),w]})]}),',
  '(0,R.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-3 gap-4`,children:[',
  '(0,R.jsxs)(`div`,{className:`p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center gap-4`,children:[(0,R.jsx)(`div`,{className:`w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined`,children:`task_alt`})}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`span`,{className:`block text-xs text-outline`,children:`Hoạt động trong kỳ`}),(0,R.jsxs)(`strong`,{className:`text-lg text-on-surface`,children:[e.length,` hoạt động`]})]})]}),',
  '(0,R.jsxs)(`div`,{className:`p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center gap-4`,children:[(0,R.jsx)(`div`,{className:`w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined`,children:`done_all`})}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`span`,{className:`block text-xs text-outline`,children:`Đã hoàn thành`}),(0,R.jsxs)(`strong`,{className:`text-lg text-on-surface`,children:[e.filter(e=>e.completed).length,` / `,e.length]})]})]}),',
  '(0,R.jsxs)(`div`,{className:`p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center gap-4`,children:[(0,R.jsx)(`div`,{className:`w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined`,children:`priority_high`})}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`span`,{className:`block text-xs text-outline`,children:`Ưu tiên cao`}),(0,R.jsxs)(`strong`,{className:`text-lg text-on-surface`,children:[e.filter(e=>e.priority===`high`).length,` việc`]})]})]})]}),',
  '(0,R.jsxs)(`section`,{className:`rounded-3xl bg-surface-container-lowest p-5 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col gap-5`,children:[',
  '(0,R.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,children:[(0,R.jsx)(`h2`,{className:`font-headline-md text-headline-md font-bold text-on-surface`,children:`Dòng Thời Gian Chi Tiết`}),(0,R.jsx)(`span`,{className:`font-label-md text-label-md text-on-surface-variant`,children:x})]}),',
  'u?(0,R.jsx)(`div`,{className:`py-12 text-center text-on-surface-variant`,children:`Đang tải lịch trình...`}):e.length?(0,R.jsx)(`div`,{className:`relative flex flex-col gap-4`,children:e.map(e=>{let t=e.completed,n={important_urgent:`Quan trọng & Khẩn cấp`,important_not_urgent:`Quan trọng, không khẩn cấp`,not_important_urgent:`Không quan trọng, khẩn cấp`,not_important_not_urgent:`Không quan trọng, không khẩn cấp`};return(0,R.jsxs)(`article`,{className:`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border transition-all ${t?`bg-surface-container-low border-outline-variant/20 opacity-75`:`bg-surface-container-lowest border-outline-variant/40 hover:shadow-md`}`,children:[',
  '(0,R.jsx)(`button`,{type:`button`,onClick:()=>m(e.id),className:`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 cursor-pointer ${t?`bg-primary text-on-primary`:`bg-surface-container-high text-outline hover:bg-primary hover:text-on-primary`}`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[17px]`,children:t?`check`:`radio_button_unchecked`})}),',
  '(0,R.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,R.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2 mb-1`,children:[(0,R.jsx)(`span`,{className:`font-bold text-primary`,children:e.time||`${e.startTime||``} – ${e.endTime||``}`}),(0,R.jsx)(`span`,{className:`px-2 py-0.5 rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant`,children:e.scheduledDate}),(0,R.jsx)(`span`,{className:`px-2 py-0.5 rounded-full bg-primary-fixed text-xs text-primary`,children:e.priority===`high`?`Ưu tiên cao`:e.priority===`low`?`Ưu tiên thấp`:`Ưu tiên trung bình`})]}),(0,R.jsx)(`h3`,{className:`font-headline-sm text-headline-sm font-semibold text-on-surface ${t?`line-through`:``}`,children:e.title}),(0,R.jsxs)(`p`,{className:`mt-1 text-xs text-on-surface-variant`,children:[n[e.matrixQuadrant]||n.important_not_urgent,e.location?` • 📍 ${e.location}`:``,e.note?` • ${e.note}`:``]})]}),',
  '(0,R.jsxs)(`div`,{className:`flex items-center gap-2 self-end sm:self-center`,children:[(0,R.jsxs)(`button`,{type:`button`,onClick:()=>y(e),className:`px-3 py-2 rounded-xl bg-primary-fixed text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer flex items-center gap-1`,title:`Sửa lịch trình`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[17px]`,children:`edit`}),(0,R.jsx)(`span`,{className:`text-xs font-semibold`,children:`Sửa`})]}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>g(e.id),className:`p-2 rounded-xl hover:bg-error-container/30 text-outline hover:text-error transition-colors cursor-pointer`,title:`Xóa`,children:(0,R.jsx)(`span`,{className:`material-symbols-outlined text-[18px]`,children:`delete`})})]})]},e.id)})}):(0,R.jsxs)(`div`,{className:`py-14 text-center text-on-surface-variant`,children:[(0,R.jsx)(`span`,{className:`material-symbols-outlined text-4xl text-outline`,children:`event_available`}),(0,R.jsx)(`p`,{className:`mt-2 font-semibold`,children:`Chưa có hoạt động trong khoảng thời gian này.`}),(0,R.jsx)(`button`,{type:`button`,onClick:h,className:`mt-4 px-4 py-2 rounded-full bg-primary text-on-primary cursor-pointer`,children:`Thêm hoạt động đầu tiên`})]})]})]}),',
  '(0,R.jsx)(Xo,{isOpen:n,onClose:()=>{r(!1),l(null)},title:c?`Sửa Hoạt Động`:`Thêm Hoạt Động Vào Kế Hoạch`,children:(0,R.jsxs)(`form`,{onSubmit:b,className:`flex flex-col gap-4`,children:[',
  '(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block text-on-surface font-label-md text-label-md mb-1.5 font-semibold`,children:`Tên hoạt động *`}),(0,R.jsx)(`input`,{type:`text`,required:!0,value:i.title,onChange:e=>a({...i,title:e.target.value}),className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary`})]}),',
  '(0,R.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-3`,children:[(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block mb-1.5 text-sm font-semibold`,children:`Ngày`}),(0,R.jsx)(`input`,{type:`date`,required:!0,value:i.scheduledDate,onChange:e=>a({...i,scheduledDate:e.target.value}),className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40`})]}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block mb-1.5 text-sm font-semibold`,children:`Khung giờ`}),(0,R.jsx)(`input`,{type:`text`,value:i.time,onChange:e=>a({...i,time:e.target.value}),placeholder:`09:00 – 10:30`,className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40`})]})]}),',
  '(0,R.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-3`,children:[(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block mb-1.5 text-sm font-semibold`,children:`Loại hoạt động`}),(0,R.jsxs)(`select`,{value:i.type,onChange:e=>a({...i,type:e.target.value}),className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40`,children:[(0,R.jsx)(`option`,{value:`task`,children:`Công việc`}),(0,R.jsx)(`option`,{value:`food`,children:`Ăn uống`}),(0,R.jsx)(`option`,{value:`place`,children:`Địa điểm / Thư giãn`})]})]}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block mb-1.5 text-sm font-semibold`,children:`Mức độ ưu tiên`}),(0,R.jsxs)(`select`,{value:i.priority,onChange:e=>a({...i,priority:e.target.value}),className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40`,children:[(0,R.jsx)(`option`,{value:`high`,children:`Cao`}),(0,R.jsx)(`option`,{value:`medium`,children:`Trung bình`}),(0,R.jsx)(`option`,{value:`low`,children:`Thấp`})]})]})]}),',
  '(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block mb-1.5 text-sm font-semibold`,children:`Ma trận Eisenhower`}),(0,R.jsxs)(`select`,{value:i.matrixQuadrant,onChange:e=>a({...i,matrixQuadrant:e.target.value}),className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40`,children:[(0,R.jsx)(`option`,{value:`important_urgent`,children:`Quan trọng & Khẩn cấp`}),(0,R.jsx)(`option`,{value:`important_not_urgent`,children:`Quan trọng, không khẩn cấp`}),(0,R.jsx)(`option`,{value:`not_important_urgent`,children:`Không quan trọng, khẩn cấp`}),(0,R.jsx)(`option`,{value:`not_important_not_urgent`,children:`Không quan trọng, không khẩn cấp`})]})]}),',
  '(0,R.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-3`,children:[(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block mb-1.5 text-sm font-semibold`,children:`Địa điểm`}),(0,R.jsx)(`input`,{type:`text`,value:i.location,onChange:e=>a({...i,location:e.target.value}),className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40`})]}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`block mb-1.5 text-sm font-semibold`,children:`Ghi chú`}),(0,R.jsx)(`input`,{type:`text`,value:i.note,onChange:e=>a({...i,note:e.target.value}),className:`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40`})]})]}),',
  '(0,R.jsxs)(`div`,{className:`flex justify-end gap-3 pt-4 border-t border-surface-container`,children:[(0,R.jsx)(`button`,{type:`button`,onClick:()=>{r(!1),l(null)},className:`px-4 py-2 rounded-xl hover:bg-surface-container cursor-pointer`,children:`Hủy`}),(0,R.jsx)(`button`,{type:`submit`,className:`px-5 py-2 rounded-xl bg-primary text-on-primary font-semibold cursor-pointer`,children:c?`Lưu thay đổi`:`Lưu hoạt động`})]})]})})]})}'
].join('')

updated = replaceRange(
  updated,
  'function gs(){',
  'function _s()',
  dynamicPlannerComponent,
  'planner database view',
)

updated = updated
  .replace('children:`Đà Nẵng 29°C`', 'children:`Thời tiết theo vị trí`')
  .replace('children:`TP. Hồ Chí Minh 31°C`', 'children:`Cập nhật tự động`')

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

if (updated.includes('mock_jwt_token_') || updated.includes('demo_token')) {
  throw new Error('Fake authentication data still exists in the runtime bundle')
}

if (!updated.includes('Mức độ ưu tiên') || !updated.includes('Ma trận Eisenhower')) {
  throw new Error('Planner priority and Eisenhower fields were not added')
}

if (
  updated.split('Đồng bộ Google Calendar').length - 1 !== 1 ||
  !updated.includes('`Ngày mai`') ||
  !updated.includes('`Lịch tuần`') ||
  !updated.includes('Sửa lịch trình')
) {
  throw new Error('Planner tabs, edit action, or moved Google Calendar button are incomplete')
}

if (updated.includes('children:`3h 45m`') || updated.includes('children:`2 Slots (2h15)`')) {
  throw new Error('Hardcoded task dashboard values still exist')
}

fs.writeFileSync(outputBundlePath, updated)

