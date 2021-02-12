/*
 Authors:
 Your name and student #: Justin Tsen A01247374
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fsP = require("fs").promises;

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let defaultMovieList = ["Try to", "Add movies", "And search movies"];
app.get("/", (req, res) => res.render("pages/index", {movieNames: defaultMovieList}));

app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let moviesList = req.body.moviename;
  let moviesSplit = moviesList.split(',');
  res.render("pages/index", { movieNames: moviesSplit});
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let list = [movie1, movie2];
  res.render("pages/index", { movieNames: list});
});

app.get("/search/:movieName", (req, res) => {
  let movie = req.params.movieName;

  // read text content from movie Descriptions
  fsP.readFile("./movieDescriptions.txt", "utf-8")
  .then((content) => {

    // search through each line for matching movie
    for (let line of content.split('\n')) {
      let movieDescription = line.split(':');
      if (movieDescription[0].toLowerCase() == movie.toLowerCase()) {

        // upon movie found, render page with description
        res.render("pages/searchResult", {
          movieFound: true,
          movieName: movieDescription[0],
          homePage: 'http://localhost:3000',
          movieDescription: movieDescription[1]
        });

        return;
      }
    }

    res.render("pages/searchResult", {
      movieFound: false
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});