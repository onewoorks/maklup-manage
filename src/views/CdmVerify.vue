<template>
  <div>
    <MainHeader title="CDM Verify"/>

    <div>
      <div class="row">
        <div class="col-12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Bank</th>
                <th>Transaction No</th>
                <th>Pemohon</th>
                <th>Appointment Date</th>
                <th>Payment Date/Time</th>
                <th>First Verify</th>
                <th>Action
                    <input type='checkbox' @click="pickAll" />
                </th>
              </tr>
            </thead>
            <tbody>
                <tr v-if="empty_table.cdm_rekod">
                    <td colspan="8">No CDM transaction to be confirmed</td>
                </tr>
              <tr v-for="(item, key) in list.cdm_rekod" v-bind:key="key">
                <td>{{ key+1 }}</td>
                <td></td>
                <td class="text-uppercase">{{ item.seq_id+''+ item.cdm_id }}</td>
                <td
                  class="text-uppercase text-left"
                >{{ (item.data_pemohon == null) ? '' : item.data_pemohon.nama }}</td>
                <td>{{ (item.data_pemohon == null) ? '' : item.appointment_slot + ' ' + item.appointment_session }}</td>
                <td>{{ (item.cdm_data == null ) ? '': item.cdm_data.tarikh_bayaran + ' ' + item.cdm_data.masa_bayaran}}</td>
                <td></td>
                <td>
                  <input type="checkbox" v-model="verify[key]">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-right">
          <div class="btn btn-primary" @click="verifyToConfirm">Confirm Payment</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import MainHeader from "@/components/MainHeader";
import Axios from "axios";
import Swal from 'sweetalert2';

export default {
  name: "cdm_verify",
  components: {
    MainHeader
  },
  data: function() {
    return {
      verify: [],
      pickitem: [],
      list: {
        cdm_rekod: false
      },
      empty_table:{
          cdm_rekod: true
      }
    };
  },
  mounted: function() {
    this.loadCdmList();
  },
  methods: {
    pickAll: function(event){
        this.verify = []
        let checked = event.target.checked
        if(checked){
            this.list.cdm_rekod.forEach(value=>{
                this.verify.push(true)
            })
        }
    },
    verifyToConfirm: async function() {
      this.pickitem = [];
      let listPicked = this.verify;
      this.verify.forEach((value, key) => {
        if (value == true) {
          this.pickitem.push(this.list.cdm_rekod[key]);
        }
      });
      Swal.fire({
        title: "Are you sure!",
        text: `Are you sure to confirm a CDM payment for pulkam registration?`,
        type: "question",
        confirmButtonText: "Yes Verified",
        showCancelButton: true,
        cancelButtonText: "No..."
      }).then(result => {
        if (result.dismiss == "cancel") {
          this.pickitem = [];
          Swal.fire({
            title: "Ok, order received!!",
            type: "info",
            text: "Please make your decision again."
          });
        }
        if (result.value) {
          this.approveTransaction();
          Swal.fire({
            title: "Verified!!!",
            text: "Item picked is successfully verified",
            type: "success"
          });
        }
      });
    },
     approveTransaction: function(){
      let approveList = []
      this.pickitem.forEach(value => {
        if(value) approveList.push(value)
      })
      Axios.post(`${process.env.VUE_APP_BASE_API}cdm/confirm-approved`,approveList)
      .then(response => {
        let resp = response.data.response
        this.loadCdmList()
      })
    },
    loadCdmList: function() {
      Axios.get(
        `${process.env.VUE_APP_BASE_API}cdm/all-cdm?status=semakan-kedua`
      ).then(response => {
        let resp = response.data.response;
        this.list.cdm_rekod = resp;
        if (resp.length>0) {
            this.empty_table.cdm_rekod = false
        } else {
            this.empty_table.cdm_rekod = true
        }
      });
    }
  }
};
</script>
