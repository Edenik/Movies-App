import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NbDialogService } from '@nebular/theme';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { PosterComponent } from '../poster/poster.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  constructor(private angularFS: AngularFirestore,
    private dialogService: NbDialogService, ) { }
  @Input() name: string;
  @Input() imgURL: string;
  @Input() imdbURL: string;
  @Input() categories: string[];
  @Input() user: string;

  ngOnInit(): void {
  }

  showPoster(imgURL){
    this.dialogService.open(PosterComponent, {
      context: {
        img: imgURL,
        url: this.imdbURL,
        name: this.name,
      },
    });
  }

  delete(item) {
    this.angularFS.collection(this.user).doc(item).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

}
