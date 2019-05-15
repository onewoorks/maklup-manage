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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, key) in list.cdm_rekod" v-bind:key="key">
                                <td>{{ key+1 }}</td>
                                <td></td>
                                <td class='text-uppercase'>{{ item.seq_id+''+ item.cdm_id }}</td>
                                <td class='text-uppercase text-left'>{{ (item.data_pemohon == null) ? '' : item.data_pemohon.nama }}</td>
                                <td>{{ (item.data_pemohon == null) ? '' : item.appointment_slot + ' ' + item.appointment_session }}</td>
                                <td> {{ (item.cdm_data == null ) ? '': item.cdm_data.tarikh_bayaran + ' ' + item.cdm_data.masa_bayaran}}</td>
                                <td></td>
                                <td>
                                    <input type='checkbox' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
import MainHeader from '@/components/MainHeader'
import Axios from 'axios'

export default {
    name: 'cdm_verify',
    components: {
        MainHeader
    },
    data: function(){
        return {
            list: {
                cdm_rekod: ''
            }
        }
    },
    mounted: function(){
        this.loadCdmList()
    },
    methods: {
        loadCdmList: function() {
            Axios.get(`${process.env.VUE_APP_BASE_API}cdm/all-cdm` )
            .then(response => {
                let resp = response.data.response
                console.log(resp)
                this.list.cdm_rekod = resp
            })
        }
    }
}
</script>
