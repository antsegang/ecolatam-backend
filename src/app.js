import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "./config.js";

import admin from "./modules/admin/routes.js";
import auth from "./modules/auth/routes.js";
import bcategory from "./modules/bcategory/routes.js";
import bkyc from "./modules/bkyc/routes.js";
import business from "./modules/business/routes.js";
import business_review from "./modules/business_review/routes.js";
import business_review_volunteer from "./modules/business_review_volunteer/routes.js";
import canton from "./modules/canton/routes.js";
import csagent from "./modules/csagent/routes.js";
import csagent_review from "./modules/csagent_review/routes.js";
import distrito from "./modules/distrito/routes.js";
import idtype from "./modules/idtype/routes.js";
import inspector from "./modules/inspector/routes.js";
import pais from "./modules/pais/routes.js";
import product from "./modules/product/routes.js";
import product_review from "./modules/product_review/routes.js";
import provincia from "./modules/provincia/routes.js";
import regel from "./modules/regel/routes.js";
import service from "./modules/service/routes.js";
import service_review from "./modules/service_review/routes.js";
import superadmin from "./modules/superadmin/routes.js";
import tour_guide from "./modules/tour_guide/routes.js";
import tour_guide_review from "./modules/tour_guide_review/routes.js";
import ukyc from "./modules/ukyc/routes.js";
import users from "./modules/users/routes.js";
import vip from "./modules/vip/routes.js";
import volunteer from "./modules/volunteer/routes.js";
import volunteer_review_business from "./modules/volunteer_review_business/routes.js";
import clients from "./modules/clients/routes.js";

import { errors } from "./net/errors.js";

export const app = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Configuraciones
app.set("port", config.app.port);

//Rutas
app.use("/api/admin", admin);
app.use("/api/auth", auth);
app.use("/api/bcategory", bcategory);
app.use("/api/bkyc", bkyc);
app.use("/api/business", business);
app.use("/api/business_review", business_review);
app.use("/api/business_review_volunteer", business_review_volunteer);
app.use("/api/canton", canton);
app.use("/api/csagent", csagent);
app.use("/api/csagent_review", csagent_review);
app.use("/api/distrito", distrito);
app.use("/api/idtype", idtype);
app.use("/api/inspector", inspector);
app.use("/api/pais", pais);
app.use("/api/product", product);
app.use("/api/product_review", product_review);
app.use("/api/provincia", provincia);
app.use("/api/regel", regel);
app.use("/api/service", service);
app.use("/api/service_review", service_review);
app.use("/api/superadmin", superadmin);
app.use("/api/tour_guide", tour_guide);
app.use("/api/tour_guide_review", tour_guide_review);
app.use("/api/ukyc", ukyc);
app.use("/api/users", users);
app.use("/api/vip", vip);
app.use("/api/volunteer", volunteer);
app.use("/api/volunteer_review_business", volunteer_review_business);
app.use("/api/clients", clients);

app.use(errors);
