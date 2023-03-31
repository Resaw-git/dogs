import {FC, useMemo, useState} from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {useAppDispatch} from "../hooks";
import {addToFavourites, deletePhotoFromList, deletePhotoFromFavourite} from "../redux/photos-slice";
import {Basic} from "unsplash-js/dist/methods/photos/types"


interface Props extends Basic {
    liked_by_user?: boolean
}

const MyCard: FC<{ photo: Props, showFavourite: boolean }> = ({ photo, showFavourite }) => {

    const dispatch = useAppDispatch()



    const toggleLike = () => {
        if (photo.liked_by_user) {
            dispatch(deletePhotoFromFavourite(photo.id))
        } else {
            dispatch(addToFavourites({...photo as Basic, liked_by_user: true}))
        }
    }

    const deletePhoto = () => {
        if (!showFavourite) {
            dispatch(deletePhotoFromList(photo.id))
        }
        if (photo.liked_by_user) {
            dispatch(deletePhotoFromFavourite(photo.id))
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardMedia
                    component="img"
                    image={photo.urls.regular as string}
                    alt={photo.alt_description as string}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Author<Link target="_blank" href={`https://unsplash.com/@${photo.user.username}`}>{` ${photo.user.name}`}</Link>

                    </Typography>
                    <Typography>
                        {photo.alt_description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="medium"
                        endIcon={photo.liked_by_user ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        onClick={toggleLike}>
                        Like
                    </Button>
                    <Button
                        size="medium"
                        endIcon={<DeleteForeverIcon />}
                        onClick={deletePhoto}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default MyCard
