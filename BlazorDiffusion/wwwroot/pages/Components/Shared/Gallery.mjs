import { ref, inject, getCurrentInstance } from "vue"
import { mount } from "app.mjs"
import { Store } from "store.mjs"

export default {
    setup() {
        const store = inject('store')
        const artifact = ref()

        async function loadArtifact(id) {
            artifact.value = await store.getArtifact(id)
        }
        function showArtifact(a) {
            artifact.value = a
        }

        const instance = getCurrentInstance()
        const artifactMenu = ref()
        const open = ref('')
        function openDialog(dialog, artifact) {
            artifactMenu.value = null
            open.value = dialog
            //artifact.value = artifact
        }
        function closeDialog() {
            open.value = ''
            //artifact.value = null
        }
        function notifyChanged() {
            artifactMenu.value = null
            forceUpdate()
            update()
        }
        function update() { }
        function forceUpdate() { instance?.proxy?.$forceUpdate() }

        return {
            store, artifact, loadArtifact, showArtifact,
            artifactMenu, open, openDialog, closeDialog, notifyChanged, update
        }
    }
}
