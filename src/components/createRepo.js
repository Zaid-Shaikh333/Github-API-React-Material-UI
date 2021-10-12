import React,{ useState} from 'react';
import { TextField, Grid, Button, Switch } from '@mui/material';
import '../App.css';
import axios from 'axios';


export const Create = () => {
    const [ dev , setDev] = useState();
    const [ name, setName] = useState();
    const [ token, setToken] = useState();
    //const [ description, setDescription] = useState();
    const [ privacy, setPrivacy] = useState(false);
    const [ status, setStatus] = useState(false)

    const handleCreateRepository = () => {
        setStatus(true)
        axios.post(`https://api.github.com/user/<${dev}>/repos?access_token=<${token}>`,{
            "name" : name
        })
        setStatus(false)
    }

    return(
        <div className="text-center mt-4 mb-4 pb-2 pt-2">
            <form className="crud-form text-center pt-3 pb-3" >
                <h3>Create Github Repository</h3>
                <div className="crud-form-field">
                    <Grid>
                        <TextField variant="standard" label="User Name" required 
                        onChange={(event) => setDev(event.target.value)}
                        />
                    </Grid>
                </div>

                <div className="crud-form-field">
                    <Grid>
                        <TextField variant="standard" label="Repo Name" required 
                        onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                </div>
                
                <div className="crud-form-field">
                    <Grid>
                        <TextField variant="standard" label="Access Token" type="password" required 
                        onChange={(event) => setToken(event.target.value)}
                        />
                    </Grid>
                </div>

                <Grid>
                    <p className="terms">
                        <Switch
                            color="success"
                            size="medium"
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} required
                            onChange={(event) => setPrivacy(!privacy)}
                        />
                        Create as Private Repository
                    </p>
                </Grid>

                <div className="crud-form-field">
                    <Grid>
                        <Button variant="contained" color="secondary" size="small" onClick={handleCreateRepository}>{status ? "Creating..." : "Create"}</Button>
                    </Grid>
                </div>
            </form>
        </div>
    )
}