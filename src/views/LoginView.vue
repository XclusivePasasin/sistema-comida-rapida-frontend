<template>
  <div class="flex h-screen">
    <div class="hidden md:flex md:w-5/12 bg-gray-900 h-full">
      <div class="flex items-center justify-center w-full">
        <h1 class="text-7xl font-bold text-white">Fast!</h1>
      </div>
    </div>

    <div class="flex w-full md:w-7/12 items-center justify-center h-full">
      <div class="w-full max-w-md">
        <h1 class="text-4xl font-bold mb-6 text-center text-gray-700">Welcome</h1>
        <h3 class="text-center mb-4 text-gray-600">Sign in to your account</h3>
        <!-- error message -->
        <p v-if="errorMessage" class="text-center text-red-600 mb-4">{{ errorMessage }}</p>
        <form @submit.prevent="onSubmit">
          <div class="mb-4">
            <label class="block text-gray-700">Username</label>
            <div class="flex items-center border border-gray-300 rounded-xl">
              <span class="px-3 text-gray-600">
                <i class="mdi mdi-account"></i>
              </span>
              <input
                v-model="username"
                type="text"
                placeholder="Enter your username"
                class="w-full px-3 py-2 rounded-r focus:outline-none rounded-xl"
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Password</label>
            <div class="flex items-center border border-gray-300 rounded rounded-xl">
              <span class="px-3 text-gray-600">
                <i class="mdi mdi-lock"></i>
              </span>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full px-3 py-2 rounded-r focus:outline-none rounded-xl"
              />
              <span class="px-3 text-gray-600 cursor-pointer" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></i>
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      errorMessage: null,
    };
  },
  methods: {
    async onSubmit() {
      this.errorMessage = null;
      if (!this.username || !this.password) {
        this.errorMessage = "Please enter your username or password";
        return;
      }
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/users/login", {
          username: this.username,
          password: this.password,
        });

        if (response.data.code === 200) {
          const information_user = response.data.user;
          localStorage.setItem("user", JSON.stringify(information_user));
          this.$router.push({ path: "/dashboard" });
        } else {
          this.errorMessage = response.data.message || "Invalid username or password";
        }
      } catch (error) {
        console.error("Login Error", error);
        this.errorMessage = error.response?.data?.message || "Login Failed";
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  font-size: 18px;
  margin-bottom: 16px;
}
</style>
