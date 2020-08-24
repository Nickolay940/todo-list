<template>
  <div class="card">
    <h1>Creat new task</h1>
    <form @submit.prevent="createNote">
      <div class="form-content">
        <input type="text" placeholder="Title" v-model="title" />
        <div v-if="body.length !== 0" class="todo-body">
          <div v-for="todo of body" :key="todo.taskId" class="todo-body-container">
            <div class="todo-body-wrap">{{todo.taskBody}}</div>
            <button
              type="button"
              :id="todo.taskId"
              class="btn-delete btn-symbol-action remove-todo-button"
              @click="removeToDo"
            >&times;</button>
          </div>
        </div>
        <div class="input-filed">
          <input type="text" placeholder="Task" v-model="taskBody" maxlength="50"/>
          <button type="button" class="btn-create btn-symbol-action save-changes-button" @click="addToDo">&plus;</button>
        </div>
      </div>
      <div class="form-action">
        <button type="submit" class="btn-create btn-text-action">Save note</button>
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
        disabled: false,
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
  align-items: center;
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
  align-items: center;
  padding-top: 30px;
}

.todo-body-wrap {
  max-width: 300px;
  height: 100%;
  word-break: break-all;
}

.form-action {
  display: flex;
  padding: 20px 0;
}

@media screen and (max-width: 768px) {
  .input-filed {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-filed .btn-create {
    margin-top: 30px;
  }
}

@media screen and (max-width: 468px) {
  .card {
    width: 90%
  }
}

</style>