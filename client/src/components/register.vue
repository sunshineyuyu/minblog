<template>
	<div class="register">
    <div>
      姓名： <input type="text" name="username" v-model="name">
    </div>
    <div>
      密码： <input type="text" name="pwd" v-model="pwd">
    </div>
    <div>
      确认密码： <input type="text" name="rpwd" v-model="rpwd">
      <span v-if="!isCommonPwd">确认密码与密码不一致</span>
    </div>
    <div>
      <button @click="regist()">注册</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios';

export default {
  computed: {
    isCommonPwd() {
      return this.pwd.substring(0, this.rpwd.length) === this.rpwd;
    }
  },
  data() {
    return {
      name: '',
      pwd: '',
      rpwd: '',
    }
  },
  methods: {
    regist() {
      if(!this.isCommonPwd) {
        return;
      }
      var data = {
        name: this.name,
        pwd: this.pwd,
      }
      axios
        .post(`/register/?name=${this.name}&pwd=${this.pwd}`)
        .then((res) => {
          console.log(res);
        });
    },
  },
}
</script>
