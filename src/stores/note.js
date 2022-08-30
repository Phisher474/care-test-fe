import { defineStore } from "pinia";

export const useNoteStore = defineStore({
  id: "note",
  state: () => ({
    notes: [],
    editNote: null,
  }),
  getters: {
    filteredNotes: (state) => {
      return state.notes.filter((note) => note.color === state.filterColor);
    },

    getEditItem : (state) => {
      return state.editNote;
    }
  },
  actions: {
    addFromLocalStore(list) {
      this.notes = list;
    },
    addNote(note) {
      if (typeof note === "object") {
        this.notes.push(note);
        let notesFromStore = JSON.parse(localStorage.getItem("notes"))  || []
        notesFromStore.push(note)
        localStorage.setItem("notes", JSON.stringify(notesFromStore));
      }
    },
    removeNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    editValue(note) {
      this.editNote = note 
    },
    updateExistingNote(note) {
      let indexOfSelectedNote = this.notes.findIndex((note) => note.id === this.editNote.id);
      this.notes[indexOfSelectedNote] = {id: this.editNote.id, ...note}
      let notesFromStore = JSON.parse(localStorage.getItem("notes"))  || []
      notesFromStore[indexOfSelectedNote] = {id: this.notes.id, ...note}
      localStorage.setItem("notes", JSON.stringify(notesFromStore));
      this.editNote = null
    }
  },
  computed: {
  },
});
