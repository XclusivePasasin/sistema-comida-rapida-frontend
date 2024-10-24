<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Edit Dish</h2>

      <form @submit.prevent="submitForm">
        <!-- Dish Name -->
        <div class="mb-4">
          <label for="dish_name" class="block text-sm font-medium text-gray-600">
            Dish Name
          </label>
          <input
            v-model="form.dish_name"
            type="text"
            id="dish_name"
            maxlength="50"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.dish_name" class="text-red-500 text-sm mt-1">
            {{ errors.dish_name }}
          </p>
        </div>

        <!-- Price -->
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            v-model="form.price"
            type="number"
            min="0"
            step="0.01"
            id="price"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p v-if="errors.price" class="text-red-500 text-sm mt-1">
            {{ errors.price }}
          </p>
        </div>

        <!-- Category -->
        <div class="mb-4">
          <label for="id_category" class="block text-sm font-medium text-gray-600">
            Category
          </label>
          <select
            v-model="form.id_category"
            id="id_category"
            class="mt-1 block w-full text-gray-600 px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option disabled value="">Select a Category</option>
            <option v-for="category in categories" :key="category.id_category" :value="category.id_category">
              {{ category.name }}
            </option>
          </select>
          <p v-if="errors.id_category" class="text-red-500 text-sm mt-1">
            {{ errors.id_category }}
          </p>
        </div>

        <!-- Description (optional) -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-600">
            Description (optional)
          </label>
          <textarea
            v-model="form.description"
            id="description"
            maxlength="255"
            class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
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
            Update Dish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash/debounce";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    dishData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        dish_name: this.dishData.dish_name || "",
        price: this.dishData.price || "",
        description: this.dishData.description || "",
        id_category: this.dishData.id_category || "",
      },
      categories: [], // List of categories fetched from API
      errors: {
        dish_name: "",
        price: "",
        description: "",
        id_category: "",
      },
      dishNameAvailable: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.clearErrors();
    },
    clearErrors() {
      this.errors = {
        dish_name: "",
        price: "",
        description: "",
        id_category: "",
      };
    },
    // Fetch categories from API
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        this.categories = response.data.categories.map((category) => ({
          id_category: category.id_category,
          name: category.name,
        }));
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response?.data || error.message
        );
      }
    },
    async validateDishName() {
      if (this.form.dish_name === this.dishData.dish_name) {
        this.errors.dish_name = "";
        this.dishNameAvailable = true;
        return;
      }

      if (!this.form.dish_name || this.form.dish_name.trim() === "") {
        this.errors.dish_name = "";
        this.dishNameAvailable = false;
        return;
      }

      if (this.form.dish_name.length < 3 || this.form.dish_name.length > 50) {
        this.errors.dish_name =
          "Dish name must be between 3 and 50 characters.";
        this.dishNameAvailable = false;
        return;
      }

      try {
        const params = {
          dish: this.form.dish_name,
          id_dish: this.dishData.id_dish,
        };

        const response = await axios.get(
          `http://127.0.0.1:8000/api/dishes/search`,
          { params }
        );

        if (
          response.data.code === 200 &&
          response.data.message === "Dish can be updated"
        ) {
          this.errors.dish_name = "";
          this.dishNameAvailable = true;
        } else if (response.data.code === 409) {
          this.errors.dish_name = "Dish name is already taken by another dish.";
          this.dishNameAvailable = false;
        } else {
          this.errors.dish_name = "Dish name is already taken.";
          this.dishNameAvailable = false;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errors.dish_name = "";
          this.dishNameAvailable = true;
        } else {
          this.errors.dish_name = "Error checking dish name availability.";
          this.dishNameAvailable = false;
        }
      }
    },
    submitForm() {
      this.validateForm();

      if (this.form.dish_name === this.dishData.dish_name) {
        this.dishNameAvailable = true;
      }

      if (
        !this.errors.dish_name &&
        !this.errors.price &&
        !this.errors.id_category &&
        this.dishNameAvailable
      ) {
        const updatedDishData = {
          id_dish: this.dishData.id_dish,
          ...this.form,
        };
        this.$emit("submit-update", updatedDishData);
        this.closeModal();
      }
    },
    validateForm() {
      this.errors = {
        dish_name: "",
        price: "",
        id_category: "",
      };

      if (!this.form.dish_name) {
        this.errors.dish_name = "Dish name cannot be empty.";
      }

      if (!this.form.price || this.form.price <= 0) {
        this.errors.price = "Price must be greater than zero.";
      }

      if (!this.form.id_category) {
        this.errors.id_category = "Please select a category.";
      }
    },
  },
  watch: {
    "form.dish_name": debounce(function () {
      this.validateDishName();
    }, 300),
  },
  created() {
    if (this.isOpen) {
      this.fetchCategories();
    }
  },
};
</script>
