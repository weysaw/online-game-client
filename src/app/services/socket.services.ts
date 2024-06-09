import { Injectable } from '@angular/core'
import { io, Socket } from 'socket.io-client'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private readonly socket: Socket

  constructor () {
    this.socket = io('http://localhost:3000')
  }

  listen (event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data)
      })
    })
  }

  emit (event: string, data: any): void {
    this.socket.emit(event, data)
  }
}
