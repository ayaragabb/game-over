class Api {
  async getData(category) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "48f5c1dc79msh600554932765449p1dea94jsn3f65d79a0c75",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let res = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${category}&sort-by=release-date`,
      options
    );
    let myData = await res.json();

    this.display(myData);
  }

  display(myData) {
    let cartona = ``;
    for (let i = 0; i < myData.length; i++) {
      cartona += `
             <div class="col-md-4">
                  <div class="card my-card" style="width: 18rem;" data-id="${
                    myData[i].id
                  }">
                     <img src="${
                       myData[i].thumbnail
                     }" class="card-img-top" alt="...">
                     <div class="card-body">
                     <div class="d-flex justify-content-between">
                        <h5 class="card-title">${myData[i].title}</h5>
                        <span class="badge text-bg-primary p-2">Free</span>
                     </div>
                     <p class="card-text small text-center opacity-50">${myData[
                       i
                     ].short_description
                       .split(" ", 8)
                       .join(" ")}</p>
                     
                     </div>
                     <footer class="card-footer small hstack justify-content-between">

                        <span class="badge badge-color">${
                          myData[i].genre
                        }</span>
                        <span class="badge badge-color">${
                          myData[i].platform
                        }</span>
            
                     </footer>
                  </div>
               </div>
            
            `;
    }

    document.getElementById("cards").innerHTML = cartona;

    document.querySelectorAll(".my-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        apiDetails.getDetails(id);
        document.querySelector(".home").classList.add("d-none");
        document.querySelector(".details").classList.remove("d-none");
      });
    });
  }
}

const api = new Api();
api.getData("mmorpg");

document.querySelectorAll(".menu a").forEach(function (link) {
  link.addEventListener("click", function (e) {
    document.querySelector(".menu .active").classList.remove("active");
    e.target.classList.add("active");
    api.getData(e.target.dataset.category);
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

class ApiDetails {
  async getDetails(id) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "48f5c1dc79msh600554932765449p1dea94jsn3f65d79a0c75",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let res = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    let myDetails = await res.json();

    this.display(myDetails);
  }

  display(data) {
    let detailsBox = `

        <h2>Details Game</h2>
    <div class="col-md-4">
    
    
    
    <figure>
    <img src="${data.thumbnail}" class="w-100" alt="details image" />
    </figure>
</div>
<div class="col-md-8">

    <div>
  

    <h3>Title: ${data.title}</h3>

    <h6>Category: <span>${data.category}</span></h6>
    <h6>Platform: <span>${data.platform}</span></h6>
    <h6>Status: <span>${data.status}</span></h6>
    <p>${data.description}</p>

    <button id="myBtn" class="btn ">Show Game</button>
    </div>
</div>

`;

    document.getElementById("detailsData").innerHTML = detailsBox;

    document.getElementById("myBtn").addEventListener("click", () => {
      window.open(data.game_url);
    });
  }
}

const apiDetails = new ApiDetails();

const icon = document.querySelector(".details i");
icon.addEventListener("click", () => {
  document.querySelector(".details").classList.add("d-none");
  document.querySelector(".home").classList.remove("d-none");
});
