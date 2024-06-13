import { Component, OnInit } from '@angular/core'
import { SocketService } from 'src/app/services/socket.services'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  board: string[][]
  currentPlayer: string
  playerSymbol: 'X' | 'O'
  gameOver: boolean
  message: string

  constructor (private readonly socketService: SocketService) {
    this.board = [['', '', ''], ['', '', ''], ['', '', '']]
    this.currentPlayer = 'X'
    this.gameOver = false
    this.message = ''
    this.playerSymbol = 'X'
  }

  ngOnInit (): void {
    this.socketService.listen('playerSymbol').subscribe((symbol: 'X' | 'O') => {
      this.playerSymbol = symbol
    })

    this.socketService.listen('gameUpdate').subscribe((data: any) => {
      this.board = data.board
      this.currentPlayer = data.currentPlayer.symbol
      this.gameOver = data.gameOver
      this.message = data.message
    })
  }

  makeMove (row: number, column: number): void {
    console.log(`row ${row} column ${column}`)
    const moveValid = this.isMoveValid(row, column)
    console.log('This move is valid: ', moveValid)
    if (moveValid) {
      this.socketService.emit('move', { row, column })
    }
  }

  private isMoveValid (row: number, column: number): boolean {
    return !this.gameOver && this.board[row][column] === '' && this.playerSymbol === this.currentPlayer
  }
}
