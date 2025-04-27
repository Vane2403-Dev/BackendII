import { request, response } from "express";
import { productServices } from "../services/product.services.js";
import { cartServices } from "../services/cart.services.js";
import { errorLog } from "../utils/errorLog.js";
import {ticketService} from "../services/ticket.services.js"


class CartControllers {
    async createCart (req = request , res = response) {
      try {
        const cart = await cartServices.createCart();
    
        res.status(201).json({ status: "ok", cart });
      } catch (error) {
        errorLog(error, req);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
      }
    }
    async getById (req = request , res = response)  {
      try {
        const { cid } = req.params;
        const cart = await cartServices.getCartById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
    
        res.status(200).json({ status: "ok", cart });
      } catch (error) {
        errorLog(error, req);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    }
    async addProductToCart (req = request , res = response) {
      try {
        const { cid, pid } = req.params;
        const product = await productServices.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        const cart = await cartServices.getCartById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
        const cartUpdate = await cartServices.addProductToCart(cid, pid);
        res.status(200).json({ status: "ok", payload: cartUpdate });
      } catch (error) {
        errorLog(error, req);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    }
    async deleteProductToCart (req = request , res = response) {
      try {
        const { cid, pid } = req.params;
        const product = await productServices.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        const cart = await cartServices.getCartById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
        const cartUpdate = await cartServices.deleteProductToCart(cid, pid);
    
        res.status(200).json({ status: "ok", payload: cartUpdate });
      } catch (error) {
        errorLog(error, req);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    }
    async  updateQuantityProductInCart (req = request , res = response) {
        try {
          const { cid, pid } = req.params;
          const { quantity } = req.body;
          const product = await productServices.getById(pid);
          if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
          const cart = await cartServices.getCartById(cid);
          if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
          // Validación de la cantidad
        if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ status: "Error", msg: "La cantidad debe ser un número mayor a 0" });
          }
      
          const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));
      
          res.status(200).json({ status: "ok", payload: cartUpdate });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
      }
      
      async clearProductsToCart  (req = request , res = response)  {
        try {
          const { cid } = req.params;
          const cart = await cartServices.clearProductsToCart(cid);
          if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
      
          res.status(200).json({ status: "ok", cart });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
      }

      async purchaseCart(req = request, res = response) {
        try {
          const { cid } = req.params;
          const cart = await cartServices.getCartById(cid);
          if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
          const total = await cartServices.purchaseCart(cid);
          const ticket = await ticketService.createTicket(total, req.user.email);
         
          
    
          res.status(200).json({ status: "ok", ticket });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
      }
    }



export const cartController = new CartControllers();