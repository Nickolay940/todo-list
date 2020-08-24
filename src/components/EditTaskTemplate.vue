<template>
  <div class="container">
    <div class="card" @change="changeStatePoint = !changeStatePoint">
      <h1>{{note.title}}</h1>
      <form @submit.prevent="saveChanges">
        <div class="form-content" :class="{'disabled': disable}">
          <div class="input-filed" v-for="todo of note.body" :key="todo.taskId">
            <input type="text" v-model="todo.taskBody" />
            <div class="input-actions">
              <input v-if="!todo.completed" type="checkbox" :id="todo.taskId" @change="checked" />
              <span v-else>&check;</span>
              <button
                type="button"
                :id="todo.taskId"
                class="btn-delete btn-symbol-action"
                @click="removeToDo"
              >&times;</button>
            </div>
          </div>
          <div v-if="addToDoInputField" class="creation-input-field">
            <input type="text" placeholder="Task" v-model="taskBody" @blur="addToDo" />
          </div>
        </div>
        <button
          type="button"
          class="btn-create btn-symbol-action"
          @click="addToDoInputField = true"
        >&plus;</button>
        <hr />
        <div class="form-action">
          <button type="submit" class="btn-create btn-text-action">Save Changes</button>
          <button
            type="button"
            class="btn-cancel btn-text-action"
            @click="cancelChanges"
          >Cancel Changes</button>
          <button
            type="button"
            :id="note.id"
            class="btn-delete btn-text-action"
            @click="showWindow"
          >Delete Note</button>
        </div>
      </form>
      <button type="button" class="btn-edit btn-text-action" @click="disableEditing">Disable editing</button>
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
    confirmation: false,
    confirmBody: `Do you realy whant to delete this note?`,
    addToDoInputField: false,
    taskBody: "",
    note: null,
    basicNote: null,
    stateArr: [],
    changeStatePoint: false,
    disable: '',
  }),

  components: {
    DialogConfirmWindow,
  },

  computed: {
    getNote() {
      return this.$store.getters.noteById(+this.$route.params.id);
    },
  },

  created: function () {
    this.basicNote = JSON.parse(JSON.stringify(this.getNote));
    this.note = JSON.parse(JSON.stringify(this.getNote));
    this.disable = this.note.disabled;
  },

  methods: {
    saveChanges() {
      this.$store.dispatch("updateToDo", this.note);
      this.$router.push("/");
    },
    checked() {
      const id = +event.target.id;
      this.note.body.find(
        (todo) => todo.taskId === id
      ).completed = !this.note.body.find((todo) => todo.taskId === id)
        .completed;
    },
    cancelChanges() {
      if (this.stateArr.length > 1) {
        this.stateArr.splice(-1, 1);
        let obj = this.stateArr[this.stateArr.length - 1];
        this.note = JSON.parse(JSON.stringify(obj));
      } else {
        this.note = JSON.parse(JSON.stringify(this.basicNote));
        return
      }
    },
    showWindow() {
      this.showConfirmWindow = true;
      this.index = this.$store.getters.notes.findIndex(
        (note) => note.id == event.target.id
      );
    },
    isConfirmed(value) {
      this.confirmation = value;
      this.showConfirmWindow = false;
    },
    removeToDo() {
      const id = +event.target.id;
      const index = this.note.body.findIndex((todo) => todo.taskId === id);
      if (this.note.body.length === 1) {
        this.showWindow();
      } else {
        this.note.body.splice(index, 1);
      }
    },
    removeNote() {
      if (this.confirmation) {
        this.$store.dispatch("removeNote", this.index);
      }
      this.confirmation = false;
      this.$router.push("/");
    },
    addToDo() {
      if (!this.taskBody) {
        return;
      }
      const todo = {
        taskId: this.note.body.length + 1,
        taskBody: this.taskBody,
        completed: false,
      };
      this.taskBody = "";
      this.addToDoInputField = false;
      return this.note.body.push(todo);
    },
    saveCurrentState() {
      setTimeout(() => {
        this.stateArr.push(JSON.parse(JSON.stringify(this.note)));
      }, 0)
    },
    disableEditing() {
      this.note.disabled = !this.note.disabled
      this.disable = this.note.disabled
    }
  },

  watch: {
    confirmation: "removeNote",
    changeStatePoint: "saveCurrentState",
  },
};
</script>

<style lang='scss' scoped>
.card {
  position: relative;
  width: 50%;
  margin: 0 auto;
  padding: 20px 0;
}

h1 {
  padding-bottom: 20px;
}

.input-filed {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
}

hr {
  margin: 50px 0;
}

.form-action {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
}

.creation-input-field {
  display: flex;
  justify-content: space-between;
}

.input-actions {
  width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.creation-input-field {
  padding-bottom: 20px;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}

@media all and (max-width: 1024px) {
  .card {
    width: 80%;
  }
}

@media all and (max-width: 468px) {
  .card {
    width: 95%;
  }
}
</style>