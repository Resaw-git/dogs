import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Basic } from 'unsplash-js/dist/methods/photos/types'

interface Photo extends Basic {
    liked_by_user?: boolean
}

interface PhotoList {
    list: Photo[]
    favourites: Photo[]
}

const initialState: PhotoList = {
    list: [],
    favourites: [],
}

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotos: (state, action: PayloadAction<Photo[]>) => {
            state.list = action.payload
        },
        addToFavourites: (state, action: PayloadAction<Photo>) => {
            state.list.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.liked_by_user = true
                }
            })
            state.favourites.push(action.payload)
        },
        deletePhotoFromList: (state, action: PayloadAction<string>) => {
            state.list.forEach((item, index) => {
                if (item.id === action.payload) {
                    state.list.splice(index, 1)
                }
            })
        },
        deletePhotoFromFavourite: (state, action: PayloadAction<string>) => {
            state.favourites.forEach((item, index) => {
                if (item.id === action.payload) {
                    state.favourites.splice(index, 1)
                }
            })
            state.list.forEach((item) => {
                if (item.id === action.payload) {
                    item.liked_by_user = false
                }
            })
        },
    },
})

export const {
    setPhotos,
    addToFavourites,
    deletePhotoFromList,
    deletePhotoFromFavourite,
} = photosSlice.actions

export default photosSlice.reducer
