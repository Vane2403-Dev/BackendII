import { productDao } from "../persistence/mongo/dao/product.dao.js"

class ProductServices {
    async createProduct(data) {
        return await productDao.create(data)
    }
    
 async getById(id) {
    const product = await productDao.getById(id);
    return product;
  }

  async getAll() {
    const product = await productDao.getAll();
    return product;
  }

  async create(data) {
    const product = await productDao.create(data);
    return product;
  }

  async update(id, data) {
    const productUpdate = await productDao.update(id, data);
    return productUpdate;
  }

  async deleteOne(id) {
    const product = await productDao.deleteOne(id);
    return product;
  }
}

export const productServices = new ProductServices();