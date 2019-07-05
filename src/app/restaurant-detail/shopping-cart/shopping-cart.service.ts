import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationService } from "../../shared/messages/notification.service";

@Injectable()
export class ShoppingCartService {

    items:CartItem[] = []

    constructor(private notificationService: NotificationService) {}

    addItem(item:MenuItem){
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        if(foundItem){
            this.increaseQty(foundItem)
        }else{
            console.log("adicionando")
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify(`você adicionou o item ${item.name}`)
    }

    increaseQty(item:CartItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item:CartItem){
        item.quantity = item.quantity - 1
        if(item.quantity === 0) {
            this.removeItem(item)
        }
    }

    removeItem(item:CartItem){
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`você adicionou o item ${item.menuItem.name}`)
    }

    clear(){
        this.items = [] 
    }

    total():number{
        return this.items
        .map(item => item.value())
        .reduce((prev, value) => prev + value, 0)
    }
}