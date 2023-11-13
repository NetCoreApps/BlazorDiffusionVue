import { createApp, reactive, nextTick } from "vue"
import { JsonApiClient, ApiResult, $1, $$, queryString, combinePaths } from "@servicestack/client"
import ServiceStackVue, { useConfig, useClient, useAuth } from "@servicestack/vue"
import {
    AlbumTitle, ArtifactMenu, NewReport, NewAlbum,
    ArtifactDialogs, ArtifactLikeIcon, ArtifactExploreIcon, ArtifactMenuIcon,
    ArtifactGallery, ArtifactModal, ArtifactImage
} from "./components/Artifacts.mjs"
import { SignInDialog, SignUpDialog, SignInLink, AvatarImage } from "./components/Auth.mjs"
import { AssetsBasePath, BaseUrl, FallbackAssetsBasePath, Store } from "./store.mjs"
import { Authenticate } from "./dtos.mjs"

let client = null, store = null, Apps = []
let AppData = {
    init: false
}
export { client, AppData, Apps }

/** Shared Global Components */
const Components = {
    AlbumTitle,
    ArtifactMenu,
    NewReport,
    NewAlbum,
    ArtifactDialogs,
    ArtifactLikeIcon,
    ArtifactExploreIcon,
    ArtifactMenuIcon,
    ArtifactGallery,
    ArtifactModal,
    ArtifactImage,
    SignInDialog,
    SignUpDialog,
    SignInLink,
    AvatarImage,
}
const CustomElements = [
    'lite-youtube'
]

const { config, setConfig } = useConfig()
setConfig({
    navigate: url => {
        console.log('navigating to ', url)
        Blazor.navigateTo(url)
        //location.href = url
    },
    assetsPathResolver: path => {
        return path.includes('://')
            ? path
            : combinePaths(store.AssetsBasePath, path)
    },
    fallbackPathResolver: path => {
        return path.includes('://')
            ? path
            : combinePaths(store.FallbackAssetsBasePath, path)
    },
})

const alreadyMounted = el => el.__vue_app__ 

function hasTemplate(el,component) {
    return !!(el.firstElementChild
        || component.template
        || (component.setup && typeof component.setup({}, {}) == 'function'))
}

/** Mount Vue3 Component
 * @param sel {string|Element} - Element or Selector where component should be mounted
 * @param component 
 * @param [props] {any} */
export function mount(sel, component, props) {
    if (!AppData.init) {
        init(globalThis)
    }
    const el = $1(sel)
    if (alreadyMounted(el)) return

    if (!hasTemplate(el, component)) {
        // Fallback for enhanced navigation clearing HTML DOM template of Vue App, requiring a force reload
        // Avoid by disabling enhanced navigation to page, e.g. by adding data-enhance-nav="false" to element
        console.warn('Vue Compontent template is missing, force reloading...', el, component)
        blazorRefresh()
        return
    }

    const app = createApp(component, props)
    app.provide('client', client)
    Object.keys(Components).forEach(name => {
        app.component(name, Components[name])
    })
    app.use(ServiceStackVue)
    app.component('RouterLink', ServiceStackVue.component('RouterLink'))
    app.directive('hash', (el, binding) => {
        /** @param {Event} e */
        el.onclick = (e) => {
            console.log('v-hash', binding.value)
            e.preventDefault()
            location.hash = binding.value
        }
    })
    if (component.install) {
        component.install(app)
    }
    if (client && !app._context.provides.client) {
        app.provide('client', client)
    }
    app.provide('store', store)
    app.config.errorHandler = error => { 
        console.trace(error)
    }
    app.config.compilerOptions.isCustomElement = tag => CustomElements.includes(tag)
    app.mount(el)
    Apps.push(app)
    return app
}

async function mountApp(el, props) {
    let appPath = el.getAttribute('data-component')
    if (!appPath.startsWith('/') && !appPath.startsWith('.')) {
        appPath = `../${appPath}`
    }

    const module = await import(appPath)
    unmount(el)
    mount(el, module.default, props)
}

export async function remount() {
    if (!AppData.init) {
        init({ force: true })
    } else {
        mountAll({ force: true })
    }
}

//Default Vue App that gets created with [data-component] is empty, e.g. Blog Posts without Vue components
const DefaultApp = {
    setup() {
        function nav(url) {
            window.open(url)
        }
        return { nav }
    }
}

function blazorRefresh() {
    if (globalThis.Blazor)
        globalThis.Blazor.navigateTo(location.pathname.substring(1), true)
    else
        globalThis.location.reload()
}

export function mountAll(opt) {
    $$('[data-component]').forEach(el => {

        if (opt && opt.force) {
            unmount(el)
        } else {
            if (alreadyMounted(el)) return
        }

        let componentName = el.getAttribute('data-component')
        let propsStr = el.getAttribute('data-props')
        let props = propsStr && new Function(`return (${propsStr})`)() || {}

        if (!componentName) {
            mount(el, DefaultApp, props)
            return
        }

        if (componentName.includes('.')) {
            mountApp(el, props)
            return
        }

        let component = Components[componentName] || ServiceStackVue.component(componentName)
        if (!component) {
            console.error(`Component ${componentName} does not exist`)
            return
        }

        mount(el, component, props)
    })
    $$('[data-module]').forEach(async el => {
        let modulePath = el.getAttribute('data-module')
        if (!modulePath) return
        if (!modulePath.startsWith('/') && !modulePath.startsWith('.')) {
            modulePath = `../${modulePath}`
        }
        try {
            const module = await import(modulePath)
            if (typeof module.default?.load == 'function') {
                module.default.load()
            }
        } catch(e) {
            console.error(`Couldn't load module ${el.getAttribute('data-module')}`, e)
        }
    })
}

/** @param {any} [exports] */
export function init(opt) {
    if (AppData.init) return
    client = JsonApiClient.create(BaseUrl)
    store = new Store(client)
    AppData = reactive(AppData)
    AppData.init = true
    AppData.UserArtifact = { liked: false, upVoted: [], downVoted: [] }
    AppData.UserAlbum = { likedArtifacts: [] }

    const qs = queryString(location.search)
    if (qs.clear === 'storage') {
        localStorage.clear()
    }
    store.loadCached()
    nextTick(async () => {
        let task = store.loadAlbumRefs()
        const api = await client.api(new Authenticate())
        if (api.succeeded) {
            store.signIn(api.response)
            await store.loadUserData()
        } else {
            store.signOut()
            const protectedPages = ['/create', '/favorites']
            if (protectedPages.some(path => path === location.pathname)) {
                location.href = '/'
            }
        }
        await task
    })

    mountAll(opt)

    const exports = opt?.exports || globalThis
    exports.client = client
    exports.Apps = Apps
    exports.store = store
    exports.AppData = AppData
}

function unmount(el) {
    if (!el) return

    try {
        if (el.__vue_app__) {
            el.__vue_app__.unmount()
            console.log('unmounted', el.id)
        }
    } catch (e) {
        el._vnode = el.__vue_app__ = undefined
        console.log('unmounted by force', el.id)
    }
}


/* used in :::sh and :::nuget CopyContainerRenderer */
globalThis.copy = function (e) {
    e.classList.add('copying')
    let $el = document.createElement("textarea")
    let text = (e.querySelector('code') || e.querySelector('p')).innerHTML
    $el.innerHTML = text
    document.body.appendChild($el)
    $el.select()
    document.execCommand("copy")
    document.body.removeChild($el)
    setTimeout(() => e.classList.remove('copying'), 3000)
}

/* used in <SignInLink /> */
globalThis.logout = function () {
    const form = $1('#logout-form')
    form.submit()
    $1('[name=ReturnUrl]', form).value = location.href
}

document.addEventListener('DOMContentLoaded', () =>
    Blazor.addEventListener('enhancedload', () => {
        remount()
        globalThis.hljs?.highlightAll()
        if (localStorage.getItem('color-scheme') == 'dark') {
            document.documentElement.classList.add('dark')
        }
    }))
