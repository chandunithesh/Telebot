export let imageData = (file) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(e.target.result);
    fileReader.onerror = () => reject("Not Converted");
    fileReader.readAsDataURL(file);
  });
};
