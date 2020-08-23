<template>
  <div class="card">
    <h1>Creat new task</h1>
    <form @submit.prevent="createNote">
      <div class="form-content">
        <input type="text" placeholder="Title" v-model="title" />
        <div v-if="body.length !== 0" class="todo-body">
          <div v-for="todo of body" :key="todo.taskId" class="todo-body-container">
            <div>{{todo.taskBody}}</div>
            <button
              type="button"
              :id="todo.taskId"
              class="btn-delete btn-symbol-action remove-todo-button"
              @click="removeToDo"
            >&times;</button>
          </div>
        </div>
        <div class="input-filed">
          <input type="text" placeholder="Task" v-model="taskBody" @blur="addToDo"/>
        </div>
      </div>
      <div class="form-action">
        <button type="submit" class="btn-create btn-text-action save-changes-button">Save note</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "",
    body: [],
    taskBody: "",
  }),

  methods: {
    createNote() {
      if (!this.title || this.body.length === 0) {
        return;
      }
      const note = {
        id: +Date.now(),
        title: this.title,
        body: this.body,
      };
      this.$store.dispatch("createNote", note);
      this.$router.push("/");
    },
    addToDo() {
      if (!this.taskBody) {
        return;
      }
      const todo = {
        taskId: this.body.length + 1,
        taskBody: this.taskBody,
        completed: false,
      };
      this.taskBody = "";
      return this.body.push(todo);
    },
    removeToDo() {
      const id = +event.target.id;
      const index = this.body.findIndex((todo) => todo.taskId === id);
      if (index === -1) {
        alert("index has't found");
        return;
      }
      this.body.splice(index, 1);
    },
  },
};
</script>

<style lang='scss' scoped>
.card {
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
  padding: 30px 0;
}

.todo-body {
  display: flex;
  flex-direction: column;
}

.todo-body-container {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
}

input {
  width: 40%;
}

.input-filed input {
  width: 50%;
}

.form-action {
  display: flex;
  padding: 20px 0;
}

</style>