import { useCallback, useContext, useState } from 'react'
import { Button } from '@mui/material'

import type { Category as CategoryT } from '../../../../../types/Category'
import type { Matcher as MatcherT, MatchType } from '../../../../../types/Matcher'

import { TransactionEditContext, toggleSideBar, writeTransactions } from '../../../../../contexts/transactionEditContext'

import Category from '../../../../Category/Category'
import ColourBase from '../../../../Category/components/ColourBase'
import TitleBase from '../../../../Category/components/TitleBase'
import { autoMatchCategories } from '../../../../../utils/uploadUtils'

interface Props {
    category: CategoryT
}

const Option = ({ category }: Props) => {
    const { dispatch, state: { match, transactions } } = useContext(TransactionEditContext)

    const [open, setOpen] = useState(false)

    const handleClose = useCallback(
        (partialMatcher: Partial<MatcherT>) => {
            console.log(partialMatcher)
            const matcher: MatcherT = {
                id: 0,
                match: partialMatcher.match as string,
                match_type: partialMatcher.match_type as MatchType,
                case_sensitive: partialMatcher.case_sensitive as boolean|0|1,
                created_on: '',
                updated_on: '',
            }
            dispatch(writeTransactions(
                autoMatchCategories(
                    transactions,
                    [
                        {
                            ...category,
                            matchers: [matcher],
                        }
                    ]
                )
            ))
            dispatch(toggleSideBar(false))
        },
        [category, dispatch, transactions]
    )

    if (open) {
        return (
            <Category
                category={category}
                defaultOpenAddNew
                defaultOpenMatcher={{ match }}
                onAddNewSubmit={handleClose}
            />
        )
    }
    return (
        <Button
            onClick={() => setOpen(true)}
            sx={(theme) => ({
                padding: '10px 30px',
                [theme.breakpoints.down('xs')]: {
                    padding: '15px',
                },
                minWidth: '300px',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                color: theme.palette.common.white,
            })}
        >
            <ColourBase
                asButton={false}
                colour={category.colour}
                size='sm'
            />
            <TitleBase
                colour={category.colour}
                editable={false}
                text={category.label}
            />
        </Button>
    )
}

export default Option