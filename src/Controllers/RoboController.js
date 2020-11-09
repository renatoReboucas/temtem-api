const puppeteer = require("puppeteer");
const fs = require("fs");
const connection = require('../database/connection')


class RoboController {

  static async index(req, res){

    const query = await connection('temtem').select('*')
    if(!query){
      return res.status(500).send({error: "No temtem found"});
    }else{
      return res.status(200).send(query);
    }
  }

  static async getTemtem(req,res, next){
    const url = "https://temtem.gamepedia.com/Temtem_Species";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const temtemList = await page.evaluate(() => {
      const nodeList = Array.from(document.querySelectorAll("tbody  tr"));
      const listArray = [...nodeList];

      const dataList = listArray.map( (item, index) => {
        const text = item.innerText;
        const split = text.split(/\s/);
        // console.log(split);
        if (split.length === 12) {
          let data = {
            // id: index,
            n: split[0],
            name: split[2],
            type_one: split[3],
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
            // id: index,
            n: split[0],
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
      return dataList;
    });
    fs.writeFile("./src/api/temtem.json", JSON.stringify(temtemList, null, 2), (err) => {
      if (err) throw new Error("DEU RUIM!");
      // console.log("DEU BOM FILE!");
    });
    
    // console.log("type", typeof temtemList);
    // console.log(temtemList);
    try {
      (async() => {
        // temtemList.map(async (temtem) => {
        //   await connection("temtem").insert(temtem);
        //  });
        await connection("temtem").truncate();
        
        for(let i in temtemList){
          const tempedia = temtemList[i]
          await connection("temtem").insert(tempedia);
        }
      })();
     
      // return res.json(200, temtemList);
    } catch (error) {
      // return res.json(500, error)
      next(error)
    }

    // await browser.close();
    // return res.json(200, temtemList);
  }

  //end class
}


module.exports = RoboController