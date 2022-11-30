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
                {
                    key: 'status',
                    label: 'Status',
                    sortable:false,
                },
                {
                    key: 'date_time',
                    label: 'Date Time',
                    sortable:false,
                }
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
        activeInactiveEmploye(status , id){
            console.log(status)
            console.log(id)
            if(confirm('Are you sure you want to change Employee status?')){
                var data = {id: id, status: status}
                employeService.activeInactiveEmploye(data).then((response) => {
                if (response.data.code === 200) {
                    Vue.toasted.success(response.data.message,{
                        duration: 2000
                    });
                    this.getEmploye(this.page);
                } else {
                    Vue.toasted.error(response.data.message,{
                        duration: 2000
                    });
                }
                });
            }
        },
        deleteEmploye(id){
            if(confirm('Are you sure you want to delete Employe?')){
                employeService.deleteEmploye({ id:id }).then((response) => {
                    if (response.data.code === 200) {
                        Vue.toasted.success(response.data.message,{
                            duration: 2000
                        });
                        this.getEmploye(this.page);
                    } else {
                        Vue.toasted.error(response.data.message,{
                            duration: 2000
                        });
                    }
                });
            }
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
                    <router-link :to="{ name: 'employe/add' }" class="btn btn-success">
                        <i class="mdi mdi-plus mr-1"></i> Add Employe</router-link
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
                    <template v-slot:cell(status)="data">
                        <button
                          v-if="data.item.status == '0'"
                          type="submit"
                          class="badge-danger badge"
                          @click="activeInactiveEmploye(1,data.item.id)"
                        >Inactive</button>
                        <button
                          v-if="data.item.status == '1'"
                          type="submit"
                          class="badge-success badge"
                          @click="activeInactiveEmploye(0,data.item.id)"
                        >Active</button>
                    </template>
                    <template v-slot:cell(action)="data">
                        <div>
                            <router-link :to="{name:'/employe/edit', params: { employeId: data.item.id }}" class="badge-success badge" >Edit</router-link>
                            <button type="button" class="badge-danger badge" @click="deleteEmploye(data.item.id)">Delete</button>
                        </div>
                    </template>
                    <template v-slot:cell(date_time)="data">
                        <div>
                            <label for="">{{data.item.date_time}}</label>
                        </div>
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
