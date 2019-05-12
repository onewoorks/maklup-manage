<template>
  <div id="login">
    <div class="card">
      <div class="card-body">
        <div v-if="alert.login.show" class="alert alert-danger">{{ alert.login.text }}</div>
        <form @submit.prevent="login">
          <img src="/img/login.jpg" class="mb-3">
          <h2>LOGIN</h2>
          <div class="mb-2">
            <input
              type="text"
              name="username"
              v-model="input.username"
              placeholder="Username"
              class="form-control text-center"
            >
          </div>
          <div class="mb-2">
            <input
              type="password"
              name="password"
              v-model="input.password"
              placeholder="Password"
              class="form-control text-center"
            >
          </div>

          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { API } from "../Config";

export default {
  name: "login",
  data() {
    return {
      alert: {
        login: {
          show: false,
          text: ""
        }
      },
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    checkUser: function() {
      let body = {
        username: this.input.username,
        password: this.input.password,
        module: 'manage'
      };
      Axios.post(`${API.baseurl}users/check-user`, body).then(
        response => {
          let resp = response.data.response;
          if (resp.error === undefined) {
            localStorage.setItem("jwt-auth", this.input.username);
            localStorage.setItem('token', resp.token)
            this.$emit("authenticated", true);
            this.$router.replace({ name: "home" });
          } else {
            this.alert.login = {
              show: true,
              text: resp.error
            };
          }
        }
      );
    },
    login: function() {
      if (this.input.username != "" && this.input.password != "") {
        this.checkUser();
      } else {
        this.alert.login = {
          show: true,
          text: "A username and password must be present"
        };
      }
    }
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  background-color: #ffffff;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
}
</style>