import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createApi } from 'unsplash-js'
import { useEffect, useState } from 'react'
import MyCard from "./my-card"
import Link from '@mui/material/Link'
import {setPhotos} from '../redux/photos-slice'
import {useAppDispatch, useAppSelector} from "../hooks";

const api = createApi({
    accessKey: 'JWvFnYdMnevlmmsNGTha9_kNJV_LW0nuPQRxBtqNtfI',
})

function App() {
    const dispatch = useAppDispatch()
    const photoList = useAppSelector(store => store.photos)
    const [showFavourite, setShowFavourite] = useState(false)

    const toggleShowFavourite = () => {
        setShowFavourite(!showFavourite)
    }

    useEffect(() => {
        api.search
            .getPhotos({ query: 'random', orientation: 'portrait', perPage: 10, })
            .then((result) => {
                if (result.response) {
                    dispatch(setPhotos(result.response.results))
                }
            })
            .catch(() => {
                console.log('something went wrong!')
            })
    }, [])

    useEffect(() => {console.log(photoList.favourites)}, [photoList.favourites])

    return (
        <main>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Random photos React App
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        Here you can add photos to favorites, view your favorite photos and delete photos. API provided from <Link target="_blank" href="https://unsplash.com/">unsplash.com</Link>.
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button variant={showFavourite ? "contained" : "outlined"} onClick={toggleShowFavourite}>Show favourites photos</Button>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {showFavourite ?
                        photoList.favourites.map((photo) => <MyCard showFavourite={showFavourite} key={photo.id} photo={photo} />) :
                        photoList.list.map((photo) => <MyCard key={photo.id} showFavourite={showFavourite} photo={photo} />)}
                </Grid>
            </Container>
        </main>
    )
}

export default App
