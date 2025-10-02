import axios from 'axios';

export interface TableMasterDTO {
  StatusCode: number;
  TableId: number;
  TableName: string;
}

class TableMasterService {
  private apiUrl: string;
  constructor() {
    this.apiUrl = import.meta.env.VITE_API_BASE_URL as string;
    if (!this.apiUrl) {
      throw new Error('VITE_API_BASE_URL không được định nghĩa trong .env');
    }
  }

  // Lấy tất cả bàn
  async getAllTables(): Promise<TableMasterDTO[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/api/TableMaster/GetAllTableMaster`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Lỗi API: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error;
    }
  }


  async getSelectedTable(): Promise<TableMasterDTO | null> {
    try {
      const tables = await this.getAllTables();
      return tables.find(table => table.StatusCode === 0) || tables[0] || null;
    } catch (error) {
      console.error('Lỗi khi lấy bàn:', error);
      return null;
    }
  }
}

export default new TableMasterService();
