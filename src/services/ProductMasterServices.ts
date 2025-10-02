// src/services/ProductMasterService.ts
export interface ProductMasterDTO {
  productCode: string;
  productName: string;
  basePrice: number;
  image: string;
  defaultToppingConsumptionQuantity?: number;
  shelfLife?: number;
  isActive?: boolean;
  miniumStockLevel?: number;
  maxiumStockLevel?: number;
  updateBy?: string;
  updateTime?: string;
  productTypeId?: number;
  uomId?: string;
}

class ProductMasterService {
  private apiUrl = import.meta.env.VITE_API_BASE_URL + '/api/ProDuctMaster';

  async getAllProducts(): Promise<ProductMasterDTO[]> {
    try {
      console.log('Đang fetch từ:', `${this.apiUrl}/GetAllProductMaster`);
      const response = await fetch(`${this.apiUrl}/GetAllProductMaster`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
      });

      if (!response.ok) {
        console.error('HTTP error', response.status, response.statusText);
        return [];
      }
      const text = await response.text();
      const data: ProductMasterDTO[] = JSON.parse(text);
      return data;

    } catch (error) {
      console.error('Lỗi fetch getAllProducts:', error);
      return [];
    }
  }
}

export default new ProductMasterService();
