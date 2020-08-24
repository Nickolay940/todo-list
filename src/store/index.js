import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes') || '[]')
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note);
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    updateToDo(state, {id, body, disabled}) {
      const notes = state.notes.concat();
      const index = notes.findIndex(note => note.id === id);
      const note = notes[index]

      notes[index] = { ...note, body, disabled}
      state.notes = notes
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    removeNote(state, index) {
      const notes = state.notes.concat();
      notes.splice(index, 1);

      state.notes = notes
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
  },
  actions: {
    createNote({commit}, note) {
      commit('createNote', note)
    },
    updateToDo({commit}, note) {
      commit('updateToDo', note)
    },
    removeNote({commit}, index) {
      commit('removeNote', index)
    },
  },
  getters: {
    notes: (s) => s.notes,
    noteById: (s) => (id) => s.notes.find((note) => note.id === id),
  },
  modules: {},
});
