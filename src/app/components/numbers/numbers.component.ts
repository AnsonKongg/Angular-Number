import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NumberService } from 'src/app/services/number.service';
import { IP } from 'src/app/IP';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css'],
})
export class NumbersComponent implements OnInit {
  arr: number[] = [];
  numObj: object = {};
  model: IP = {
    ip: '',
  };

  constructor(private numberService: NumberService) {}

  ngOnInit(): void {
    this.arr = this.range(256, 0);
  }

  range(size: number, startAt: number = 0): number[] {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  onSubmit() {
    this.numberService.getNumbers(this.model.ip).subscribe((obj) => this.numObj = obj);
  }

  updateCSS(i: number) {
    if (
      Object.keys(this.numObj).length > 0 &&
      Object.keys(this.numObj).includes(String(i))
    ) {
      return this.numObj[String(i)];
    } else return 0;
  }
}
