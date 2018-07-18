<template>
  <div class="hello">
    <div>this is detail</div>
    <div class="content">
      <div class="item" v-if="detailInfo">
        <div>{{detailInfo.title}}</div>
        <div>
          <span>{{detailInfo.author}}</span>
          <span>{{detailInfo.time}}</span>
        </div>
        <div>{{detailInfo.content}}</div>
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
      detailInfo: null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getInfo() {
      axios
        .get(`/articleDetial?id=${this.aid}`)
        .then((res) => {
          this.detailInfo = res.data.data;
        });
    }
  },
  created(){
    this.aid = this.$route.params.aid;
    this.getInfo();
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
