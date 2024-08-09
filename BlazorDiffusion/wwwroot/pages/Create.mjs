import { ref, computed, watch, inject, onMounted, onUnmounted, getCurrentInstance } from "vue"
import { useClient, useAuth, useUtils, useFormatters } from "@servicestack/vue"
import { queryString, ApiResult, combinePaths, map } from "@servicestack/client"
import {
    QueryCreatives, CreateCreative, SearchData, SearchDataResponse,
    ArtistInfo, ModifierInfo, UpdateCreative, CreateSignup,
} from "dtos.mjs"
import { Store } from "store.mjs"

const PinArtifactIcon = {
    template:`
      <div class="cursor-pointer" @click.stop.prevent="">
          <svg v-if="artifact.id === creative.primaryArtifactId" @click.stop.prevent="unpinArtifact(creative,artifact)"
               class="w-6 h-6 text-cyan-600 hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <title>unpin</title>
            <path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" />
          </svg>
          <svg v-else @click.stop.prevent="pinArtifact(creative,artifact)"
               class="w-6 h-6 text-cyan-600 hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>pin as cover image</title>
            <path fill="currentColor" d="M18.27 9.81h-2.82L9.77 4.13l.71-.71l-1.42-1.41l-7.07 7.07l1.42 1.41l.71-.71l5.67 5.68h-.01v2.83l1.42 1.42l3.54-3.55l4.77 4.77l1.41-1.41l-4.77-4.77l3.53-3.53l-1.41-1.41z" />
          </svg>
      </div>`,
    emits: ['changed'],
    props: {
        /** @type {import('vue').PropType<Creative>} */
        creative:Object,
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
    },
    setup(props, { emit }) {
        const instance = getCurrentInstance()

        /** @param {Creative} c
         * @param {Artifact} artifact */
        async function pinArtifact(c, artifact) {
            const hold = c.primaryArtifactId
            c.primaryArtifactId = artifact.id
            instance?.proxy?.$forceUpdate()

            const api = await client.api(new UpdateCreative({ id:artifact.creativeId, primaryArtifactId:artifact.id }))
            if (api.succeeded) {
                store.updatePrimaryArtifact(c, artifact.id)
            } else {
                c.primaryArtifactId = hold
            }
            emit('changed')
            instance?.proxy?.$forceUpdate()
        }

        /** @param {Creative} c
         *  @param {Artifact} artifact */
        async function unpinArtifact(c,artifact) {
            const hold = c.primaryArtifactId
            c.primaryArtifactId = null
            instance?.proxy?.$forceUpdate()

            const api = await client.api(new UpdateCreative({
                id:artifact.creativeId,
                primaryArtifactId:artifact.id,
                unpinPrimaryArtifact:true
            }))
            if (api.succeeded) {
                store.updatePrimaryArtifact(c, null)
            } else {
                c.primaryArtifactId = hold
            }
            instance?.proxy?.$forceUpdate()
            emit('changed')
        }
        
        return { pinArtifact, unpinArtifact, }
    }
}

const DailyQuotaExceeded = {
    template:`<div class="mx-auto max-w-screen-sm bg-white dark:bg-black shadow dark:border dark:border-red-400 sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">{{quotaError.message}}</h3>
      <div class="mt-2 max-w-xl text-gray-500 dark:text-gray-400">
        <p class="py-2">The <b>{{quotaError.creditsRequested}}</b> credits requested exceeds the <b>{{Math.max(quotaError.creditsRemaining,0)}}</b> daily quota you have remaining.</p>
        <p class="py-2">Come back tomorrow in <b>{{quotaError.timeRemaining}}</b> for another <b>{{quotaError.dailyQuota}}</b> credits!</p>
        <div class="pt-4 text-center">
          Request Details:<br>
          <div class="block pt-2 dark:text-gray-200">{{quotaError.requestedDetails}}</div>
        </div>
      </div>
      <div v-if="!store.userData.signups.includes('Beta')" class="border-t mt-8">
          <ErrorSummary class="pb-2" except="email" />
          <div class="pt-4 border-gray-700 mt-2 max-w-xl text-gray-500 dark:text-gray-400">
            <p>You can also request an increased quota by signing up for early Beta access:</p>
          </div>
          <div class="mt-5 sm:flex sm:items-end">

            <div class="w-full sm:max-w-xs mr-2">
              <TextInput id="email" v-model="signup.email" placeholder="you@example.com" />
            </div>
            <div>
              <PrimaryButton @click="signupBeta">Sign up</PrimaryButton>
            </div>
          </div>
      </div>
    </div>
    </div>
    `,
    props: {
        status:Object 
    },
    setup(props) {
        /** @type {Store} */
        const store = inject('store')
        const client = useClient()
        const instance = getCurrentInstance()

        const quotaError = map(props.status, status => Object.assign({
            timeRemaining: status.meta['TimeRemaining'],
            dailyQuota: parseInt(status.meta['DailyQuota']),
            creditsUsed: parseInt(status.meta['CreditsUsed']),
            creditsRequested: parseInt(status.meta['CreditsRequested']),
            requestedDetails: status.meta['RequestedDetails'] || '',
        }, props.status))
        quotaError.creditsRemaining = quotaError.dailyQuota - quotaError.creditsUsed
        
        const signup = ref(new CreateSignup({ type:'Beta' }))
        async function signupBeta() {
            const api = await client.api(signup.value)
            if (api.succeeded) {
                store.userData.signups.push('Beta')
                instance?.proxy?.$forceUpdate()
            }
        }
        
        return { store, quotaError, signup, signupBeta }
    }
}

export default {
    components: { PinArtifactIcon, DailyQuotaExceeded },
    template:/*html*/`<div>
    <form class="mt-4 mb-20 mx-auto shadow overflow-hidden sm:rounded-md w-[420px] sm:w-[600px]" @submit.prevent="noop">
        <ErrorSummary except="userPrompt,images,width,height" />

        <div class="px-4 space-y-6 p-2 sm:p-6">
            <div class="flex justify-center">
                <div @click="imageSize = 'square'" :class="['mr-4 flex flex-col items-center hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer', imageSize == 'square' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400']">
                    <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M14 14v20h20V14H14Zm-1-2a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1H13Z" clip-rule="evenodd" /></svg>
                    <span class="text-sm">square</span>
                </div>
                <div @click="imageSize = 'portrait'" :class="['mr-4 flex flex-col items-center hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer', imageSize == 'portrait' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400']">
                    <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" transform="translate(5 3)"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2.5.5h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" /><circle cx="5.5" cy="11.5" r="1" fill="currentColor" /></g></svg>
                    <span class="text-sm">portrait</span>
                </div>
                <div @click="imageSize = 'landscape'" :class="['flex flex-col items-center hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer', imageSize == 'landscape' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400']">
                    <svg class="w-12 h-12 rotate-90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" transform="translate(5 3)"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2.5.5h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" /><circle cx="5.5" cy="11.5" r="1" fill="currentColor" /></g></svg>
                    <span class="text-sm">landscape</span>
                </div>
            </div>
        </div>
        
        <div class="mt-8 mb-4">
          <h3 class="text-lg font-medium mb-4 text-center">Select Model</h3>
          <div class="flex justify-center space-x-4">
            <div v-for="model in models" :key="model.name" 
                 @click="selectModel(model)"
                 :class="['cursor-pointer p-2 rounded-lg transition-colors w-[110px]', 
                          selectedModel.name === model.name ? 'bg-indigo-100 dark:bg-indigo-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800']">
              <div class="w-[100px] h-[100px] mb-2 mx-auto overflow-hidden">
                <img :src="model.imgUrl" :alt="model.name" class="w-full h-full object-cover">
              </div>
              <p class="text-sm text-center">{{ model.name }}</p>
            </div>
          </div>
        </div>

        <div v-if="dataCache">

            <div class="mx-auto w-[420px]">
                <Autocomplete id="artistIds" label="" :options="artistOptions" multiple v-model="artists" placeholder="Select Artist Style" @click="closeDialogs"
                    :match="(x, value) => x.name.toLowerCase().includes(value.toLowerCase()) || x.type?.toLowerCase().includes(value.toLowerCase())">
                    <template #item="{ name, type }">
                        <div class="flex justify-between">
                            <span class="truncate">{{name}}</span>
                            <span class="text-gray-400 truncate -mr-6">{{type}}</span>
                        </div>
                    </template>
                </Autocomplete>
            </div>

            <div v-if="artists.length" class="m-4 flex flex-wrap">
                <div :key="artist.id" v-for="artist in artists" class="pt-2 pr-2">
                    <span class="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300">
                        {{ artist.name }}
                        <button type="button" @click="removeArtist(artist)" class="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black">
                            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7"></path></svg>
                        </button>
                    </span>
                </div>
            </div>

            <div class="mt-8 mx-auto w-[420px]">
                <Autocomplete id="modifierIds" label="" :options="modifierOptions" multiple v-model="modifiers" placeholder="Select Modifiers" @click="closeDialogs"
                    :match="(x, value) => map(value.includes('-') ? value.trim().replaceAll('-',' ') : value.trim(), v => 
                             x.name.toLowerCase().includes(v.toLowerCase()) ||
                             x.category.toLowerCase().includes(v.toLowerCase()))">
                    <template #item="{ name, category }">
                        <div class="flex justify-between">
                            <span class="truncate">{{ name }}</span>
                            <span class="text-gray-400 truncate -mr-6">{{ category }}</span>
                        </div>
                    </template>
                </Autocomplete>
            </div>

            <div v-if="modifiers.length" class="m-4 flex flex-wrap">
                <div :key="modifier.id" v-for="modifier in modifiers" class="pt-2 pr-2">
                    <span class="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300">
                        {{ modifier.name }}
                        <button type="button" @click="removeModifier(modifier)" class="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black">
                            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7"></path></svg>
                        </button>
                    </span>
                </div>
            </div>

            <div class="mt-8">
                <div class="sm:hidden">
                    <label for="groups" class="sr-only">Select a tab</label>
                    <select id="groups" name="tabs" class="block w-full dark:bg-black rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            @change="selectGroup">
                        <option :key="group.name" v-for="group in store.data.categoryGroups">{{group.name}}</option>
                    </select>
                </div>
                <div class="hidden sm:block">
                    <div class="border-b border-gray-200 dark:border-gray-800">
                        <nav class="-mb-px flex" aria-label="Tabs">
                            <button :key="group.name" v-for="group in store.data.categoryGroups" @click="selectGroup(group.name)" :class="[group.name == selectedGroup
                                ? 'border-indigo-500 dark:border-gray-100 text-indigo-600 dark:text-gray-100' : 'border-transparent text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500',
                                  'cursor-pointer w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm']">{{ group.name }}</button>
                        </nav>
                    </div>
                </div>
            </div>

            <div class="flex">
                <div class="md:inset-y-0 md:flex md:w-[8.5rem] shrink-0">
                    <div class="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800">
                        <div class="flex flex-1 flex-col overflow-y-auto">
                            <nav class="flex-1 space-y-1 px-2 py-4">
                                <button :key="category" v-for="category in groupCategories" @click="selectCategory(category)" :class="[category == selectedCategory
                                    ? 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white',
                                        'w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md']">{{ category }}</button>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="flex grow p-2">
                    <div>
                        <div class="grid grid-cols-3 gap-2">
                            <span :key="modifier.id" v-for="modifier in categoryModifiers" @click="addModifier(modifier)" class="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">{{modifier.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4 p-2 flex flex-col gap-y-4">
            <TextInput input-class="!text-lg" v-model="request.userPrompt" spellcheck="false" placeholder="Description of Image" label="" @click="closeDialogs" />
        </div>

        <div class="mt-4 mx-auto flex justify-center">
            <div class="flex flex-col">

                <PrimaryButton @click="submit" color="sky" class="!rounded-full !text-lg font-normal" :disabled="loading">
                    Generate
                </PrimaryButton>

                <button :class="['mt-2 mb-4', isDirty ? '' : 'invisible']" @click.stop="reset">reset</button>
            </div>
        </div>
    </form>
    <DailyQuotaExceeded class="mb-16" v-if="api.error?.errorCode === 'QuotaExceeded'" :status="api.error" />
    <div v-else-if="loading" class="mt-20 mb-32 flex justify-center">
        <Loading class="text-gray-300 font-normal" imageClass="w-7 h-7 mt-1.5">generating images...</Loading>
    </div>
    <div :key="renderKey + c.id" v-for="c in creatives">
        <div class="flex justify-between items-center">
            <div></div>
            <div class="flex justify-center items-center">
                <a class="cursor-pointer my-4 flex justify-center items-center text-xl hover:underline underline-offset-4" @click.prevent="populateForm(c)" title="New from this">            
                    <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M13.74 10.25h8.046v2.626l7.556-4.363l-7.556-4.363v2.598H9.826c1.543.864 2.79 2.174 3.915 3.5zm8.046 10.404c-.618-.195-1.407-.703-2.29-1.587c-1.79-1.756-3.713-4.675-5.732-7.227c-2.05-2.486-4.16-4.972-7.45-5.09h-3.5v3.5h3.5c.655-.028 1.682.485 2.878 1.682c1.788 1.753 3.712 4.674 5.73 7.226c1.922 2.33 3.908 4.64 6.864 5.016v2.702l7.556-4.362l-7.556-4.362v2.502z" />
                    </svg>
                    {{c.userPrompt}}
                </a>
                <div class="group flex cursor-pointer" @click="discard(c)">
                    <svg class="ml-8 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"></path><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"></path></svg>
                    <div class="ml-1 invisible group-hover:visible">discard</div>
                </div>
            </div>
            <div class="flex items-center">
                <span v-if="!c.primaryArtifactId" title="pin cover image to appear in search results">
                    <svg class="w-6 h-6 text-yellow-400 cursor-help" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M236.8 188.09L149.35 36.22a24.76 24.76 0 0 0-42.7 0L19.2 188.09a23.51 23.51 0 0 0 0 23.72A24.35 24.35 0 0 0 40.55 224h174.9a24.35 24.35 0 0 0 21.33-12.19a23.51 23.51 0 0 0 .02-23.72Zm-13.87 15.71a8.5 8.5 0 0 1-7.48 4.2H40.55a8.5 8.5 0 0 1-7.48-4.2a7.59 7.59 0 0 1 0-7.72l87.45-151.87a8.75 8.75 0 0 1 15 0l87.45 151.87a7.59 7.59 0 0 1-.04 7.72ZM120 144v-40a8 8 0 0 1 16 0v40a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/></svg>
                </span>
            </div>
        </div>
        <div :class="['grid',store.css.gridClass(store.prefs.artifactGalleryColumns)]">
            <div v-for="artifact in store.moderatedArtifacts(c)" :key="artifact.id" :class="[artifact.width > artifact.height ? 'col-span-2' : artifact.height > artifact.width ? 'row-span-2' : '']">
                <div @click="showArtifact(c,artifact)" class="flex justify-center">
                    <div class="relative sm:p-2 flex flex-col cursor-pointer items-center" :style="'max-width:' + artifact.width + 'px'"
                         @contextmenu.prevent.stop="artifactMenu=artifact">
    
                        <ArtifactImage :artifact="artifact" :class="['sm:rounded lg:rounded-xl border sm:border-2', resolveBorderColor(artifact, artifact.id == c.primaryArtifactId)]" />
    
                        <div class="absolute top-0 left-0 w-full h-full group select-none overflow-hidden sm:m-1 rounded sm:rounded-xl">
                            <div class="w-full h-full absolute inset-0 z-10 block text-zinc-100 drop-shadow pointer-events-none line-clamp sm:px-2 sm:pb-2 text-sm opacity-0 group-hover:opacity-40 transition duration-300 ease-in-out bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
    
                            <div class="absolute w-full h-full flex z-10 text-zinc-100 justify-between drop-shadow opacity-0 group-hover:opacity-100 transition-opacity sm:mb-1 text-sm">
                                <div class="relative p-4 w-full h-full overflow-hidden flex flex-col justify-between overflow-hidden">
                                    <div class="flex justify-between flex-none">
                                        <PinArtifactIcon :creative="c" :artifact="artifact" @changed="primaryArtifactChanged(c,artifact)" />
                                        <ArtifactMenuIcon :artifact="artifact" @showArtifactMenu="artifactMenu=artifact" />
                                    </div>
                                    <ArtifactLikeIcon :artifact="artifact" @changed="update" @open="openDialog" />                                   
                                </div>
                            </div>
                        </div>

                      <ArtifactMenu v-if="!(activeCreative && active) && artifactMenu?.id === artifact.id" :artifact="artifactMenu" menuClass="justify-end"
                                    @changed="notifyChanged" @done="artifactMenu=null" @open="openDialog" />
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <ArtifactModal v-if="activeCreative && active" :artifact="active" @selected="showArtifact(activeCreative,$event)" @done="showArtifact(null,null)" @contextmenu="artifactMenu=$event">
        <template #icons="artifact">
            <div class="relative p-4 w-full h-full overflow-hidden flex flex-col justify-between overflow-hidden">
                <div class="flex justify-between flex-none">
                    <PinArtifactIcon :creative="activeCreative" :artifact="active" @changed="update" />
                    <ArtifactMenuIcon :artifact="artifact" @showArtifactMenu="artifactMenu=artifact" />
                </div>
                <ArtifactLikeIcon :artifact="artifact" @changed="update" @open="openDialog" />
            </div>
        </template>
        <template #contextmenu="artifact">
            <ArtifactMenu v-if="artifactMenu?.id === artifact.id" :artifact="artifactMenu" menuClass="justify-end"
                          @changed="notifyChanged" @done="artifactMenu=null" @open="openDialog" />
        </template>
    </ArtifactModal>
    <ArtifactDialogs :show="open" :artifact="active" @done="closeDialog" />

    <div class="mt-12 flex justify-center">
        <loading v-if="loadingMore" class="text-gray-400">loading...</loading>
        <span ref="bottom"></span>
    </div>
</div>`,
    setup(props) {
        /** @type {Store} */
        const store = inject('store')
        const client = useClient()
        const { user } = useAuth()
        const { pushState } = useUtils()
        const instance = getCurrentInstance()
        const qs = queryString(location.search)
        const models = ref([
            { name: "Realistic", imgUrl: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0d074c63-1ab6-4e58-9141-7681ec5be94c/width=450/17898822.jpeg" },
            { name: "Anime", imgUrl: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/150fc6fc-88cb-47ec-872f-f04c7ded01ac/width=450/4456416.jpeg" },
            { name: "SciFi", imgUrl: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/80120322-6242-424e-bef7-37821c0b4ff9/width=450/7826960.jpeg" },
            { name: "Flux", imgUrl: "/img/flux-model.jpg" }
        ]);

        const selectedModel = ref(models.value[0]);
        
        const api = ref(new ApiResult())
        /** @type {import('vue').Ref<CreateCreative>} */
        const request = ref(new CreateCreative())
        /** @type {import('vue').Ref<ArtistInfo[]>} */
        const artists = ref([])
        /** @type {import('vue').Ref<ModifierInfo[]>} */
        const modifiers = ref([])
        /** @type {import('vue').Ref<SearchDataResponse>} */
        const dataCache = ref()
        /** @type {import('vue').Ref<Creative>} */
        const creative = ref()
        /** @type {import('vue').Ref<Creative[]>} */
        const creativeHistory = ref([])
        /** @type {import('vue').ComputedRef<Creative[]>} */
        const creatives = computed(() => creative.value 
            ? [creative.value, ...creativeHistory.value.filter(x => x.id !== creative.value.id)] 
            : creativeHistory.value)
        /** @type {import('vue').Ref<{id?:number,view?:number}|null>} */
        const selected = ref({ id:qs.id, view:qs.view })
        const showAuth = ref(false)
        const showSignUp = ref(false)
        const active = ref()
        const renderKey = ref(1)

        /** @type {import('vue').ComputedRef<ArtistInfo[]>} */
        const artistOptions = computed(() => dataCache.value?.artists || [])
        /** @type {import('vue').ComputedRef<ModifierInfo[]>} */
        const modifierOptions = computed(() => dataCache.value?.modifiers || [])
        const groupCategories = computed(() => store.data.categoryGroups.find(x => x.name === selectedGroup.value)?.items || [])
        const categoryModifiers = computed(() => (selectedCategory.value 
            ? dataCache.value?.modifiers.filter(x => x.category === selectedCategory.value && !modifiers.value.includes(x))
            : null) || [])
        const imageSize = ref('square')
        const isDirty = computed(() => !!request.value.userPrompt
            || imageSize.value !== 'square'
            || artists.value.length > 0
            || modifiers.value.length > 0)
        const loading = ref(false)

        const artifactMenu = ref()
        const open = ref('')
        function openDialog(dialog, artifact) {
            artifactMenu.value = null
            open.value = dialog
            active.value = artifact
        }
        function closeDialog() {
            open.value = ''
            active.value = null
        }
        function notifyChanged() {
            artifactMenu.value = null
            forceUpdate()
            update()
        }
        function forceUpdate() { 
            instance?.proxy?.$forceUpdate() 
            //renderKey.value++
        }
        async function update() {
            forceUpdate()
            await fetchHistory({ skip: 0}, x => null) //update swr cache
            forceUpdate()
        }

        function selectModel(model) {
            selectedModel.value = model;
        }

        function noop(){}
        function navTo(creativeId, artifactId) {
            console.log('navTo', creativeId, artifactId)
            if (!creativeId) {
                selected.value = null
                pushState({ id:undefined, view:undefined })
            } else {
                selected.value = { id:creativeId, view: artifactId || undefined }
                pushState(selected.value)
            }
            loadCreative(creativeId)
        }
        async function loadCreative(creativeId) {
            if (creativeId) {
                creative.value = store.creativesMap[creativeId]
                if (!creative.value) {
                    const api = await client.api(new QueryCreatives({ id:creativeId }))
                    if (api.succeeded) {
                        creative.value = api.response.results?.[0]
                        if (creative.value) {
                            store.loadCreative(creative.value)
                        }
                    }
                }
            } else {
                creative.value = null
            }
            return creative.value
        }
        
        /** @param {Creative} creative */
        function populateForm(creative) {
            if (creative) {
                navTo(creative.id)
                request.value.userPrompt = creative.userPrompt
                imageSize.value = creative.width > creative.height
                    ? 'landscape'
                    : creative.height > creative.width
                        ? 'portrait'
                        : 'square'
                artists.value = creative.artists?.map(x => artistOptions.value.find(a => a.id === x.artistId)) || []
                modifiers.value = creative.modifiers?.map(x => modifierOptions.value.find(a => a.id === x.modifierId)) || []
                selectedModel.value = models.value.find(x => x.name === creative.engineId) || models.value[0]
                document.documentElement.scrollIntoView({ behavior: "smooth" })
            } else {
                reset()
            }
        }
        
        const activeCreative = ref()
        /** @param {Creative} creative
         *  @param {Artifact} artifact */
        async function showArtifact(creative, artifact) {
            //console.log('showArtifact', artifact, creative)
            activeCreative.value = creative
            active.value = artifact ? store.artifactsMap[artifact.id] : null
            pushState({ view: artifact ? artifact.id : undefined })
            // undefined == deleted, null == @done
            if (artifact === undefined) {
                selected.value = null
                closeDialogs()
                await loadHistory(true)
            }
        }

        /** @param {Artifact} artifact */
        async function unlikeArtifact(artifact) {
            if (!user.value) {
                showAuth.value = true
                return
            }
            await store.unlikeArtifact(artifact.id)
            forceUpdate()
        }
        /** @param {Artifact} artifact */
        async function likeArtifact(artifact) {
            if (!user.value) {
                showAuth.value = true
                return
            }
            await store.likeArtifact(artifact.id)
            forceUpdate()
        }

        /** @param {Creative} creative */
        async function discard(creative) {
            creativeHistory.value = creativeHistory.value.filter(x => x.id !== creative.id) 
            await store.softDelete(creative)
        }
        
        function closeDialogs() {
            if (!selected.value?.view) {
                navTo(selected.value?.id)
            }
        }

        async function submit() {
            request.value.width = imageSize.value === 'portrait'
                ? 768
                : imageSize.value === 'landscape'
                    ? 1344
                    : 1024
            request.value.height = imageSize.value === 'landscape'
                ? 768
                : imageSize.value === 'portrait'
                    ? 1344
                    : 1024
            request.value.artistIds = artists.value.map(x => x.id)
            request.value.modifierIds = modifiers.value.map(x => x.id)
            request.value.engineId = selectedModel.value.name
            loading.value = true
            api.value = await client.api(request.value)
            if (api.value.succeeded) {
                creative.value = api.value.response.result
                navTo(creative.value.id)
            }
            loading.value = false
            await loadHistory(true)
        }

        async function fetchHistory({ skip }, fn) {
            const request = new QueryCreatives({
                ownerId: parseInt(user.value.userId),
                take: 10,
                skip,
                orderByDesc:'id',
            })
            if (skip === 0) {
                return await client.swr(request, fn)
            } else {
                const api = await client.api(request)
                if (api.succeeded) {
                    fn(api)
                }
            }
        }

        /** @param {Creative} creative
         *  @param {Artifact} artifact */
        async function primaryArtifactChanged(creative,artifact){
            creativeHistory.value.forEach(x => {
                if (x.id === creative.id) {
                    x.primaryArtifactId = creative.primaryArtifactId
                }
            })
            await update()
        }

        function reset() {
            closeDialogs()
            request.value.userPrompt = ''
            imageSize.value = 'square'
            artists.value.length = 0
            modifiers.value.length = 0
        }
        
        const loadingMore = ref(false)
        const bottom = ref()
        async function loadHistory(clear=false) {
            if (user.value) {
                loadingMore.value = true
                await fetchHistory({ skip: clear ? 0 : creativeHistory.value.length }, api => {
                    if (api.response) {
                        if (clear) creativeHistory.value = []

                        const ids = creativeHistory.value.map(x => x.id)
                        api.response.results.filter(x => !ids.includes(x.id)).forEach(c => {
                            creativeHistory.value.push(c)
                            ids.push(c.id)
                        })

                        // ids.sort((a,b) => a - b)
                        // console.log('creativeHistory', ids)

                        store.loadCreatives(creativeHistory.value)
                        forceUpdate()
                    }
                })
                loadingMore.value = false
            }
        }

        const selectedGroup = ref('Scene')
        function selectGroup(group) {
            selectedGroup.value = group
            selectedCategory.value = store.data.categoryGroups.find(x => x.name === selectedGroup.value)?.items.find(x => !!x)
        }

        const selectedCategory = ref('Quality')
        function selectCategory(category) {
            selectedCategory.value = category
        }
        const removeArtist = artist => artists.value = artists.value.filter(x => x !== artist)
        const addModifier = modifier => modifiers.value.push(modifier)
        const removeModifier = modifier => modifiers.value = modifiers.value.filter(x => x !== modifier)

        /** @param {Artifact} artifact
         *  @param {boolean} [selected] */
        function resolveBorderColor(artifact, selected) {
            return selected
                ? 'border-yellow-300'
                : store.resolveBorderColor(artifact)
        }
        

        let observer = null
        function initObserver() {
            if (!bottom.value) return
            observer = new IntersectionObserver(
                ([{ isIntersecting, target }]) => {
                    if (isIntersecting) loadHistory()
                }, { threshold: 1.0 })
            observer.observe(bottom.value)
        }

        onMounted(async () => {
            console.log('Create.onMounted')
            await Promise.all([
                loadCreative(qs.id),
                client.swr(new SearchData(), async api => dataCache.value = api.response),
                loadHistory(),
            ])
            if (qs.view) {
                active.value = store.artifactsMap[qs.view]
            }
            populateForm(creative.value)

            setTimeout(initObserver, 1000)
        })
        onUnmounted(() => {
            try {
                observer?.unobserve()
            } catch (e) { console.log(e.message) }
        })
        
        return { 
            renderKey, store, api, loading, request, artists, modifiers, dataCache, artistOptions, modifierOptions, isDirty, groupCategories,
            creative, creatives, loadingMore, bottom, categoryModifiers, imageSize, selected, showAuth, showSignUp, active, activeCreative,
            resolveBorderColor, noop, navTo, populateForm, closeDialogs, submit, reset, map, showArtifact,
            selectedGroup, selectGroup, selectedCategory, selectCategory, removeArtist, addModifier, removeModifier, discard,
            likeArtifact, unlikeArtifact, primaryArtifactChanged,
            artifactMenu, open, openDialog, closeDialog, notifyChanged, update,
            models, selectedModel,selectModel
        }
    }
}