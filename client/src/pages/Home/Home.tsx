import React from 'react'
import { Container } from '@mui/material'

import ProjectionLineChart from '../../modules/ProjectionLineChart/ProjectionLineChart'
import ExistingDataLineChart from '../../modules/ExistingDataLineChart/ExistingDataLineChart'

const Home = () => {
    return (
        <Container
            sx={{
                height: '200vh',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignContent: 'start',
                alignItems: 'start',
                gridGap: '20px',
                // gridAutoRows: '400px',
            }}
        >
            <ExistingDataLineChart compact />
            <ProjectionLineChart compact />
        </Container>
    )
}

export default Home
