<template>
  <div class="container">
      <div class="box">
          <h1 class="has-text-centered has-text-black is-size-3"><strong>TRANSACTION HISTORY</strong></h1><hr>
            <div class="columns">
                <div class="box">
                    <table class="table is-responsive">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Transaction Details</th>
                          <th>Grand Total (IDR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(invoice, index) in invoices.invoice" :key="index">
                          <td>{{ index+1 }}</td>
                          <td>{{invoice.transactionDetails}}</td>
                          <td>Rp {{formatPrice(invoice.total)}},00</td>
                        </tr>     
                      </tbody>
                    </table>  
                </div>               
            </div>
      </div>    
  </div>  
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'invoices',
  computed: {
    ...mapState(['invoices'])
  },
  methods: {
    formatPrice(price) {
      return `${price.toLocaleString('id-ID', 'currency')}`;
    }
  },
  created() {
    this.$store.dispatch('fetchInvoices')
  }
}
</script>

<style>

</style>