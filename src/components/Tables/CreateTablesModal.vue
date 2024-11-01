<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Create Tables</h2>

      <form @submit.prevent="submitForm">
        <!-- Table Number -->
        <div class="mb-4">
          <label
            for="table_number"
            class="block text-sm font-medium text-gray-600"
          >
            Table Number
          </label>
          <input
            v-model="form.table_number"
            type="text"
            id="table_number"
            max="50"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.table_number" class="text-red-500 text-sm mt-1">
            {{ errors.table_number }}
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
            :disabled="isSubmitting"
          >
            Create Table
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
        table_number: "",
      },
      errors: {
        table_number: "",
      },
      isSubmitting: false,
    };
  },
  watch: {
    "form.table_number": function () {
      this.validateTableNumber();
    },
  },
  methods: {
    closeModal() {
      this.clearErrors();
      this.clearForm();
      this.$emit("close"); // Notifica a la vista principal que debe cerrar el modal
    },
    clearErrors() {
      this.errors = {
        table_number: "",
      };
    },
    clearForm() {
      this.form = {
        table_number: "",
      };
    },
    validateTableNumber() {
      if (!this.form.table_number || this.form.table_number.trim() === "") {
        this.errors.table_number = "Table Number cannot be empty.";
      } else {
        this.errors.table_number = "";
      }
    },
    async checkTableExists(tableNumber) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tables/check-existence?number=${encodeURIComponent(
            tableNumber
          )}`
        );
        return response.data.exists;
      } catch (error) {
        console.error("Error checking table existence:", error);
        return false;
      }
    },
    async submitForm() {
      this.validateTableNumber();

      if (!this.errors.table_number) {
        const exists = await this.checkTableExists(this.form.table_number);
        this.isSubmitting = true;
        if (exists) {
          this.errors.table_number =
            "Table Number already exists. Please choose another.";
          this.isSubmitting = false;
          return;
        }

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/tables/create",
            {
              table_number: this.form.table_number,
            }
          );
          console.log(response.data);

          this.$emit("table-created", response.data.table); 

          this.clearForm();
          this.clearErrors();
          this.closeModal();
        } catch (error) {
          console.error("Error creating table:", error);
          this.errors.table_number = "Error creating table. Please try again.";
        } finally {
          this.isSubmitting = false; 
        }
      }
    },
  },
};
</script>
