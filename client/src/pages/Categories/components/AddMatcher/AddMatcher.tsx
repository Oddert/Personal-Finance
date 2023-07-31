import { useState } from 'react'

import {
    Button,
    ListItem,
    Tooltip,
} from '@mui/material'
import { AddCircle as AddIcon } from '@mui/icons-material'

import type { Matcher } from '../../../../types/Matcher'

import EditMatcher from '../EditMatcher/'

const AddMatcher = () => {
    const [open, setOpen] = useState(false)

    const handleSubmit = (matcher: Partial<Matcher>) => {
        console.log(matcher)
        setOpen(false)
    }

    if (open) {
        return (
            <ListItem
                sx={{
                    transition: '.2s linear',
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
                // onBlur={() => setOpen(false)}
            >
                <EditMatcher
                    // onBlur={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    onSubmit={handleSubmit}
                    clearOnBlur={true}
                    clearOnCancel={true}
                    clearOnSubmit={true}
                />
            </ListItem>
        )
    }
    return (
        <ListItem
            className='Category_AddMatcher'
            sx={{
                transition: '.2s linear',
                paddingLeft: 0,
                paddingRight: 0,
            }}
        >
            <Tooltip title='Add matcher'>
                <Button
                    color='primary'
                    onClick={() => setOpen(!open)}
                    sx={{
                        textAlign: 'center',
                        width: '100%',
                        borderWidth: '2px',
                        '&:hover': {
                            borderWidth: '2px',
                        },
                    }}
                    variant='outlined'
                >
                    <AddIcon />
                </Button>
            </Tooltip>
        </ListItem>
    )
}

export default AddMatcher