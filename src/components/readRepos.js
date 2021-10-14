import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Modal, Box } from '@mui/material';
import axios from 'axios';
import '../App.css';

export const Repos = () => {

    const [name, setName] = useState()
    const [apidata, setApiData] = useState([])
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState([])
    const [fetch, setFetch] = useState(false)
    const handleClose = () => setFetch(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        boxShadow: 20,
        p: 4,
    };

    useEffect(() => {

    }, [apidata, name, fetch])

    const handleSearch = (event) => {
        event.preventDefault()
        setLoading(true)
        axios.get(`https://api.github.com/users/${name}/repos`)
            .then((response) => {
                setLoading(false)
                setApiData(response.data)
                console.log(apidata)
            })
    }

    const handleProfile = (event) => {
        event.preventDefault()
        setFetch(true)
        axios.get(`https://api.github.com/users/${name}`)
            .then((response) => {
                setProfile(response.data)
                console.log(profile)
            })
    }

    return (
        <>
            <div className="mt-3 mb-3">
                <h1 className="text-center">Read Repositories</h1>
                <form className="text-center my-4">
                    <div className="my-3">
                        <Grid>
                            <TextField variant="standard" label="Enter Username"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </Grid>
                    </div>
                    <div className="my-3">
                        <Grid>
                            <Button variant="contained" color="primary" size="small"
                                onClick={handleSearch}>{loading ? "Searching..." : "Search"}</Button>
                        </Grid>
                    </div>
                    <div className="my-4">
                        <Grid>
                            <Button variant="contained" color="success" size="small"
                                onClick={handleProfile}>Read Profile</Button>
                        </Grid>
                    </div>
                </form>

            </div>

            <Modal open={fetch} onClose={handleClose} backdrop="static" keyboard={false} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>
                        <div className="custom-profile py-3">
                            <img className="profile-img" alt="profile" src={profile.avatar_url} width="100" height="100"/>
                        </div>
                        <h5 className="text-center">{profile.name}</h5>
                        <h3 className="text-center"><a href={profile.html_url}><i className="fab fa-github-square"></i></a></h3>
                        <h6>Followers : {profile.followers}</h6>
                        <h6>Following : {profile.following}</h6>
                        <h6>Repositories : {profile.public_repos}</h6>
                        <h6 className="text-center py-2"><i class="fas fa-map-marker-alt"></i> : {profile.location ? profile.location : "Unavailable"}</h6>
                    </div>
                </Box>
            </Modal>

            <div className="mt-3 pt-3 mb-3 mx-auto container">
                <table className="table table-hover table-borderless">
                    <caption className="text-center">List of Repositories for {name}</caption>
                    <thead>
                        <tr className="table-dark">
                            <th>Name</th>
                            <th>Stars</th>
                            <th>Default Branch</th>
                            <th>Main Language</th>
                            <th>Repository Link</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {apidata.map((data) => {
                            return (
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.stargazers_count}</td>
                                    <td>{data.default_branch}</td>
                                    <td>{data.language ? data.language : "None"}</td>
                                    <td>
                                        <a href={data.html_url} className="text-decoration-none">
                                            <i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}