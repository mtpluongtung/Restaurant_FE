import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private messageSubject = new BehaviorSubject<string>(''); // Subject để lắng nghe tin nhắn từ server
  public messages$ = this.messageSubject.asObservable();
constructor() { }
// Kết nối tới SignalR Hub
public startConnection(): void {
  this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.apiUrl}HubContext`) // Đường dẫn tới SignalR Hub
    .build();

  this.hubConnection
    .start()
    .then(() => console.log('SignalR connected!'))
    .catch(err => console.log('Error while starting SignalR connection: ' + err));

    this.addReceiveMessageListener();
}

 // Đăng ký sự kiện nhận tin nhắn từ server
 private addReceiveMessageListener(): void {
  this.hubConnection.on('ReceiveOrder', (message: string) => {
 
    this.messageSubject.next(message); // Phát tin nhắn qua Subject
  });
}

// Gửi dữ liệu lên server
public sendMessage( message: string): void {
  this.hubConnection.invoke('SendOrder', message)
    .catch(err => console.error(err));
}

}
