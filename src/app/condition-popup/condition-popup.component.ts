import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-condition-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './condition-popup.component.html',
  styleUrls: ['./condition-popup.component.css'],
})
export class ConditionPopupComponent {
  /** Logo affiché en haut (WhatsApp, avatar, ou install) */
  @Input() imageSrc: string = '';

  /** Type de pop-up (définit le rendu visuel et le texte) */
  @Input() type: 'whatsapp' | 'fullname' | 'install' = 'whatsapp';

  /** Placeholder pour le champ de saisie */
  @Input() placeholder: string = '';

  /** Valeur saisie par l’utilisateur */
  value: string = '';

  /** Événement renvoyé quand l’utilisateur valide */
  @Output() submit = new EventEmitter<string>();

  //** Lien vers le popup install */
  @Input() installLink: string = ''; // lien pour le popup install

  onSubmit() {
    if (this.type === 'install' && this.installLink) {
      // Redirection vers le lien (téléchargement / ouverture app)
      window.location.href = this.installLink;
    }
    this.submit.emit(this.value.trim());
  }

  /** Réinitialiser le champ après envoi */
  reset() {
    this.value = '';
  }
}
