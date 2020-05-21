import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuService, NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { NbMenuItem } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { LocalStorageService } from 'src/app/core/local-storage.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { NgxSpinnerService } from "ngx-spinner";
import { Movie } from 'src/app/core/movie';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService, private router: Router,
    private user: UserService, private auth: AuthService,
    private dialogService: NbDialogService, private localStorage: LocalStorageService,
    private dbFireBase: AngularFirestore, private spinner: NgxSpinnerService,
  ) { }

  userInfo: User[] = [{ displayName: "", email: "", photoURL: "" }];
  userMail: string;
  moviesList: Movie[] = [];
  categories: string[] = [];
  error: boolean = false;
  filter: string = '';
  itemsMenu: NbMenuItem[] = [{ title: 'Add Movie', icon: 'person-outline' }];

  protected addMovie(autoFocus: boolean) {
    if(screen.width <=900){
      this.sidebarService.collapse();
    }
    this.dialogService.open(AddMovieComponent, {
      context: {
        movies: this.moviesList,
      },
    });
    // .onClose.subscribe( );
  }


  
  menuClick(item) {
    console.log(item)
    switch (item) {
      case "Add Movie":
        this.addMovie(true);
        break;
      case "All Movies":
        this.filter = '';
        this.getMovies();
        break;
      default:
        this.filter = item;
        this.getMovies();
    }
  }

  getMovies() {
    if(screen.width <=900){
      console.log("screeen " +screen.width)
      this.sidebarService.collapse();
    }
    this.dbFireBase.collection<Movie>(this.userMail).valueChanges().subscribe(
      movies => {
        this.moviesList = [];
        this.categories = [];
        this.itemsMenu = [{ title: 'Add Movie', icon: 'plus' }];
        console.log(movies)
        if (movies.length > 0)
          this.itemsMenu.push({ title: 'All Movies', icon: 'tv' });
        movies.forEach(ele => {
          this.error = false;
          this.moviesList.push(ele);
          ele.categories.forEach(cat => {
            if (!this.categories.includes(cat)) {
              this.categories.push(cat)
              this.itemsMenu.push({ title: cat, icon: "film" });
            }
          });
        });
        console.log(this.moviesList)
        this.spinner.hide();

        if (this.moviesList.length == 0) {
          this.error = true;
          this.filter = '';
        }
        this.sort();
      })
  }

  sort() {
    var sortedArray: Movie[] = this.moviesList.sort((obj1, obj2) => {
      var sortObject1 = obj1.dateAdded;
      var sortObject2 = obj2.dateAdded;
      if (sortObject1 < sortObject2)
        return 1;
      if (sortObject1 > sortObject2)
        return -1;
      return 0;
    });
    this.moviesList = sortedArray;
    if (this.filter != '') {
      this.filterMovies();
    }
  }

  filterMovies() {
    const result = this.moviesList.filter(movie => movie.categories.includes(this.filter));
    console.error(result);
    this.moviesList = result;
  }

  toggle() {
    this.sidebarService.toggle();
  }

  logout() {
    console.log('out')
    this.auth.googleLogout().then(res => {
      this.router.navigate(['login'])
    }).catch(err => console.log(err))

    this.userInfo = null;
  }


  ngOnInit(): void {
    this.spinner.show();

    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            this.userInfo = [{ displayName: user.displayName, email: user.email, photoURL: user.photoURL }];
            this.userMail = user.email;
            this.localStorage.saveObjToStorage(user.email, "movies-app-user")
            this.getMovies();

          }
          else {
            this.userInfo = null;
          }
        })
      }
    )
  }



}
