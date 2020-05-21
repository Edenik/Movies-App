import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-poster',
  template: `
  <a href="{{url}}" target="_blank">
    <img src="{{img}}" alt="{{name}} poster" title="{{name}} poster" height="471" width="320" style="border-radius:12px" nbTooltip="Click to go to IMDB: {{name}} - movie page" nbTooltipStatus="primary">
  </a>
  `,
})
export class PosterComponent implements OnInit {

  constructor() { }

  @Input() img: string;
  @Input() url: string;
  @Input() name: string;

  ngOnInit(): void {
  }

}
