import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { onSnapshot, deleteDoc, query, where, orderBy, limit } from '@firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DialogAddPlayerComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    DialogAddPlayerComponent,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  games: any[] = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.game = new Game();
    this.route.params.subscribe((params) => {
      const unsub = onSnapshot(doc(this.firestore, "Games/" + params['id']), (doc) => {
        this.game.currentPlayer = doc.data()?.['newGame'].currentPlayer;
        this.game.players = doc.data()?.['newGame'].players;
        this.game.stack = doc.data()?.['newGame'].stack;
        this.game.playedCards = doc.data()?.['newGame'].playedCards;
      });
    });
  }

  ngOnInit(): void {
    this.newGame();
  }

  async newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    updateDoc(doc(this.firestore, "Games/" + this.route.snapshot.params['id']), { 'newGame': this.game.toJson() }).then((docRef) => {});
  }
}
