import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'desafio_1';
  timelineBlock: any[] = [];

  constructor(private userService: UserService) {}

  getUser() {
    //somente pra mostrar na tela
    this.timelineBlock = [];
    this.userService.getUsers().subscribe({
      next: (res) => {
        const uniqueDate = new Set();
        res.forEach((user) => {
          uniqueDate.add(user.date.split('T')[0]);
        });
        uniqueDate.forEach((dateString) => {
          const filteredUser = res.filter((user) => {
            return user.date.split('T')[0] == dateString;
          });
          this.timelineBlock.push({
            date: dateString,
            filteredUser: filteredUser,
          });
        });
      },
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  saveUser() {
    this.userService
      .saveUsers({
        date: '2021-12-28T21:23:50Z',
        username: 'Gesiel Oliveira',
      })
      .subscribe({
        next: (res) => {
          this.getUser();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editUser() {
    this.userService
      .editUser(
        {
          date: '2021-12-28T21:23:50Z',
          username: 'Douglas Oliveira',
        },
        101
      )
      .subscribe({
        next: (res) => {
          this.getUser();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  valorInicialAtualizado(valorAtualizado: number) {
    console.log('Hey, valor mudou: ', valorAtualizado);
  }
}
