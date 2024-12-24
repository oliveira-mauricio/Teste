import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListComponent } from './components/list/list.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { TaskAddComponent } from './components/projects/task-add/task-add.component';
import { TaskViewComponent } from './components/projects/task-view/task-view.component';
import { LoginGuard } from './guards/login.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { PermissionsComponent } from './components/permissions/permissions.component';

const publicRoutes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];

const privateRoutes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: '',
                component: ProjectsComponent,
            },
            {
                path: 'view-project',
                component: ProjectViewComponent,
            },
            {
                path: 'add-project',
                component: ProjectAddComponent,
            },
            {
                path: 'add-task',
                component: TaskAddComponent,
            },
            {
                path: 'view-task',
                component: TaskViewComponent,
            },
            {
                path: 'permissions',
                canActivate: [PermissionsGuard],
                component: PermissionsComponent
            }
        ]
    }
];

export const routes: Routes = [
    ...publicRoutes, ...privateRoutes
];
