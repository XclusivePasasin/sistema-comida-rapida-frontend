<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Create User</h2>

      <form @submit.prevent="submitForm">
        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            maxlength="15"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.username" class="text-red-500 text-sm mt-1">
            {{ errors.username }}
          </p>
        </div>

        <!-- Employee Name -->
        <div class="mb-4">
          <label
            for="employee_name"
            class="block text-sm font-medium text-gray-600"
            >Employee Name</label
          >
          <input
            v-model="form.employee_name"
            type="text"
            id="employee_name"
            maxlength="70"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.employee_name" class="text-red-500 text-sm mt-1">
            {{ errors.employee_name }}
          </p>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            maxlength="20"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            v-model="form.phone"
            type="text"
            id="phone"
            maxlength="8"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
            {{ errors.phone }}
          </p>
        </div>

        <!-- Role -->
        <div class="mb-4">
          <label for="rol" class="block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            v-model="form.role"
            id="rol"
            class="mt-1 block w-full text-gray-600 px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option disabled value="">Select a Role</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
          <p v-if="errors.role" class="text-red-500 text-sm mt-1">
            {{ errors.role }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl mr-2"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-xl"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        username: "",
        employee_name: "",
        password: "",
        phone: "",
        role: "",
      },
      roles: ["Administrator", "Cashier", "Waiter"],
      errors: {
        username: "",
        employee_name: "",
        password: "",
        phone: "",
        role: "",
      },
      usernameAvailable: true,
    };
  },
  watch: {
    'form.username': function() {
      this.validateUsername();
    },
    'form.employee_name': function() {
      this.validateEmployeeName();
    },
    'form.password': function() {
      this.validatePassword();
    },
    'form.phone': function() {
      this.validatePhone();
    },
    'form.role': function() {
      this.validateRole();
    },
  },
  methods: {
    closeModal() {
      this.clearErrors();
      this.clearForm();
      this.$emit("close");
    },
    clearErrors() {
      this.errors = {
        username: "",
        employee_name: "",
        password: "",
        phone: "",
        role: "",
      };
    },

    clearForm() {
    this.form = {
      username: "",
      employee_name: "",
      password: "",
      phone: "",
      role: "",
    };
  },
    async validateUsername() {
      if (!this.form.username || this.form.username.trim() === "") {
        this.errors.username = "Username cannot be empty.";
        this.usernameAvailable = false;
        return;
      }
      if (this.form.username.length < 3 || this.form.username.length > 15) {
        this.errors.username = "Username must be between 3 and 15 characters.";
        this.usernameAvailable = false;
        return;
      }

      // Verify user availability remotely
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/search`, {
          params: {
            user: this.form.username,
          },
        });

        if (response.data.users.length > 0) {
          this.errors.username = "Username is already taken.";
          this.usernameAvailable = false;
        } else {
          this.errors.username = "";
          this.usernameAvailable = true;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errors.username = "";
          this.usernameAvailable = true;
        } else {
          this.errors.username = "Error checking username availability.";
          this.usernameAvailable = false;
        }
      }
    },
    validateEmployeeName() {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!this.form.employee_name || this.form.employee_name.trim() === "") {
        this.errors.employee_name = "Employee Name cannot be empty.";
      } else if (!nameRegex.test(this.form.employee_name)) {
        this.errors.employee_name = "Employee Name should not contain numbers or symbols.";
      } else {
        this.errors.employee_name = "";
      }
    },
    validatePassword() {
      if (!this.form.password || this.form.password.trim() === "") {
        this.errors.password = "Password cannot be empty.";
      } else if (this.form.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters long.";
      } else {
        this.errors.password = "";
      }
    },
    validatePhone() {
      const phoneRegex = /^[0-9]+$/;
      if (!this.form.phone || this.form.phone.trim() === "") {
        this.errors.phone = "Phone cannot be empty.";
      } else if (!phoneRegex.test(this.form.phone)) {
        this.errors.phone = "Phone number should contain only numbers.";
      } else {
        this.errors.phone = "";
      }
    },
    validateRole() {
      if (!this.form.role) {
        this.errors.role = "Please select a role.";
      } else {
        this.errors.role = "";
      }
    },
    submitForm() {
      this.validateUsername();
      this.validateEmployeeName();
      this.validatePassword();
      this.validatePhone();
      this.validateRole();

      if (
        !this.errors.username &&
        !this.errors.employee_name &&
        !this.errors.password &&
        !this.errors.phone &&
        !this.errors.role &&
        this.usernameAvailable
      ) {
        this.$emit("create-user", this.form);
        this.clearForm();
        this.clearErrors();
        this.closeModal();
      }
    },
  },
};
</script>
