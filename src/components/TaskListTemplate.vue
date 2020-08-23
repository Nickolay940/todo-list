<template>
  <div class="container">
    <div class="notes-container">
      <h1>Note list</h1>
      <hr />
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Title</th>
            <th>ToDo</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(note, index) of notes" :key="note.index">
            <td>{{index + 1}}</td>
            <td>{{note.title}}</td>
            <td>
              <ul v-for="todo of note.body.slice(0, 3)" :key="todo.taskId">
                <li>{{todo.taskBody}}</li>
              </ul>
            </td>
            <td>
              <router-link
                tag="button"
                :to="'/task/' + note.id"
                class="btn-edit btn-text-action btn change-task-button"
              >Edit</router-link>
            </td>
            <td>
              <button
                :id="note.id"
                class="btn-delete btn-text-action btn remove-task-button"
                @click="showWindow"
              >Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link
        tag="button"
        class="btn-create btn-text-action create-task-button"
        to="/createTask"
      >New task</router-link>
    </div>
    <DialogConfirmWindow
        v-if="showConfirmWindow"
        @confirmation="isConfirmed"
        :confirmBody="confirmBody"
      />
  </div>
</template>

<script>
import DialogConfirmWindow from "@/components/DialogConfirmWindow";

export default {
  data: () => ({
    index: 0,
    showConfirmWindow: false,
    confirmation: "",
    confirmBody: `Do you realy whant to delete this note?`,
  }),

  components: {
    DialogConfirmWindow,
  },

  computed: {
    notes() {
      return this.$store.getters.notes;
    },
  },

  methods: {
    showWindow() {
      this.showConfirmWindow = true;
      this.index = this.$store.getters.notes.findIndex(
        (note) => note.id == event.target.id
      );
    },
    removeNote() {
      if (this.confirmation) {
        this.$store.dispatch("removeNote", this.index);
      }
      this.confirmation = false;
    },
    isConfirmed(value) {
      this.confirmation = value;
      this.showConfirmWindow = false;
    },
  },

  watch: {
    confirmation: "removeNote",
  },
};
</script>

<style lang='scss' scoped>
.notes-container {
  position: relative;
  width: 70%;
  margin: 0 auto;
  padding-top: 30px;
}

table {
  width: 100%;
  padding-bottom: 50px;
}

th {
  text-align: left;
  padding: 20px 0;
}

td {
  padding: 10px 0;
}
</style>