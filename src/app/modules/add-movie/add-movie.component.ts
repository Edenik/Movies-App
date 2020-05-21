import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocalStorageService } from 'src/app/core/local-storage.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Movie } from 'src/app/core/movie';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<AddMovieComponent>, private angularFS: AngularFirestore, 
    private localStorage: LocalStorageService,private http:HttpClient) { }
  categories: string[] = [];
  selectedItems = [];
  user: string;
  linkError: boolean;
  posterError: boolean;
  @Input() movies: Movie[];
  movieExist:boolean;

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  dropdownList = [
    { item_id: 1, item_text: 'Comedy' },
    { item_id: 2, item_text: 'SCI-FI' },
    { item_id: 3, item_text: 'Horror' },
    { item_id: 4, item_text: 'Romance' },
    { item_id: 5, item_text: 'Action' },
    { item_id: 6, item_text: 'Thriller' },
    { item_id: 7, item_text: 'Drama' },
    { item_id: 8, item_text: 'Mystery' },
    { item_id: 9, item_text: 'Crime' },
    { item_id: 10, item_text: 'Animation' },
    { item_id: 11, item_text: 'Adventure' },
    { item_id: 12, item_text: 'Fantasy' },
    { item_id: 13, item_text: 'Comedy-Romance' },
    { item_id: 14, item_text: 'Action-Comedy' },
    { item_id: 15, item_text: 'SuperHero' },
  ];

  onItemSelect(item: any) {
    this.categories.push(item.item_text);
  }

  onSelectAll(items: any) {
    items.forEach(item => {
      this.categories.push(item.item_text);
    });
  }

  onItemDeSelect(item: any) {
    let filtered = this.categories.filter(cat => cat != item.item_text);
    this.categories = filtered;
  }
  onDeSelectAll() {
    this.categories = [];
  }

  ngOnInit(): void {
    console.log(this.movies)
    this.user = this.localStorage.getObjFromStorage("movies-app-user");
  }

  cancel() {
    this.dialogRef.close();
  }

  
  onAddItem(form: NgForm) {
    this.linkError = false;
    this.posterError = false;
    this.movieExist = false;

    var linkPaths = form.value.imdbLink.split("/");
    var posterPaths = form.value.imgURL.split("/");
    let imdbURL = form.value.imdbLink;
    var trimmedName = form.value.name.replace(/\s+$/, '');
    let movieName = trimmedName;
    let imgURL = form.value.imgURL;

    for (let index = 0; index < this.movies.length; index++) {
      let name = this.movies[index].name;
      if(name.toLowerCase() === movieName.toLowerCase()){
        this.movieExist = true;
      }     
    }

    if (linkPaths[0] != 'https:' || linkPaths[2] != 'www.imdb.com' || linkPaths[3] != 'title' || !linkPaths[4] ) {
      this.linkError = true;
    }
    if (posterPaths[0] != 'https:' || posterPaths[2] != 'm.media-amazon.com' || posterPaths[3] != 'images' || !posterPaths[5].includes('jpg')) {
      this.posterError = true;
    }

    if (this.posterError == false && this.linkError == false && this.movieExist == false) {
      let date = new Date();
      this.angularFS.collection(this.user).doc(movieName).set({ name: movieName, categories: this.categories, imdbURL: imdbURL, imgURL: imgURL, dateAdded: date });
      this.dialogRef.close();
    }

  }
}
