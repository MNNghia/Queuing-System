import { Pagination } from "antd";
import './Pagination.scss'

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

function CustomPagination({
    itemsPerPage,
    totalItems,
    onPageChange,
}: PaginationProps) {
    const handlePageChange = (page: number) => {
        onPageChange(page);
    };
    return (
        <div className="paginationC">
            <Pagination
                showSizeChanger={false}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default CustomPagination;
