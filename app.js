//
// `https://api.openweathermap.org/data/2.5/weather`
let yourCity;
let formEl = document.querySelector("form");
let list = document.querySelector("ul");
let overly = document.getElementById("overlay");
formEl.addEventListener("submit", (el) => {
  el.preventDefault();
  //   let inputValue = formEl.input.value;
  yourCity = formEl.input.value;
  if (yourCity.trim().length > 0) {
    list.classList.remove("hidden");
    getData(`https://api.openweathermap.org/data/2.5/weather`, yourCity)
      .then((data) => {
        addList(data);
        console.log(data.weather.description);
        console.log(data.weather);
      })
      .catch(() => {
        list.innerHTML = `
        <h1 class="red">Try another right one !!!! </h1>
      `;
      });
  }
  formEl.reset();
});

let getData = async function (resourse, city) {
  let y = `?q=${city}&units=metric&appid=96b947a45d33d7dc1c49af3203966408`;
  let API = `${resourse}${y}`;
  await overly.classList.remove("hidden");
  const response = await fetch(API);
  await overly.classList.add("hidden");

  return (await response).json();
};
function addList(data) {
  console.log(1);
  list.innerHTML = `
    <li>
            <div class="cycrl"></div>
            <div class="squere">
              <h1 class="squereTitle">${data.name}</h1>
              <p class="desc">${data.weather[0].main}</p>
              <p class="temperature">${data.main.feels_like} &deg;C</p>
            </div>
    </li>
    `;
}
