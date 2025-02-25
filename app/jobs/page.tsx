import React from 'react'

const Jobs = () => {
    return (
        <div className='container-custom'>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full">
                    <div className="w-full bg-slate-200">
                        search bar
                    </div>
                    <div className="w-full bg-slate-300">
                        Options bar
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-5">
                    <div className="col-span-1 bg-slate-400">
                        left side filter bar
                    </div>
                    <div className="col-span-4 bg-slate-500">
                        cards grid view
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs