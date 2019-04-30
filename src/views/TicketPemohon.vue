<template>
  <div>
    <MainHeader class="no-print" title="Tiket Pemohon" />
    <div>
      <div class="card full-print">
        <div class="card-body">
          <div class="row">
            <div class="col-5 text-left">
              <table class="table table-sm mt-4">
                <tbody>
                  <tr>
                    <th>Status Bayaran</th>
                    <td class="text-right text-uppercase">
                      <div>
                        {{ ticket.payment ? ticket.payment.status : "" }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Invois No</th>
                    <td class="text-right">#2019-{{ ticket.temporary_id }}</td>
                  </tr>
                  <tr>
                    <th style="vertical-align: top;">Pemohon</th>
                    <td class="text-right text-uppercase">
                      {{ ticket.data_pemohon ? ticket.data_pemohon.nama : "" }}
                    </td>
                  </tr>
                  <tr>
                    <th style="vertical-align: top;">No Telefon</th>
                    <td class="text-right text-uppercase">
                      +
                      {{
                        ticket.data_pemohon
                          ? ticket.data_pemohon.kod_negara
                          : "" + ticket.data_pemohon.no_telefon
                      }}
                    </td>
                  </tr>
                  <tr>
                    <th style="vertical-align: top;">Email</th>
                    <td class="text-right">{{ ticket.data_pemohon.email }}</td>
                  </tr>

                  <tr>
                    <th>Tarikh Invois</th>
                    <td class="text-right">{{ ticket.timestamp }}</td>
                  </tr>
                  <tr>
                    <th>Cara Bayaran</th>
                    <td class="text-right text-uppercase">
                      {{ ticket.payment.option }}
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <br />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <th>Kompaun</th>
                    <td class="text-right">MYR 800.00</td>
                  </tr>
                  <tr>
                    <th>Cas Tambahan</th>
                    <td class="text-right">
                      <div v-if="ticket.payment.option == 'cdm'">MYR 0.00</div>
                      <div v-if="ticket.payment.option == 'billplz'">
                        MYR 1.50
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Jumlah</th>
                    <td class="text-right">
                      <div v-if="ticket.payment.option == 'cdm'">
                        MYR 800.00
                      </div>
                      <div v-if="ticket.payment.option == 'billplz'">
                        MYR 801.50
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2" class="text-center pt-3 pb-0">
                      <Barcode
                        :value="ticket.temporary_id"
                        height="50"
                        display-value="true"
                      ></Barcode>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-7">
              <h4>
                <strong>TARIKH TEMUJANJI</strong>
              </h4>
              <h3>
                {{ ticket.appointment.slot }} ({{ ticket.appointment.session }})
              </h3>
              <Qrcode
                v-if="ticket.payment"
                :value="qrtoken"
                :options="{ width: 290 }"
              ></Qrcode>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3 text-right no-print">
        <div class="btn btn-info" @click="printTicket">
          <i class="fa fa-print" aria-hidden="true"></i> Cetak Tiket
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>

<script>
import MainHeader from "@/components/MainHeader";
import Axios from "axios";
import Qrcode from "@chenfengyuan/vue-qrcode";
import Barcode from "vue-barcode";
import { API } from "../Config";

export default {
  name: "ticket_pemohon",
  components: {
    MainHeader,
    Barcode,
    Qrcode
  },
  data: function() {
    return {
      ticket: {
        data_pemohon: {},
        payment: {},
        appointment: {}
      },
      qrtoken: "--"
    };
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      Axios.get(
        API.baseurl +
          "register/info?regid=" +
          this.$route.params.register_id +
          "&tempid=" +
          this.$route.params.temporary_id
      ).then(response => {
        let resp = response.data.response;
        this.ticket = resp;
        this.generateQrCode();
      });
    },
    generateQrCode: function() {
      let body = {
        register_id: this.$route.params.register_id,
        temporary_id: this.$route.params.temporary_id,
        status: "paid"
      };
      Axios.post(API.baseurl + "register/CompleteProcess/", {
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        body: body
      }).then(response => {
        this.qrtoken = response.data.response.token;
      });
    },
    printTicket: function() {
      window.print();
    }
  }
};
</script>
