import { setLocalStorage } from "./localstorage";

export const getProductByFilter = (data, filters) => {
  let filteredList = data && [...data];

  for (const key in filters) {
    if (key !== "price") {
      if (key === "search") {
        filteredList =
          filteredList &&
          filteredList.filter((data) =>
            data.name.toLowerCase().includes(filters[key].toLowerCase())
          );
      } else {
        if (key === "colors" || key === "category" || key === "tags") {
          filteredList = filterInArray(filteredList, filters[key], key);
        } else {
          filteredList = filterByKey(filteredList, filters[key], key);
        }
      }
    } else {
      filteredList = filterByPrice(filteredList, filters[key]);
    }
  }
  return filteredList;
};

function filterByKey(filteredList, size, key) {
  let list = [];
  if (!size || size.length === 0) return filteredList;
  for (let index = 0; index < filteredList.length; index++) {
    const product = filteredList[index];
    const isOk = size.indexOf(product[key]);
    if (isOk !== -1) {
      list.push(product);
    }
  }

  return list;
}

function filterByPrice(filteredList, price) {
  return (filteredList =
    filteredList &&
    filteredList.filter(
      (product) =>
        Number(product.mainPrice) >= price.min &&
        Number(product.mainPrice) <= price.max
    ));
}

function filterInArray(filteredList, value, key) {
  return filteredList && value.length > 0
    ? filteredList.filter(
      (data) => data[key] && data[key].find((f) => value.includes(f))
    )
    : filteredList;
}

export const simpleProductFilter = (key, arr) => {
  let isArr = typeof key !== "string" ? true : false;
  var sorted = isArr
    ? key &&
    key
      .map(function (value) {
        return value.toLowerCase();
      })
      .sort()
    : [key.toLowerCase()];

  return (
    arr &&
    arr.filter((arr) =>
      arr.category.find((e) =>
        e.toLowerCase().includes(sorted && sorted.join(","))
      )
    )
  );
};

export const exitsProduct = (state, item) => {
  let value =
    state && state.find((product) => Number(product.id) === Number(item.id)&&Number(product.product_sku_id) === Number(item.product_sku_id));
  return value;
};

export const updateCart = (state, item, type) => {
  const exitsCarts =
    state.carts &&
    state.carts.find((product) => Number(product.id) === Number(item.id)&&Number(product.product_sku_id) === Number(item.product_sku_id));
  let result = {};

  if (state.carts) {
    if (exitsCarts) {
      let quantity = item.qty?item.qty:1
      exitsCarts.qty =
        type === "+" ? (exitsCarts.qty += quantity) : (exitsCarts.qty -= 1);
      exitsCarts.totalPrice =
        Number(exitsCarts.qty) * Number(exitsCarts.mainPrice);
      setLocalStorage("shopm-ecommerce", state.carts);
      result = {
        ...state,
        carts: [...state.carts],
      };
    } else {
      item.qty = item.qty?item.qty:1;
      item.totalPrice = Number(item.mainPrice);
      setLocalStorage("shopm-ecommerce", [...state.carts, item]);
      result = {
        ...state,
        carts: [...state.carts, item],
      };
    }
  }
  return result;
};
