<template>
    <div>
        <MainHeader title="Tiket Pemohon" />
        <div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 text-left">
                            <table class="table table-sm mt-4">
              <tbody>
                <tr>
                  <th>Status Bayaran</th>
                  <td class="text-right text-uppercase"></td>
                </tr>
                <tr>
                  <th>Invois No</th>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <th style="vertical-align: top;">Pemohon</th>
                  <td class="text-right text-uppercase"></td>
                </tr>
                <tr>
                  <th style="vertical-align: top;">No Telefon</th>
                  <td class="text-right text-uppercase"></td>
                </tr>
                <tr>
                  <th style="vertical-align: top;">Email</th>
                  <td class="text-right"></td>
                </tr>

                <tr>
                  <th>Tarikh Invois</th>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <th>Cara Bayaran</th>
                  <td class="text-right text-uppercase"></td>
                </tr>

                <tr>
                  <td colspan="2">
                    <br>
                    <br>
                  </td>
                </tr>

                <tr>
                  <th>Kompaun</th>
                  <td class="text-right">MYR {{  }}</td>
                </tr>
                <tr>
                  <th>Cas Tambahan</th>
                  <td class="text-right">MYR {{  }}</td>
                </tr>
                <tr>
                  <th>Jumlah</th>
                  <td class="text-right">MYR {{  }}</td>
                </tr>

                <tr>
                  <td colspan="2" class="text-center pt-3 pb-0">
                    <barcode :value="barcode" height="50" display-value="true"></barcode>
                  </td>
                </tr>
              </tbody>
            </table>
                        </div>
                        <div class="col-8">
                            qrcode
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
export default {
    name: 'ticket_pemohon',
    components: {
        MainHeader
    }
}
</script>
