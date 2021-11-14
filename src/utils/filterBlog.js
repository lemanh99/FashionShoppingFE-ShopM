export const filterBlog = (key, arr) => {
  let isArr = typeof key !== "string" ? true : false;
  var sorted = isArr
    ? key
        .map(function (value) {
          return value.toLowerCase();
        })
        .sort()
    : [key.toLowerCase()];

  return (
    arr &&
    arr.filter((arr) =>
      arr.category.find((e) =>
        sorted.join(",").toLowerCase().includes(e.toLowerCase())
      )
    )
  );
};
