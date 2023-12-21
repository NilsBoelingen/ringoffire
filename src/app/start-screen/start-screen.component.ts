import { Component, OnInit, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  private firestore: Firestore = inject(Firestore);
  game: Game;

  constructor(private router: Router) {
    this.game = new Game();
  }

  async newGame() {
    let game = new Game();
    await addDoc(collection(this.firestore, "Games"), { 'newGame': this.game.toJson() }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this.router.navigate(['/game/' + docRef.id]);
    });
  }
}
