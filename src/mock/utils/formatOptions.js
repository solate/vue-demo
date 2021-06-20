import qs from "qs";

export default function formatOptions(options) {
  let { url, type, body } = options;
  let params = null;
  if (type === "GET" || type === "DELETE") {
    let index = url.indexOf("?");
    let paramsString = index > -1 ? url.slice(index + 1) : "";
    if (paramsString !== "") {
      params = qs.parse(paramsString);
    }
  } else {
    params = {};
    if (body instanceof FormData) {
      for (let [key, value] of body.entries()) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    } else {
      try {
        params = JSON.parse(body);
      } catch (e) {
        params = qs.parse(body);
      }
    }
  }
  if (params !== null && Object.keys(params).length === 0) {
    params = null;
  }
  return { url, type, params };
}
