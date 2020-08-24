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
            <td data-label="index">{{index + 1}}</td>
            <td data-label="title">{{note.title}}</td>
            <td data-label="Tasks">
              <ul v-for="todo of note.body.slice(0, 3)" :key="todo.taskId">
                <li class="todo-body">{{todo.taskBody}}</li>
              </ul>
            </td>
            <td data-label="edit">
              <router-link
                tag="button"
                :to="'/task/' + note.id"
                class="btn-edit btn-text-action btn change-task-button"
              >Edit</router-link>
            </td>
            <td data-label="remove">
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
.container {
  position: relative;
}

.notes-container {
  width: 70%;
  margin: 0 auto;
  padding: 50px 0;
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

.todo-body {
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
}

@media screen and (max-width: 1024px) {
  table {
    border: 0;
    padding-bottom: 0;
  }
  table thead {
    display: none;
  }
  table tr {
    margin-bottom: 10px;
    display: block;
    border-bottom: 2px solid #ddd;
    margin-bottom: 50px;
  }
  .todo-body {
    width: auto;
  }
  table td {
    display: block;
    text-align: right;
    border-bottom: 1px dotted #ccc;
    border-right: 1px solid transparent;
  }
  table td:last-child {
    border-bottom: 0;
  }
  table td:before {
    content: attr(data-label);
    padding-right: 50px;
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
}

@media screen and (max-width: 768px) {
  .notes-container {
    width: 90%;
  }
}
</style>