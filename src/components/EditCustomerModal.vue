<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Update Customer</h2>

            <form @submit.prevent="submitForm">
                <!-- Dui -->
                <div class="mb-4">
                    <label for="dui" class="block text-sm font-medium text-gray-600">
                        Dui
                    </label>
                    <input v-model="form.dui" type="text" id="dui" maxlength="10" readonly
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
                        Update Customer
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
        customer: {
            type: Object,
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
                phone: "",
            },
            errors: {
                dui: "",
                first_name: "",
                last_name: "",
                address: "",
                phone: "",
            },
        };
    },
    watch: {
        // Este watcher se activará cuando el prop `customer` cambie o se defina.
        isOpen(val) {
            if (val) {
                // Cuando el modal se abra, llenamos el formulario con los datos del cliente.
                this.loadCustomerData();
            }
        },
        customer: {
            immediate: true, // Ejecutar inmediatamente cuando el componente se monta.
            deep: true, // Detectar cambios profundos en el objeto customer.
            handler(newCustomer) {
                if (newCustomer) {
                    this.loadCustomerData();
                }
            },
        },
    },
    methods: {
        loadCustomerData() {
            // Aquí garantizamos que los datos del cliente se asignan al formulario.
            this.form = {
                dui: this.customer.dui || "",
                first_name: this.customer.first_name || "",
                last_name: this.customer.last_name || "",
                address: this.customer.address || "",
                phone: this.customer.phone || "",
            };
        },
        closeModal() {
            this.$emit("close");
            this.clearErrors();
        },
        clearErrors() {
            this.errors = {
                dui: "",
                first_name: "",
                last_name: "",
                address: "",
                phone: "",
            };
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
                const customer = {
                    ...this.form,
                };
                this.$emit("submit-update", customer);
                this.closeModal();
            }
        },
        validateDui() {
            const duiRegex = /^[0-9]{9}$/; // Cambiado a 9 dígitos sin guion
            if (!this.form.dui || this.form.dui.trim() === "") {
                this.errors.dui = "DUI cannot be empty.";
            } else if (!duiRegex.test(this.form.dui)) {
                this.errors.dui = "DUI must contain exactly 9 digits.";
            } else {
                this.errors.dui = "";
            }
        },

        validateFirstName() {
            if (!this.form.first_name || this.form.first_name.trim() === "") {
                this.errors.first_name = "First Name cannot be empty.";
            } else {
                this.errors.first_name = "";
            }
        },
        validateLastName() {
            if (!this.form.last_name || this.form.last_name.trim() === "") {
                this.errors.last_name = "Last Name cannot be empty.";
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
            const phoneRegex = /^[0-9]{8}$/;
            if (!this.form.phone || this.form.phone.trim() === "") {
                this.errors.phone = "Phone cannot be empty.";
            } else if (!phoneRegex.test(this.form.phone)) {
                this.errors.phone = "Phone number must contain exactly 8 digits.";
            } else {
                this.errors.phone = "";
            }
        },
    },
};
</script>
