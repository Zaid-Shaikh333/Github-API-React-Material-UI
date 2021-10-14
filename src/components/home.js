import React from 'react';
import { Button, AppBar, Box, Toolbar } from '@mui/material';
import { Repos } from './readRepos';
import { Create } from './createRepo';
import { NotFound } from './NotFound';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import "../App.css";

export const Home = () => {

    return (
        <Router>
            <div className="mt-2 mx-2">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            
                            <div className="mx-3 nav">
                                <i className="fab fa-github"></i>
                            </div>
                            
                            <div className="mx-3">
                                <Link to="/create" className="text-decoration-none">
                                    <Button variant="contained" size="large">
                                        <i className="fas fa-plus mx-2"></i>
                                        Create Repository
                                    </Button>
                                </Link>
                            </div>
                            <div className="mx-3">
                                <Link to="/read" className="text-decoration-none">
                                    <Button variant="contained" size="large">
                                        <i className="fas fa-bookmark mx-2"></i>
                                        Read Repositories
                                    </Button>
                                </Link>
                            </div>

                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <Route path="/create" component={Create} exact />
            <Route path="/read" component={Repos} exact />
            <Route status={404} component={NotFound}/>
        </Router>
    )
}