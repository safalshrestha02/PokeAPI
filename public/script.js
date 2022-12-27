// display the API data in the doc

async function pokeApi() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const result = await res.json();

  const pokemon = result.results;
  // console.log(pokemon);
  let pokeId = 0;
  for (let i = 0; i < pokemon.length; i++) {
    let name = pokemon[i].name;
    let loadData = `
    <tr>
    <td id="pokeId">${(pokeId += 1)}</td>
    <td><img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${[
      i + 1,
    ]}.png"></td>
                    <td id="name" contentEditable>${name.charAt(0).toUpperCase()+name.slice(1)} </td>
                    <td><a href = "${pokemon[i].url}">${pokemon[i].url}</a></td>
                    <td><img src="./images/delete.png" alt="Delete Pokemon" class="delete" style = "height:30px"></td>

                    </tr>`;

    tbody.innerHTML += loadData;
  }
  //deleting a row when clickend on the delete row button
  const delRow = document.querySelectorAll(".delete");

  delRow.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.src = "./images/deleteFill.png";
      btn.style.transistion = "2s";
    });
    btn.addEventListener("mouseleave", () => {
      btn.src = "./images/delete.png";
    });
    btn.addEventListener("click", () => {
      let deleteRow = btn.parentElement;
      deleteRow2 = deleteRow.parentElement;
      deleteRow2.remove();
    });
  });
}

function editName(img) {
  var td = img.parentNode;

  td.innerHTML = '<input type="text" value="New cell content">';
}
//search function

function search() {
  const searchPoke = document.getElementById("searchPoke");
  //get the search input
  const searchQuery = searchPoke.value.toLowerCase();

  let data = document.getElementById("tbody");

  let rows = data.querySelectorAll("tr");

  for (i = 0; i < rows.length; i++) {
    cells = rows[i].querySelectorAll("#name");
    for (j = 0; j < cells.length; j++) {
      if (cells[j].textContent.toLowerCase().includes(searchQuery)) {
        found = true;
      }
    }
    if (found) {
      rows[i].style = "display: ";
      found = false;
    } else {
      rows[i].style = "display: none";
    }
  }
}

//sort according to the name
function sortAsc() {
  //geting the table
  const table = document.getElementById("tbody");
  //convert the selected rows into an array
  const rows = Array.from(table.rows);
  //sort the rows based on the values of the column
  rows.sort((a, b) => {
    const cell1 = a.cells[2];
    const cell2 = b.cells[2];
    const value1 = cell1.textContent;
    const value2 = cell2.textContent;

    if (value1 < value2) return -1;
    else return 1;
  });

  //appending the sorted rows into the table
  rows.forEach((row) => {
    table.appendChild(row);
  });
}

//sort in descending order
function sortDec() {
  //geting the table
  const table = document.getElementById("tbody");
  const rows = Array.from(table.rows);
  //sort the rows based on the values of the column
  rows.sort((a, b) => {
    const cell1 = a.cells[2];
    const cell2 = b.cells[2];
    const value1 = cell1.innerHTML;
    const value2 = cell2.innerHTML;

    if (value1 < value2) return 1;
    else return -1;
  });

  //appending the sorted rows into the table
  rows.forEach((row) => {
    table.appendChild(row);
  });
}

//sort id in ascending order
function sortAscId() {
  //geting the table
  const table = document.getElementById("tbody");
  //convert the selected rows into an array
  const rows = Array.from(table.rows);
  //sort the rows based on the values of the column
  rows.sort((a, b) => {
    const value1 = a.cells[0].textContent;
    const value2 = b.cells[0].textContent;

    return value1 - value2;
  });

  //appending the sorted rows into the table
  rows.forEach((row) => {
    table.appendChild(row);
  });
}

//sort id in descending order
function sortDecId() {
  //geting the table
  const table = document.getElementById("tbody");
  //convert the selected rows into an array
  const rows = Array.from(table.rows);
  //sort the rows based on the values of the column
  rows.sort((a, b) => {
    const value1 = a.cells[0].textContent;
    const value2 = b.cells[0].textContent;

    return value2 - value1;
  });
  //appending the sorted rows into the table
  rows.forEach((row) => {
    table.appendChild(row);
  });
}

pokeApi();
