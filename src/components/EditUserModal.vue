<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Update User</h2>

      <form @submit.prevent="submitForm">
        <!-- Username (no edit) -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            maxlength="15"
            disabled
            readonly
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <!-- Employee Name -->
        <div class="mb-4">
          <label
            for="employee_name"
            class="block text-sm font-medium text-gray-600"
          >
            Employee Name
          </label>
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

        <!-- Password (opcional) -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">
            Password (optional)
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
          <label for="role" class="block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            v-model="form.role"
            id="role"
            class="mt-1 block w-full text-gray-600 px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option disabled value="">Select a Role</option>
            <option
              v-for="(label, value) in roleOptions"
              :key="value"
              :value="value"
            >
              {{ label }}
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
            Update User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        username: this.userData.username || "", 
        employee_name: this.userData.employee_name || "",
        password: "", 
        phone: this.userData.phone || "",
        role: this.userData.role || "", 
      },
      roleOptions: {
        A: "Administrator",
        C: "Cashier",
        M: "Waiter",
      },
      errors: {
        employee_name: "",
        password: "",
        phone: "",
        role: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.clearErrors();
    },
    clearErrors() {
      this.errors = {
        employee_name: "",
        password: "",
        phone: "",
        role: "",
      };
    },
    submitForm() {
      this.validateEmployeeName();
      this.validatePassword();
      this.validatePhone();
      this.validateRole();

      if (
        !this.errors.employee_name &&
        !this.errors.password &&
        !this.errors.phone &&
        !this.errors.role
      ) {
        const userData = {
        id_user: this.userData.id,
          ...this.form,
        };
        this.$emit("submit-update", userData);
        console.log("Este es el userData del formulario", userData);
        this.closeModal();
      }
    },
    validateEmployeeName() {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!this.form.employee_name || this.form.employee_name.trim() === "") {
        this.errors.employee_name = "Employee Name cannot be empty.";
      } else if (!nameRegex.test(this.form.employee_name)) {
        this.errors.employee_name =
          "Employee Name should not contain numbers or symbols.";
      } else {
        this.errors.employee_name = "";
      }
    },
    validatePassword() {
      if (this.form.password && this.form.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters long.";
      } else {
        this.errors.password = "";
      }
    },
    validatePhone() {
      const phoneRegex = /^[0-9]{8}$/;
      if (!this.form.phone || this.form.phone.trim() === "") {
        this.errors.phone = "Phone cannot be empty.";
      } else if (!phoneRegex.test(this.form.phone)) {
        this.errors.phone = "Phone number must contain exactly 8 digits.";
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
  },
};
</script>
