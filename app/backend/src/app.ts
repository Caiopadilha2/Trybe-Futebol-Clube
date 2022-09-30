import * as express from 'express';
import login from './controller/login';
import team from './controller/team';
import match from './controller/match';
import loginFildes from './middlewares/loginValidations';
import equalTeams from './middlewares/equalTeams';
import tokenValidate from './middlewares/tokenValidation';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.post('/login', loginFildes, login.login);
    this.app.get('/login/validate', login.validateLogin);

    this.app.get('/teams', team.getAll);
    this.app.get('/teams/:id', team.getById);

    this.app.get('/matches', match.matchStatusQuery);
    this.app.post('/matches', tokenValidate, equalTeams, match.create);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
