
<template>
  <div class="qr-container">
    <h1>Quét để vào Menu</h1>
    <qrcode-vue :value="qrUrl" :size="200" level="H" />
    <p>Quét mã QR để xem menu trên điện thoại</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import QrcodeVue from 'qrcode.vue';
import TableMasterService from '@/services/QRcodeServices';

export default defineComponent({
  name: 'QRPage',
  components: { QrcodeVue },
  setup() {
    const qrUrl = ref('');

    onMounted(async () => {
      try {
        const selectedTable = await TableMasterService.getSelectedTable();
        if (selectedTable) {
          qrUrl.value = `https://github.com/simple2k3/ume-coffee-frontend.git//order?tableId=${selectedTable.TableId}&tableName=${encodeURIComponent(selectedTable.TableName)}`;
        } else {
          qrUrl.value = 'https://github.com/simple2k3/ume-coffee-frontend.git/'; // Fallback
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu bàn:', error);
        qrUrl.value = 'https://github.com/simple2k3/ume-coffee-frontend.git/'; // Fallback
      }
    });

    return { qrUrl };
  },
});
</script>

<style scoped>
.qr-container {
  text-align: center;
  padding: 50px;
  background-color: white;
  margin: 20px auto;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #555;
  font-size: 1rem;
  margin-top: 10px;
}
</style>
```
