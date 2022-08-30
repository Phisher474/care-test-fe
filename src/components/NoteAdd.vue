<script setup>
import { reactive, onUpdated, computed } from "vue";
import { useNoteStore } from "../stores/note";
const store = useNoteStore();
const editValues = computed(() => store?.editNote);

const note = reactive({
  title: "",
  desc: "",
});

const addNote = function () {
  if (note.title && note.desc) {
    const newNote = {
      ...note,
      id: Date.now(),
      time: new Date(),
    };

    store.addNote(newNote);
    note.title = "";
    note.desc = "";
  } else {
    alert("Please fill in all fields");
  }
};
const editNote = function () {
  const newNote = {
    ...note,
  };
  store.updateExistingNote(newNote);
  note.title = "";
  note.desc = "";
};

store.$subscribe((mutation, state) => {
  if (mutation.events.key === "editNote" && mutation.events.newValue !== null) {
      note.title = mutation.events.newValue.title;
      note.desc = mutation.events.newValue.desc;
  }
})

</script>
<template>
  <form @submit.prevent="editNote" de v-if="editValues">
    <div class="input-container">
      <input
        type="text"
        class="form-control"
        placeholder="Title for note"
        v-model="note.title"
      />
      <textarea
        class="form-control"
        placeholder="Description for note"
        spellcheck="false"
        v-model="note.desc"
      ></textarea>
      <button type="submit" class="btn">Edit Note</button>
    </div>
  </form>

  <form @submit.prevent="addNote" de v-else>
    <div class="input-container">
      <input
        type="text"
        placeholder="Title"
        v-model="note.title"
      />
      <input
        type="text"
        placeholder="Description"
        spellcheck="false"
        v-model="note.desc"
      />
      <button type="submit" class="btn">Add Note</button>
    </div>
  </form>
</template>

<style lang="scss">
.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
input[type="text"],
textarea {
  width: 250px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
.btn {
  border-radius: 5px;
  padding:8px;
  border: 0px;
  color:white;
  background-image: linear-gradient(to bottom right, #00bfad, #99a3d4);
}
</style>
