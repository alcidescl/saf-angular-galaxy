import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SignIn } from './components/auth/sign-in/sign-in';
import { authGuard } from './shared/guards/auth-guard';
import { noAuthGuard } from './shared/guards/no-auth-guard';
import { InfantesList } from './components/infantes/infantes-list/infantes-list';
import { InfantesRegister } from './components/infantes/infantes-register/infantes-register';
import { PersonasRegister } from './components/personas/personas-register/personas-register';
import { PersonasList } from './components/personas/personas-list/personas-list';
import { ExpedientesRegister } from './components/expedientes/expedientes-register/expedientes-register';
import { ExpedientesView } from './components/expedientes/expedientes-view/expedientes-view';
import { ExpedientesList } from './components/expedientes/expedientes-list/expedientes-list';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: 'infantes',
        component: InfantesList,
        canActivate: [authGuard],
        data: {
            roles: ['INFANTES_LISTA']
        }
    },
    {
        path: 'infantes/register',
        component: InfantesRegister,
        canActivate: [authGuard],
        data: {
            roles: ['INFANTES_CREAR']
        }
    },
    {
        path: 'infantes/edit/:id',
        component: InfantesRegister,
        canActivate: [authGuard],
        data: {
            roles: ['INFANTES_ACTUALIZAR']
        }
    },
        {
        path: 'personas',
        component: PersonasList,
        canActivate: [authGuard],
        data: {
            roles: ['PERSONAS_LISTA']
        }
    },
    {
        path: 'personas/register',
        component: PersonasRegister,
        canActivate: [authGuard],
        data: {
            roles: ['PERSONAS_CREAR']
        }
    },
    {
        path: 'personas/edit/:id',
        component: PersonasRegister,
        canActivate: [authGuard],
        data: {
            roles: ['PERSONAS_ACTUALIZAR']
        }
    },
    {
        path: 'expedientes',
        component: ExpedientesList,
        canActivate: [authGuard],
        data: {
            roles: ['EXPEDIENTES_LISTA']
        }
    },
    {
        path: 'expedientes/register',
        component: ExpedientesRegister,
        canActivate: [authGuard],
        data: {
            roles: ['EXPEDIENTES_CREAR']
        }
    },
    {
        path: 'expedientes/view/:id',
        component: ExpedientesView,
        canActivate: [authGuard],
        data: {
            roles: ['EXPEDIENTES_VER']
        }
    },
    {
        path: 'sign-in',
        component: SignIn,
        canActivate: [noAuthGuard]
    }
];
