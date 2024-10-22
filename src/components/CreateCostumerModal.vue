<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Create Customer</h2>

            <form @submit.prevent="submitForm">
                <!-- Dui -->
                <div class="mb-4">
                    <label for="dui" class="block text-sm font-medium text-gray-600">
                        Dui
                    </label>
                    <input v-model="form.dui" type="text" id="dui" maxlength="10"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.dui" class="text-red-500 text-sm mt-1">
                        {{ errors.dui }}
                    </p>
                </div>

                <!-- First Name -->
                <div class="mb-4">
                    <label for="first_name" class="block text-sm font-medium text-gray-600">First Name</label>
                    <input v-model="form.first_name" type="text" id="first_name" maxlength="70"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.first_name" class="text-red-500 text-sm mt-1">
                        {{ errors.first_name }}
                    </p>
                </div>

                <!-- Last Name -->
                <div class="mb-4">
                    <label for="last_name" class="block text-sm font-medium text-gray-600">
                        Last Name
                    </label>
                    <input v-model="form.last_name" type="text" id="last_name" maxlength="70"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.last_name" class="text-red-500 text-sm mt-1">
                        {{ errors.last_name }}
                    </p>
                </div>

                <!-- Address -->
                <div class="mb-4">
                    <label for="address" class="block text-sm font-medium text-gray-600">
                        Address
                    </label>
                    <input v-model="form.address" type="text" id="address" maxlength="255"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.address" class="text-red-500 text-sm mt-1">
                        {{ errors.address }}
                    </p>
                </div>

                <!-- Phone -->
                <div class="mb-4">
                    <label for="phone" class="block text-sm font-medium text-gray-600">
                        Phone
                    </label>
                    <input v-model="form.phone" type="text" id="phone" maxlength="8"
                        class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
                        {{ errors.phone }}
                    </p>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end">
                    <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl mr-2"
                        @click="closeModal">
                        Cancel
                    </button>
                    <button type="submit" class="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-xl">
                        Create Customer
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
                dui: "",
                first_name: "",
                last_name: "",
                address: "",
                phone: ""
            },
            errors: {
                dui: "",
                first_name: "",
                last_name: "",
                address: "",
                phone: ""
            },
        };
    },
    watch: {
        'form.dui': function () {
            this.validateDui();
        },
        'form.first_name': function () {
            this.validateFirstName();
        },
        'form.last_name': function () {
            this.validateLastName();
        },
        'form.address': function () {
            this.validateAddress();
        },
        'form.phone': function () {
            this.validatePhone();
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
                dui: "",
                first_name: "",
                last_name: "",
                address: "",
                phone: ""
            };
        },

        clearForm() {
            this.form = {
                dui: "",
                first_name: "",
                last_name: "",
                address: "",
                phone: ""
            };
        },
        async validateDui() {
            if (!this.form.dui || this.form.dui.trim() === "") {
                this.errors.dui = "DUI cannot be empty.";
                return;
            }
            if (this.form.dui.length !== 10) {
                this.errors.dui = "DUI must be exactly 10 characters.";
                return;
            }

            // Verificar disponibilidad del DUI
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/customers/search`, {
                    params: {
                        search: this.form.dui,
                    },
                });

                if (response.data.customers.length > 0) {
                    this.errors.dui = "DUI is already taken.";
                } else {
                    this.errors.dui = "";
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.errors.dui = "";
                } else {
                    this.errors.dui = "Error checking DUI availability.";
                }
            }
        },
        validateFirstName() {
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!this.form.first_name || this.form.first_name.trim() === "") {
                this.errors.first_name = "First Name cannot be empty.";
            } else if (!nameRegex.test(this.form.first_name)) {
                this.errors.first_name = "First Name should not contain numbers or symbols.";
            } else {
                this.errors.first_name = "";
            }
        },
        validateLastName() {
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!this.form.last_name || this.form.last_name.trim() === "") {
                this.errors.last_name = "Last Name cannot be empty.";
            } else if (!nameRegex.test(this.form.last_name)) {
                this.errors.last_name = "Last Name should not contain numbers or symbols.";
            } else {
                this.errors.last_name = "";
            }
        },
        validateAddress() {
            if (!this.form.address || this.form.address.trim() === "") {
                this.errors.address = "Address cannot be empty.";
            } else {
                this.errors.address = "";
            }
        },
        validatePhone() {
            const phoneRegex = /^[0-9]+$/;
            if (!this.form.phone || this.form.phone.trim() === "") {
                this.errors.phone = "Phone cannot be empty.";
            } else if (!phoneRegex.test(this.form.phone)) {
                this.errors.phone = "Phone number should contain only numbers.";
            } else if (this.form.phone.length !== 8) {
                this.errors.phone = "Phone number must be exactly 8 digits.";
            } else {
                this.errors.phone = "";
            }
        },
        submitForm() {
            this.validateDui();
            this.validateFirstName();
            this.validateLastName();
            this.validateAddress();
            this.validatePhone();

            if (
                !this.errors.dui &&
                !this.errors.first_name &&
                !this.errors.last_name &&
                !this.errors.address &&
                !this.errors.phone
            ) {
                this.$emit("create-customer", this.form);
                this.clearForm();
                this.clearErrors();
                this.closeModal();
            }
        },
    },
};
</script>
