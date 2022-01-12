import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

var arr: any[] = [],
  minDate = new Date(0, 0, 0),
  maxDate = new Date(10000, 0, 0);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})

export class ChartsComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts:
    | QueryList<BaseChartDirective>
    | undefined;
  arr: any;
  styleClose: any;
  styleMenu: any;
  styleSortUp: any;
  styleSortDown: any;
  up: any;

  ngOnInit(): void {
    this.arr = arr;
    this.styleClose = {
      display: 'none',
      opacity: '0',
      'z-index': '-1',
    };

    this.styleMenu = {
      marginRight: '-50%',
    };
  }

  public update() {
    this.charts?.forEach((child) => {
      child?.chart?.update();
    });
  }

  public add(): void {
    var ind = 0;
    for (let i = 0; i < arr.length; ++i) {
      ind = arr[i].ind + 1 > ind ? arr[i].ind + 1 : ind;
    }
    arr.push({
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Data 1',
          backgroundColor: 'black',
          borderColor: 'black',
          pointBackgroundColor: 'black',
          fill: '',
        },
      ],
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      ind: ind,
      isShow: true,
      cnt: 2,
      date: generateDate(),
      type: 'line',
      colors: [
        {
          name: 'Data 1',
          borderColor: 'black',
          fillColor: 'black',
          fill: 'none',
          ind: 0,
        },
      ],
    });
    arr[ind].datasets[0].data = generateRandom(
      arr[ind].datasets[0].data.length,
      0,
      100
    );
    this.arr = arr;
  }

  public push(ind: any): void {
    var index = 0;
    while (arr[index].ind != ind) {
      index++;
    }
    arr[index].datasets.push({
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Data ' + arr[index].cnt,
      backgroundColor: 'black',
      borderColor: 'black',
      pointBackgroundColor: 'black',
      fill: '',
    });
    arr[index].colors.push({
      name: 'Data ' + arr[index].cnt,
      borderColor: 'black',
      backgroundColor: 'black',
      fill: 'none',
      ind: arr[index].cnt - 1,
    });
    arr[index].cnt++;
    arr[index].datasets[arr[index].datasets.length - 1].data = generateRandom(
      arr[index].datasets[arr[index].datasets.length - 1].data.length,
      0,
      100
    );
    this.arr = arr;
    this.update();
  }

  public randomize(ind: any): void {
    var index = 0;
    while (arr[index].ind != ind) {
      index++;
    }
    for (let i = 0; i < arr[index].datasets.length; ++i) {
      arr[index].datasets[i].data = generateRandom(
        arr[index].datasets[i].data.length,
        0,
        100
      );
    }
    this.arr = arr;
    this.update();
  }

  public hide(ind: any): void {
    var index = 0;
    while (arr[index].ind != ind) {
      index++;
    }
    arr[index].isShow = arr[index].isShow == false ? true : false;
    this.arr = arr;
  }

  public close(ind: any): void {
    arr = arr.filter((item) => item.ind !== ind);
    for (let i = ind; i < arr.length; ++i) {
      arr[i].ind--;
    }
    this.arr = arr;
  }

  public borderColor(event: any, chartInd: any, colorInd: any): void {
    const value = event.target.value;
    var index = 0;
    while (arr[index].ind != chartInd) {
      index++;
    }
    chartInd = index;
    arr[chartInd].datasets[colorInd].borderColor = value;
    arr[chartInd].datasets[colorInd].pointBackgroundColor = value;
    arr[chartInd].colors[colorInd].borderColor = value;
    this.arr = arr;
    this.update();
  }

  public backgroundColor(event: any, chartInd: any, colorInd: any): void {
    const value = event.target.value;
    var index = 0;
    while (arr[index].ind != chartInd) {
      index++;
    }
    chartInd = index;
    arr[chartInd].datasets[colorInd].backgroundColor = value;
    arr[chartInd].colors[colorInd].backgroundColor = value;
    this.arr = arr;
    this.update();
  }

  public changeFill(event: any, chartInd: any, colorInd: any): void {
    const value = event.value;
    var index = 0;
    while (arr[index].ind != chartInd) {
      index++;
    }
    chartInd = index;
    arr[chartInd].datasets[colorInd].fill = value;
    arr[chartInd].colors[colorInd].fill = value;
    this.arr = arr;
    this.update();
  }

  public deleteColor(event: any, chartInd: any, colorInd: any): void {
    var index = 0;
    while (arr[index].ind != chartInd) {
      index++;
    }
    chartInd = index;
    arr[chartInd].datasets = arr[chartInd].datasets.filter(
      (item: any) => item.label !== 'Data ' + (colorInd + 1)
    );
    arr[chartInd].colors = arr[chartInd].colors.filter(
      (item: { ind: any }) => item.ind !== colorInd
    );

    for (let i = colorInd; i < arr[chartInd].colors.length; ++i) {
      arr[chartInd].colors[i].ind--;
    }
    for (let i = colorInd; i < arr[chartInd].colors.length; ++i) {
      var num = 0,
        multi = 1;
      for (let j = arr[chartInd].colors[i].name.length - 1; j >= 0; --j) {
        if (arr[chartInd].colors[i].name[j] < '10') break;
        num += Number(arr[chartInd].colors[i].name[j]) * multi;
        multi *= 10;
      }
      arr[chartInd].colors[i].name = 'Data ' + (num - 1);
      arr[chartInd].datasets[i].label = 'Data ' + (num - 1);
    }
    arr[chartInd].cnt--;
    this.update();
  }

  public changeUp(flag: any): void {
    this.up = flag;
    if (flag) {
      this.styleSortUp = {
        backgroundColor: 'rgb(230, 230, 230)',
      };

      this.styleSortDown = {
        backgroundColor: '#fff',
      };
    } else {
      this.styleSortDown = {
        backgroundColor: 'rgb(230, 230, 230)',
      };

      this.styleSortUp = {
        backgroundColor: '#fff',
      };
    }
  }

  public changeMinDate(event: any) {
    minDate = new Date(event.target.value);
    console.log(minDate);
    if (minDate.getHours() == 3 || isNaN(minDate.getHours())) {
      minDate = new Date(0, 0, 0);
    }
  }

  public changeMaxDate(event: any) {
    maxDate = new Date(event.target.value);
    if (maxDate.getHours() == 3 || isNaN(maxDate.getHours())) {
      maxDate = new Date(10000, 0, 0);
    }
  }

  public sort(): void {
    var tmp = [];

    for (let i = 0; i < arr.length; ++i) {
      if (+arr[i].date >= +minDate && +arr[i].date <= +maxDate) {
        tmp.push(arr[i]);
      }
    }
    if (this.up == true) {
      tmp.sort((a, b) => a.date - b.date);
      arr.sort((a, b) => a.date - b.date);
    } else if (this.up == false) {
      tmp.sort((a, b) => b.date - a.date);
      arr.sort((a, b) => b.date - a.date);
    }
    this.styleSortDown = {
      backgroundColor: '#fff',
    };
    this.styleSortUp = {
      backgroundColor: '#fff',
    };
    this.arr = tmp;
    this.closeSortMenu();
    this.up = null;
  }

  public changeType(event: any, ind: any): void {
    var index = 0;
    while (arr[index].ind != ind) {
      index++;
    }
    arr[index].type = event.value;
  }

  public closeSortMenu(): void {
    this.styleClose = {
      opacity: '0',
      dispalay: 'none',
      'z-index': '-1',
    };

    this.styleMenu = {
      marginRight: '-50%',
    };
  }

  public showSortMenu(): void {
    this.styleClose = {
      opacity: '0.5',
      dispalay: 'visible',
      'z-index': '3',
    };

    this.styleMenu = {
      marginRight: '0',
    };
  }
}

function generateRandom(len: any, min: any, max: any) {
  var tmp = [];
  for (let i = 0; i < len; ++i) {
    tmp.push(random(min, max));
  }
  return tmp;
}

function random(min: any, max: any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDate() {
  var d = random(0, 28);
  var m = random(0, 11);
  var y = random(1900, 2100);
  var date = new Date(y, m, d);
  console.log(date);
  return date;
}
