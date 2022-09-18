import * as style from "./index.js";
import * as fs from "fs";

const settings = JSON.parse(
  fs.readFileSync("./package.json", { encoding: "utf8" })
);

const colors = {
  bamboo_green: "#2CC880",
  logo_orange: "#FFC831",
  dash_purple: "#C770FF",
  royal_blue: "#6D9FFF",
};

const styles = {
  logo: {
    weight: "bold",
    color: "logo_orange",
  },
  name: {
    weight: "bold",
    decoration: "underline",
    style: "italic",
    color: "#FFFFFF",
  },
  version: {
    weight: "bold",
    color: "bamboo_green",
  },
  license: {
    weight: "bold",
    color: "dash_purple",
  },
  description: {
    color: "rand semi-dark",
  },
  copyrights: {
    color: "#505050",
  },
};

style.saveColors(colors);
style.saveStyles(styles);

const data = {
  name: settings.name,
  version: settings.version,
  license: settings.license,
  desc: settings.description,
  copyrights: settings.author,
};

style.render("./demo.log", data, (err, res) => {
  if (err) throw err;
  console.log(res);
});
