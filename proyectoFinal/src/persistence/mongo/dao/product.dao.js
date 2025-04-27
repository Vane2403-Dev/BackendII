import { productModel } from "../models/product.model.js";
import mongoose from "mongoose";

class ProductDao {
  async getAll(query, options) {
    try {
      const products = await productModel.paginate(query, options);
      return products;
    } catch (error) {
      throw new Error("Error al obtener los productos");
    }
  }

  // Método para obtener un producto por ID
  async getById(id) {
    // Convertir id a ObjectId sin validación
    const objectId = new mongoose.Types.ObjectId(id);
    try {
      const product = await productModel.findOne({ _id: objectId });
      return product;
    } catch (error) {
      throw new Error("Error al obtener el producto");
    }
  }

  async create(data) {
    try {
      const product = await productModel.create(data);
      return product;
    } catch (error) {
      throw new Error("Error al crear el producto");
    }
  }

  async update(id, data) {
    // Convertir id a ObjectId sin validación
    const objectId = new mongoose.Types.ObjectId(id);
    try {
      const productUpdate = await productModel.findByIdAndUpdate(objectId, data, { new: true });
      return productUpdate;
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }

  async deleteOne(id) {
    // Convertir id a ObjectId sin validación
    const objectId = new mongoose.Types.ObjectId(id);
    try {
      const product = await productModel.findByIdAndUpdate(objectId, { status: false }, { new: true });
      return product;
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }
}

export const productDao = new ProductDao();
