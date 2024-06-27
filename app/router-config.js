import { AccountController } from "./controllers/AccountController.js";
import { NASAApodsController } from "./controllers/NASAApodsController.js";
import { SandboxApodsController } from "./controllers/SandboxApodsController.js";
import { AuthGuard } from "./services/AuthService.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [NASAApodsController, SandboxApodsController],
    view: `app/views/ApodView.html`
  },
  {
    path: '#/account',
    middleware: [AuthGuard],
    controllers: [AccountController],
    view: 'app/views/AccountView.html',
  }
])




