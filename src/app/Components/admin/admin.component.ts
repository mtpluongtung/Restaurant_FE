import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [PanelMenu,RouterLink,RouterLinkActive]
})
export class AdminComponent implements OnInit {

  constructor() { }
  items :MenuItem [] = [];  
  ngOnInit() {
    this.items = [
      {
          label: 'Khách hàng',
          icon: 'pi pi-file',
          items: [
              {
                  label: 'Documents',
                  icon: 'pi pi-file',
                  items: [
                      {
                          label: 'Invoices',
                          icon: 'pi pi-file-pdf',
                          items: [
                              {
                                  label: 'Pending',
                                  icon: 'pi pi-stop'
                              },
                              {
                                  label: 'Paid',
                                  icon: 'pi pi-check-circle'
                              }
                          ]
                      },
                      {
                          label: 'Clients',
                          icon: 'pi pi-users'
                      }
                  ]
              },
              {
                  label: 'Images',
                  icon: 'pi pi-image',
                  items: [
                      {
                          label: 'Logos',
                          icon: 'pi pi-image'
                      }
                  ]
              }
          ]
      },
      {
          label: 'Hóa đơn',
          icon: 'pi pi-cloud',
          routerLink: ['/hoa-don'],
          items: [
              {
                  label: 'Upload',
                  icon: 'pi pi-cloud-upload'
              },
              {
                  label: 'Download',
                  icon: 'pi pi-cloud-download'
              },
              {
                  label: 'Sync',
                  icon: 'pi pi-refresh'
              }
          ]
      },
      {
          label: 'Bếp',
          icon: 'pi pi-desktop',
          routerLink: ['/kitchen'],
          items: [
              {
                  label: 'Phone',
                  icon: 'pi pi-mobile'
              },
              {
                  label: 'Desktop',
                  icon: 'pi pi-desktop'
              },
              {
                  label: 'Tablet',
                  icon: 'pi pi-tablet'
              }
          ]
      }
  ]
  }

}
