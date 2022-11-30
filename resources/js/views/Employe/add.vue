<script>
// import axios from "axios";
import { employeService } from "../../services";
export default {
    data() {
        return {
            form: {
                email: "abidhusain@gmail.com",
                name: "abidhusain",
                status: null,
            },
            statuse: [
                { text: "Select Status", value: null },
                { text: "active", value: 1 },
                { text: "inactive", value: 0 },
            ],
            show: true,
            errorMessage: "",
            submitButton:false,
        };
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            this.submitButton = true;
            const fd = new FormData();
            fd.append("name", this.form.name);
            fd.append("email", this.form.email);
            fd.append("status", this.form.status);
            employeService
                .addEmploye(fd)
                .then((response) => {
                    console.log(response.data);
                    Vue.toasted.success(response.data,{
                        duration: 5000
                    });
                    this.$router.push({ name: "employe" });
                })
                .catch((e) => {
                    // console.log(err.response.errors)
                    this.errorMessage = e.response.data;
                    // var message = Object.values(err.response.data.errors)[0][0]
                    // Vue.toasted.error(message,{
                    //     duration: 5000
                    // });
                });
        },
        onReset(event) {
            event.preventDefault();
            // Reset our form values
            this.form.email = "";
            this.form.name = "";
            this.form.status = null;
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
    },
};
</script>
<template>
    <div class="mt-3 container">
        <h2>Add Employe</h2>
        <div v-for="(errorArray, index) in errorMessage" :key="index">
            <span class="text-danger">{{ errorArray[0] }} </span>
        </div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Your Name:"
                label-for="input-2"
            >
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Status:" label-for="input-3" class="mb-2">
                <b-form-select
                    id="input-3"
                    v-model="form.status"
                    :options="statuse"
                ></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="submitButton">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
    </div>
</template>
