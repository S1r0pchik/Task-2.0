import { Component, OnInit } from '@angular/core';

export interface Text {
  text: any;
  date: any;
  ind: any;
  style: any;
  checked: any;
};

var arr: any[] = [];

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {
  element: any;
  underline: any;
  constructor() { }

  arr: Text[] = [];

  ngOnInit(): void {
    this.arr = arr;
  }

  public add(value: any): void {
    if (value != "") {
      var ind = 0;
      if (arr.length > 0) {
        ind = arr[arr.length - 1].ind + 1;
      }
      arr.push({
        'text': value,
        'date': dateToString(new Date()),
        'ind': ind,
        'style': 'none',
        'checked': false
      });
      this.arr = arr;
      value = '';
    }
  }

  public check(ind: any): void {
    if (arr[ind].style == 'none') {
      arr[ind].style = 'line-through';
      arr[ind].checked = true;
    } else {
      arr[ind].style = 'none';
      arr[ind].checked = false;
    }
  }

  public delete(): void {
    let cnt = 0, ind = 0, tmp = [];
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].checked == false) {
        arr[i].ind = ind;
        tmp.push(arr[i]);
        ind++;
      }
    }

    if ((arr.length - ind) == 1) {
      if (confirm('1 note will be deleted')) {
        arr = tmp;
      }
    } else {
      if (confirm((arr.length - ind) + ' notes will be deleted')) {
        arr = tmp;
      }
    }

    this.arr = arr;
  }
}

function dateToString(date: any) {
  var h = date.getHours();
  if (h < 10) {
    h = '0' + h;
  }
  var m = date.getMinutes();
  if (m < 10) {
    m = '0' + m;
  }
  var s = date.getSeconds();
  if (s < 10) {
    s = '0' + s;
  }
  return h + ':' + m + ':' + s;
}