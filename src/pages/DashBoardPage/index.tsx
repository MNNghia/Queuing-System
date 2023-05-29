import './DashBoard.scss'
import {useDispatch} from 'react-redux'
import {setBreadcrumb, BreadcrumbItem} from '../../redux/reducers/Breadcrumb/Breadcrumb'
import { useEffect } from 'react'
import { AppDispatch } from '../../redux/store'

function DashBoardPage() {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            {label: 'Home', url: '/'},
            {label: 'Post', url: '/post'}
        ]

        dispatch(setBreadcrumb(breadcrumbItems))
    }, [dispatch])

    return (  
        <div>
        asfsdfsdasdfsdf
        </div>
    );
}

export default DashBoardPage;