"use strict";

let Aww = "https://www.reddit.com/r/aww/.json";
let svg = document.querySelector("svg");
var list = document.createElement("ul");
let input = document.querySelector("input");
let inputValue = input.value;
let subreddit = "https://www.reddit.com/r/" + inputValue + "/.json";
console.log(subreddit);


svg.addEventListener("click", () => {
  list.innerHTML = "";
  let input = document.querySelector("input");
  let inputValue = input.value;
  /* ~~~ .split() and .join() remove the space 
  *  from the user's input to bring user to the correct subreddit 
  ~~*/
  inputValue = inputValue.split(" ").join("");
  let subreddit = "https://www.reddit.com/r/" + inputValue + "/.json";
  console.log(subreddit);
  loadPage(subreddit);
});

function loadPage(subreddit = Aww) {
  fetch(subreddit)
    .then((data) => data.json())
    .then((posts) => {
      console.log(posts);

      document.body.appendChild(list);

      let parent = posts.data.children;

      var counter = []; // adds each listItem to array so we can stop at 10 posts

      for (let post of parent) {
        console.log(counter);
        if (counter.length === 10) {
          return;
        }

        let postData = post.data; // had to access one "step" further down from post
        let { title, url, thumbnail, over_18 } = postData;
        /* 
        * over_18 variable will either be true or false.
        * code below will change image, title, and link text accordingly
        */

        let listItem = document.createElement("li");

        let div = document.createElement("div");

        let p = document.createElement("p");

        let a = document.createElement("a");
        a.setAttribute("href", url);
        a.innerText = "click me for the full post";

        p.innerText = title;
        div.append(p);

        let image = document.createElement("img");
        image.setAttribute("src", thumbnail);
        image.setAttribute("onerror", errorFunction());
        function errorFunction() {
          if (thumbnail == "default") {
            image.setAttribute("src", "error.png");
          } else if (over_18 === true) {
            image.setAttribute("src", "error.png");
            p.innerText = "THIS POST IS NSFW";
            p.style.color = "lightgoldenrodyellow";
            a.style.fontFamily = "'Raleway', sans-serif";
            a.style.color = "lightgoldenrodyellow";
            a.innerHTML = "click with caution";
          }
        }

        div.append(image);
        div.append(a);
        listItem.append(div);
        list.append(listItem);
        counter.push(listItem);
      }
    })
    .catch((error) => {
      error.message;

      if (error.message === "Cannot read property 'children' of undefined") {
        alert("Sorry. That subreddit doesn't exist")
        location.reload();
      } else if (error.message === "Failed to fetch.") {
        alert("Hmmm. Can't find that page.")
        location.reload();
      } else {
          document.body.innerHTML = error.message;
      }

    });
}

loadPage();


