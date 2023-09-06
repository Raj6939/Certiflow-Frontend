<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Issued Certificates</h3>
        </b-card-header>

        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="projects">
            <el-table-column label="Certificate ID"
                             min-width="310px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">                        
                        <b-media-body>
                            <a :href="`https://explorer.hypersign.id/hypersign-testnet/revocationRegistry/${row.title}`" 
                            class="font-weight-600 name mb-0 text-sm"
                            target="_blank"
                            >{{ truncate1(row.title,30) }}</a>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="Type"
                             prop="budget"
                             min-width="140px">
            </el-table-column>
            

            <el-table-column label="Issued on" min-width="190px">
                <template v-slot="{row}">
                <div class="avatar-group">
                                    <span>{{ row.issuedOn }}</span>  
                </div>
            </template>
            </el-table-column>

            <el-table-column label="Recepient"
                             prop="completion"
                             min-width="240px">
                <span>raj@hypermine.in</span>
            </el-table-column>
            
            <el-table-column label="Status"
                             min-width="170px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>

        </el-table>
        

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>  
  import { Table, TableColumn} from 'element-ui'
  import { truncate } from '../../../util/hsConstants';
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    props:{
        projects:{
            type:Array,
            default:'',
            description:'Array of Issued VC'
        }
    },
    data() {
      return {        
        currentPage: 1
      };
    }, 
    methods:{
    truncate1(str, number) {
      return truncate(str, number);
    },
    }   
  }
</script>
