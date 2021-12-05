import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() toggleLoginSection: EventEmitter<void> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onToggleRegisterSection(): void {
    this.toggleLoginSection.emit();
  }

}
