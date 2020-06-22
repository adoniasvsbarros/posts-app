import { NgModule } from '@angular/core';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
    ErrorDialogComponent,
    HeaderComponent
  ],
  exports: [
    ErrorDialogComponent,
    HeaderComponent
  ]

})
export class SharedModule {}
