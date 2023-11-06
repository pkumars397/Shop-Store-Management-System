const form = document.getElementById("form");

// Showing the details from the crud crud after refreshing the page
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails"
    );
    if (response.status == 200) {
      let items = response.data;
      items.forEach((item) => {
        showDetails(item);
      });
    } else {
      throw new Error("Something Went Wrong API limit Execeeded");
    }
  } catch (Error) {
    const ul = document.getElementById("list");
    ul.innerHTML =
      ul.innerHTML +
      `<div style="background-color:rgb(177, 52, 21); padding:4px;"><pre>${Error}</pre></div>`;
  }
});

// Adding eventListner when submit happens then,send the data to crud crud. and also show on screen after sending the data.
form.addEventListener("submit", async (event) => {
  console.log(event);
  event.preventDefault();
  const details = {
    item: event.target.item.value,
    description: event.target.Description.value,
    price: event.target.price.value,
    quantity: event.target.quantity.value,
  };

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails",
      details
    );
    if (response.status == 201) {
      showDetails(response.data);
      event.target.item.value = "";
      event.target.Description.valu = "";
      event.target.price.value = "";
      event.target.quantity.value = "";
    } else {
      throw new Error("Error posting data");
    }
  } catch (error) {
    console.log(error);
  }
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

async function buy1(obj) {
  if (obj.quantity >= 1) obj.quantity -= 1;
  newDetails = {
    item: obj["item"],
    description: obj["description"],
    price: obj["price"],
    quantity: obj["quantity"],
  };
  try {
    const updateData = await axios.put(
      `https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails/${obj._id}`,
      newDetails
    );
    const getData = await axios.get(
      `https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails/${obj._id}`
    );
    if (getData.status == 200) update(getData.data, obj);
    else throw new Error("unable to find the data");
  } catch (error) {
    console.log(error);
  }
}

async function buy2(obj) {
  obj.quantity >= 2 ? (obj.quantity -= 2) : obj.quantity;
  newDetails = {
    item: obj["item"],
    description: obj["description"],
    price: obj["price"],
    quantity: obj["quantity"],
  };

  try {
    const updateData = await axios.put(
      `https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails/${obj._id}`,
      newDetails
    );
    const getData = await axios.get(
      `https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails/${obj._id}`
    );
    if (getData.status == 200) update(getData.data, obj);
    else throw new Error("unable to find the data");
  } catch (error) {
    console.log(error);
  }
}

async function buy3(obj) {
  obj.quantity >= 3 ? (obj.quantity -= 3) : obj.quantity;
  newDetails = {
    item: obj["item"],
    description: obj["description"],
    price: obj["price"],
    quantity: obj["quantity"],
  };

  try {
    const updateData = await axios.put(
      `https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails/${obj._id}`,
      newDetails
    );
    const getData = await axios.get(
      `https://crudcrud.com/api/64e7ce9ee3704f6f8771aa92e7343674/StoreDetails/${obj._id}`
    );
    if (getData.status == 200) update(getData.data, obj);
    else throw new Error("unable to find the data");
  } catch (error) {
    console.log(error);
  }
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
