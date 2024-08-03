import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controller/merchant';
const router = express.Router();

router.get('/getProducts/:pageNumber/:limit', getProducts);
router.post('/addProduct', addProduct);
router.delete('/deleteProduct', deleteProduct);
router.put('/updateProduct/:id', updateProduct);

export default router;