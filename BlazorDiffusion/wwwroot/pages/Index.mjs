import { ref, inject, onMounted, onUnmounted, getCurrentInstance, nextTick } from "vue"
import { ApiResult, queryString, pick, map } from "@servicestack/client"
import { useClient, useUtils } from "@servicestack/vue"
import { SearchArtifacts, AnonData, QueryArtifacts } from "dtos.mjs"

export default {
    template: `
    <div class="mx-auto px-6 lg:px-8">
        <div class="mb-10 mx-auto max-w-2xl text-center">
            <h1 class="max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">Stable Diffusion Search</h1>
            <form v-on:submit.prevent="update" class="mt-4 sm:mt-8 text-lg mx-auto max-w-lg flex justify-center">
                <text-input id="query" type="search" v-model="request.query" class="bg-transparent h-8 w-96" label="" placeholder="Search existing images"></text-input>
            </form>
        </div>

        <div class="flex">
            <div class="flex flex-col flex-shrink">
                <div class="z-10 flex-shrink sm:mr-2">
                    <div v-if="topAlbums.length" :key="renderKey" class="flex flex-col -ml-6 sm:-ml-4 -mt-5 sm:-mt-8 pt-1 sm:pt-2 justify-center items-center">
                        <div class="-mt-1 sm:mt-0 text-xs sm:text-sm text-gray-500 whitespace-nowrap w-16 sm:w-24 text-center pb-1">top albums</div>
                        <a :key="album.slug" v-for="album in topAlbums" :href="'/albums/' + album.slug">
                            <div :class="['sm:mt-2 hover:opacity-80 cursor-pointer h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded sm:rounded-lg border-2',
                                          album === album.albumRef ? 'border-yellow-400' : 'border-transparent']">
                                <artifact-image :artifact="store.albumCover(album)" class="flex w-full h-full" image-class="object-cover"></artifact-image>
                            </div>
                        </a>
                        <a href="/albums/" to="/albums" class="text-xs sm:text-sm text-gray-500 dark:hover:text-gray-300 whitespace-nowrap w-16 sm:w-24 text-center pb-1">more</a>
                    </div>
                </div>
            </div>
            <div v-cloak>
                <h3 v-if="title" class="text-xl absolute -mt-8 ml-4">{{title}}</h3>
                <artifact-gallery ref="gallery" :results="results" v-on:contextmenu="artifactMenu=$event" v-on:open="openDialog">
                    <template #icons="artifact">
                        <div class="p-2 relative w-full h-full overflow-hidden flex flex-col justify-between overflow-hidden">
                            <div class="flex flex-col h-full justify-between">
                                <div class="flex justify-between flex-none">
                                    <artifact-like-icon :artifact="artifact" v-on:changed="update" v-on:open="openDialog"></artifact-like-icon>
                                    <artifact-menu-icon :artifact="artifact" v-on:show-artifact-menu="artifactMenu=artifact" v-on:open="open"></artifact-menu-icon>
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
        <div class="mt-12 flex justify-center">
            <loading v-if="loadingMore" class="text-gray-400">loading...</loading>
            <span ref="bottom"></span>
        </div>
        <artifact-dialogs :show="open" :artifact="activeArtifact" v-on:done="closeDialog"></artifact-dialogs>
    </div>
    `,
    setup() {
        const store = inject('store')
        const client = useClient()
        const { pushState } = useUtils()
        const results = ref([])
        const api = ref(new ApiResult())
        const topAlbums = ref([])
        const renderKey = ref(1)
        const request = ref(new SearchArtifacts({
            query: '',
            skip: 0,
            take: 50
        }))
        const gallery = ref()
        const bottom = ref()
        const loadingMore = ref(false)
        let hasMore = false
        const title = ref('')

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
        function forceUpdate() { instance?.proxy?.$forceUpdate() }

        async function update() {
            request.value.skip = 0
            request.value.take = 50
            // clear existing search params
            let args = Object.assign(Object.keys(queryString(location.search)).reduce((acc, x) => { acc[x] = undefined; return acc }, {}),
                { query: request.value.query || undefined })
            pushState(args)
            api.value = await client.api(request.value)
            if (api.value.succeeded) {
                results.value = api.value.response?.results || []
                hasMore = results.value.length === request.value.take
            }
        }

        async function loadMore() {
            //console.log('load more...', hasMore)
            if (hasMore) {
                request.value.skip += request.value.take
                request.value.take = 100
                loadingMore.value = true
                api.value = await client.api(request.value)
                loadingMore.value = false
                if (api.value.succeeded) {
                    const moreResults = api.value.response?.results || []
                    results.value.push(...moreResults)
                    hasMore = moreResults.length === request.value.take
                }
            }
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
            console.log('Index.onMounted')
            const qs = queryString(location.search)
            const requestArgs = pick(qs, ['query', 'similar', 'by', 'user', 'modifier', 'artist', 'album'])
            Object.assign(request.value, requestArgs)

            //store.events.subscribe('userData', () => results.value = results.value.map(x => x)) // force update

            await Promise.all([
                client.swr(request.value, r => {
                    api.value = r
                    results.value = r.response?.results || []
                    hasMore = results.value.length === request.value.take
                }),
                client.swr(new AnonData(), async api => {
                    const albums = api.response?.topAlbums || []
                    const albumIds = albums.map(store.getAlbumCoverArtifactId)
                    if (albumIds.length > 0)
                        await client.swr(new QueryArtifacts({ ids: albumIds }),
                            api => {
                                store.loadArtifacts(api.response?.results)
                                topAlbums.value = Array.from(albums)
                            })
                    topAlbums.value = albums
                }),
            ])
            if (request.value.album) {
                title.value = store.albumRefsMap[request.value.album]?.name || ''
            } else if (request.value.user) {
                await store.loadUserByRef(request.value.user)
                title.value = map(store.userRefsMap[request.value.user]?.handle, x => `@${x}`) || ''
            }
            renderKey.value++

            setTimeout(initObserver, 1000)
        })
        onUnmounted(() => {
            try {
                observer?.unobserve()
            } catch (e) { console.log(e.message) }
        })

        return {
            store, request, api, renderKey, topAlbums, results, update, bottom, loadingMore, title, gallery,
            artifactMenu, activeArtifact, open, openDialog, closeDialog, notifyChanged,
        }
    }
}
