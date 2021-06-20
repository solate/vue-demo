import { get, post } from "./request";

//登陆
export const login = (params) => post("/api/login", params);

//上传
export const upload = (upload) => get("/api/upload", upload);
