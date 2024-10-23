<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Update Table</h2>

            <form @submit.prevent="submitForm">
                <!-- Table Number -->
                <div class="mb-4">
                    <label for="table_number" class="block text-sm font-medium text-gray-600">
                        Table Number
                    </label>
                    <input v-model="form.table_number" type="text" id="table_number" maxlength="70"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.table_number" class="text-red-500 text-sm mt-1">
                        {{ errors.table_number }}
                    </p>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end">
                    <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl mr-2"
                        @click="closeModal">
                        Cancel
                    </button>
                    <button type="submit" class="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-xl">
                        Update Table
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
        tables: {
            type: Object,
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
        };
    },
    watch: {
        isOpen(val) {
            if (val) {
                this.loadTableData(); // Cargar datos cuando se abra el modal
            }
        },
        tables: {
            immediate: true,
            deep: true,
            handler() {
                this.loadTableData(); // También cargar datos cuando haya cambios en table
            },
        },
    },
    methods: {
        loadTableData() {
            if (this.tables && this.tables.table_number) {
                this.form.table_number = this.tables.table_number; // Cargar el número de la mesa
            } else {
                this.form.table_number = ""; // Asignar vacío si no hay datos
            }
        },
        closeModal() {
            this.$emit("close");
            this.clearErrors();
        },
        clearErrors() {
            this.errors.table_number = "";
        },
        submitForm() {
            this.validateTableNumber();

            if (!this.errors.table_number) {
                const updatedTable = {
                    ...this.form,
                    id_table: this.tables.id_table,
                    table_number: this.form.table_number,
                };
                this.$emit("submit-update", updatedTable);
                this.closeModal();
            }
        },
        validateTableNumber() {
            if (!this.form.table_number || this.form.table_number.trim() === "") {
                this.errors.table_number = "Table Number cannot be empty.";
            } else {
                this.errors.table_number = "";
            }
        },
    },
};
</script>
