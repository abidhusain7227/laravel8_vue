<script>
import axios from "axios";
import pagination from "laravel-vue-pagination";
import { employeService } from "../../services";
export default {
  components: { pagination },
    data() {
        return {
            search: "",
            employe: null,
            paginations: {},
            page: 0,
            record: 5,
            limit: 2,
            fields: [
                {
                    key: "name",
                    label: "Name",
                    sortable: true,
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: true,
                },
                {
                    key: "action",
                    label: "Action",
                    sortable: false,
                },
            ],
            loading: false,
        };
    },
    methods: {
      getEmploye(page) {
            this.loading = true;
            var filters = {
                search: this.search,
                record: this.record,
                page: page && page > 0 ? page : 1,
            };
            this.page = filters.page;
            employeService.getEmploye(filters).then((response) => {
                this.loading = false;
                this.paginations = response.data.result
                this.employe = response.data.result.data;
            });
        },
    },
    mounted() {
        this.getEmploye();
    },
};
</script>

<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12">
                <div class="employe">
                    <h2>Employe List</h2>
                    <router-link
                        :to="{ name: 'employe/add' }"
                        class="btn btn-success"
                        ><i class="mdi mdi-plus mr-1"></i> Add Employe</router-link
                    >
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-main-list vendor-table table-responsive">
                <div class="row">
                    <div class="col-md-2">
                        <div class="search-box mr-2 mb-2 d-inline-block">
                            <div class="date-range-list">
                                <label>Search :</label>
                                <div class="position-relative">
                                    <input
                                        type="text"
                                        class="form-control"
                                        @input="getEmploye()"
                                        v-model="search"
                                        placeholder='Searc...'
                                    />
                                    <i class="bx bx-search-alt search-icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <b-table
                    striped
                    hover
                    :items="employe"
                    :fields="fields"
                    :no-local-sorting="false"
                    :busy="loading"
                    show-empty
                >
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>

                    <template v-slot:cell(name)="data">
                        <h6>
                            <div
                                v-if="
                                    data.item.name && data.item.name.length > 25
                                "
                            >
                                {{ data.item.e_name.substr(0, 25) + "..." }}
                            </div>
                            <div v-else>{{ data.item.name }}</div>
                        </h6>
                    </template>

                    <template v-slot:cell(email)="data">
                        <h6>
                            <div>{{ data.item.email }}</div>
                        </h6>
                    </template>
                    <template v-slot:cell(action)="data">
                        <h6>
                            <div>{{ data.item.email }}</div>
                        </h6>
                    </template>

                    <template #empty>
                        <p class="text-center">No Employe Found</p>
                    </template>
                </b-table>
            </div>
            <div class="col-md-12">
              <div>
                <!-- pagination -->
                <pagination
                :data="paginations"
                :limit="limit"
                @pagination-change-page="getEmploye"
              ></pagination>
              </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.employe {
    display: flex;
    position: relative;
    justify-content: space-between;
}
</style>
