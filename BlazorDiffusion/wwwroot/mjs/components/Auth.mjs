import { computed, ref, inject } from "vue"
import { useClient, useAuth } from "@servicestack/vue"
import { appendQueryString, combinePaths, $1 } from "@servicestack/client"
import { Store } from "../store.mjs"
import { Authenticate } from "../dtos.mjs"

export const SignInDialog = {
    template:/*html*/`<ModalDialog @done="done" class="z-40" sizeClass="sm:max-w-prose sm:w-full">
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="text-center text-3xl font-extrabold text-gray-50">
                Sign In
            </h2>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <ErrorSummary class="mb-3" except="userName,password" />
            <form @submit.prevent="submit">
                <div class="flex flex-col gap-y-4">
                    <TextInput id="userName" label="Email" help="Email you signed up with" v-model="request.userName" placeholder="" />
                    <TextInput id="password" type="password" help="6 characters or more" v-model="request.password" placeholder="" />
                </div>
                <div class="mt-8">
                    <PrimaryButton class="w-full mb-4">Sign In</PrimaryButton>
                </div>
            </form>
    
            <div v-if="oauthProviders.length" class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-600"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-black text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div class="mt-6 grid grid-cols-3 gap-3">
                    <div v-for="provider in oauthProviders">
                        <a :href="providerUrl(provider)" :title="providerLabel(provider)" 
                            class="group w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 text-sm font-medium text-gray-500">
                            <Icon v-if="provider.icon" :image="provider.icon" class="h-5 w-5 text-gray-700 group-hover:text-white" />
                            <svg v-else class="h-5 w-5 text-gray-700 hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"/>
                                <path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"/>
                            </svg>
                        </a>
                    </div>                    
                </div>
            </div>
        </div>
    </div> 
    </ModalDialog>`,
    emits:['done','signup'],
    setup(props, { emit }) {
        /** @type {Store} */
        const store = inject('store')
        const client = useClient()
        
        /** @type {Ref<Authenticate>} */
        const request = ref(new Authenticate({ provider:'credentials' }))
        
        const signInHref = computed(() => 
            appendQueryString(combinePaths(store.BaseUrl, 'auth/google'), { redirect:location.origin }))
        const errorSummary = computed(() => '')
        const oauthProviders = [
            {
                name:'Facebook', 
                href:'/auth/facebook',
                icon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'><path fill-rule='evenodd' d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z' clip-rule='evenodd' /></svg>" }
            },
            {
                name:'Google', 
                href:'/auth/google',
                icon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'><path d='M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05c0 5.71-3.83 9.77-9.6 9.77c-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48c-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51v-.01z' fill='currentColor' /></svg>" }
            },
            {
                name:'Microsoft', 
                href:'/auth/microsoftgraph',
                icon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'><path d='M11.55 21H3v-8.55h8.55V21zM21 21h-8.55v-8.55H21V21zm-9.45-9.45H3V3h8.55v8.55zm9.45 0h-8.55V3H21v8.55z' fill='currentColor'/></svg>" }
            },
        ]
        function providerUrl(provider) {
            return appendQueryString(combinePaths(store.BaseUrl, provider.href), { 'continue': location.href })
        }
        function providerLabel(provider) {
            return `Sign In with ${provider.name}`
        }
        function done() {
            emit('done')
        }
        async function submit() {
            const api = await client.api(request.value)
            if (api.succeeded) {
                await store.signIn(api.response)
                await store.loadUserData()
                done()
            }
        }
        
        return { request, signInHref, done, errorSummary, submit, oauthProviders, providerUrl, providerLabel, }
    }
}

export const SignInLink = {
    template:`<div v-if="!user">
        <a href="/Account/Login" class="signin-link cursor-pointer -mx-3 block rounded-lg px-3 py-1.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">Sign in &rarr;</a>
    </div>
    <div v-else>
        <div class="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 overflow-hidden"
             @click="showAuthMenu=!showAuthMenu">
            <Icon :src="profileUrl" class="w-9 h-9 cursor-pointer" />
        </div>
        <div v-if="showAuthMenu" :class="['font-normal absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-black py-1 shadow-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none',menuClass || 'right-2']" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <span @click="logout" class="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" role="menuitem" tabindex="-1">Logout</span>
        </div>
    </div>`,
    props: { menuClass:String },
    setup(props) {
        /** @type {Store} */
        const store = inject('store')
        const { user } = useAuth()
        const showAuthMenu = ref(false)
        const profileUrl = computed(() => user.value?.profileUrl || store.DefaultProfileUrl)
        function logout() {
            const form = $1('#logout-form')
            form.submit()
            $1('[name=ReturnUrl]', form).value = location.href
        }

        return { user, profileUrl, showAuthMenu, logout }
    }
}


export const AvatarImage = {
    template:`
        <img v-if="publicUrl" :alt="user.handle" class="rounded-full overflow-hidden object-fit hover:opacity-70"
         :src="useSrc || publicUrl"
         @error="useSrc = store.getUserImageErrorUrl(user, useSrc)">
        <svg v-else class="text-cyan-600 hover:text-cyan-400 rounded-full overflow-hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <path fill="currentColor" d="M200,100 a100,100 0 1 0 -167.3,73.9 a3.6,3.6 0 0 0 0.9,0.8 a99.9,99.9 0 0 0 132.9,0 l0.8,-0.8 A99.6,99.6 0 0 0 200,100 zm-192,0 a92,92 0 1 1 157.2,64.9 a75.8,75.8 0 0 0 -44.5,-34.1 a44,44 0 1 0 -41.4,0 a75.8,75.8 0 0 0 -44.5,34.1 A92.1,92.1 0 0 1 8,100 zm92,28 a36,36 0 1 1 36,-36 a36,36 0 0 1 -36,36 zm-59.1,42.4 a68,68 0 0 1 118.2,0 a91.7,91.7 0 0 1 -118.2,0 z" />
        </svg>`,
    props: {
        /** @type {import('vue').PropType<UserResult>} */
        user:Object 
    },
    setup(props) {
        /** @type {Store} */
        const store = inject('store')
        const publicUrl = computed(() => store.getUserPublicUrl(props.user))
        const useSrc = ref('')
        return { store, publicUrl, useSrc }
    }
}
