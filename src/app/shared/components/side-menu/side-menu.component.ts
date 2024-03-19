import { Component } from '@angular/core';


interface MenuItem {
  title: string
  route: string
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {

   reactiveMenu: MenuItem[] = [
    { title: 'Basic', route: './reactive/basic' },
    { title: 'Dynamic', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
   ]

    authMenu: MenuItem[] = [
      { title: 'Sign Up', route: './auth' }
    ]
}
