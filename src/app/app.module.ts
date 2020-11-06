import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';
import { DynamicScriptLoaderService } from './shared/services/dynamic-script-loader.service';
import { ConfigService } from './shared/services/config.service';
import { RightSidebarService } from './shared/services/rightsidebar.service';
import { AuthGuard } from './shared/security/auth.guard';
import { AuthService } from './shared/security/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule } from 'ngx-mask';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



// Http Intercepter
import {
  AuthInterceptor
} from './shared/security/token.interceptor';



import {
  ToasterComponent
} from './toaster/toaster.component';
import {
  ToasterContainerComponent
} from './toaster/toaster-container.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    ToasterContainerComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatButtonToggleModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatMenuModule,
    ClickOutsideModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR API KEY',
    }),
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DynamicScriptLoaderService,
    ConfigService,
    RightSidebarService,
    AuthService,
    AuthGuard,

  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
