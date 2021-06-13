import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  /** Application title */
  title = 'ListManipulation';

  /** Temporary created list A and B */
  tempListA: Array<Country> = [];
  tempListB: Array<Country> = [];

  /** station name - used for add station name in popup */
  stationName: string = '';


  /** mock data for list A */
  stationsListA: Array<Country> = [
    { key: 1, station: 'Kalyan', selected: false },
    { key: 2, station: 'Thane', selected: false },
    { key: 3, station: 'Pune', selected: false },
    { key: 4, station: 'Panvel', selected: false },
    { key: 5, station: 'Mumbai', selected: false},
    { key: 6, station: 'Nagpur', selected: false},
    { key: 7, station: 'Solapur', selected: false },
    { key: 8, station: 'Nanded', selected: false },
    { key: 9, station: 'Akola', selected: false },
    { key: 10, station: 'Lonavala', selected: false },
    { key: 11, station: 'Badnera', selected: false }
  ];

  /** mock data for list B */
  stationsListB: Array<any> = [
    { key: 1, station: 'Manmad', selected: false },
    { key: 2, station: 'Jalgaon', selected: false},
    { key: 3, station: 'Goa', selected: false}
  ]

  /** This method to used to find the element from the temp list A
   *  and add/remove from temp list A
   *  also marking selected property true/false */
  selectedListA(item:any){
    if(this.tempListA.find(i => i.key === item.key)){
        var index = this.tempListA.indexOf(item);
        this.tempListA.splice(index, 1);
        item.selected = false;
    } else{
      item.selected = true;
      this.tempListA.push(item);
    }
  }

  /** This method to used to find the element from the temp list B
   *  and add/remove from temp list B
   *  also marking selected property true/false */
  selectedListB(item:any){
    if(this.tempListB.find(i => i.key === item.key)){
        var index = this.tempListB.indexOf(item);
        this.tempListB.splice(index, 1);
        item.selected = false;
    } else{
      item.selected = true;
      this.tempListB.push(item);
    }
  }

  /** This method is used for to move from List A to B */
  moveToListB(){
    this.resetSelected();
    Array.prototype.push.apply(this.stationsListB,this.tempListA);
    this.removeSelected();
  }

  /** This method is used for to move from List B to A */
  moveToListA(){
    this.resetSelected();
    Array.prototype.push.apply(this.stationsListA,this.tempListB);
    this.removeSelected();
  }

  /** This method is used to filter out the records and update it
   *  it will also clear the temp list after the operation complete */
  removeSelected(){
    if(this.tempListA){
       for (const iterator of this.tempListA) {
        this.stationsListA = this.stationsListA.filter(({ key }) => key !== iterator.key);
      }
      this.tempListA = [];
    }
    if(this.tempListB){
       for (const iterator of this.tempListB) {
        this.stationsListB = this.stationsListB.filter(({ key }) => key !== iterator.key);
      }
      this.tempListB = [];
    }
  }

  /** This method is used to reset selected flag to false */
   resetSelected(){
     if(this.tempListA){
       for (const iteratorA of this.tempListA) {
         iteratorA.selected = false;
       }
      }
      if(this.tempListB){
        for (const iteratorB of this.tempListB) {
         iteratorB.selected = false;
       }
      }
  }

  /** This method is used for add new station object into existing list */
  add(value:string, name: string){
    if(name){
      let station = new Country();
      station.key = Math.floor(Math.random() * (1000 - 15 + 1)) + 15;
      station.station = name;
      station.selected = false;
      if(value === 'a'){
        this.stationsListA.push(station);
      }else if(value === 'b'){
        this.stationsListB.push(station);
      }
      this.stationName = '';
    }
  }
}

/** Modal country class */
export class Country{
  "key": number;
  "station": string;
  "selected": boolean;
}