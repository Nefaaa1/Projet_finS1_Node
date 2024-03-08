import express from 'express';
import {homeView, deleteAddress} from '../controllers/home.js';
import AddressController from '../controllers/address.js';
import { addAddressView,addAddressSubmit } from '../controllers/addaddress.js';
import { modifieAddressView,modifieAddressSubmit } from '../controllers/modifieaddress.js';

const router = express.Router();


router.get("/", homeView)

router.get("/address/:id", AddressController)

router.get("/add/address", addAddressView)
router.post("/add/address", addAddressSubmit)

router.get("/modifie/address/:id", modifieAddressView)
router.post("/modifie/address/:id", modifieAddressSubmit)

router.delete("/delete/address/:id", deleteAddress)

export default router;