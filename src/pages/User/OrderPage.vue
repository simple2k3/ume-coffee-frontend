<template>
  <div class="product-list-container">
    <h1>Danh Sách Sản Phẩm</h1>
    <div class="category">
      <button>
      </button>
    </div>

    <div class="products-grid">
      <div v-for="product in productList" :key="product.productCode" class="product-card">

        <img :src="product.image "/>
        <h3>{{ product.productName }}</h3>
        <p class="price">{{ (product.basePrice ?? 0).toLocaleString('vi-VN') }}₫</p>
      </div>
    </div>

    <p v-if="productList.length === 0">Chưa có sản phẩm nào.</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import ProductMasterService from '@/services/ProductMasterServices';
import type { ProductMasterDTO } from '@/services/ProductMasterServices';

export default {
  name: 'ProductList',
  setup() {
    const productList = ref<ProductMasterDTO[]>([]);

    const loadProducts = async () => {
      const data = await ProductMasterService.getAllProducts();
      productList.value = data;
      console.log('Danh sách sản phẩm:', data);
    };

    onMounted(() => {
      loadProducts();
    });

    return { productList };
  }
};
</script>

<style scoped>
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.product-card h3 {
  margin: 10px 0 5px 0;
  font-size: 16px;
}

.product-card .price {
  color: #239a82;
  font-weight: bold;
}
</style>
