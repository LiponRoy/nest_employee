import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {
    return (
        <ProtectedRoute>
            <div>This is Procted Route</div>
        </ProtectedRoute>
    )
}

export default page