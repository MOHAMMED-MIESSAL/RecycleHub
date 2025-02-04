import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo ml-4" routerLink="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002" xml:space="preserve">
                    <path
                        style="fill:#679436"
                        d="m459.657 333.366-62.211.748-52.487-88.637c-2.724-4.6-1.203-10.538 3.397-13.262l83.512-49.449c4.6-2.724 10.537-1.203 13.262 3.397l55.818 94.266a11.744 11.744 0 0 1-.409 12.609l-40.658 59.486-.224-19.158zM108.706 125.404l48.993-97.986a11.742 11.742 0 0 1 10.82-6.487l72.029 1.948-15.984 10.567 34.332 51.883-46.068 92.136c-2.391 4.781-8.206 6.719-12.987 4.329l-86.806-43.403c-4.783-2.391-6.721-8.206-4.329-12.987zM98.761 444.978l-30.452-65.251 16.577 9.533 31.057-53.918h103.01a9.679 9.679 0 0 1 9.68 9.68v97.053a9.68 9.68 0 0 1-9.68 9.68H109.402a11.743 11.743 0 0 1-10.641-6.777z"
                    />
                    <path
                        style="fill:#a5be00"
                        d="m255.928 159.607 37.005-20.94-77.061-116.456 112.09 3.028a14.12 14.12 0 0 1 11.288 6.165l35.224 51.705 14.502-12.642 20.273-17.174c1.533-1.298 3.754.412 2.888 2.225l-46.128 96.736a10.388 10.388 0 0 1-8.74 5.896l-100.113 6.124c-2.564.002-3.461-3.403-1.228-4.667zM31.775 287.588l30.494-54.629-17.792-7.319-32.824-12.701c-2.338-.904-1.676-4.376.831-4.358l121.534.908 60.288 100.479c1.391 2.318-1.47 4.836-3.593 3.163l-25.183-19.854-17.101-12.232-69.701 121.006-47.418-101.61a14.123 14.123 0 0 1 .465-12.853zM279.945 382.684l54.886-101.489c.964-1.782 3.677-.983 3.522 1.037l-2.367 30.647-1.813 20.948 139.636-1.681-63.274 92.575a14.118 14.118 0 0 1-11.297 6.148l-62.54 1.596 2.769 19.039 3.272 30.188c.217 2.006-2.452 2.895-3.48 1.158l-59.314-100.166z"
                    />
                    <path
                        d="M228.109 328h-98.256l20.892-36.272 41.323 29.559a7.867 7.867 0 0 0 11.322-10.444l-62.926-104.877a7.865 7.865 0 0 0-6.746-3.82H8.18c-3.462 0-6.701 2.099-7.781 5.389a7.87 7.87 0 0 0 4.474 9.752l46.952 19.312-29.852 53.481a7.86 7.86 0 0 0-.259 7.16l73.414 157.315a7.862 7.862 0 0 0 7.127 4.539h43.782a7.866 7.866 0 0 0 0-15.732h-38.772l-20.127-43.129.832.478 32.822-56.982h99.45v99.633h-35.89a7.866 7.866 0 0 0 0 15.732h43.756a7.866 7.866 0 0 0 7.866-7.866V335.866a7.865 7.865 0 0 0-7.865-7.866zm-148.6 55.885-41.836-89.648 32.21-57.704a7.864 7.864 0 0 0-3.876-11.109l-18.339-7.543h81.599l41.143 68.574-17.572-12.568a7.854 7.854 0 0 0-6.243-1.289 7.857 7.857 0 0 0-5.148 3.761L79.509 383.885zM367.638 160.572l56.283-112.566a7.866 7.866 0 0 0-12.203-9.447l-38.271 33.358-34.484-50.619a7.862 7.862 0 0 0-6.288-3.434l-173.539-4.69c-3.023-.065-5.88 1.612-7.247 4.345L95.607 130.083a7.865 7.865 0 0 0 3.518 10.553l103.184 51.593c1.13.565 2.33.833 3.512.833a7.867 7.867 0 0 0 7.041-4.349l43.941-87.882 23.098 34.907-44.92 23.742a7.863 7.863 0 0 0-3.88 9.139c1.036 3.58 4.437 5.954 8.159 5.658l121.945-9.379a7.87 7.87 0 0 0 6.433-4.326zm-165.329 14.069-89.114-44.557 50.524-101.05 47.578 1.287-.801.53 36.288 54.839-44.475 88.951zm73.517-18.956 19.101-10.095a7.867 7.867 0 0 0 2.884-11.294L229.332 30.808l98.895 2.672 37.208 54.616a7.871 7.871 0 0 0 5.497 3.373 7.878 7.878 0 0 0 6.172-1.872l14.948-13.029-36.493 72.985-79.733 6.132zM510.904 282.835 446.78 174.544c-2.212-3.738-7.037-4.971-10.775-2.76l-99.267 58.779a7.86 7.86 0 0 0-2.759 10.776l50.063 84.546-41.856.503 4.38-50.62a7.864 7.864 0 0 0-14.754-4.42L273.63 378.93a7.863 7.863 0 0 0 .151 7.749l64.124 108.29a7.863 7.863 0 0 0 9.388 3.409 7.866 7.866 0 0 0 5.164-8.548l-7.306-50.24 61.227-1.562a7.87 7.87 0 0 0 6.294-3.425L510.63 291.28a7.865 7.865 0 0 0 .274-8.445zM401.953 422.406l-66.062 1.684a7.867 7.867 0 0 0-7.583 8.995l2.854 19.625-41.577-70.214 38.041-70.341-1.862 21.524a7.857 7.857 0 0 0 2.072 6.029 7.861 7.861 0 0 0 5.764 2.514l.094-.001 124.084-1.493-55.825 81.678zm66.006-96.572-.012-.96-65.753.791-50.672-85.575 85.731-50.763 57.564 97.212-26.858 39.295z"
                    />
                </svg>
                <span>RecycleHub</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
