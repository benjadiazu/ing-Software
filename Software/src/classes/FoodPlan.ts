import { Day } from "./Day";

const regex = /[\/\-.]/;

export class FoodPlan{
  
  days:Day[] = [];

  constructor(){}

  addDay(day:Day){
    this.days.push(day);
  }

  getSizeRecipes(idx:number){
    return this.days[idx].getSizeRecipes();
  }

  getDay(date:string):Day | null{
    let val:string[] = date.split(regex);
    let day:number = Number(val[0]);
    let month: number = Number(val[1]);
    let year:number = Number(val[2]);

    for(let i = 0; i < this.days.length; i++){
      if(this.days[i].day == day){
        return this.days[i];
      }
    };
    return null;
  }
}