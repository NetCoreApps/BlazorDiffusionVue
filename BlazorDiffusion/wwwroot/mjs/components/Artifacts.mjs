import { ref, computed, watch, inject, onMounted, onUnmounted, getCurrentInstance } from "vue"
import { useClient, useAuth, useUtils, useFormatters, useMetadata, css } from "@servicestack/vue"
import { queryString, ApiResult } from "@servicestack/client"
import { Artifact, QueryArtifacts, QueryCreatives, UpdateArtifact, CreateArtifactReport, CreateAlbum, UpdateAlbum, ReportType } from "../dtos.mjs"
import { Store } from "../store.mjs"

export const AlbumTitle = {
    template:`<div>
        <h3 class="text-xl">{{album.name}}</h3>
    </div>`,
    props: {
        /** @type {import('vue').PropType<AlbumResult>} */
        album:Object,
    }
}

export const ArtifactImage = {
    template:`<div v-if="artifact" class="overflow-hidden" :style="store.getBackgroundStyle(artifact) + ';' + imageStyle">
      <img :alt="artifact.prompt" :width="width" :height="height" :class="imageClass"
           :src="store.getPublicUrl(artifact,minSize)" :loading="loading || 'lazy'" @error="store.getArtifactImageErrorUrl(artifact,null,minSize)">
  </div>`,
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
        imageClass:String,
        imageStyle: String,
        minSize:Number,
        /** @type {import('vue').PropType<'eager'|'lazy'>} */
        loading:String,
    },
    setup(props) {
        /** @type {Store} */
        const store = inject('store')
        const width = computed(() => !props.minSize ? props.artifact.width
            : (props.artifact?.width > props.artifact.height
                ? (props.artifact.width / props.artifact.height) * props.minSize
                : props.minSize))

        const height = computed(() => !props.minSize ? props.artifact.height
            : (props.artifact.height > props.artifact.width
                ? (props.artifact.height / props.artifact.width) * props.minSize
                : props.minSize))

        return { store, width, height, }
    }
}

export const NewReport = {
    template:`<ModalDialog class="z-30" sizeClass="sm:max-w-prose sm:w-full" @done="done">
        <form @submit.prevent="submit">
            <div class="shadow overflow-hidden sm:rounded-md bg-white dark:bg-black">
                <div class="relative px-4 py-5 sm:p-6">
                    <fieldset>
                        <legend class="text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4">Report Image</legend>
    
                        <ErrorSummary except="type,description" />
    
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                                <SelectInput id="type" v-model="request.type" :options="ReportType" />
                            </div>
                            <div class="col-span-6">
                                <TextareaInput id="description" v-model="request.description" />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right sm:px-6">
                    <div class="flex justify-end items-center">
                        <SecondaryButton class="mr-2" @click="done">Cancel</SecondaryButton>
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </div>
                </div>
            </div>
        </form>
    </ModalDialog>`,
    emits:['done'],
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
    },
    setup(props, { emit }) {
        const client = useClient()
        
        const request = ref(new CreateArtifactReport({
            artifactId: props.artifact.id
        }))
        
        async function submit() {
            const api = await client.api(request.value)
            if (api.succeeded) {
                done()
            }
        }
        
        function done() {
            emit('done')
        }
        
        return { request, submit, done, ReportType, }
    }
}

export const NewAlbum = {
    template:`<ModalDialog class="z-30" sizeClass="sm:max-w-prose sm:w-full" @done="done">
        <form @submit.prevent="submit">
          <div class="shadow overflow-hidden sm:rounded-md bg-white dark:bg-black">
            <div class="relative px-4 py-5 sm:p-6">
              <fieldset>
                <legend class="text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4">Create new Album</legend>

                <ErrorSummary except="name" />

                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6">
                    <TextInput ref="name" id="name" v-model="request.name" />
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right sm:px-6">
              <div class="flex justify-end items-center">
                <SecondaryButton class="mr-2" @click="done">Cancel</SecondaryButton>
                <PrimaryButton type="submit">Submit</PrimaryButton>
              </div>
            </div>
          </div>
        </form>
    </ModalDialog>`,
    emits:['done'],
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
    },
    setup(props, { emit }) {
        const client = useClient()
        const name = ref()

        const request = ref(new CreateAlbum({
            primaryArtifactId: props.artifact.id,
            artifactIds: [props.artifact.id]
        }))

        async function submit() {
            const api = await client.api(request.value)
            if (api.succeeded) {
                await store.loadUserData()
                done()
            }
        }

        function done() {
            emit('done')
        }
        
        onMounted(() => name.value?.focus())

        return { name, request, submit, done, }
    }
}


export const ArtifactMenu = {
    template:`<div class="absolute z-20 top-0 left-0 w-full h-full" @click="done">
        <div :class="['p-4 flex',menuClass]" :style="menuStyle">
            <div :class="['rounded-md whitespace-nowrap bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none']" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                    <slot name="topmenu" v-bind="artifact"></slot>
                    <div v-if="store.isModerator">
                        <div @click.stop="toggleNsfw" class="flex cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 py-2 pr-4 text-sm" role="menuitem" tabindex="-1">
                            <svg :class="['h-5 w-5 ml-1 mr-1.5', artifact.nsfw === true ? '' : 'invisible']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Mark as NSFW
                        </div>
                        <div @click.stop="setQuality(artifact.quality === -1 ? 0 : -1)" class="flex cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 py-2 pr-4 text-sm" role="menuitem" tabindex="-1">
                            <svg :class="['h-5 w-5 ml-1 mr-1.5', artifact.quality === -1 ? '' : 'invisible']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Mark as Poor Quality
                        </div>
                        <div @click.stop="setQuality(artifact.quality === -2 ? 0 : -2)" class="flex cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 py-2 pr-4 text-sm" role="menuitem" tabindex="-1">
                            <svg :class="['h-5 w-5 ml-1 mr-1.5', artifact.quality === -2 ? '' : 'invisible']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Mark as Malformed
                        </div>
                        <div @click.stop="setQuality(artifact.quality === -3 ? 0 : -3)" class="flex cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 py-2 pr-4 text-sm" role="menuitem" tabindex="-1">
                            <svg :class="['h-5 w-5 ml-1 mr-1.5', artifact.quality === -3 ? '' : 'invisible']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Mark as Blurred
                        </div>
                        <div @click.stop="setQuality(artifact.quality === -4 ? 0 : -4)" class="flex cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 py-2 pr-4 text-sm" role="menuitem" tabindex="-1">
                            <svg :class="['h-5 w-5 ml-1 mr-1.5', artifact.quality === -4 ? '' : 'invisible']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Mark Lowest Quality
                        </div>
                    </div>
                
                    <a :href="store.downloadUrl(artifact)" target="_blank" class="flex cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 pl-2 pr-4 py-2 text-sm" role="menuitem" tabindex="-1">
                        <svg class="w-5 h-5 mr-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5" /></svg>
                        Download
                    </a>
                    <div @click.stop="$emit('open','NewReport',artifact)" class="cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                        Report
                    </div>
                    <div @click.stop="done" class="whitespace-nowrap text-gray-700 dark:text-gray-100 bg-gray-300 dark:bg-gray-700 px-4 py-2 text-sm" role="menuitem" tabindex="-1">Albums</div>
                    <div @click.stop="openNewAlbum" class="group whitespace-nowrap flex items-center cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                        <svg class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="currentColor" d="M6 1.5a.5.5 0 0 0-1 0V5H1.5a.5.5 0 0 0 0 1H5v3.5a.5.5 0 0 0 1 0V6h3.5a.5.5 0 0 0 0-1H6V1.5Z"/></svg>
                        New Album
                    </div>
                    <div v-for="album in store.userAlbums" :key="album.id" @click.stop="saveToAlbum(album)" class="group whitespace-nowrap flex items-center cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                        <svg v-if="album.artifactIds.includes(artifact.id)" class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                        </svg>
                        <svg v-else class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11.975 17.025L16 13l-4.025-4.025l-1.4 1.4L12.2 12H8v2h4.2l-1.625 1.625ZM2 20V4h8l2 2h10v14Zm2-2h16V8h-8.825l-2-2H4Zm0 0V6v2Z" /></svg>
                        {{album.name}}
                    </div>
                  <slot name="bottommenu" v-bind="artifact"></slot>
                </div>
            </div>
        </div>
    </div>`,
    emits:['done','changed','open'],
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
        menuClass:String
    },
    setup(props, { emit }) {
        /** @type {Store} */
        const store = inject('store')
        const client = useClient()
        const instance = getCurrentInstance()
        const artifactView = ref('')
        const menuStyle = computed(() => ``)//`top:${Position.PageY-OffsetY}px;left:${Position.PageX-OffsetX}px`
        function notifyChanged() {
            console.log('ArtifactMenu.notifyChanged')
            instance?.proxy?.$forceUpdate()
            emit('changed')
        }
        function done() {
            emit('done')
        }
        async function toggleNsfw() {
            if (!store.isModerator)
                return
            const api = await client.api(new UpdateArtifact({
                id: props.artifact.id,
                nsfw: !props.artifact.nsfw,
            }))
            if (api.succeeded) {
                [props.artifact, ...store.allArtifacts(props.artifact.id)].forEach(x => x.nsfw = api.response.nsfw)
                notifyChanged()
            }
        }

        /** @param {number} quality */
        async function setQuality(quality) {
            if (!store.isModerator)
                return
            const api = await client.api(new UpdateArtifact({
                id: props.artifact.id,
                quality,
            }))
            if (api.succeeded) {
                [props.artifact, ...store.allArtifacts(props.artifact.id)].forEach(x => x.quality = api.response.quality)
                notifyChanged()
            }
        }

        /** @param {AlbumResult} album */
        async function saveToAlbum(album) {
            if (!album.artifactIds.includes(props.artifact.id)) {
                const api = await client.api(new UpdateAlbum({ id:album.id, addArtifactIds:[props.artifact.id] }))
                if (api.succeeded) {
                    store.addArtifactToAlbum(album, props.artifact)
                    notifyChanged()
                }
            } else {
                const api = await client.api(new UpdateAlbum({ id:album.id, removeArtifactIds:[props.artifact.id] }))
                if (api.succeeded) {
                    store.removeArtifactFromAlbum(album, props.artifact)
                    notifyChanged()
                }
            }
        }
        
        function openNewAlbum() {
            if (!store.auth) {
                emit('open','SignInDialog')
                return
            }
            emit('open','NewAlbum',props.artifact)            
        }
        
        return { store, artifactView, menuStyle, done, toggleNsfw, setQuality, saveToAlbum, openNewAlbum, }
    }
}

export const ArtifactModal = {
    template:`<ModalDialog v-if="creative" @done="$emit('done')" class="z-30" :modalClass="css.modal.modalClass.replace('overflow-hidden','')">
       <div class="pb-8">
            <h2 class="mt-8 mx-8 mb-4 text-2xl text-center">{{ creative.userPrompt }}</h2> 
            <div class="text-center hidden sm:flex bg-black/40 sm:pl-4 sm:pb-4 sm:pr-4 w-full">
                <div class="w-full">
                    <div class="mt-1">
                        <p v-if="creative.modifierNames?.length" class="mb-2 truncate text-xs text-slate-500">
                            <a v-for="modifier in creative.modifierNames" class="hover:text-slate-300 pr-2" :key="modifier" :href="store.searchByModifierUrl(modifier)">{{modifier}}</a>
                        </p>
                        <p v-if="creative.artistNames?.length" class="mb-2 truncate text-xs text-gray-500">
                            by 
                            <a v-for="artist in creative.artistNames" class="hover:text-slate-300 pr-2" :key="artist" :href="store.searchByArtistUrl(artist)">{{artist}}</a>
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-center">
                <div class="group px-4 cursor-pointer flex items-center select-none" @click="navNext(-1)">
                    <svg class="w-8 h-8 text-slate-700 group-hover:text-slate-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.125 21.1L6.7 12.7q-.15-.15-.213-.325T6.425 12q0-.2.062-.375T6.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"/></svg>
                </div>
                <div>
                    <div class="relative p-2 w-max flex flex-col mx-auto cursor-context-menu" @contextmenu.prevent="$emit('contextmenu',artifact)">
                        <ArtifactImage :artifact="artifact" :minSize="artifact.width" class="rounded sm:rounded-lg" loading="eager" imageClass="object-cover" imageStyle="max-width:min(70vw,1150px);max-height:min(70vh,1024px);" />
            
                        <div class="absolute top-0 left-0 w-full h-full group select-none overflow-hidden sm:m-1 rounded sm:rounded-xl">
                            <div class="w-full h-full absolute inset-0 z-10 block text-zinc-100 drop-shadow pointer-events-none line-clamp px-2 pb-2 text-sm opacity-0 group-hover:opacity-40 transition duration-300 ease-in-out bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
            
                            <div class="absolute p-2 pb-3 w-full h-full flex z-10 text-zinc-100 justify-between drop-shadow opacity-0 group-hover:opacity-100 transition-opacity mb-1 text-sm">
                                <slot name="icons" v-bind="artifact"></slot>
                            </div>
                        </div>
                        <slot name="contextmenu" v-bind="artifact"></slot>
                    </div>
                </div>
                <div class="group px-4 cursor-pointer flex items-center select-none" @click="navNext(1)">
                    <svg class="w-8 h-8 text-slate-700 group-hover:text-slate-300 rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.125 21.1L6.7 12.7q-.15-.15-.213-.325T6.425 12q0-.2.062-.375T6.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"/></svg>
                </div>
            </div>

            <div class="my-8 flex flex-col items-center">
                <div class="mb-4 flex">
                    <span class="my-2 mx-4 text-sm text-gray-600 dark:text-gray-400">{{artifact.height}} x {{artifact.width}}</span>
                    <span class="my-2 mx-4 text-sm text-gray-600 dark:text-gray-400">{{bytes(artifact.contentLength)}}</span>
                </div>
                <div class="flex flex-wrap">
                    <a class="mb-4 flex text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" :href=store.downloadUrl(artifact) target="_blank">
                        <svg class="w-5 h-5 mr-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5" /></svg>
                        download
                    </a>
                    <a :href="store.createUrl(creative.id)"
                        class="ml-8 mb-4 flex text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                        <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path fill="currentColor" d="M13.74 10.25h8.046v2.626l7.556-4.363l-7.556-4.363v2.598H9.826c1.543.864 2.79 2.174 3.915 3.5zm8.046 10.404c-.618-.195-1.407-.703-2.29-1.587c-1.79-1.756-3.713-4.675-5.732-7.227c-2.05-2.486-4.16-4.972-7.45-5.09h-3.5v3.5h3.5c.655-.028 1.682.485 2.878 1.682c1.788 1.753 3.712 4.674 5.73 7.226c1.922 2.33 3.908 4.64 6.864 5.016v2.702l7.556-4.362l-7.556-4.362v2.502z" />
                        </svg>
                        new from this
                    </a>
                    <a :href="store.artViewUrl(artifact.id,creative.userPrompt)"
                        class="ml-8 mb-4 flex text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                        <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8.586 17H3v-2h18v2h-5.586l3.243 3.243l-1.414 1.414L13 17.414V20h-2v-2.586l-4.243 4.243l-1.414-1.414L8.586 17zM5 3h14a1 1 0 0 1 1 1v10H4V4a1 1 0 0 1 1-1zm1 2v7h12V5H6z" />
                        </svg>
                        art view
                    </a>
                </div>
            </div>
    
            <div class="flex flex-wrap justify-center">
                <div v-for="a in store.moderatedArtifacts(creative)" :key="a.id" @click="$emit('selected',a)"
                    class="relative overflow-hidden cursor-pointer">
                    <div class="relative flex justify-center sm:mx-2 sm:mb-4">
                        <ArtifactImage :artifact="a" :minSize="118" loading="eager" 
                            :class="['rounded sm:rounded-xl border-2 max-w-[118px] sm:max-w-none object-cover', resolveBorderColor(a, artifact?.id)]"  />
        
                        <div class="absolute top-0 left-0 w-full h-full group select-none overflow-hidden rounded sm:rounded-xl">
                            <div class="w-full h-full absolute inset-0 z-10 block text-zinc-100 drop-shadow pointer-events-none line-clamp sm:px-2 sm:pb-2 text-sm opacity-0 group-hover:opacity-40 transition duration-300 ease-in-out bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="mt-2 flex justify-center">
                <a :href="store.searchByUserUrl(creative.ownerRef)"
                    class="ml-8 mb-4 flex text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 4a6.5 6.5 0 0 1 4.932 10.734l5.644 5.644l-.707.707l-5.645-5.645A6.5 6.5 0 1 1 9.5 4Zm0 1a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Z" /></svg>
                    by creator
                </a>
            </div>

            <div v-if="artifactAlbums.length" class="ml-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex whitespace-nowrap w-24">
                    <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 4a6.5 6.5 0 0 1 4.932 10.734l5.644 5.644l-.707.707l-5.645-5.645A6.5 6.5 0 1 1 9.5 4Zm0 1a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Z" /></svg>
                    top albums
                </div>
                <div class="flex flex-wrap">
                    <a v-for="album in artifactAlbums" :key="album.albumRef" :href="store.searchByAlbumUrl(album.albumRef)" class="flex flex-col group mr-2">
                        <div class="mt-2 hover:opacity-80 cursor-pointer h-24 w-24 overflow-hidden rounded sm:rounded-lg border sm:border-2 border-transparent">
                            <ArtifactImage :artifact="store.albumCover(album)" :minSize="128" class="flex w-full h-full" imageClass="object-cover" loading="eager" />
                        </div>
                        <div class="w-24 text-xs text-center overflow-hidden group-hover:text-gray-200">
                            {{ album.name }}
                        </div>
                    </a>
                </div>
            </div>
            <slot name="footer">
                <div v-if="store.isModerator" class="mt-12 text-center">
                    <ConfirmDelete @delete="hardDelete" />
                </div>
            </slot>
        </div>
    </ModalDialog>`,
    emits:['done','selected','changed','open','contextmenu'],
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object, 
        resolveBorderColor:Function 
    },
    setup(props, { emit }) {
        const client = useClient()
        const { bytes } = useFormatters()
        /** @type {Store} */
        const store = inject('store')

        /** @type {Ref<AlbumResult[]>} */
        const creativeAlbums = ref([])
        /** @type {ComputedRef<AlbumResult[]>} */
        const artifactAlbums = computed(() => creativeAlbums.value.filter(x => x.artifactIds.includes(props.artifact.id)))
        const creative = ref()

        /** @param {Artifact} artifact
         *  @param {number} [selectedId] */
        function resolveBorderColor(artifact, selectedId) {
            return props.resolveBorderColor 
                ? props.resolveBorderColor(artifact, selectedId)
                : selectedId && artifact.id === selectedId
                    ? 'border-yellow-300'
                    : store.resolveBorderColor(artifact)
        }

        function navNext(next) {
            const artifacts = store.moderatedArtifacts(creative.value)
            const pos = artifacts.findIndex(x => x.id === props.artifact.id)
            if (pos !== -1) {
                const nextPos = (pos + next) < 0 ? artifacts.length - 1 : (pos + next) % artifacts.length
                const nextArtifact = artifacts[nextPos]
                emit('selected', nextArtifact)
            }
        }
        
        /** @param {KeyboardEvent} e */
        function handleNav(e) {
            if (e.key === 'ArrowLeft') {
                navNext(-1)
            } else if (e.key === 'ArrowRight') {
                navNext(1)
            }
        }

        async function hardDelete() {
            const api = await store.hardDelete(creative.value)
            if (api.succeeded) {
                emit('selected',undefined)
            }
        }
        
        /** @param {String} dialog
         *  @param {Artifact} artifact */
        function open(dialog, artifact) {
            emit('open',dialog,artifact)
        }

        onMounted(async () => {
            await Promise.all([
                (async () => creative.value = await store.getCreative(props.artifact.creativeId))(),
                (async () => creativeAlbums.value = await store.getCreativeInAlbums(props.artifact.creativeId))(),
            ])
            
            document.addEventListener('keydown', handleNav)
        })
        onUnmounted(() => document.removeEventListener('keydown', handleNav))

        return { css, store, creative, artifactAlbums, bytes,
            open, resolveBorderColor, navNext, hardDelete, }
    }
}

export const ArtifactMenuIcon = {
    template:`<div class="px-1 cursor-pointer" @click.stop="$emit('showArtifactMenu', $event, artifact)">
        <svg class="w-5 h-5 text-cyan-600 hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="2.5" r=".75" /><circle cx="8" cy="8" r=".75" /><circle cx="8" cy="13.5" r=".75" /></g>
        </svg>
    </div>`,
    emits:['showArtifactMenu'],
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
    },
}

export const ArtifactLikeIcon = {
    template:`<svg v-if="store.hasLiked(artifact)" @click.prevent.stop="unlikeArtifact(artifact)"
         class="cursor-pointer w-4 h-4 sm:w-6 sm:h-6 text-red-600 hover:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>undo like</title>
        <path fill="currentColor" d="M2 8.4A5.4 5.4 0 0 1 7.5 3A5.991 5.991 0 0 1 12 5a5.991 5.991 0 0 1 4.5-2A5.4 5.4 0 0 1 22 8.4c0 5.356-6.379 9.4-10 12.6C8.387 17.773 2 13.76 2 8.4Z"/>
    </svg>
    <svg v-else @click.prevent.stop="likeArtifact(artifact)"
         class="cursor-pointer w-4 h-4 sm:w-6 sm:h-6 text-cyan-600 hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>like</title>
        <path fill="currentColor" d="M12 21c-.645-.572-1.374-1.167-2.145-1.8h-.01c-2.715-2.22-5.792-4.732-7.151-7.742c-.446-.958-.683-2-.694-3.058A5.39 5.39 0 0 1 7.5 3a6.158 6.158 0 0 1 3.328.983A5.6 5.6 0 0 1 12 5c.344-.39.738-.732 1.173-1.017A6.152 6.152 0 0 1 16.5 3A5.39 5.39 0 0 1 22 8.4a7.422 7.422 0 0 1-.694 3.063c-1.359 3.01-4.435 5.521-7.15 7.737l-.01.008c-.772.629-1.5 1.224-2.145 1.8L12 21ZM7.5 5a3.535 3.535 0 0 0-2.5.992A3.342 3.342 0 0 0 4 8.4c.011.77.186 1.53.512 2.228A12.316 12.316 0 0 0 7.069 14.1c.991 1 2.131 1.968 3.117 2.782c.273.225.551.452.829.679l.175.143c.267.218.543.444.81.666l.013-.012l.006-.005h.006l.009-.007h.01l.018-.015l.041-.033l.007-.006l.011-.008h.006l.009-.008l.664-.545l.174-.143c.281-.229.559-.456.832-.681c.986-.814 2.127-1.781 3.118-2.786a12.298 12.298 0 0 0 2.557-3.471c.332-.704.51-1.472.52-2.25A3.343 3.343 0 0 0 19 6a3.535 3.535 0 0 0-2.5-1a3.988 3.988 0 0 0-2.99 1.311L12 8.051l-1.51-1.74A3.988 3.988 0 0 0 7.5 5Z"/>
    </svg>`,
    emits:['open','changed'],
    props:['artifact'],
    setup(props, { emit }) {
        /** @type {Store} */
        const store = inject('store')
        const { user, hasRole } = useAuth()
        const instance = getCurrentInstance()

        /** @param {Artifact} artifact */
        async function unlikeArtifact(artifact) {
            if (!user.value) {
                emit('open','SignInDialog')
                return
            }
            await store.unlikeArtifact(artifact.id)
            emit('changed')
            instance?.proxy?.$forceUpdate()
        }
        /** @param {Artifact} artifact */
        async function likeArtifact(artifact) {
            if (!user.value) {
                emit('open','SignInDialog')
                return
            }
            await store.likeArtifact(artifact.id)
            emit('changed')
            instance?.proxy?.$forceUpdate()
        }

        return { store, unlikeArtifact, likeArtifact }
    }
}
export const ArtifactExploreIcon = {
    template:`<a class="block" :href="'/?similar=' + artifact.refId">
        <svg class="w-4 h-4 sm:w-6 sm:h-6 text-cyan-600 hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <title>explore similar</title>
                <path d="m11.25 11.25l3 3" /><circle cx="7.5" cy="7.5" r="4.75" />
            </g>
        </svg>
    </a>`,
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
    }
}

export const ArtifactDialogs = {
    template:`<div>
        <SignInDialog v-if="show==='SignInDialog'" @done="$emit('done')"  @signup="show==='SignUpDialog'" />
        <SignUpDialog v-if="show==='SignUpDialog'" @done="$emit('done')"  @signin="show==='SignInDialog'" />
        <NewReport v-if="show==='NewReport'" :artifact="artifact" @done="$emit('done')" />
        <NewAlbum v-if="show==='NewAlbum'" :artifact="artifact" @done="$emit('done')" />
    </div>`,
    emits:['done'],
    props: { 
        show:String,
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object
    },
    setup(props) {
        return { }
    }
}

export const ArtifactGallery = {
    template:`<div>
        <div :class="['grid',store.css.gridClass(store.prefs.artifactGalleryColumns)]">
            <div v-for="artifact in results" :key="artifact.id" :class="[artifact.width > artifact.height ? 'col-span-2' : artifact.height > artifact.width ? 'row-span-2' : '']">
                <div @click="navTo(artifact)" class="flex justify-center">
                    <div class="relative sm:m-2 flex flex-col cursor-pointer items-center" :style="'max-width:' + artifact.width + 'px'"
                         @contextmenu.prevent="$emit('contextmenu',artifact)">
    
                        <ArtifactImage :artifact="artifact" :class="['sm:rounded lg:rounded-xl border sm:border-2', resolveBorderColor(artifact, selected?.id)]" />
    
                        <div class="absolute top-0 left-0 w-full h-full group select-none overflow-hidden sm:rounded lg:rounded-xl border sm:border-2 border-transparent">
                            <div class="w-full h-full absolute inset-0 z-10 block text-zinc-100 drop-shadow pointer-events-none line-clamp sm:px-2 sm:pb-2 text-sm opacity-0 group-hover:opacity-40 transition duration-300 ease-in-out bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
    
                            <div class="absolute w-full h-full flex z-10 text-zinc-100 justify-between drop-shadow opacity-0 group-hover:opacity-100 transition-opacity sm:mb-1 text-sm">
                                <div class="relative w-full h-full overflow-hidden flex flex-col justify-between overflow-hidden">

                                    <slot name="icons" v-bind="artifact"><div></div></slot>
    
                                    <div v-if="store.isArtifactResult(artifact)" class="hidden sm:flex bg-black/40 sm:pt-2 sm:pl-4 sm:pb-4 sm:pr-4 w-full">
                                        <div class="w-full">
                                            <h2 class="truncate text-base font-medium text-gray-900 dark:text-gray-200">{{ artifact.userPrompt }}</h2>
                                            <div class="mt-1">
                                                <p v-if="artifact.modifierNames?.length" class="truncate text-xs text-gray-500">
                                                    {{ artifact.modifierNames.join(', ') }}
                                                </p>
                                                <p v-if="artifact.artistNames?.length" class="truncate text-xs text-gray-500">
                                                    by {{ artifact.artistNames.join(', ') }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else></div>
                                </div>
                            </div>
                        </div>
                        <slot v-if="!active" name="contextmenu" v-bind="artifact"></slot>
                    </div>
                </div>
            </div>
        </div>
        <ArtifactModal v-if="creative && active" :artifact="active" @selected="navTo" @done="modalClose" @changed="$emit('changed')" @open="open" @contextmenu="$emit('contextmenu',$event)">
            <template v-if="$slots.icons" #icons="context">
              <slot name="icons" v-bind="context"></slot>
            </template>
            <template v-if="$slots.contextmenu" #contextmenu="context">
              <slot name="contextmenu" v-bind="context"></slot>
            </template>
        </ArtifactModal>
    </div>`,
    emits:['changed','contextmenu','open'],
    props: { results:Array, resolveBorderColor:Function },
    setup(props, { emit, expose }) {
        const client = useClient()
        /** @type {Store} */
        const store = inject('store')
        const { user, hasRole } = useAuth()
        const { pushState } = useUtils()
        const instance = getCurrentInstance()
        
        const selected = ref()
        const viewing = ref()

        const active = computed(() => viewing.value || selected.value)
        const apiCreative = ref(new ApiResult())
        const creative = computed(() => apiCreative.value.response?.results?.[0])
        
        function forceUpdate() {
            console.log('ArtifactGallery.forceUpdate()')
            instance?.proxy?.$forceUpdate()
        }
        expose({ forceUpdate })
        function notifyChanged() {
            console.log('ArtifactGallery.notifyChanged')
            emit('changed')
        }
        
        /** @param {Artifact} artifact */
        function navTo(artifact) {
            const args = artifact ? { view: artifact.id } : undefined
            selected.value = artifact 
            pushState(args)
        }
        
        function modalClose() {
            selected.value = null
            viewing.value = null
            pushState({ view:undefined, artifactId:undefined })
        }
        
        /** @param {Artifact} artifact
         *  @param {number} [selectedId] */
        function resolveBorderColor(artifact, selectedId) {
            return props.resolveBorderColor
                ? props.resolveBorderColor(artifact, selectedId)
                : selectedId && artifact.id === selectedId
                    ? 'border-yellow-300'
                    : store.resolveBorderColor(artifact)
        }
        
        function open(dialog,artifact) {
            emit('open',dialog,artifact)
        }
        
        watch([selected], async () => {
            apiCreative.value = selected.value
                ? await client.api(new QueryCreatives({ id: selected.value.creativeId }))
                : new ApiResult()
            if (selected.value) {
                await store.getCreativeInAlbums(selected.value.creativeId)
            }
        })
        
        onMounted(async () => {
            const qs = queryString(location.search)
            if (qs.view) {
                const api = await client.api(new QueryArtifacts({ id: qs.view }))
                if (api.succeeded) {
                    selected.value = api.response.results[0]
                }
            }
        })

        return { 
            store, selected, creative, viewing, active,
            navTo, modalClose, notifyChanged, resolveBorderColor, open,
        }
    }
}
