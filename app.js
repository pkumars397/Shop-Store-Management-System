const form = document.getElementById("form");

// Showing the details from the crud crud after refreshing the page
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails"
    )
    .then((responce) => {
      let items = responce.data;
      items.forEach((item) => {
        showDetails(item);
      });
    })
    .catch((error) => {
      const ul = document.getElementById("list");
      error = "Api request Limit Exceeded";
      ul.innerHTML =
        ul.innerHTML +
        `<div style="background-color:rgb(177, 52, 21); padding:4px;"><pre>Something Wrong  ${error}</pre></div>`;
    });
});

// Adding eventListner when submit happens then,send the data to crud crud. and also show on screen after sending the data.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const details = {
    item: event.target.item.value,
    description: event.target.Description.value,
    price: event.target.price.value,
    quantity: event.target.quantity.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails",
      details
    )
    .then((responce) => {
      showDetails(responce.data);
    })
    .catch((error) => console.log(error));
});

// Showing the Details available about goods in Shoping store.
const showDetails = function (obj) {
  // console.log(obj);
  const list = document.getElementById("list");
  let li = `<pre id='${obj._id}'><li
  }' style="background-color:lightblue; padding:8px"> ItemName: ${
    obj.item
  }, Description: ${obj.description} Price: ${obj.price}, Quantity: ${
    obj.quantity
  } <button onclick=buy1(${JSON.stringify(
    obj
  )})> Buy 1 </button> <button onclick=buy2(${JSON.stringify(
    obj
  )})> Buy 2 </button> <button onclick=buy3(${JSON.stringify(
    obj
  )})> Buy 3 </button></li></pre>`;
  list.innerHTML = list.innerHTML + li;
};

function buy1(obj) {
  if (obj.quantity >= 1) obj.quantity -= 1;
  newDetails = {
    item: obj["item"],
    description: obj["description"],
    price: obj["price"],
    quantity: obj["quantity"],
  };

  axios
    .put(
      `https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails/${obj._id}`,
      newDetails
    )
    .then(() => {
      axios
        .get(
          `https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails/${obj._id}`
        )
        .then((response) => {
          update(response.data, obj);
        });
    });
}

function buy2(obj) {
  obj.quantity >= 2 ? (obj.quantity -= 2) : obj.quantity;
  newDetails = {
    item: obj["item"],
    description: obj["description"],
    price: obj["price"],
    quantity: obj["quantity"],
  };

  axios
    .put(
      `https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails/${obj._id}`,
      newDetails
    )
    .then(() => {
      axios
        .get(
          `https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails/${obj._id}`
        )
        .then((response) => {
          update(response.data, obj);
        });
    });
}
function buy3(obj) {
  obj.quantity >= 3 ? (obj.quantity -= 3) : obj.quantity;
  newDetails = {
    item: obj["item"],
    description: obj["description"],
    price: obj["price"],
    quantity: obj["quantity"],
  };

  axios
    .put(
      `https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails/${obj._id}`,
      newDetails
    )
    .then(() => {
      axios
        .get(
          `https://crudcrud.com/api/cc4a3711f7c6403f8adb0e067d15c4c7/StoreDetails/${obj._id}`
        )
        .then((response) => {
          update(response.data, obj);
        });
    });
}

function update(newData, obj) {
  const li = document.getElementById(`${obj._id}`);
  li.innerHTML = `<pre><li id='${obj._id}'
  }' style="background-color:lightblue; padding:8px"> ItemName: ${
    newData.item
  }, Description: ${newData.description} Price: ${newData.price}, Quantity: ${
    newData.quantity
  } <button onclick=buy1(${JSON.stringify(
    obj
  )})> Buy 1 </button> <button onclick=buy2(${JSON.stringify(
    obj
  )})> Buy 2 </button> <button onclick=buy3(${JSON.stringify(
    obj
  )})> Buy 3 </button></li></pre>`;
}
