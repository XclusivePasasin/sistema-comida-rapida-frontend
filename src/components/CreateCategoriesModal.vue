<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Create Category</h2>

            <form @submit.prevent="submitForm">
                <!-- Category Name -->
                <div class="mb-4">
                    <label for="category_name" class="block text-sm font-medium text-gray-600">
                        Category Name
                    </label>
                    <input v-model="form.category_name" type="text" id="category_name" maxlength="70"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.category_name" class="text-red-500 text-sm mt-1">
                        {{ errors.category_name }}
                    </p>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end">
                    <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl mr-2"
                        @click="closeModal">
                        Cancel
                    </button>
                    <button type="submit" class="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-xl">
                        Create Category
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
                category_name: ""
            },
            errors: {
                category_name: ""
            },
        };
    },
    watch: {
        'form.category_name': function () {
            this.validateCategoryName();
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
                category_name: ""
            };
        },
        clearForm() {
            this.form = {
                category_name: "",
            };
        },
        validateCategoryName() {
            if (!this.form.category_name || this.form.category_name.trim() === "") {
                this.errors.category_name = "Category Name cannot be empty.";
            } else {
                this.errors.category_name = "";
            }
        },
        async checkCategoryExists(categoryName) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/check-existence?name=${encodeURIComponent(categoryName)}`);
                return response.data.exists; // Ajusta esto según la respuesta de tu API
            } catch (error) {
                console.error("Error checking category existence:", error);
                return false; // En caso de error, asumimos que no existe
            }
        },
        async submitForm() {
            this.validateCategoryName();

            if (!this.errors.category_name) {
                const exists = await this.checkCategoryExists(this.form.category_name);
                if (exists) {
                    this.errors.category_name = "Category Name already exists. Please choose another.";
                    return;
                }

                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/categories/create", {
                        name: this.form.category_name
                    });
                    console.log(response.data);
                    this.$emit("create-category", this.form);
                    this.clearForm();
                    this.clearErrors();
                    this.closeModal();
                } catch (error) {
                    console.error("Error creating category:", error);
                    this.errors.category_name = "Error creating category. Please try again.";
                }
            }
        },
    },
};
</script>
