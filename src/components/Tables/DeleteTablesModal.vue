<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4 text-red-600">Delete Table</h2>
            <p class="mb-4">
                Are you sure you want to delete the Table <strong>{{ tables.table_number }} </strong>?
                This action cannot be undone.
            </p>
            <!-- Buttons -->
            <div class="flex justify-end">
                <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl mr-2"
                    @click="closeModal">
                    Cancel
                </button>
                <button type="button" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl"
                    @click="confirmDelete">
                    Delete
                </button>
            </div>
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
        tables: {
            type: Object,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        confirmDelete() {
            this.$emit("confirm-delete", this.tables);
            this.closeModal();
        },
    },
};
</script>