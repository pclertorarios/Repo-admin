import { NgModule } from '@angular/core';

// Angular Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [
    MatExpansionModule,
    MatListModule
  ]
})
export class MaterialModule { }