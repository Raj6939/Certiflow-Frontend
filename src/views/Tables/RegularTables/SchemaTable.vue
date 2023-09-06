<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">Choose Schema</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="schemaTypes"
      @row-click="openSlider"
    >
      <el-table-column label="Schema Name" min-width="310px" prop="schemaType">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span>{{ row.schemaName }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Schema Id" prop="schemaType" min-width="140px">
        <template v-slot="{ row }">
          <div class="avatar-group">
            <a
              :href="`https://explorer.hypersign.id/hypersign-testnet/revocationRegistry/${row.title}`"
              class="font-weight-600 name mb-0 text-sm"
              target="_blank"
              >{{ row.schemaId }}</a
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Preview" min-width="190px">
        <template v-slot="{ row }">
          <div class="avatar-group">
            <b-button variant="primary" @click="previewModal(row.schemaId)">Preview</b-button>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Recepient"
                             prop="completion"
                             min-width="240px">
                <span>raj@hypermine.in</span>
            </el-table-column> -->

      <!-- <el-table-column label="Status"
                             min-width="170px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column> -->
    </el-table>

    <b-card-footer class="d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        :per-page="5"
        :total="0"
      ></base-pagination>
    </b-card-footer>
  </b-card>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import { truncate } from "../../../util/hsConstants";
import {mapMutations} from "vuex"
export default {
  name: "light-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  props: {
    schemaTypes: {
      type: Array,
      default: "",
      description: "Array of Issued VC",
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted(){
    this.$store.commit("issuerStore/setSelectedSchemaType",null) 
  },
  ...mapMutations("issuerStore", ["setSelectedSchemaType"]),
  methods: {
    previewModal(id){
        console.log(id)
    },
    openSlider(schema){
        console.log(schema)
        this.$store.commit("issuerStore/setSelectedSchemaType",schema)   
        this.$router.push('icons/design/')
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
  },
};
</script>
<style>
.el-table__row:hover {
  cursor: pointer;
}
</style>