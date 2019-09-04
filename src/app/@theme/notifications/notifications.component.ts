import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  private notification: any;
	private container: any;
	private visible: boolean;
  private queue: any;
  
  constructor() { }

  ngOnInit() {
    // Inicializar variables
		this.visible = false;
		this.queue = [];
		this.container = document.getElementById("notification-container");
  }

  
	// INICIO, FUNCIONES ACTIVAR NOTIFIACIONES
	createNotification() {
		this.notification = document.createElement("div");
		var btn = document.createElement("button");
		var title = document.createElement("div");
		var msg = document.createElement("div");
		btn.className = "notification-close";
		title.className = "notification-title";
		msg.className = "notification-message";
		btn.addEventListener("click", this.hideNotification, false);
		this.notification.addEventListener(
		  "animationend",
		  this.hideNotification,
		  false
		);
		this.notification.addEventListener(
		  "webkitAnimationEnd",
		  this.hideNotification,
		  false
		);
		this.notification.appendChild(btn);
		this.notification.appendChild(title);
		this.notification.appendChild(msg);
	}
	
	updateNotification(type: any, title: string, message: string) {
	this.notification.className = "notification notification-" + type;
	this.notification.querySelector(".notification-title").innerHTML = title;
	this.notification.querySelector(
		".notification-message"
	).innerHTML = message;
	}
	
	showNotification(type:any, title:string, message:string) {
		if (this.visible) {
			this.queue.push([type, title, message]);
			return;
		}
		if (!this.notification) {
			this.createNotification();
		}
		this.updateNotification(type, title, message);
		this.container.appendChild(this.notification);
		this.visible = true;
	}
	
	hideNotification() { 
	this.visible = true;	
		if (this.visible) {
			this.visible = false;
			this.container = document.getElementById("notification-container");
			let remove = document.getElementsByClassName("notification");
			this.container.removeChild(remove[0]);
		}
	}
		
	notificationOpen(messageType: string, messageTille: string, message:string) {
		this.ngOnInit();
		this.visible = false;
		this.showNotification(messageType,  messageTille, message);
	}
	// FIN, FUNCIONES ACTIVAR NOTIFIACIONES

}


