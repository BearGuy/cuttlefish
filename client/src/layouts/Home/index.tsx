import React from 'react';
import Dashboard from '../../components/Dashboard';
import Sidebar from '../../components/Sidebar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PodcastEpisodeCreate from '../Episodes/create';

export default function Home() {
	return(
		<div>
			<Sidebar>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/episodes/create">
            <PodcastEpisodeCreate />
          </Route>
        </Switch>
      </Sidebar>
		</div>
	)
}