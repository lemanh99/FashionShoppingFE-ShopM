export const activeData = (active, sort, products) => {
  function _(number) {
    return number <= 9 ? `0${number}` : number;
  }
  return `Showing ${
    products && products.length ? _(active * sort + 1) : "00"
  }– ${
    products && products.length > (active + 1) * sort
      ? _((active + 1) * sort)
      : _(products && products.length)
  }
     of ${_(products && products.length)} results`;
};

export const updateState = (state, payload) => {
  return state && state.includes(payload)
    ? state.filter((brand) => brand !== payload)
    : [...state, payload];
};

export const clickToActive = (activeArr, value, setActiveArr) => {
  if (activeArr.includes(value)) {
    setActiveArr(activeArr.filter((active) => active !== value));
  } else {
    setActiveArr([...activeArr, value]);
  }
};

export const scroll = () => {
  let offset = window.scrollY;
  const sticky = document.getElementById("header-sticky");
  if (sticky) {
    if (offset > 300) {
      sticky.classList.add("sticky-header");
    } else {
      sticky.classList.remove("sticky-header");
    }
  }
};

export const dblock = (active, id, sort) => {
  if (active === 0) {
    return id + 1 >= 0 && id + 1 <= sort ? "d-block" : "d-none";
  } else {
    return id + 1 > active * sort && id + 1 <= (active + 1) * sort
      ? "d-block"
      : "d-none";
  }
};

export const dataImage = () => {
  let d = document.querySelectorAll("[data-background");
  for (let i = 0; i < d.length; i++) {
    const element = d[i];
    element.style.backgroundImage = `url(${element.getAttribute(
      "data-background"
    )})`;
  }
};

export const getDiscount = (value, discount) => {
  const valueBeforDiscount = value - (value * discount) / 100;
  return valueBeforDiscount.toFixed(2);
};
export const totalPrice = (items) => {
  return (
    items &&
    items
      .map((item) => item.totalPrice)
      .reduce((prev, next) => prev + next, 0)
      .toFixed(2)
  );
};

export const splitText = (value, valueSplit) => {
  return value.split(valueSplit);
};

export const findFilterValue = (data, key, removeItem) => {
  let arr = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (typeof d[key] == "object") {
        for (let e = 0; e < d[key].length; e++) {
          const c = d[key][e];
          arr.push(c);
        }
      } else {
        arr.push(d[key]);
      }
    }
  }

  const filteredArr = arr.reduce((acc, current) => {
    const x = acc.find((item) => item === current);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  if (removeItem) {
    for (let i = 0; i < removeItem.length; i++) {
      const e = removeItem[i];
      var index = filteredArr.indexOf(e);
      if (index !== -1) {
        filteredArr.splice(index, 1);
      }
    }
  }
  let removeUndifin = filteredArr.filter((f) => f !== undefined && f);
  return removeUndifin;
};

export const arrLengthByKey = (data, key, value) => {
  return data && data.filter((d) => d[key] && d[key].includes(value)).length;
};

export const hideFromArr = (products) => {
  return (
    products && products.filter((product) => product.showProductPage !== false)
  );
};

export const animationCreate = () => {
  if (typeof window !== "undefined") {
    window.WOW = require("wowjs");
  }
  new WOW.WOW().init();
};

export const createMap = (value) => {
  return value ? value.split("/n") : [];
};

export const aTagClick = () => {
  const aTag = document.querySelectorAll("[href='#']");
  for (let i = 0; i < aTag.length; i++) {
    const a = aTag[i];
    a.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
};
