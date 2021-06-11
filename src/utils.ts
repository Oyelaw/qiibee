export function errorParser(errors, touched, key) {
  return errors[key] && touched[key] && errors[key];
}

export function resizeImage(url = "", size: string) {
  return url.split("upload")[0] + "upload/" + size + url.split("upload")[1];
}

export function getAsset(asset: string) {
  return "/" + asset;
}
