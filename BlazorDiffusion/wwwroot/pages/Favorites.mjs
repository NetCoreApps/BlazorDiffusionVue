import { ref, inject, onMounted, onUnmounted, computed, getCurrentInstance, nextTick, watchEffect } from "vue"
import { ApiResult, queryString, pick, map } from "@servicestack/client"
import { useClient, useAuth, useUtils } from "@servicestack/vue"
import { mount } from "app.mjs"
import { Store } from "store.mjs"
import { SearchArtifacts, AnonData, QueryArtifacts, UpdateAlbum, UpdateUserProfile } from "dtos.mjs" 
import { UserData } from "../mjs/dtos.mjs"


const EditProfileDialog = {
    template: `<ModalDialog sizeClass="sm:max-w-prose sm:w-full" v-on:done="done">
        <form class="" v-on:submit.prevent="submit">
            <div class="shadow overflow-hidden sm:rounded-md bg-white dark:bg-black">
                <div class="relative px-4 py-5 sm:p-6">
                    <fieldset>
                        <legend class="text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4">Edit Profile</legend>
                        <ErrorSummary except="displayName,avatar,handle" />
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                                <TextInput id="displayName" v-model="request.displayName" help="What should we call you? (Private)" spellcheck="false" />
                            </div>
                            <div class="col-span-6 pr-8">
                                <FileInput id="avatar" v-model="request.avatar" />
                            </div>
                            <div class="col-span-6">
                                <TextInput id="handle" v-model="request.handle" help="Public visible username for your profile" pattern="^[A-Za-z0-9_]+" placeholder="@" spellcheck="false" />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right sm:px-6">
                    <div class="flex justify-end items-center">
                        <SecondaryButton class="mr-2" v-on:click="done">Cancel</SecondaryButton>
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </div>
                </div>
            </div>
        </form>
    </ModalDialog>`,
    emits: ['done'],
    setup(props, { emit }) {
        const store = inject('store')
        const client = useClient()

        const request = ref(new UpdateUserProfile(store.userData.profile))

        async function submit(e) {
            const api = await client.apiForm(new UpdateUserProfile(), new FormData(e.target))
            if (api.succeeded) {
                store.userData.profile = api.response
                Object.assign(store.userData.user, api.response)
                done()
            }
        }
        function done() {
            emit('done')
        }

        return { store, request, submit, done }
    }
}

const PinAlbumIcon = {
    template: `<svg v-if="album.primaryArtifactId === artifact.id" v-on:click.stop="unpinArtifact"
        class="w-4 h-4 sm:w-6 sm:h-6 text-cyan-600 hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <title>unpin</title>
        <path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z"/>
    </svg>
    <svg v-else v-on:click.stop="pinArtifact"
        class="w-4 h-4 sm:w-6 sm:h-6 text-cyan-600 hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>pin as cover image</title>
        <path fill="currentColor" d="M18.27 9.81h-2.82L9.77 4.13l.71-.71l-1.42-1.41l-7.07 7.07l1.42 1.41l.71-.71l5.67 5.68h-.01v2.83l1.42 1.42l3.54-3.55l4.77 4.77l1.41-1.41l-4.77-4.77l3.53-3.53l-1.41-1.41z"/>
    </svg>`,
    emits: ['changed'],
    props: {
        /** @type {import('vue').PropType<Album>} */
        album: Object,
        /** @type {import('vue').PropType<Artifact>} */
        artifact: Object,
    },
    setup(props, { emit }) {
        const client = useClient()

        async function unpinArtifact() {
            const hold = props.album.primaryArtifactId
            store.updateAlbumPrimaryArtifact(props.album.id, null)
            emit('changed', props.album)

            const api = await client.api(new UpdateAlbum({ id: props.album.id, primaryArtifactId: props.artifact.id, unpinPrimaryArtifact: true }))
            if (!api.succeeded) {
                store.updateAlbumPrimaryArtifact(props.album.id, hold)
            }
            emit('changed', api.response)
        }
        async function pinArtifact() {
            const hold = props.album.primaryArtifactId
            store.updateAlbumPrimaryArtifact(props.album.id, props.artifact.id)
            emit('changed', props.album)

            const api = await client.api(new UpdateAlbum({ id: props.album.id, primaryArtifactId: props.artifact.id }))
            if (!api.succeeded) {
                store.updateAlbumPrimaryArtifact(props.album.id, hold)
            }
            emit('changed', api.response)
            document.documentElement.scrollIntoView({ behavior: "smooth" })
        }

        return { unpinArtifact, pinArtifact }
    }
}


export default {
    template: `
    <div>
        <div v-if="user" class="flex mt-3">
            <div class="z-10 flex-shrink mr-1 sm:mr-2">
                <div class="ml-2 flex flex-col sm:-mt-8 justify-center items-center">
                    <div class="mb-2">
                        <a v-on:click.prevent="navTo({ album: undefined })" href="/favorites">
                            <svg :class="['h-16 w-16 sm:h-24 sm:w-24', selectedAlbum == null ? 'text-red-600 hover:text-red-400' : 'text-cyan-600 hover:text-cyan-400 cursor-pointer']"
                                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4.244 12.252a4.25 4.25 0 1 1 6.697-5.111h1.118a4.25 4.25 0 1 1 6.697 5.111L11.5 19.51l-7.256-7.257Zm15.218.71A5.25 5.25 0 1 0 11.5 6.167a5.25 5.25 0 1 0-7.962 6.795l7.962 7.961l7.962-7.96Z" />
                            </svg>
                        </a>
                    </div>

                    <a v-for="album in store.userAlbums" v-on:click.prevent="navTo({ album: album.id })" :href="'/favorites?album='+album.id">
                        <div :class="['sm:mt-2 hover:opacity-80 cursor-pointer h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded sm:rounded-lg border-2',
                                        selectedAlbum?.id === album.id ? 'border-yellow-400' : 'border-transparent']">
                            <artifact-image :artifact="store.albumCover(album)" class="flex w-full h-full" image-class="object-cover"></artifact-image>
                        </div>
                    </a>
                </div>
            </div>

            <div class="flex-grow mt-2">
                <div v-if="selectedAlbum">
                    <div class="flex justify-between">
                        <div class="w-full sm:w-1/3 sm:pl-2 flex justify-center sm:justify-start items-center whitespace-nowrap">
                            <album-title class="-ml-16 sm:ml-0" :album="selectedAlbum"></album-title>
                        </div>
                        <div class="z-10 w-full sm:w-1/3 pr-2 -mt-20 flex justify-end">
                                <div class="flex flex-col mb-1 items-center">
                                    <a v-if="store.userData" class="mb-2" :href="store.searchByCurrentUserUrl">
                                        <avatar-image :key="renderKey" class="h-16 w-16 sm:h-24 sm:w-24 p-1" :user="store.userData.profile"></avatar-image>
                                    </a>
                                    <secondary-button v-on:click="showProfileModal=!showProfileModal">Edit Profile</secondary-button>
                                </div>
                        </div>
                    </div>
                    <artifact-gallery :key="renderKey" ref="gallery" :results="results" :resolve-border-color="albumBorderColor" v-on:changed="onGalleryChange" v-on:contextmenu="artifactMenu=$event">
                        <template #icons="artifact">
                            <div v-if="artifact" class="p-2 relative w-full h-full overflow-hidden flex flex-col justify-between overflow-hidden">
                                <div class="flex flex-col h-full justify-between">
                                    <div class="flex justify-between flex-none">
                                        <pin-album-icon :album="selectedAlbum" :artifact="artifact" v-on:changed="update"></pin-album-icon>
                                        <artifact-menu-icon :artifact="artifact" v-on:show-artifact-menu="artifactMenu=artifact"></artifact-menu-icon>
                                    </div>
                                    <artifact-like-icon :artifact="artifact" v-on:changed="update"></artifact-like-icon>
                                </div>
                            </div>
                        </template>
                        <template #contextmenu="artifact">
                            <artifact-menu v-if="artifact && artifactMenu?.id === artifact.id" :artifact="artifactMenu" menu-class="justify-end"
                                            v-on:changed="notifyChanged" v-on:done="artifactMenu=null" v-on:open="openDialog">
                                <template #topmenu="artifact">
                                    <div v-on:click.stop="moveToTop(artifact)" class="group whitespace-nowrap flex items-center cursor-pointer text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        <svg class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 21V10.8l-2.6 2.6L7 12l5-5l5 5l-1.4 1.4l-2.6-2.6V21ZM4 5V3h16v2Z"/></svg>
                                        Move to Top
                                    </div>
                                </template>
                            </artifact-menu>
                        </template>
                    </artifact-gallery>
                </div>
                <div v-else>
                    <div class="flex justify-between">
                        <div class="w-full sm:w-1/3 sm:pl-2 flex justify-center sm:justify-start items-center whitespace-nowrap">
                            <div class="text-xl -ml-16 sm:ml-0">Likes</div>
                        </div>
                        <div class="z-10 w-full sm:w-1/3 pr-2 -mt-20 flex justify-end">
                            <div class="flex flex-col mb-1 items-center">
                                <a v-if="store.userData" class="mb-2" :href="store.searchByCurrentUserUrl">
                                    <avatar-image class="h-16 w-16 sm:h-24 sm:w-24 p-1" :user="store.userData.profile"></avatar-image>
                                </a>
                                <secondary-button v-on:click="showProfileModal=!showProfileModal">Edit Profile</secondary-button>
                            </div>
                        </div>
                    </div>
                    <artifact-gallery :key="renderKey" ref="gallery" :results="results" :resolve-border-color="likesBorderColor" v-on:changed="onGalleryChange" v-on:contextmenu="artifactMenu=$event">
                        <template #icons="artifact">
                            <div class="p-2 relative w-full h-full overflow-hidden flex flex-col justify-between overflow-hidden">
                                <div class="flex flex-col h-full justify-between">
                                    <div class="flex justify-between flex-none">
                                        <artifact-like-icon :artifact="artifact" v-on:changed="update"></artifact-like-icon>
                                        <artifact-menu-icon :artifact="artifact" v-on:show-artifact-menu="artifactMenu=artifact"></artifact-menu-icon>
                                    </div>
                                    <artifact-explore-icon :artifact="artifact" v-on:changed="update"></artifact-explore-icon>
                                </div>
                            </div>
                        </template>
                        <template #contextmenu="artifact">
                            <artifact-menu v-if="artifactMenu?.id === artifact.id" :artifact="artifactMenu" menu-class="justify-end"
                                            v-on:changed="notifyChanged" v-on:done="artifactMenu=null" v-on:open="openDialog">
                            </artifact-menu>
                        </template>
                    </artifact-gallery>
                </div>
            </div>
        </div>

        <div class="mt-12 flex justify-center">
            <loading v-if="loadingMore" class="text-gray-400">loading...</loading>
            <span ref="bottom"></span>
        </div>
        <edit-profile-dialog v-if="showProfileModal" v-on:done="profileModalDone"></edit-profile-dialog>
        <artifact-dialogs :show="open" :artifact="activeArtifact" v-on:done="closeDialog"></artifact-dialogs>
    </div>
    `,
    components: { EditProfileDialog, PinAlbumIcon },
    setup() {
        console.log('Favorites.setup')
        const store = inject('store')
        const client = useClient()
        const { user } = useAuth()
        const { pushState } = useUtils()

        const gallery = ref()
        const selectedAlbum = ref()
        const results = ref([])
        const showProfileModal = ref(false)
        const renderKey = ref(1)

        const instance = getCurrentInstance()
        const artifactMenu = ref()
        const activeArtifact = ref()
        const open = ref('')
        function openDialog(dialog, artifact) {
            artifactMenu.value = null
            open.value = dialog
            activeArtifact.value = artifact
        }
        function closeDialog() {
            open.value = ''
            activeArtifact.value = null
        }
        function notifyChanged() {
            artifactMenu.value = null
            forceUpdate()
            update()
        }
        function forceUpdate() {
            //renderKey.value++
            instance?.proxy?.$forceUpdate()
        }

        function setResults(items) {
            console.log('setResults', items.length, JSON.stringify(items.map(x => x.id)))
            results.value = items
            forceUpdate()
        }

        function openNewAlbum() { }

        function likesBorderColor(artifact) {
            return store.isModerator && store.isModerated(artifact)
                ? "border-gray-500"
                : store.hasArtifactInAlbum(artifact)
                    ? "border-green-700"
                    : artifact.background != null ? "border-black" : "border-transparent"
        }

        function albumBorderColor(artifact) {
            return selectedAlbum.value.primaryArtifactId === artifact.id
                ? "border-yellow-400"
                : store.isModerator && store.isModerated(artifact)
                    ? "border-gray-500"
                    : store.hasArtifactInAlbum(artifact)
                        ? "border-green-700"
                        : artifact.background != null ? "border-black" : "border-transparent"
        }

        function onGalleryChange() {
            console.log('onGalleryChange')
            update()
        }
        async function profileModalDone() {
            showProfileModal.value = false
            await store.loadUserData()
            forceUpdate()
        }

        const bottom = ref()
        const loadingMore = ref(false)
        let hasMore = ref(false)
        const title = ref('')

        function navTo(args) {
            artifactMenu.value = null
            selectedAlbum.value = args.album && store.userData.user?.albums.find(x => x.id === args.album)
            pushState(args)
            update()
        }

        async function update() {
            const qs = queryString(location.search)
            selectedAlbum.value = qs.album ? store.userData.user?.albums.find(x => x.id === parseInt(qs.album)) : null
            await fetchResults(store.InitialTake)
        }

        async function fetchResults(count) {
            let nextResults = selectedAlbum.value
                ? await store.getAlbumArtifacts(selectedAlbum.value, count)
                : await store.getLikedArtifacts(count)

            hasMore.value = nextResults.length >= count
            setResults(nextResults)
            console.log('fetchResults', selectedAlbum.value || 'likes', count,  hasMore.value, nextResults.length)
        }

        async function loadMore() {
            //console.log('loadMore', selectedAlbum.value || 'likes', hasMore.value, results.value.length)
            if (hasMore.value) {
                await fetchResults(results.value.length + store.NextPage)
            }
        }

        async function moveToTop(artifact) {
            if (selectedAlbum.value.primaryArtifactId !== artifact.id) {
                const api = await client.api(new UpdateAlbum({
                    id: selectedAlbum.value.id,
                    removeArtifactIds: [artifact.id],
                    addArtifactIds: [artifact.id],
                }))
                if (api.succeeded) {
                    store.removeArtifactFromAlbum(selectedAlbum.value, artifact)
                    store.addArtifactToAlbum(selectedAlbum.value, artifact)
                    await store.loadUserData()
                }
            }
            notifyChanged()
        }

        let observer = null
        function initObserver() {
            if (!bottom.value) return
            observer = new IntersectionObserver(
                ([{ isIntersecting, target }]) => {
                    if (isIntersecting) loadMore()
                }, { threshold: 1.0 })
            observer.observe(bottom.value)
        }

        onMounted(async () => {
            console.log('Favorites.onMounted')
            store.loadCached()
            store.loadCachedUserAlbums()
            store.loadCachedUserData()
            update()

            await Promise.all([
                store.swrUserAlbums(),
                store.loadUserData()
            ])


            await update()

            setTimeout(initObserver, 1000)
        })
        onUnmounted(() => {
            try {
                observer?.unobserve()
            } catch (e) { console.log(e.message) }
        })

        return {
            store, renderKey, user, title, selectedAlbum, results, gallery, activeArtifact, hasMore, bottom, loadingMore,
            showProfileModal, artifactMenu, open, openDialog, closeDialog, notifyChanged,
            navTo, update, openNewAlbum, onGalleryChange, likesBorderColor, albumBorderColor, profileModalDone, moveToTop,
        }
    }

}