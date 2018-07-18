<template>
	<div class="register">
    <div>
     	文章标题： <input type="text" name="title" v-model="title" autocomplete="off">
    </div>
    <div>
      文章内容：
      <textarea type="text" name="pwd" v-model="content"></textarea>
    </div>
    <div>
      <button @click="regist()">发布</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    regist() {
      const time = new Date().getTime();
      axios
        .post(`/write/?title=${this.title}&content=${this.content}&time=${time}`)
        .then((res) => {
          console.log(res.data);
        });
    },
  },
}
</script>


