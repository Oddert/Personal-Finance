import { Fragment, useCallback, useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import { MuiFileInput } from 'mui-file-input'

import { PERSONAL_FINANCE_CSV_MAPPING } from '../../constants/appConstants'

import { readCsv } from '../../utils/commonUtils'
import { autoMatchCategories } from '../../utils/uploadUtils'

import {
    transactionEditInitialState,
    TransactionEditContext,
    transactionEditReducer,
    writeHeaders,
    writeTransactions,
    setColumnMap,
} from '../../contexts/transactionEditContext'

import { getCategoryResponse } from '../../redux/selectors/categorySelectors'

import TransactionEdit from '../TransactionEdit/TransactionEdit'

const Upload = () => {
    const [state, dispatch] = useReducer(
        transactionEditReducer,
        transactionEditInitialState,
    )

    const categories = useSelector(getCategoryResponse)

    const [modalOpen, setModalOpen] = useState(false)

    const handleChange = useCallback((files: File[]|null) => {
        if (files) {
            const transactions: { [key: string]: string|number }[] = []
            let headers: string[] = []

            files.forEach((file, idx) => {
                const reader = new FileReader()
                reader.onload = (evt) => {
                    const readValues = readCsv(evt?.target?.result)
                    if (readValues) {
                        if (!headers.length) {
                            headers = readValues.headers
                        }
                        transactions.push(...readValues.values)
                    }
                    if (idx === files.length - 1) {
                        const withCategories = autoMatchCategories(transactions, categories)
                        dispatch(writeHeaders(headers))
                        dispatch(
                            writeTransactions(withCategories)
                        )
                    }
                }
                reader.readAsText(file)
            })            
            setModalOpen(true)
        }
    }, [categories])

    useEffect(() => {
        const mapping = localStorage.getItem(PERSONAL_FINANCE_CSV_MAPPING)
        if (mapping) {
            dispatch(setColumnMap(JSON.parse(mapping) as { [key: string]: string }))
        } else {
            localStorage.setItem(
                PERSONAL_FINANCE_CSV_MAPPING,
                JSON.stringify(transactionEditInitialState.columnMap),
            )
        }
    }, [])

    return (
        <Fragment>
            <MuiFileInput multiple onChange={handleChange} />
            <TransactionEditContext.Provider
                value={{ state, dispatch }}
            >
                <TransactionEdit open={modalOpen} onClose={() => setModalOpen(false)} />
            </TransactionEditContext.Provider>
        </Fragment>
    )
}

export default Upload
