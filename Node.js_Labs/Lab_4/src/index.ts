import axios from "axios";
import data from "./c.json";
console.log("TS is running?");
const userName: string = "tova";

type Country = typeof data;

async function init(): Promise<Array<Country>> {
  const result = await axios<Array<Country>>(
    "https://restcountries.com/v3.1/name/isr"
  );
  return result.data;
}

type WhatsReturnFromInit = Awaited<ReturnType<typeof init>>;
init();
