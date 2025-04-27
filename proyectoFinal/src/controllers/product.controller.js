import { request, response } from "express";
import { productServices } from "../services/product.services.js";
import { errorLog } from "../utils/errorLog.js";

class ProductControllers{
    async getAllProducts (req = request, res= response)  {
      try {
        const { limit, page, sort, category, status } = req.query;
    
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: {
            price: sort === "asc" ? 1 : -1,
          },
          learn: true,
        };
    
        // Si nos solicitan por categoría
        if (category) {
          const products = await productServices.getAll({ category }, options);
          return res.status(200).json({ status: "ok", products });
        }
    
        if (status) {
          const products = await productServices.getAll({ status }, options);
          return res.status(200).json({ status: "ok", products });
        }
    
        const products = await productServices.getAll({}, options);
        res.status(200).json({ status: "ok", products });
      } catch (error) {
        errorLog(error, req);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    }
    async getProductsById (req = request, res= response)  {
        try {
          const { pid } = req.params;
          const product = await productServices.getById(pid);
          if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      
          res.status(200).json({ status: "ok", product });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
      }

      async deleteProducts (req = request, res= response) {
        try {
          const { pid } = req.params;
          const product = await productServices.deleteOne(pid);
          if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      
          res.status(200).json({ status: "ok", msg: `El producto con el id ${pid} fue eliminado` });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
      }
      async updateProducts (req = request, res= response) {
        try {
          const { pid } = req.params;
          const productData = req.body;
          const product = await productServices.update(pid, productData);
          if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      
          res.status(200).json({ status: "ok", product });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
      }

      async createProducts (req = request, res= response) {
        try {
          const productData = req.body;
          const product = await productServices.create(productData);
      
          res.status(201).json({ status: "ok", product });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
      }
}

export const  productControllers = new ProductControllers ();