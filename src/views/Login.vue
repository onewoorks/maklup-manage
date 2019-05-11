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
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          localStorage.setItem("authenticated", true);
          localStorage.setItem("jwt-auth", "iwang");
          this.$emit("authenticated", true);
          this.$router.replace({ name: "home" });
        } else {
          this.alert.login = {
            show: true,
            text: "The username and / or password is incorrect"
          };
        }
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