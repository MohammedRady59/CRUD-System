const addproduct = document.getElementById("addProduct");
const empoeAdd = document.getElementById("pageAdd");
const noAdd = document.getElementById("pagenoAdd");

const close = document.querySelector(".close");
const btnadd = document.getElementById("btnAdd");
const btnupdate = document.getElementById("btnupdate");

const btnNoadd = document.querySelector(".btnokNo");
const tableBody = document.getElementById("rowdata");

const deleteAll = document.getElementById("deleteAll");
let btndeleteItem;
let indexupdate;
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");

let inputs = [productName, productCategory, productDescription, productPrice];

let prouductArr = [];

if (localStorage.getItem("products") !== null) {
  prouductArr = JSON.parse(localStorage.getItem("products"));
  renderData();
}
function closeModel() {
  empoeAdd.classList.add("d-none");
}

close.addEventListener("click", closeModel);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModel();
  }
});

addproduct.addEventListener("click", function () {
  empoeAdd.classList.remove("d-none");
  btnadd.classList.remove("d-none");
  btnupdate.classList.add("d-none");
});

btnadd.addEventListener("click", function () {
  if (
    validation(productName) &&
    validation(productCategory) &&
    validation(productDescription) &&
    validation(productPrice)
  ) {
    const prouduct = {
      name: productName.value,
      price: productPrice.value,
      catogory: productCategory.value,
      descruption: productDescription.value,
    };
    //Push To Array
    prouductArr.push(prouduct);
    //clearData
    clearData();
    //close Model
    closeModel();
    //localStorage
    localStorage.setItem("products", JSON.stringify(prouductArr));
    //Draw Proudct to Html
    renderData();
  } else {
    noAdd.classList.remove("d-none");
    closeModel();
  }
});
btnNoadd.addEventListener("click", function () {
  noAdd.classList.add("d-none");
});
function clearData() {
  productName.value = null;
  productDescription.value = null;
  productPrice.value = null;
  productCategory.value = null;
}
function renderData() {
  tableBody.innerHTML = " ";
  prouductArr.forEach((el, i) => {
    const html = `
    <tr>
    <td>${i + 1}</td>
    <td>${el.name}</td>
    <td>${el.price}</td>
    <td>${el.catogory}</td>
    <td>${el.descruption}</td>

    <td>
      <button class="btn btn-outline-warning btn-sm  updateItem" data-index="${i}" >
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="btn btn-outline-danger btn-sm deleteItem" data-index="${i}">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>`;
    tableBody.insertAdjacentHTML("afterbegin", html);
  });
  btndeleteItem = document.querySelectorAll(".deleteItem");
  btndeleteItem.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = btn.dataset.index;
      prouductArr.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(prouductArr));
      renderData();
    });
  });
  const updateItems = document.querySelectorAll(".updateItem");

  updateItems.forEach((el) => {
    el.addEventListener("click", function () {
      empoeAdd.classList.remove("d-none");
      indexupdate = el.dataset.index;
      productName.value = prouductArr[indexupdate].name;
      productCategory.value = prouductArr[indexupdate].catogory;
      productDescription.value = prouductArr[indexupdate].descruption;
      productPrice.value = prouductArr[indexupdate].price;
      btnadd.classList.add("d-none");
      btnupdate.classList.remove("d-none");
    });
  });
}
btnupdate.addEventListener("click", function () {
  const proudctUpdate = {
    name: productName.value,
    price: productPrice.value,
    catogory: productCategory.value,
    descruption: productDescription.value,
  };

  prouductArr.splice(indexupdate, 1, proudctUpdate);
  localStorage.setItem("products", JSON.stringify(prouductArr));
  renderData();
  closeModel();
  clearData();
});
deleteAll.addEventListener("click", function () {
  prouductArr.length = 0;
  localStorage.setItem("products", JSON.stringify(prouductArr));
  renderData();
});

function validation(element) {
  const text = element.value;
  const regex = {
    productName: /^.{3,}$/,
    productPrice: /^[0-9]{2,5}$/,
    productCategory: /^(tv|mobile|electronic|Screens)$/i,
    productDescription: /^.{3,}$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-vaild");
    element.classList.add("is-invalid");
    return false;
  }
}

inputs.forEach((el) => {
  el.addEventListener("input", function () {
    validation(this);
  });
});
