import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-condition-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './condition-popup.component.html',
  styleUrls: ['./condition-popup.component.css']
})
export class ConditionPopupComponent {
  @Input() imageSrc: string = '';  // Image du haut (WhatsApp, avatar, install)
  @Input() type: 'whatsapp' | 'fullname' | 'install' = 'whatsapp';

  value: string = '';

  @Output() submit = new EventEmitter<string>();

  onSubmit() {
    this.submit.emit(this.value.trim());
  }
}
