<template>
  <div>
    <div
        v-for="(student,index) in students"
        :key="index"
    >
      <div style="display: flex;flex-direction: row;flex-wrap:nowrap">
        <div style="width: 300px;">
          {{ student.name }}
        </div>
        <button style="margin-right:20px;" @click="deleteStudent(student.id)">Удалить</button>
        <button @click="updateStudent(student.id)">Обновить</button>
      </div>
    </div>
    <div>
      <button @click="addStudent">Добавить студента</button>
    </div>
  </div>
</template>

<script>

import {studentById, studentsTableRef} from './firebase.ts'
import {onValue, push, update, remove} from "firebase/database";

export default {
  name: 'App',
  created() {
    this.initStudents();
  },
  data() {
    return {
      students: []
    };
  },
  components: {},
  methods: {
    initStudents() {
      onValue(studentsTableRef, (snapshot) => {
        if (!snapshot.val()) return this.students = [];
        const data = Object.entries(snapshot.val())
            .filter(x => x[1])
            .map(x => x[1])
        console.log(data);
        this.students = data;
      });
    },
    async addStudent() {
      // Get a key for a new Post.
      const newStudentKey = push(studentsTableRef).key;
      const updates = {};
      updates[newStudentKey] = {id: newStudentKey, name: 'Новый студент'};
      await update(studentsTableRef, updates);
      this.initStudents();
    },
    async updateStudent(id) {
      // Get a key for a new Post.
      const updates = {};
      updates[id] = {id: id, name: 'Обновленный студент'};
      await update(studentsTableRef, updates);
      this.initStudents();
    },
    async deleteStudent(id) {
      await remove(studentById(id));
      this.initStudents();
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
