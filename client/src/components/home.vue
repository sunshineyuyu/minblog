<template>
  <div class="hello">
      <div>this is a test</div>
    <div class="menu">
      <div @click="goTo('/login')">登录</div>
      <div @click="goTo('/register')">注册</div>
      <div @click="goTo('/detail')">详情</div>
      <div @click="goTo('/write')">发表</div>
    </div>
    <div class="content">
      <div class="item" v-for="item in list" @click="goTo(`/detail/${item.id}`)">
        <div>{{item.title}}</div>
        <div>
          <span>{{item.author}}</span>
          <span>{{item.time}}</span>
        </div>
        <div>{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      list:null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    goTo(url) {
      this.$router.push({path: url});
    },
    getList() {
      axios
        .get(`/getList`)
        .then((res) => {
          this.list = res.data.data;
        });
    }
  },
  created(){
    this.getList();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom: 1px solid #757575;
}
.menu div {
  padding: 10px 20px;
  cursor: pointer;
}
.item {
  border: 1px solid #757575;
  padding: 10px;
  text-align: left;
}
</style>
