import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// 🔁 Updated date range: 5 July 2018 → 1 July 2025
const START_DATE = moment("2018-07-05");
const END_DATE = moment("2025-07-01");

const markCommit = (x, y) => {
  const date = START_DATE.clone().add(x, "w").add(y, "d").format();

  const data = { date };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const x = random.int(0, 364);  
  const y = random.int(0, 6);    

  const date = START_DATE.clone().add(x, "w").add(y, "d");

  if (date.isAfter(END_DATE)) return makeCommits(n);  

  const formattedDate = date.format();
  console.log(formattedDate);

  const data = { date: formattedDate };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(formattedDate, { "--date": formattedDate }, makeCommits.bind(this, --n));
  });
};

 makeCommits(100);
