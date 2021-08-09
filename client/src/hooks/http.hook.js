import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const req = useCallback (async (url, method = 'GET', body = null, headers = {}) => {
        try{
            if (body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const res = await fetch(url, {
                method,
                body,
                headers
            })
            setLoading(true)
            const data = await res.json()

            if(!res.ok)
                throw new Error(data.message)

            setLoading(false)
            return data
        } catch(err){
            setLoading(false)
            setErr(err.message)
            throw err
        }

    }, [])

    const clearErr = useCallback(()=>setErr(null), [])

    return {loading, req, err, clearErr}
}