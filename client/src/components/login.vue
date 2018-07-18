<template>
	<div class="register">
    <div>
      姓名： <input type="text" name="username" v-model="name" autocomplete="off">
    </div>
    <div>
      密码： <input type="text" name="pwd" v-model="pwd">
    </div>
    <div>
      <button @click="regist()">登录</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      pwd: '',
    }
  },
  methods: {
    regist() {
      var data = {
        name: this.name,
        pwd: this.pwd,
      }
      axios
        .get(`/login/?name=${this.name}&pwd=${this.pwd}`)
        .then((res) => {
          console.log(res.data);
          this.$router.push({path: '/write'});
        });
    },
  },
}
</script>

