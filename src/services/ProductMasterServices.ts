// src/services/ProductMasterService.ts
export interface ProductMasterDTO {
  productCode: string;
  productName: string;
  basePrice: number;
  image: string; // Lưu ý: Backend dùng "Image", nhưng frontend thường dùng "image" lowercase
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
      console.log('Phản hồi thô:', text.substring(0, 200) + '...');

      // Kiểm tra nếu là HTML từ ngrok (miễn phí có thể chèn warning)
      if (text.includes('<!DOCTYPE html') || text.includes('ngrok')) {
        console.warn('Phát hiện ngrok warning - không phải JSON. Hãy kiểm tra ngrok hoặc dùng localhost.');
        return [];
      }

      const data: ProductMasterDTO[] = JSON.parse(text);
      return data;

    } catch (error) {
      console.error('Lỗi fetch getAllProducts:', error);
      return [];
    }
  }
}

export default new ProductMasterService();
