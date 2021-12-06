import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/landing';
import OrphanagesMap from './pages/orphanages';
import Orphanage from './pages/orphanage';
import CreateOrphanage from './pages/createOrphanage';
import Login from './pages/login';
import Cadastro from './pages/cadastro'
import OrphanageMapUser from './pages/orphanagesUser'

function Routs() {
    return(
<BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/app' component={OrphanagesMap} />
        <Route path='/map' component={OrphanageMapUser} />
        <Route path='/psych/create' component={CreateOrphanage} />
        <Route path='/psych/:id' component={Orphanage} />
        <Route path='/login' component={Login} />
        <Route path='/cadastro' component={Cadastro} />
      </Switch>
    </BrowserRouter>
    )
}

export default Routs;