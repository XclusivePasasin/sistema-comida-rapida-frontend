<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Update Category</h2>

            <form @submit.prevent="submitForm">
                <!-- Category Name -->
                <div class="mb-4">
                    <label for="category_name" class="block text-sm font-medium text-gray-600">
                        Category Name
                    </label>
                    <input v-model="form.name" type="text" id="category_name" maxlength="70"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                        {{ errors.name }}
                    </p>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end">
                    <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl mr-2"
                        @click="closeModal">
                        Cancel
                    </button>
                    <button type="submit" class="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-xl">
                        Update Category
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
        };
    },
    watch: {
        isOpen(val) {
            if (val) {
                this.loadCategoryData();
            }
        },
        categories: { // Cambié de 'category' a 'categories'
            immediate: true,
            deep: true,
            handler() {
                this.loadCategoryData();
            },
        },
    },
    methods: {
        loadCategoryData() {
            this.form.name = this.categories.name || ""; 
        },
        closeModal() {
            this.$emit("close");
            this.clearErrors();
        },
        clearErrors() {
            this.errors.name = "";
        },
        submitForm() {
            this.validateCategoryName();

            if (!this.errors.name) {
                const updatedCategory = {
                    ...this.form,
                    id_category: this.categories.id_category, 
                };
                this.$emit("submit-update", updatedCategory);
                this.closeModal();
            }
        },
        validateCategoryName() {
            if (!this.form.name || this.form.name.trim() === "") {
                this.errors.name = "Category Name cannot be empty.";
            } else {
                this.errors.name = "";
            }
        },
    },
};
</script>
