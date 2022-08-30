<script setup>
import NoteSingle from "./NoteSingle.vue";
import { useNoteStore } from "../stores/note";

import { computed, onMounted } from "vue";
const store = useNoteStore();

const notes = computed(() => store.filteredNotes);

function removeNote(id) {
  if (confirm("Are you sure you want to delete this note?")) {
    store.removeNote(id);
  }
}

function editNote(id) {
    store.editValue(id);
}

onMounted(() => {
  if(localStorage.getItem("notes")?.length){
      store.addFromLocalStore(JSON.parse(localStorage.getItem("notes")))
  }
})

</script>
<template>
  <div class="main-container-list" v-if="notes.length">
    <note-single
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @remove="removeNote"
      @edit="editNote"
    />
  </div>
  <div v-else>
    <p>No notes yet</p>
  </div>
</template>