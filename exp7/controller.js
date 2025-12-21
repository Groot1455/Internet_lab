<script>
/* -------- MODEL (Simulated DB) -------- */
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}
if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify([
    {title:"Java", author:"Herbert", version:"1st", publisher:"Pearson", cost:500},
    {title:"Web", author:"Tim", version:"2nd", publisher:"OReilly", cost:450}
  ]));
}

/* -------- LOGIN -------- */
function loginUser(event){
  event.preventDefault();
  let id = login.id.value;
  let pwd = login.pwd.value;

  let users = JSON.parse(localStorage.getItem("users"));
  let found = users.find(u => u.id===id && u.pwd===pwd);

  if(found){
    sessionStorage.setItem("user", id);
    document.body.innerHTML = `
      <h3>VALID LOGIN</h3>
      <ul>
        <li><a href="profile.html">USER PROFILE</a></li>
        <li><a href="catalog.html">BOOK CATALOG</a></li>
        <li><a href="order.html">ORDER</a></li>
      </ul>`;
  } else {
    alert("Invalid Login");
  }
}

/* -------- REGISTRATION -------- */
function registerUser(event){
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));

  users.push({
    name: reg.name.value,
    addr: reg.addr.value,
    phno: reg.phno.value,
    id: reg.id.value,
    pwd: reg.pwd.value
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration Successful");
  location.href="login.html";
}

/* -------- PROFILE -------- */
function loadProfile(){
  let id = sessionStorage.getItem("user");
  let users = JSON.parse(localStorage.getItem("users"));
  let u = users.find(x => x.id===id);

  document.getElementById("profile").innerHTML = `
    NAME: ${u.name}<br>
    ADDRESS: ${u.addr}<br>
    PHONE: ${u.phno}`;
}

/* -------- CATALOG -------- */
function showBook(event){
  event.preventDefault();
  let title = catalog.title.value;
  let books = JSON.parse(localStorage.getItem("books"));
  let b = books.find(x => x.title===title);

  if(b){
    document.getElementById("book").innerHTML = `
      TITLE: ${b.title}<br>
      AUTHOR: ${b.author}<br>
      COST: ${b.cost}`;
  } else alert("Book not found");
}

/* -------- ORDER -------- */
function placeOrder(event){
  event.preventDefault();
  let qty = parseInt(order.no.value);
  let title = order.title.value;
  let books = JSON.parse(localStorage.getItem("books"));
  let b = books.find(x => x.title===title);
  alert("Amount: " + (b.cost * qty));
}
</script>
