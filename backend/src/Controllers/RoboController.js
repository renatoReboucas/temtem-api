const puppeteer = require("puppeteer");
const fs = require("fs");


class RoboController {

  static async getTemtem(req,res){
    const url = "https://temtem.gamepedia.com/Temtem_Species";
    // const url = "https://gamewith.net/temtem/article/show/15332";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    // await page.screenshot({ path: "./fotos/instagram.png" });
    const temtemList = await page.evaluate(() => {
      // const nodeList = document.querySelectorAll("tbody td").value;
      const nodeList = Array.from(document.querySelectorAll("tbody  tr"));
      // const nodeListImg = Array.from(document.querySelectorAll("tbody  tr img"));
      const listArray = [...nodeList];
      // const listImg = [...nodeListImg];

      // const dataListImg = listImg.map( ({currentSrc}) => ({
      //   currentSrc,
      // }))

      // console.log("dataListImg:", dataListImg);

      const dataList = listArray.map((item, index) => {
        const text = item.innerText;
        const split = text.split(/\s/);
        
        if (split.length === 12) {
          let data = {
            id: index,
            n: split[0],
            src: "",
            name: split[2],
            type: split[3],
            hp: split[4],
            sta: split[5],
            spd: split[6],
            atk: split[7],
            def: split[8],
            spatk: split[9],
            spdef: split[10],
            total: split[11],
          };
          return data;
        } else {
          let data = {
            id: index,
            n: split[0],
            src: "",
            name: split[2],
            type_one: split[3],
            type_two: split[4],
            hp: split[5],
            sta: split[6],
            spd: split[7],
            atk: split[8],
            def: split[9],
            spatk: split[10],
            spdef: split[11],
            total: split[12],
          };
          return data;
        }
      });
      // console.log("split", dataList);
      return dataList;
    });
    console.log("tamanho array:", temtemList.length);
    fs.writeFile("./src/api/temtem.json", JSON.stringify(temtemList, null, 2), (err) => {
      if (err) throw new Error("DEU RUIM!");
      console.log("DEU BOM!");
    });

    // await browser.close();

  }

}


module.exports = RoboController