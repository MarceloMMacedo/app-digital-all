import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAccordionModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbDialogModule,
  NbPopoverModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbTreeGridModule,
  NbMenuModule,
} from '@nebular/theme';
import { ThemeModule } from '../layout/theme.module';


const nbmodulos=[
  NbTooltipModule,
  NbWindowModule,
  NbDialogModule,
  NbPopoverModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbCardModule,
  NbButtonModule,
  NbListModule,
  NbAccordionModule,
  NbUserModule, NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbActionsModule,
  NbUserModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbSelectModule,
  NbIconModule,
  NbCardModule,
  NbTreeGridModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule


];
@NgModule({
  imports: [

    ...nbmodulos,
  ],
  exports: [
    ...nbmodulos,
  ],
})
export class NbModulosModule { }
