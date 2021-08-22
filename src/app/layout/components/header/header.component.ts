import { AccountService } from './../../../../account/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './../../../../services/storage.service';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { SeviceGeralService } from './../../../../services/sevice-geral.service';
import { UsuarioWeb } from './../../../../models/usuario-web';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: UsuarioWeb;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out', link: '/logout', icon: 'log-out-outline' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private router: Router,
    private storage: AccountService,
    //rivate userService: UserData,
    // private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private servicegeral: SeviceGeralService
  ) {

  }


  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    //this.storage.refreshToken();

    this.servicegeral.getAll('usuarioweb').then(
      (rest) => {

        this.user = rest;
        // console.log(rest);
      }
    )


    /*this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);
  */
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });


  }
  onContecxtItemSelection(title: any) {
    console.log('click', title);

    if (title == 'Log out') {
      localStorage.clear();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    //this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
