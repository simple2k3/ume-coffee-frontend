<template>
  <div class="product-list-container">
    <div class="cf">
      <h1>UME COFFEE</h1>
      <button class="menu-btn" @click="toggleMenu">☰</button>
    </div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ open: isOpen }">
      <ul>
        <li @click="closeMenu">Trang chủ</li>
        <li @click="closeMenu">Sản phẩm</li>
        <li @click="closeMenu">Khuyến mãi</li>
        <li @click="closeMenu">Liên hệ</li>
      </ul>
    </div>

    <!-- Overlay-->
    <div v-if="isOpen" class="overlay" @click="closeMenu"></div>

    <!-- Danh sách sản phẩm -->
    <div class="products-grid">
      <div v-for="product in productList" :key="product.productCode" class="product-card">
        <img :src="product.image" />
        <h3>{{ product.productName }}</h3>
        <p class="price">{{ (product.basePrice ?? 0).toLocaleString('vi-VN') }}₫</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductMasterService from '@/services/ProductMasterServices'
import type { ProductMasterDTO } from '@/services/ProductMasterServices'

const productList = ref<ProductMasterDTO[]>([])
const isOpen = ref(false)

const loadProducts = async () => {
  const data = await ProductMasterService.getAllProducts()
  productList.value = data
  console.log('Danh sách sản phẩm:', data)
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
const closeMenu = () => {
  isOpen.value = false
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
/* Header */
.cf {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  position: relative;
}

h1 {
  font-size: 48px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #6b4226;
}

/* Container */
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Grid sản phẩm */
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
  text-align: center;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
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

/* Nút menu */
.menu-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #6b4226;
  color: white;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1200;
}
.sidebar.open {
  transform: translateX(0); /* trượt vào */
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}


.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1100;
}

@media (max-width: 768px) {
  h1 {
    font-size: 28px;
  }

  .menu-btn {
    font-size: 24px;
    top: 15px;
    left: 15px;
  }

  .sidebar {
    width: 30%;
    left: -100%;
  }
  .sidebar.open {
    left: 0;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-card img {
    height: 200px;
  }
}
</style>
