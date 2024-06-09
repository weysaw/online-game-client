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

    this.socketService.listen('startGame').subscribe((data: any) => {
      this.board = data.board
      this.currentPlayer = data.currentPlayer.symbol
      this.gameOver = false
      this.message = 'Game Started'
    })

    this.socketService.listen('move').subscribe((data: any) => {
      this.board = data.board
      this.currentPlayer = data.currentPlayer
      this.gameOver = data.gameOver
      this.message = data.message
    })
  }

  makeMove (row: number, column: number): void {
    if (this.isMoveValid(row, column)) {
      this.socketService.emit('move', { row, column })
    }
  }

  private isMoveValid (row: number, column: number): boolean {
    return !this.gameOver && this.board[row][column] === '' && this.playerSymbol === this.currentPlayer
  }
}
