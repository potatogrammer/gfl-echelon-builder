import { dolls } from "../Services/Doll";

const DollByTypes = {
  Any: [],
  ar: [],
  hg: [],
  mg: [],
  rf: [],
  sg: [],
  smg: [],
};

for (let i = 0; i < dolls.length; i++) {
  const doll = dolls[i];
  DollByTypes[doll.type].push(doll);
  DollByTypes["Any"].push(doll);
}

export function getDollsByTypesAndCodename(type, name) {
  const results = [];
  for (let i = 0; i < DollByTypes[type].length; i++) {
    const pattern = new RegExp(`^${name}`, "i");
    if (pattern.test(DollByTypes[type][i].codename))
      results.push(DollByTypes[type][i].codename);
  }
  if (results.length === 0) return "Doll Not Found";
  else {
    return results;
  }
}

export function getDoll(
  type,
  name,
  level = 100,
  link = 5,
  favor = 100,
  skill1Level = 10,
  skill2Level = 10
) {
  for (let i = 0; i < dolls.length; i++) {
    const pattern = new RegExp(`^${name}`, "i");
    const doll = dolls[i];
    if (pattern.test(doll.codename)) {
      doll.level = level;
      doll.dummyLink = link;
      doll.favor = favor;
      doll.skillLevel = skill1Level;
      doll.skillLevel2 = skill2Level;
      return doll;
    }
  }
}

export function getDollStats(doll) {
  const stats = convertObjectToArray(doll.stats);
  return stats;
}

export function getDollCodename(doll) {
  const codename = doll.codename;
  return codename;
}

export function adjustDollStats() {}

const convertObjectToArray = (object) => {
  const array = [];
  for (const key in object) {
    array.push([key, object[key]]);
  }
  return array;
};

export function Test() {
  const g36 = dolls.find(({ codename }) => codename === "SAT8");
  g36.level = 80;
  g36.dummyLink = 5;
  g36.favor = 100;
  console.log(g36.stats);
}
