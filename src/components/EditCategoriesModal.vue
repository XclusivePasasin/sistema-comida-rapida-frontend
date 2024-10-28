<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Update Category</h2>

      <form @submit.prevent="submitForm">
        <!-- Category Name -->
        <div class="mb-4">
          <label
            for="category_name"
            class="block text-sm font-medium text-gray-600"
          >
            Category Name
          </label>
          <input
            v-model="form.name"
            type="text"
            id="category_name"
            maxlength="70"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
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
            Update Category
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash"; // Asegúrate de instalar lodash si no está instalado

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
      },
      errors: {
        name: "",
      },
      nameExists: false, // Variable para guardar si el nombre ya existe
    };
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.loadCategoryData();
      }
    },
    categories: {
      immediate: true,
      deep: true,
      handler() {
        this.loadCategoryData();
      },
    },
    // Observador para form.name que llama a la función de verificación de nombre con debounce
    "form.name": debounce(async function () {
      await this.checkCategoryNameRealTime();
    }, 300),
  },
  methods: {
    loadCategoryData() {
      this.form.name = this.categories.name || "";
      this.clearErrors();
    },
    closeModal() {
      this.$emit("close");
      this.clearErrors();
    },
    clearErrors() {
      this.errors.name = "";
      this.nameExists = false; // Resetea la verificación de nombre existente
    },
    async checkCategoryNameRealTime() {
      if (this.form.name.trim() === "") {
        this.errors.name = "Category Name cannot be empty.";
        return;
      }

      // Realiza la verificación en el backend
      const exists = await this.checkCategoryExists(
        this.form.name,
        this.categories.id_category
      );
      if (exists) {
        this.errors.name =
          "Category name already exists. Please choose another.";
        this.nameExists = true;
      } else {
        this.errors.name = "";
        this.nameExists = false;
      }
    },
    async checkCategoryExists(categoryName, categoryId = null) {
      try {
        const params = {
          name: categoryName,
        };
        if (categoryId) {
          params.category_id = categoryId;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories/check-existence",
          { params: params }
        );

        return response.data.exists;
      } catch (error) {
        console.error("Error checking category existence:", error);
        this.errors.name = "Server error. Please try again later.";
        return false;
      }
    },
    async submitForm() {
      if (this.errors.name || this.nameExists) {
        return;
      }

      const updatedCategory = {
        ...this.form,
        id_category: this.categories.id_category,
      };

      this.$emit("submit-update", updatedCategory);
      this.closeModal();
    },
  },
};
</script>
